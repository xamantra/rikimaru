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
            const fromApi = await media_search_1.MediaSearch.Find(id);
            if (local !== null && local !== undefined) {
                resolve(local);
            }
            else if (fromApi !== null && fromApi !== undefined) {
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
            const random = this.List[random_helper_1.Random.Range(0, this.List.length - 1)];
            resolve(random);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWUuY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9hbmltZS5jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGlEQUE2QztBQUM3QywwREFBc0Q7QUFFdEQsNERBQWtEO0FBQ2xELG1EQUErQztBQUcvQyxNQUFhLFVBQVU7SUFHZCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFhO1FBQ3RDLFVBQVUsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQ3pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwRCxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTt3QkFDN0MsMEJBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUU7NEJBQzlDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7NEJBQ2hELElBQUksTUFBTSxLQUFLLEtBQUs7Z0NBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzlDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN4QixDQUFDLENBQUMsQ0FBQztxQkFDSjt5QkFBTTt3QkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMs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IH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi9tZWRpYS5zZWFyY2hcIjtcclxuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcclxuaW1wb3J0IHVuaXF1ZSBmcm9tIFwiYXJyYXktdW5pcXVlXCI7XHJcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi9oZWxwZXJzL3JhbmRvbS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4uL2RhdGEvcXVldWUuZGF0YVwiO1xyXG5pbXBvcnQgeyBNZWRpYVN0YXR1cyB9IGZyb20gXCIuL21lZGlhLnN0YXR1c1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuaW1lQ2FjaGUge1xyXG4gIHByaXZhdGUgc3RhdGljIExpc3Q6IElNZWRpYVtdID0gW107XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgVXBkYXRlKGluZGV4OiBudW1iZXIpIHtcclxuICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5MaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBjb25zdCBsb2NhbCA9IHRoaXMuTGlzdFtpbmRleF07XHJcbiAgICAgICAgaWYgKGxvY2FsICE9PSBudWxsICYmIGxvY2FsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IGZyb21BcGkgPSBhd2FpdCBNZWRpYVNlYXJjaC5GaW5kKGxvY2FsLmlkTWFsKTtcclxuICAgICAgICAgIGlmIChmcm9tQXBpICE9PSBudWxsICYmIGZyb21BcGkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBBcnJheUhlbHBlci5yZW1vdmUodGhpcy5MaXN0LCBsb2NhbCwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKGZyb21BcGkuaWRNYWwpO1xyXG4gICAgICAgICAgICAgIGlmIChleGlzdHMgPT09IGZhbHNlKSB0aGlzLkxpc3QucHVzaChmcm9tQXBpKTtcclxuICAgICAgICAgICAgICB0aGlzLkNoZWNrKGluZGV4ICsgMSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5DaGVjayhpbmRleCArIDEpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLkNoZWNrKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLkNoZWNrKDApO1xyXG4gICAgICB9XHJcbiAgICB9LCAzMDAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc3RhdGljIEV4aXN0cyhpZDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBleGlzdGluZyA9IHRoaXMuTGlzdC5maW5kKHggPT4geC5pZE1hbCA9PT0gaWQpO1xyXG4gICAgICBpZiAoZXhpc3RpbmcgIT09IG51bGwgJiYgZXhpc3RpbmcgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgQ2hlY2soaW5kZXg6IG51bWJlcikge1xyXG4gICAgaWYgKGluZGV4ID09PSB0aGlzLkxpc3QubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLlVwZGF0ZSgwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuVXBkYXRlKGluZGV4ICsgMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEdldChpZDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SU1lZGlhPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGxvY2FsID0gdGhpcy5MaXN0LmZpbmQoeCA9PiB4LmlkTWFsID09PSBpZCk7XHJcbiAgICAgIGNvbnN0IGZyb21BcGkgPSBhd2FpdCBNZWRpYVNlYXJjaC5GaW5kKGlkKTtcclxuICAgICAgaWYgKGxvY2FsICE9PSBudWxsICYmIGxvY2FsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXNvbHZlKGxvY2FsKTtcclxuICAgICAgfSBlbHNlIGlmIChmcm9tQXBpICE9PSBudWxsICYmIGZyb21BcGkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKGZyb21BcGkuaWRNYWwpO1xyXG4gICAgICAgIGlmIChleGlzdHMgPT09IGZhbHNlKSB0aGlzLkxpc3QucHVzaChmcm9tQXBpKTtcclxuICAgICAgICBRdWV1ZURhdGEuU2V0UXVldWUoZnJvbUFwaSk7XHJcbiAgICAgICAgcmVzb2x2ZShmcm9tQXBpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgR2V0UmFuZG9tKCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCByYW5kb20gPSB0aGlzLkxpc3RbUmFuZG9tLlJhbmdlKDAsIHRoaXMuTGlzdC5sZW5ndGggLSAxKV07XHJcbiAgICAgIHJlc29sdmUocmFuZG9tKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBTZWFyY2goa2V5d29yZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SU1lZGlhW10+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgZm91bmQ6IElNZWRpYVtdID0gW107XHJcbiAgICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuTGlzdC5sZW5ndGg7XHJcbiAgICAgIGlmIChsZW5ndGggPT09IDApIHtcclxuICAgICAgICBjb25zdCBmcm9tQXBpID0gYXdhaXQgTWVkaWFTZWFyY2guQWxsKGtleXdvcmQpO1xyXG4gICAgICAgIHRoaXMuTGlzdC5jb25jYXQoZnJvbUFwaSk7XHJcbiAgICAgICAgcmVzb2x2ZShmcm9tQXBpKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgYW5pbWUgPSB0aGlzLkxpc3RbaV07XHJcbiAgICAgICAgY29uc3QgZW5nbGlzaCA9IGFuaW1lLnRpdGxlLmVuZ2xpc2g7XHJcbiAgICAgICAgY29uc3Qgcm9tYWppID0gYW5pbWUudGl0bGUucm9tYWppO1xyXG4gICAgICAgIGxldCBtZWRpYTogSU1lZGlhID0gbnVsbDtcclxuICAgICAgICBpZiAoZW5nbGlzaCAhPT0gbnVsbCAmJiBlbmdsaXNoICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIGNvbnN0IG1hdGNoID0gYXdhaXQgdGhpcy5TY2FuTWF0Y2goa2V5d29yZCwgZW5nbGlzaCk7XHJcbiAgICAgICAgICBpZiAobWF0Y2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbWVkaWEgPSBhbmltZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvbWFqaSAhPT0gbnVsbCAmJiByb21hamkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29uc3QgbWF0Y2ggPSBhd2FpdCB0aGlzLlNjYW5NYXRjaChrZXl3b3JkLCByb21hamkpO1xyXG4gICAgICAgICAgaWYgKG1hdGNoID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIG1lZGlhID0gYW5pbWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtZWRpYSAhPT0gbnVsbCkgZm91bmQucHVzaChtZWRpYSk7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIGlmIChmb3VuZC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29uc3QgYXBpUmVzdWx0ID0gYXdhaXQgTWVkaWFTZWFyY2guQWxsKGtleXdvcmQpO1xyXG4gICAgICAgICAgICBpZiAoYXBpUmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGFwaVJlc3VsdC5sZW5ndGg7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbUFwaSA9IGFwaVJlc3VsdFt4XTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKGZyb21BcGkuaWRNYWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0cyA9PT0gZmFsc2UpIHRoaXMuTGlzdC5wdXNoKGZyb21BcGkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHggPT09IGFwaVJlc3VsdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXBpUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZShmb3VuZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZm91bmQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuTWF0Y2goa2V5d29yZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBtYXRjaCA9IGF3YWl0IHRoaXMuU2NhblRpdGxlKGtleXdvcmQsIHRpdGxlKTtcclxuICAgICAgaWYgKG1hdGNoIDwgMCkge1xyXG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgU2NhblRpdGxlKGtleXdvcmQ6IHN0cmluZywgdGl0bGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBrZXl3b3JkcyA9IGtleXdvcmQuc3BsaXQoLyArL2cpO1xyXG4gICAgICBsZXQgbWF0Y2ggPSAwO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXdvcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgd29yZCA9IGtleXdvcmRzW2ldO1xyXG4gICAgICAgIGlmICh0aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHdvcmQpKSB7XHJcbiAgICAgICAgICBtYXRjaCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA9PT0ga2V5d29yZHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdGNoID09PSBrZXl3b3Jkcy5sZW5ndGgpIHJlc29sdmUobWF0Y2gpO1xyXG4gICAgICAgICAgZWxzZSByZXNvbHZlKC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=