"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./media.search");
const array_helper_1 = require("../helpers/array.helper");
const array_unique_1 = __importDefault(require("array-unique"));
class AnimeCache {
    static async Update(index) {
        array_unique_1.default(this.List);
        setTimeout(async () => {
            const local = this.List[index];
            if (this.List.length > 0) {
                const fromApi = await media_search_1.MediaSearch.Find(local.idMal);
                if (fromApi !== null && fromApi !== undefined) {
                    array_helper_1.ArrayHelper.remove(this.List, local, () => {
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
            const fromApi = await media_search_1.MediaSearch.Find(id);
            if (local !== null && local !== undefined) {
                resolve(local);
            }
            else if (fromApi !== null && fromApi !== undefined) {
                this.List.push(fromApi);
                resolve(fromApi);
            }
            else {
                resolve(null);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWUuY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9hbmltZS5jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGlEQUE2QztBQUM3QywwREFBc0Q7QUFFdEQsZ0VBQWtDO0FBRWxDLE1BQWEsVUFBVTtJQUdkLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQWE7UUFDdEMsc0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3BCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtvQkFDN0MsMEJBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO3dCQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEI7Z0JBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDeEI7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QUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3hDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN0QyxLQUFLLEVBQUUsQ0FBQztpQkFDVDtnQkFDRCxJQUFJLENBQUMsS0FBSyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDN0IsSUFBSSxLQUFLLEtBQUssUUFBUSxDQUFDLE1BQU07d0JBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDOzt3QkFDekMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xCO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBM0djLGVBQUksR0FBYSxFQUFFLENBQUM7QUFEckMsZ0NBNkdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi9tZWRpYS5zZWFyY2hcIjtcclxuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgTWVkaWEgfSBmcm9tIFwiLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQgdW5pcXVlIGZyb20gXCJhcnJheS11bmlxdWVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltZUNhY2hlIHtcclxuICBwcml2YXRlIHN0YXRpYyBMaXN0OiBJTWVkaWFbXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIFVwZGF0ZShpbmRleDogbnVtYmVyKSB7XHJcbiAgICB1bmlxdWUodGhpcy5MaXN0KTtcclxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBsb2NhbCA9IHRoaXMuTGlzdFtpbmRleF07XHJcbiAgICAgIGlmICh0aGlzLkxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGZyb21BcGkgPSBhd2FpdCBNZWRpYVNlYXJjaC5GaW5kKGxvY2FsLmlkTWFsKTtcclxuICAgICAgICBpZiAoZnJvbUFwaSAhPT0gbnVsbCAmJiBmcm9tQXBpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIEFycmF5SGVscGVyLnJlbW92ZSh0aGlzLkxpc3QsIGxvY2FsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuTGlzdC5wdXNoKGZyb21BcGkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMuTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZSgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGUoaW5kZXggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIDEwMDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBHZXQoaWQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB1bmlxdWUodGhpcy5MaXN0KTtcclxuICAgICAgY29uc3QgbG9jYWwgPSB0aGlzLkxpc3QuZmluZCh4ID0+IHguaWRNYWwgPT09IGlkKTtcclxuICAgICAgY29uc3QgZnJvbUFwaSA9IGF3YWl0IE1lZGlhU2VhcmNoLkZpbmQoaWQpO1xyXG4gICAgICBpZiAobG9jYWwgIT09IG51bGwgJiYgbG9jYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlc29sdmUobG9jYWwpO1xyXG4gICAgICB9IGVsc2UgaWYgKGZyb21BcGkgIT09IG51bGwgJiYgZnJvbUFwaSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5MaXN0LnB1c2goZnJvbUFwaSk7XHJcbiAgICAgICAgcmVzb2x2ZShmcm9tQXBpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgU2VhcmNoKGtleXdvcmQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYVtdPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHVuaXF1ZSh0aGlzLkxpc3QpO1xyXG4gICAgICBjb25zdCBmb3VuZDogSU1lZGlhW10gPSBbXTtcclxuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5MaXN0Lmxlbmd0aDtcclxuICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IGZyb21BcGkgPSBhd2FpdCBNZWRpYVNlYXJjaC5BbGwoa2V5d29yZCk7XHJcbiAgICAgICAgdGhpcy5MaXN0LmNvbmNhdChmcm9tQXBpKTtcclxuICAgICAgICByZXNvbHZlKGZyb21BcGkpO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmltZSA9IHRoaXMuTGlzdFtpXTtcclxuICAgICAgICBjb25zdCBlbmdsaXNoID0gYW5pbWUudGl0bGUuZW5nbGlzaDtcclxuICAgICAgICBjb25zdCByb21hamkgPSBhbmltZS50aXRsZS5yb21hamk7XHJcbiAgICAgICAgbGV0IG1lZGlhOiBJTWVkaWEgPSBudWxsO1xyXG4gICAgICAgIGlmIChlbmdsaXNoICE9PSBudWxsICYmIGVuZ2xpc2ggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29uc3QgbWF0Y2ggPSBhd2FpdCB0aGlzLlNjYW5NYXRjaChrZXl3b3JkLCBlbmdsaXNoKTtcclxuICAgICAgICAgIGlmIChtYXRjaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBtZWRpYSA9IGFuaW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm9tYWppICE9PSBudWxsICYmIHJvbWFqaSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb25zdCBtYXRjaCA9IGF3YWl0IHRoaXMuU2Nhbk1hdGNoKGtleXdvcmQsIHJvbWFqaSk7XHJcbiAgICAgICAgICBpZiAobWF0Y2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbWVkaWEgPSBhbmltZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1lZGlhICE9PSBudWxsKSBmb3VuZC5wdXNoKG1lZGlhKTtcclxuICAgICAgICBpZiAoaSA9PT0gbGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBmcm9tQXBpID0gYXdhaXQgTWVkaWFTZWFyY2guQWxsKGtleXdvcmQpO1xyXG4gICAgICAgICAgICB0aGlzLkxpc3QgPSB0aGlzLkxpc3QuY29uY2F0KGZyb21BcGkpO1xyXG4gICAgICAgICAgICByZXNvbHZlKGZyb21BcGkpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShmb3VuZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGFzeW5jIFNjYW5NYXRjaChrZXl3b3JkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IG1hdGNoID0gYXdhaXQgdGhpcy5TY2FuVGl0bGUoa2V5d29yZCwgdGl0bGUpO1xyXG4gICAgICBpZiAobWF0Y2ggPCAwKSB7XHJcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuVGl0bGUoa2V5d29yZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXdvcmRzID0ga2V5d29yZC5zcGxpdCgvICsvZyk7XHJcbiAgICAgIGxldCBtYXRjaCA9IDA7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5d29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB3b3JkID0ga2V5d29yZHNbaV07XHJcbiAgICAgICAgaWYgKHRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMod29yZCkpIHtcclxuICAgICAgICAgIG1hdGNoKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpID09PSBrZXl3b3Jkcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0Y2ggPT09IGtleXdvcmRzLmxlbmd0aCkgcmVzb2x2ZShtYXRjaCk7XHJcbiAgICAgICAgICBlbHNlIHJlc29sdmUoLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==