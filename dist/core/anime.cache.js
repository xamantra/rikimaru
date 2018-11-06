"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./media.search");
const array_helper_1 = require("../helpers/array.helper");
const random_helper_1 = require("../helpers/random.helper");
const queue_data_1 = require("../data/queue.data");
class AnimeCache {
    static async Update(index) {
        setTimeout(async () => {
            if (this.List.length > 0) {
                const local = this.List[index];
                if (local !== null && local !== undefined) {
                    const fromApi = await media_search_1.MediaSearch.Find(local.idMal);
                    if (fromApi !== null && fromApi !== undefined) {
                        array_helper_1.ArrayHelper.remove(this.List, local, async () => {
                            const exists = await this.Exists(fromApi.idMal);
                            if (exists === false)
                                this.List.push(fromApi);
                            this.Check(index + 1);
                        });
                    }
                    else {
                        this.Check(index + 1);
                    }
                }
                else {
                    this.Check(0);
                }
            }
            else {
                this.Check(0);
            }
        }, 3000);
    }
    static Exists(id) {
        return new Promise((resolve, reject) => {
            const existing = this.List.find(x => x.idMal === id);
            if (existing !== null && existing !== undefined) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
    static Check(index) {
        if (index === this.List.length - 1) {
            this.Update(0);
        }
        else {
            this.Update(index + 1);
        }
    }
    static async Get(id) {
        return new Promise(async (resolve, reject) => {
            const local = this.List.find(x => x.idMal === id);
            let fromApi = null;
            if (local !== null && local !== undefined) {
                resolve(local);
            }
            else if (fromApi !== null && fromApi !== undefined) {
                fromApi = await media_search_1.MediaSearch.Find(id);
                const exists = await this.Exists(fromApi.idMal);
                if (exists === false)
                    this.List.push(fromApi);
                queue_data_1.QueueData.SetQueue(fromApi);
                resolve(fromApi);
            }
            else {
                resolve(null);
            }
        });
    }
    static GetRandom() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                const random = this.List[random_helper_1.Random.Range(0, this.List.length - 1)];
                if (random !== null && random !== undefined)
                    resolve(random);
            }, 1);
        });
    }
    static async Search(keyword) {
        return new Promise(async (resolve, reject) => {
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
                        const apiResult = await media_search_1.MediaSearch.All(keyword);
                        if (apiResult.length > 0) {
                            for (let x = 0; x < apiResult.length; x++) {
                                const fromApi = apiResult[x];
                                const exists = await this.Exists(fromApi.idMal);
                                if (exists === false)
                                    this.List.push(fromApi);
                                if (x === apiResult.length - 1) {
                                    resolve(apiResult);
                                }
                            }
                        }
                        else {
                            resolve(found);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWUuY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9hbmltZS5jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGlEQUE2QztBQUM3QywwREFBc0Q7QUFFdEQsNERBQWtEO0FBQ2xELG1EQUErQztBQUcvQyxNQUFhLFVBQVU7SUFHZCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFhO1FBQ3RDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwRCxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTt3QkFDN0MsMEJBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUU7NEJBQzlDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2hELElBQUksTUFBTSxLQUFLLEtBQUs7Z0NBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQztxQkFDSjt5QkFBTTt3QkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMs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QUMsQ0FBQyxDQUFDO2lCQUNsQjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXBKYyxlQUFJLEdBQWEsRUFBRSxDQUFDO0FBRHJDLGdDQXNKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4vbWVkaWEuc2VhcmNoXCI7XHJcbmltcG9ydCB7IEFycmF5SGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvYXJyYXkuaGVscGVyXCI7XHJcbmltcG9ydCB1bmlxdWUgZnJvbSBcImFycmF5LXVuaXF1ZVwiO1xyXG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XHJcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLi9kYXRhL3F1ZXVlLmRhdGFcIjtcclxuaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi9tZWRpYS5zdGF0dXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltZUNhY2hlIHtcclxuICBwcml2YXRlIHN0YXRpYyBMaXN0OiBJTWVkaWFbXSA9IFtdO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIFVwZGF0ZShpbmRleDogbnVtYmVyKSB7XHJcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWwgPSB0aGlzLkxpc3RbaW5kZXhdO1xyXG4gICAgICAgIGlmIChsb2NhbCAhPT0gbnVsbCAmJiBsb2NhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb25zdCBmcm9tQXBpID0gYXdhaXQgTWVkaWFTZWFyY2guRmluZChsb2NhbC5pZE1hbCk7XHJcbiAgICAgICAgICBpZiAoZnJvbUFwaSAhPT0gbnVsbCAmJiBmcm9tQXBpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgQXJyYXlIZWxwZXIucmVtb3ZlKHRoaXMuTGlzdCwgbG9jYWwsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCB0aGlzLkV4aXN0cyhmcm9tQXBpLmlkTWFsKTtcclxuICAgICAgICAgICAgICBpZiAoZXhpc3RzID09PSBmYWxzZSkgdGhpcy5MaXN0LnB1c2goZnJvbUFwaSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5DaGVjayhpbmRleCArIDEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hlY2soaW5kZXggKyAxKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5DaGVjaygwKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5DaGVjaygwKTtcclxuICAgICAgfVxyXG4gICAgfSwgMzAwMCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBFeGlzdHMoaWQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGJvb2xlYW4+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLkxpc3QuZmluZCh4ID0+IHguaWRNYWwgPT09IGlkKTtcclxuICAgICAgaWYgKGV4aXN0aW5nICE9PSBudWxsICYmIGV4aXN0aW5nICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIENoZWNrKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmIChpbmRleCA9PT0gdGhpcy5MaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5VcGRhdGUoMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLlVwZGF0ZShpbmRleCArIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBHZXQoaWQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBsb2NhbCA9IHRoaXMuTGlzdC5maW5kKHggPT4geC5pZE1hbCA9PT0gaWQpO1xyXG4gICAgICBsZXQgZnJvbUFwaTogSU1lZGlhID0gbnVsbDtcclxuICAgICAgaWYgKGxvY2FsICE9PSBudWxsICYmIGxvY2FsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXNvbHZlKGxvY2FsKTtcclxuICAgICAgfSBlbHNlIGlmIChmcm9tQXBpICE9PSBudWxsICYmIGZyb21BcGkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGZyb21BcGkgPSBhd2FpdCBNZWRpYVNlYXJjaC5GaW5kKGlkKTtcclxuICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCB0aGlzLkV4aXN0cyhmcm9tQXBpLmlkTWFsKTtcclxuICAgICAgICBpZiAoZXhpc3RzID09PSBmYWxzZSkgdGhpcy5MaXN0LnB1c2goZnJvbUFwaSk7XHJcbiAgICAgICAgUXVldWVEYXRhLlNldFF1ZXVlKGZyb21BcGkpO1xyXG4gICAgICAgIHJlc29sdmUoZnJvbUFwaSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIEdldFJhbmRvbSgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJTWVkaWE+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJhbmRvbSA9IHRoaXMuTGlzdFtSYW5kb20uUmFuZ2UoMCwgdGhpcy5MaXN0Lmxlbmd0aCAtIDEpXTtcclxuICAgICAgICBpZiAocmFuZG9tICE9PSBudWxsICYmIHJhbmRvbSAhPT0gdW5kZWZpbmVkKSByZXNvbHZlKHJhbmRvbSk7XHJcbiAgICAgIH0sIDEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIFNlYXJjaChrZXl3b3JkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJTWVkaWFbXT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBmb3VuZDogSU1lZGlhW10gPSBbXTtcclxuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5MaXN0Lmxlbmd0aDtcclxuICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IGZyb21BcGkgPSBhd2FpdCBNZWRpYVNlYXJjaC5BbGwoa2V5d29yZCk7XHJcbiAgICAgICAgdGhpcy5MaXN0LmNvbmNhdChmcm9tQXBpKTtcclxuICAgICAgICByZXNvbHZlKGZyb21BcGkpO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmltZSA9IHRoaXMuTGlzdFtpXTtcclxuICAgICAgICBjb25zdCBlbmdsaXNoID0gYW5pbWUudGl0bGUuZW5nbGlzaDtcclxuICAgICAgICBjb25zdCByb21hamkgPSBhbmltZS50aXRsZS5yb21hamk7XHJcbiAgICAgICAgbGV0IG1lZGlhOiBJTWVkaWEgPSBudWxsO1xyXG4gICAgICAgIGlmIChlbmdsaXNoICE9PSBudWxsICYmIGVuZ2xpc2ggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29uc3QgbWF0Y2ggPSBhd2FpdCB0aGlzLlNjYW5NYXRjaChrZXl3b3JkLCBlbmdsaXNoKTtcclxuICAgICAgICAgIGlmIChtYXRjaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBtZWRpYSA9IGFuaW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm9tYWppICE9PSBudWxsICYmIHJvbWFqaSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb25zdCBtYXRjaCA9IGF3YWl0IHRoaXMuU2Nhbk1hdGNoKGtleXdvcmQsIHJvbWFqaSk7XHJcbiAgICAgICAgICBpZiAobWF0Y2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbWVkaWEgPSBhbmltZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1lZGlhICE9PSBudWxsKSBmb3VuZC5wdXNoKG1lZGlhKTtcclxuICAgICAgICBpZiAoaSA9PT0gbGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBhcGlSZXN1bHQgPSBhd2FpdCBNZWRpYVNlYXJjaC5BbGwoa2V5d29yZCk7XHJcbiAgICAgICAgICAgIGlmIChhcGlSZXN1bHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgYXBpUmVzdWx0Lmxlbmd0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmcm9tQXBpID0gYXBpUmVzdWx0W3hdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RzID0gYXdhaXQgdGhpcy5FeGlzdHMoZnJvbUFwaS5pZE1hbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RzID09PSBmYWxzZSkgdGhpcy5MaXN0LnB1c2goZnJvbUFwaSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeCA9PT0gYXBpUmVzdWx0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhcGlSZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXNvbHZlKGZvdW5kKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShmb3VuZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIGFzeW5jIFNjYW5NYXRjaChrZXl3b3JkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IG1hdGNoID0gYXdhaXQgdGhpcy5TY2FuVGl0bGUoa2V5d29yZCwgdGl0bGUpO1xyXG4gICAgICBpZiAobWF0Y2ggPCAwKSB7XHJcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuVGl0bGUoa2V5d29yZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleXdvcmRzID0ga2V5d29yZC5zcGxpdCgvICsvZyk7XHJcbiAgICAgIGxldCBtYXRjaCA9IDA7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5d29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCB3b3JkID0ga2V5d29yZHNbaV07XHJcbiAgICAgICAgaWYgKHRpdGxlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMod29yZCkpIHtcclxuICAgICAgICAgIG1hdGNoKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpID09PSBrZXl3b3Jkcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICBpZiAobWF0Y2ggPT09IGtleXdvcmRzLmxlbmd0aCkgcmVzb2x2ZShtYXRjaCk7XHJcbiAgICAgICAgICBlbHNlIHJlc29sdmUoLTEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==