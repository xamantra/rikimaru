"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./media.search");
const array_helper_1 = require("../helpers/array.helper");
const random_helper_1 = require("../helpers/random.helper");
const title_helper_1 = require("../helpers/title.helper");
const media_status_1 = require("./media.status");
const config_1 = require("./config");
const null_checker_helper_1 = require("../helpers/null.checker.helper");
class AnimeCache {
    static async Update(index = 0) {
        setTimeout(async () => {
            if (this.List.length > 0) {
                const fromCache = this.List[index];
                // we only update the "cached anime" if it is NOT competed.
                if (!media_status_1.MediaStatus.Completed(fromCache)) {
                    const fromApi = await media_search_1.MediaSearch.Find(fromCache.idMal);
                    if (null_checker_helper_1.NullCheck.Fine(fromApi)) {
                        array_helper_1.ArrayHelper.remove(this.List, fromCache, async () => {
                            const exists = await this.Exists(fromApi.idMal);
                            if (exists === false) {
                                this.List.push(fromApi);
                                this.Check(index);
                            }
                            else {
                                this.Check(index);
                            }
                        });
                    }
                    else {
                        this.Check(index);
                    }
                }
                else {
                    this.Check(index);
                }
            }
            else {
                this.Check(0);
            }
        }, config_1.Config.CACHE_UPDATE_INTERVAL);
    }
    static Check(index) {
        if (index === this.List.length - 1) {
            this.Update(0);
        }
        else {
            this.Update(index + 1);
        }
    }
    static Exists(id) {
        return new Promise((resolve, reject) => {
            const anime = this.List.find(x => x.idMal === id);
            if (anime !== null && anime !== undefined) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    static async Get(id) {
        return new Promise(async (resolve, reject) => {
            const local = this.List.find(x => x.idMal === id);
            if (local !== null && local !== undefined) {
                resolve(local);
            }
            else {
                const fromApi = await media_search_1.MediaSearch.Find(id);
                const exists = await this.Exists(fromApi.idMal);
                if (exists === false)
                    this.List.push(fromApi);
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
            const found = [];
            const length = this.List.length;
            if (length === 0) {
                const apiResult = await media_search_1.MediaSearch.All(keyword);
                if (apiResult.length === 0) {
                    resolve(found);
                    return;
                }
                for (let x = 0; x < apiResult.length; x++) {
                    const fromApi = apiResult[x];
                    const exists = await this.Exists(fromApi.idMal);
                    if (exists === false)
                        this.List.push(fromApi);
                    if (x === apiResult.length - 1)
                        resolve(apiResult);
                }
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
                        const apiResult = await media_search_1.MediaSearch.All(keyword);
                        if (apiResult.length === 0) {
                            resolve(found);
                        }
                        for (let x = 0; x < apiResult.length; x++) {
                            const fromApi = apiResult[x];
                            const exists = await this.Exists(fromApi.idMal);
                            if (exists === false)
                                this.List.push(fromApi);
                            if (x === apiResult.length - 1)
                                resolve(apiResult);
                        }
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
            const titleMatch = await this.ScanTitle(keyword, title);
            const acroMatch = await this.ScanAcro(keyword, title);
            if (titleMatch) {
                resolve(titleMatch);
            }
            else if (acroMatch) {
                resolve(acroMatch);
            }
            else {
                resolve(false);
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
                    if (match === keyword.length) {
                        resolve(true);
                        return;
                    }
                    resolve(false);
                }
            }
        });
    }
    static async ScanAcro(keyword, title) {
        return new Promise((resolve, reject) => {
            const titleWords = title.toLowerCase().split(/ +/g);
            // acronym doesn't have space.
            if (keyword.includes(" ")) {
                resolve(false);
                return;
            }
            const acronym = keyword.replace(".", "").toLowerCase();
            let acroTitle = "";
            for (let i = 0; i < titleWords.length; i++) {
                const word = titleWords[i];
                acroTitle += `${word[0]}`;
            }
            if (acroTitle.includes(acronym)) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    static Log() {
        for (let i = 0; i < this.List.length; i++) {
            const anime = this.List[i];
            const title = title_helper_1.TitleHelper.Get(anime.title);
            const id = anime.id;
            const malId = anime.idMal;
            const episodes = anime.episodes;
            console.log(`${i + 1}. Ids:[${id}, ${malId}], "${title}", ${episodes} episodes.`);
        }
    }
}
AnimeCache.List = [];
exports.AnimeCache = AnimeCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWUuY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9hbmltZS5jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGlEQUE2QztBQUM3QywwREFBc0Q7QUFDdEQsNERBQWtEO0FBQ2xELDBEQUFzRDtBQUN0RCxpREFBNkM7QUFDN0MscUNBQWtDO0FBQ2xDLHdFQUEyRDtBQUUzRCxNQUFhLFVBQVU7SUFHZCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFnQixDQUFDO1FBQzFDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkMsMkRBQTJEO2dCQUMzRCxJQUFJLENBQUMsMEJBQVcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3JDLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4RCxJQUFJLCtCQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUMzQiwwQkFBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLElBQUksRUFBRTs0QkFDbEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDaEQsSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFFO2dDQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDbkI7aUNBQU07Z0NBQ0wsSUFBSSxDQUFD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XCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuL21lZGlhLnNlYXJjaFwiO1xuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi9oZWxwZXJzL3JhbmRvbS5oZWxwZXJcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBNZWRpYVN0YXR1cyB9IGZyb20gXCIuL21lZGlhLnN0YXR1c1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBOdWxsQ2hlY2sgfSBmcm9tIFwiLi4vaGVscGVycy9udWxsLmNoZWNrZXIuaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBBbmltZUNhY2hlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgTGlzdDogSU1lZGlhW10gPSBbXTtcblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIFVwZGF0ZShpbmRleDogbnVtYmVyID0gMCkge1xuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGZyb21DYWNoZSA9IHRoaXMuTGlzdFtpbmRleF07XG4gICAgICAgIC8vIHdlIG9ubHkgdXBkYXRlIHRoZSBcImNhY2hlZCBhbmltZVwiIGlmIGl0IGlzIE5PVCBjb21wZXRlZC5cbiAgICAgICAgaWYgKCFNZWRpYVN0YXR1cy5Db21wbGV0ZWQoZnJvbUNhY2hlKSkge1xuICAgICAgICAgIGNvbnN0IGZyb21BcGkgPSBhd2FpdCBNZWRpYVNlYXJjaC5GaW5kKGZyb21DYWNoZS5pZE1hbCk7XG4gICAgICAgICAgaWYgKE51bGxDaGVjay5GaW5lKGZyb21BcGkpKSB7XG4gICAgICAgICAgICBBcnJheUhlbHBlci5yZW1vdmUodGhpcy5MaXN0LCBmcm9tQ2FjaGUsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMoZnJvbUFwaS5pZE1hbCk7XG4gICAgICAgICAgICAgIGlmIChleGlzdHMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5MaXN0LnB1c2goZnJvbUFwaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpbmRleCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpbmRleCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLkNoZWNrKGluZGV4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5DaGVjayhpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuQ2hlY2soMCk7XG4gICAgICB9XG4gICAgfSwgQ29uZmlnLkNBQ0hFX1VQREFURV9JTlRFUlZBTCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBDaGVjayhpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKGluZGV4ID09PSB0aGlzLkxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5VcGRhdGUoMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuVXBkYXRlKGluZGV4ICsgMSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgRXhpc3RzKGlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgYW5pbWUgPSB0aGlzLkxpc3QuZmluZCh4ID0+IHguaWRNYWwgPT09IGlkKTtcbiAgICAgIGlmIChhbmltZSAhPT0gbnVsbCAmJiBhbmltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgR2V0KGlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SU1lZGlhPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBsb2NhbCA9IHRoaXMuTGlzdC5maW5kKHggPT4geC5pZE1hbCA9PT0gaWQpO1xuICAgICAgaWYgKGxvY2FsICE9PSBudWxsICYmIGxvY2FsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVzb2x2ZShsb2NhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmcm9tQXBpID0gYXdhaXQgTWVkaWFTZWFyY2guRmluZChpZCk7XG4gICAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKGZyb21BcGkuaWRNYWwpO1xuICAgICAgICBpZiAoZXhpc3RzID09PSBmYWxzZSkgdGhpcy5MaXN0LnB1c2goZnJvbUFwaSk7XG4gICAgICAgIHJlc29sdmUoZnJvbUFwaSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEdldFJhbmRvbSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SU1lZGlhPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuaW1lID0gdGhpcy5MaXN0W1JhbmRvbS5SYW5nZSgwLCB0aGlzLkxpc3QubGVuZ3RoIC0gMSldO1xuICAgICAgICBpZiAoYW5pbWUgIT09IG51bGwgJiYgYW5pbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJlc29sdmUoYW5pbWUpO1xuICAgICAgICB9XG4gICAgICB9LCAxKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgU2VhcmNoKGtleXdvcmQ6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJTWVkaWFbXT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZm91bmQ6IElNZWRpYVtdID0gW107XG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLkxpc3QubGVuZ3RoO1xuICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zdCBhcGlSZXN1bHQgPSBhd2FpdCBNZWRpYVNlYXJjaC5BbGwoa2V5d29yZCk7XG4gICAgICAgIGlmIChhcGlSZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmVzb2x2ZShmb3VuZCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgYXBpUmVzdWx0Lmxlbmd0aDsgeCsrKSB7XG4gICAgICAgICAgY29uc3QgZnJvbUFwaSA9IGFwaVJlc3VsdFt4XTtcbiAgICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCB0aGlzLkV4aXN0cyhmcm9tQXBpLmlkTWFsKTtcbiAgICAgICAgICBpZiAoZXhpc3RzID09PSBmYWxzZSkgdGhpcy5MaXN0LnB1c2goZnJvbUFwaSk7XG4gICAgICAgICAgaWYgKHggPT09IGFwaVJlc3VsdC5sZW5ndGggLSAxKSByZXNvbHZlKGFwaVJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYW5pbWUgPSB0aGlzLkxpc3RbaV07XG4gICAgICAgIGNvbnN0IGVuZ2xpc2ggPSBhbmltZS50aXRsZS5lbmdsaXNoO1xuICAgICAgICBjb25zdCByb21hamkgPSBhbmltZS50aXRsZS5yb21hamk7XG4gICAgICAgIGxldCBtZWRpYTogSU1lZGlhID0gbnVsbDtcbiAgICAgICAgaWYgKGVuZ2xpc2ggIT09IG51bGwgJiYgZW5nbGlzaCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgY29uc3QgbWF0Y2ggPSBhd2FpdCB0aGlzLlNjYW5NYXRjaChrZXl3b3JkLCBlbmdsaXNoKTtcbiAgICAgICAgICBpZiAobWF0Y2ggPT09IHRydWUpIHtcbiAgICAgICAgICAgIG1lZGlhID0gYW5pbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyb21hamkgIT09IG51bGwgJiYgcm9tYWppICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb25zdCBtYXRjaCA9IGF3YWl0IHRoaXMuU2Nhbk1hdGNoKGtleXdvcmQsIHJvbWFqaSk7XG4gICAgICAgICAgaWYgKG1hdGNoID09PSB0cnVlKSB7XG4gICAgICAgICAgICBtZWRpYSA9IGFuaW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVkaWEgIT09IG51bGwpIGZvdW5kLnB1c2gobWVkaWEpO1xuICAgICAgICBpZiAoaSA9PT0gbGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGlmIChmb3VuZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGFwaVJlc3VsdCA9IGF3YWl0IE1lZGlhU2VhcmNoLkFsbChrZXl3b3JkKTtcbiAgICAgICAgICAgIGlmIChhcGlSZXN1bHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoZm91bmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBhcGlSZXN1bHQubGVuZ3RoOyB4KyspIHtcbiAgICAgICAgICAgICAgY29uc3QgZnJvbUFwaSA9IGFwaVJlc3VsdFt4XTtcbiAgICAgICAgICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMoZnJvbUFwaS5pZE1hbCk7XG4gICAgICAgICAgICAgIGlmIChleGlzdHMgPT09IGZhbHNlKSB0aGlzLkxpc3QucHVzaChmcm9tQXBpKTtcbiAgICAgICAgICAgICAgaWYgKHggPT09IGFwaVJlc3VsdC5sZW5ndGggLSAxKSByZXNvbHZlKGFwaVJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoZm91bmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgU2Nhbk1hdGNoKGtleXdvcmQ6IHN0cmluZywgdGl0bGU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB0aXRsZU1hdGNoID0gYXdhaXQgdGhpcy5TY2FuVGl0bGUoa2V5d29yZCwgdGl0bGUpO1xuICAgICAgY29uc3QgYWNyb01hdGNoID0gYXdhaXQgdGhpcy5TY2FuQWNybyhrZXl3b3JkLCB0aXRsZSk7XG4gICAgICBpZiAodGl0bGVNYXRjaCkge1xuICAgICAgICByZXNvbHZlKHRpdGxlTWF0Y2gpO1xuICAgICAgfSBlbHNlIGlmIChhY3JvTWF0Y2gpIHtcbiAgICAgICAgcmVzb2x2ZShhY3JvTWF0Y2gpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuVGl0bGUoa2V5d29yZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGtleXdvcmRzID0ga2V5d29yZC5zcGxpdCgvICsvZyk7XG4gICAgICBsZXQgbWF0Y2ggPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXl3b3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3b3JkID0ga2V5d29yZHNbaV07XG4gICAgICAgIGlmICh0aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHdvcmQpKSB7XG4gICAgICAgICAgbWF0Y2grKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0ga2V5d29yZHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGlmIChtYXRjaCA9PT0ga2V5d29yZC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuQWNybyhrZXl3b3JkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdGl0bGVXb3JkcyA9IHRpdGxlLnRvTG93ZXJDYXNlKCkuc3BsaXQoLyArL2cpO1xuICAgICAgLy8gYWNyb255bSBkb2Vzbid0IGhhdmUgc3BhY2UuXG4gICAgICBpZiAoa2V5d29yZC5pbmNsdWRlcyhcIiBcIikpIHtcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGFjcm9ueW0gPSBrZXl3b3JkLnJlcGxhY2UoXCIuXCIsIFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBsZXQgYWNyb1RpdGxlID0gXCJcIjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGl0bGVXb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB3b3JkID0gdGl0bGVXb3Jkc1tpXTtcbiAgICAgICAgYWNyb1RpdGxlICs9IGAke3dvcmRbMF19YDtcbiAgICAgIH1cbiAgICAgIGlmIChhY3JvVGl0bGUuaW5jbHVkZXMoYWNyb255bSkpIHtcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBMb2coKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGFuaW1lID0gdGhpcy5MaXN0W2ldO1xuICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQoYW5pbWUudGl0bGUpO1xuICAgICAgY29uc3QgaWQgPSBhbmltZS5pZDtcbiAgICAgIGNvbnN0IG1hbElkID0gYW5pbWUuaWRNYWw7XG4gICAgICBjb25zdCBlcGlzb2RlcyA9IGFuaW1lLmVwaXNvZGVzO1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGAke2kgKyAxfS4gSWRzOlske2lkfSwgJHttYWxJZH1dLCBcIiR7dGl0bGV9XCIsICR7ZXBpc29kZXN9IGVwaXNvZGVzLmBcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=