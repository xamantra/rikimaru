"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./media.search");
const array_helper_1 = require("../helpers/array.helper");
const array_unique_1 = __importDefault(require("array-unique"));
const random_helper_1 = require("../helpers/random.helper");
class AnimeCache {
    static async Update(index) {
        array_unique_1.default(this.List);
        setTimeout(async () => {
            array_unique_1.default(this.List);
            const local = this.List[index];
            if (this.List.length > 0) {
                const fromApi = await media_search_1.MediaSearch.Find(local.idMal);
                if (fromApi !== null && fromApi !== undefined) {
                    array_helper_1.ArrayHelper.remove(this.List, local, () => {
                        array_unique_1.default(this.List);
                        this.List.push(fromApi);
                    });
                }
                else {
                    this.Update(0);
                }
                if (index === this.List.length - 1) {
                    this.Update(0);
                }
                else {
                    this.Update(index + 1);
                }
            }
        }, 1000);
    }
    static async Get(id) {
        return new Promise(async (resolve, reject) => {
            array_unique_1.default(this.List);
            const local = this.List.find(x => x.idMal === id);
            if (local !== null && local !== undefined) {
                resolve(local);
            }
            else {
                const fromApi = await media_search_1.MediaSearch.Find(id);
                if (fromApi !== null && fromApi !== undefined) {
                    resolve(null);
                }
                this.List.push(fromApi);
                array_unique_1.default(this.List);
                resolve(fromApi);
            }
        });
    }
    static GetRandom() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                const anime = this.List[random_helper_1.Random.Range(0, this.List.length - 1)];
                if (anime !== null && anime !== undefined) {
                    resolve(anime);
                }
            }, 1);
        });
    }
    static async Search(keyword) {
        return new Promise(async (resolve, reject) => {
            array_unique_1.default(this.List);
            const found = [];
            const length = this.List.length;
            if (length === 0) {
                const fromApi = await media_search_1.MediaSearch.All(keyword);
                this.List.concat(fromApi);
                array_unique_1.default(this.List);
                resolve(fromApi);
            }
            for (let i = 0; i < length; i++) {
                const anime = this.List[i];
                const english = anime.title.english;
                const romaji = anime.title.romaji;
                let media = null;
                if (english !== null && english !== undefined) {
                    const match = await this.ScanMatch(keyword, english);
                    if (match === true) {
                        media = anime;
                    }
                }
                if (romaji !== null && romaji !== undefined) {
                    const match = await this.ScanMatch(keyword, romaji);
                    if (match === true) {
                        media = anime;
                    }
                }
                if (media !== null)
                    found.push(media);
                if (i === length - 1) {
                    if (found.length === 0) {
                        const fromApi = await media_search_1.MediaSearch.All(keyword);
                        this.List = this.List.concat(fromApi);
                        array_unique_1.default(this.List);
                        resolve(fromApi);
                    }
                    else {
                        resolve(found);
                    }
                }
            }
        });
    }
    static async ScanMatch(keyword, title) {
        return new Promise(async (resolve, reject) => {
            const match = await this.ScanTitle(keyword, title);
            if (match < 0) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    static async ScanTitle(keyword, title) {
        return new Promise((resolve, reject) => {
            const keywords = keyword.split(/ +/g);
            let match = 0;
            for (let i = 0; i < keywords.length; i++) {
                const word = keywords[i];
                if (title.toLowerCase().includes(word)) {
                    match++;
                }
                if (i === keywords.length - 1) {
                    if (match === keywords.length)
                        resolve(match);
                    else
                        resolve(-1);
                }
            }
        });
    }
}
AnimeCache.List = [];
exports.AnimeCache = AnimeCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWUuY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9hbmltZS5jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGlEQUE2QztBQUM3QywwREFBc0Q7QUFDdEQsZ0VBQWtDO0FBQ2xDLDREQUFrRDtBQUVsRCxNQUFhLFVBQVU7SUFHZCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFhO1FBQ3RDLHNCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNwQixzQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixNQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxPQUFPLEtBQUssSUFBSSxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7b0JBQzdDLDBCQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTt3QkFDeEMsc0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztpQkFDSjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQjtnQkFDRCxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ2xDLElBQUksQ0FB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QyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQTVIYyxlQUFJLEdBQWEsRUFBRSxDQUFDO0FBRHJDLGdDQThIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuL21lZGlhLnNlYXJjaFwiO1xuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcbmltcG9ydCB1bmlxdWUgZnJvbSBcImFycmF5LXVuaXF1ZVwiO1xuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uL2hlbHBlcnMvcmFuZG9tLmhlbHBlclwiO1xuXG5leHBvcnQgY2xhc3MgQW5pbWVDYWNoZSB7XG4gIHByaXZhdGUgc3RhdGljIExpc3Q6IElNZWRpYVtdID0gW107XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBVcGRhdGUoaW5kZXg6IG51bWJlcikge1xuICAgIHVuaXF1ZSh0aGlzLkxpc3QpO1xuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgdW5pcXVlKHRoaXMuTGlzdCk7XG4gICAgICBjb25zdCBsb2NhbCA9IHRoaXMuTGlzdFtpbmRleF07XG4gICAgICBpZiAodGhpcy5MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgZnJvbUFwaSA9IGF3YWl0IE1lZGlhU2VhcmNoLkZpbmQobG9jYWwuaWRNYWwpO1xuICAgICAgICBpZiAoZnJvbUFwaSAhPT0gbnVsbCAmJiBmcm9tQXBpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBBcnJheUhlbHBlci5yZW1vdmUodGhpcy5MaXN0LCBsb2NhbCwgKCkgPT4ge1xuICAgICAgICAgICAgdW5pcXVlKHRoaXMuTGlzdCk7XG4gICAgICAgICAgICB0aGlzLkxpc3QucHVzaChmcm9tQXBpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLlVwZGF0ZSgwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMuTGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgdGhpcy5VcGRhdGUoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5VcGRhdGUoaW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBHZXQoaWQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJTWVkaWE+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHVuaXF1ZSh0aGlzLkxpc3QpO1xuICAgICAgY29uc3QgbG9jYWwgPSB0aGlzLkxpc3QuZmluZCh4ID0+IHguaWRNYWwgPT09IGlkKTtcbiAgICAgIGlmIChsb2NhbCAhPT0gbnVsbCAmJiBsb2NhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc29sdmUobG9jYWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZnJvbUFwaSA9IGF3YWl0IE1lZGlhU2VhcmNoLkZpbmQoaWQpO1xuICAgICAgICBpZiAoZnJvbUFwaSAhPT0gbnVsbCAmJiBmcm9tQXBpICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuTGlzdC5wdXNoKGZyb21BcGkpO1xuICAgICAgICB1bmlxdWUodGhpcy5MaXN0KTtcbiAgICAgICAgcmVzb2x2ZShmcm9tQXBpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgR2V0UmFuZG9tKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJTWVkaWE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3QgYW5pbWUgPSB0aGlzLkxpc3RbUmFuZG9tLlJhbmdlKDAsIHRoaXMuTGlzdC5sZW5ndGggLSAxKV07XG4gICAgICAgIGlmIChhbmltZSAhPT0gbnVsbCAmJiBhbmltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmVzb2x2ZShhbmltZSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDEpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBTZWFyY2goa2V5d29yZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYVtdPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB1bmlxdWUodGhpcy5MaXN0KTtcbiAgICAgIGNvbnN0IGZvdW5kOiBJTWVkaWFbXSA9IFtdO1xuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5MaXN0Lmxlbmd0aDtcbiAgICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgZnJvbUFwaSA9IGF3YWl0IE1lZGlhU2VhcmNoLkFsbChrZXl3b3JkKTtcbiAgICAgICAgdGhpcy5MaXN0LmNvbmNhdChmcm9tQXBpKTtcbiAgICAgICAgdW5pcXVlKHRoaXMuTGlzdCk7XG4gICAgICAgIHJlc29sdmUoZnJvbUFwaSk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGFuaW1lID0gdGhpcy5MaXN0W2ldO1xuICAgICAgICBjb25zdCBlbmdsaXNoID0gYW5pbWUudGl0bGUuZW5nbGlzaDtcbiAgICAgICAgY29uc3Qgcm9tYWppID0gYW5pbWUudGl0bGUucm9tYWppO1xuICAgICAgICBsZXQgbWVkaWE6IElNZWRpYSA9IG51bGw7XG4gICAgICAgIGlmIChlbmdsaXNoICE9PSBudWxsICYmIGVuZ2xpc2ggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbnN0IG1hdGNoID0gYXdhaXQgdGhpcy5TY2FuTWF0Y2goa2V5d29yZCwgZW5nbGlzaCk7XG4gICAgICAgICAgaWYgKG1hdGNoID09PSB0cnVlKSB7XG4gICAgICAgICAgICBtZWRpYSA9IGFuaW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocm9tYWppICE9PSBudWxsICYmIHJvbWFqaSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgbWF0Y2ggPSBhd2FpdCB0aGlzLlNjYW5NYXRjaChrZXl3b3JkLCByb21hamkpO1xuICAgICAgICAgIGlmIChtYXRjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgbWVkaWEgPSBhbmltZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lZGlhICE9PSBudWxsKSBmb3VuZC5wdXNoKG1lZGlhKTtcbiAgICAgICAgaWYgKGkgPT09IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBpZiAoZm91bmQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBmcm9tQXBpID0gYXdhaXQgTWVkaWFTZWFyY2guQWxsKGtleXdvcmQpO1xuICAgICAgICAgICAgdGhpcy5MaXN0ID0gdGhpcy5MaXN0LmNvbmNhdChmcm9tQXBpKTtcbiAgICAgICAgICAgIHVuaXF1ZSh0aGlzLkxpc3QpO1xuICAgICAgICAgICAgcmVzb2x2ZShmcm9tQXBpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZShmb3VuZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuTWF0Y2goa2V5d29yZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoID0gYXdhaXQgdGhpcy5TY2FuVGl0bGUoa2V5d29yZCwgdGl0bGUpO1xuICAgICAgaWYgKG1hdGNoIDwgMCkge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuVGl0bGUoa2V5d29yZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3Qga2V5d29yZHMgPSBrZXl3b3JkLnNwbGl0KC8gKy9nKTtcbiAgICAgIGxldCBtYXRjaCA9IDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHdvcmQgPSBrZXl3b3Jkc1tpXTtcbiAgICAgICAgaWYgKHRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMod29yZCkpIHtcbiAgICAgICAgICBtYXRjaCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSBrZXl3b3Jkcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgaWYgKG1hdGNoID09PSBrZXl3b3Jkcy5sZW5ndGgpIHJlc29sdmUobWF0Y2gpO1xuICAgICAgICAgIGVsc2UgcmVzb2x2ZSgtMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19