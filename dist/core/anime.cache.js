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
            const fromApi = await media_search_1.MediaSearch.Find(id);
            if (local !== null && local !== undefined) {
                resolve(local);
            }
            else if (fromApi !== null && fromApi !== undefined) {
                this.List.push(fromApi);
                array_unique_1.default(this.List);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWUuY2FjaGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9hbmltZS5jYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGlEQUE2QztBQUM3QywwREFBc0Q7QUFFdEQsZ0VBQWtDO0FBRWxDLE1BQWEsVUFBVTtJQUdkLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQWE7UUFDdEMsc0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ3BCLHNCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtvQkFDN0MsMEJBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFO3dCQUN4QyxzQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFCLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2hCO2dCQUNELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3hCO2FBQ0Y7UUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBVTtRQUNoQyxPQUFPLElBQUksT0FBTyxDQUFTLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkQsc0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sT0FBTyxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQjtpQkFBTSxJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3hCLHNCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFlO1FBQ3hDLE9BQU8sSUFBSSxPQUFPLENBQVcsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyRCxzQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7WUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDaEMsSUFBSSxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixNQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDMUIsc0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsQjtZQUNELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUNwQyxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDbEMsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDO2dCQUN6QixJQUFJLE9BQU8sS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLFNBQVMsRUFBRTtvQkFDN0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDckQsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO3dCQUNsQixLQUFLLEdBQUcsS0FBSyxDQUFDO3FCQUNmO2lCQUNGO2dCQUNELElBQUksTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO29CQUMzQyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNwRCxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7d0JBQ2xCLEtBQUssR0FBRyxLQUFLLENBQUM7cUJBQ2Y7aUJBQ0Y7Z0JBQ0QsSUFBSSxLQUFLLEtBQUssSUFBSTtvQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsS0FBSyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNwQixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO3dCQUN0QixNQUFNLE9BQU8sR0FBRyxNQUFNLDBCQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0QyxzQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNsQjt5QkFBTTt3QkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ2hCO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlLEVBQUUsS0FBYTtRQUMzRCxPQUFPLElBQUksT0FBTyxDQUFVLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDcEQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBZSxFQUFFLEtBQWE7UUFDM0QsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3QyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN4QyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdEMsS0FBSyxFQUFFLENBQUM7aUJBQ1Q7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzdCLElBQUksS0FBSyxLQUFLLFFBQVEsQ0FBQyxNQUFNO3dCQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7d0JBQ3pDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQWhIYyxlQUFJLEdBQWEsRUFBRSxDQUFDO0FBRHJDLGdDQWtIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4vbWVkaWEuc2VhcmNoXCI7XHJcbmltcG9ydCB7IEFycmF5SGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvYXJyYXkuaGVscGVyXCI7XHJcbmltcG9ydCB7IE1lZGlhIH0gZnJvbSBcIi4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcclxuaW1wb3J0IHVuaXF1ZSBmcm9tIFwiYXJyYXktdW5pcXVlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pbWVDYWNoZSB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgTGlzdDogSU1lZGlhW10gPSBbXTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBVcGRhdGUoaW5kZXg6IG51bWJlcikge1xyXG4gICAgdW5pcXVlKHRoaXMuTGlzdCk7XHJcbiAgICBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgdW5pcXVlKHRoaXMuTGlzdCk7XHJcbiAgICAgIGNvbnN0IGxvY2FsID0gdGhpcy5MaXN0W2luZGV4XTtcclxuICAgICAgaWYgKHRoaXMuTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY29uc3QgZnJvbUFwaSA9IGF3YWl0IE1lZGlhU2VhcmNoLkZpbmQobG9jYWwuaWRNYWwpO1xyXG4gICAgICAgIGlmIChmcm9tQXBpICE9PSBudWxsICYmIGZyb21BcGkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgQXJyYXlIZWxwZXIucmVtb3ZlKHRoaXMuTGlzdCwgbG9jYWwsICgpID0+IHtcclxuICAgICAgICAgICAgdW5pcXVlKHRoaXMuTGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuTGlzdC5wdXNoKGZyb21BcGkpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuVXBkYXRlKDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPT09IHRoaXMuTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICB0aGlzLlVwZGF0ZSgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5VcGRhdGUoaW5kZXggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIDEwMDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBHZXQoaWQ6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB1bmlxdWUodGhpcy5MaXN0KTtcclxuICAgICAgY29uc3QgbG9jYWwgPSB0aGlzLkxpc3QuZmluZCh4ID0+IHguaWRNYWwgPT09IGlkKTtcclxuICAgICAgY29uc3QgZnJvbUFwaSA9IGF3YWl0IE1lZGlhU2VhcmNoLkZpbmQoaWQpO1xyXG4gICAgICBpZiAobG9jYWwgIT09IG51bGwgJiYgbG9jYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlc29sdmUobG9jYWwpO1xyXG4gICAgICB9IGVsc2UgaWYgKGZyb21BcGkgIT09IG51bGwgJiYgZnJvbUFwaSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5MaXN0LnB1c2goZnJvbUFwaSk7XHJcbiAgICAgICAgdW5pcXVlKHRoaXMuTGlzdCk7XHJcbiAgICAgICAgcmVzb2x2ZShmcm9tQXBpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgU2VhcmNoKGtleXdvcmQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYVtdPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHVuaXF1ZSh0aGlzLkxpc3QpO1xyXG4gICAgICBjb25zdCBmb3VuZDogSU1lZGlhW10gPSBbXTtcclxuICAgICAgY29uc3QgbGVuZ3RoID0gdGhpcy5MaXN0Lmxlbmd0aDtcclxuICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGNvbnN0IGZyb21BcGkgPSBhd2FpdCBNZWRpYVNlYXJjaC5BbGwoa2V5d29yZCk7XHJcbiAgICAgICAgdGhpcy5MaXN0LmNvbmNhdChmcm9tQXBpKTtcclxuICAgICAgICB1bmlxdWUodGhpcy5MaXN0KTtcclxuICAgICAgICByZXNvbHZlKGZyb21BcGkpO1xyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBhbmltZSA9IHRoaXMuTGlzdFtpXTtcclxuICAgICAgICBjb25zdCBlbmdsaXNoID0gYW5pbWUudGl0bGUuZW5nbGlzaDtcclxuICAgICAgICBjb25zdCByb21hamkgPSBhbmltZS50aXRsZS5yb21hamk7XHJcbiAgICAgICAgbGV0IG1lZGlhOiBJTWVkaWEgPSBudWxsO1xyXG4gICAgICAgIGlmIChlbmdsaXNoICE9PSBudWxsICYmIGVuZ2xpc2ggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgY29uc3QgbWF0Y2ggPSBhd2FpdCB0aGlzLlNjYW5NYXRjaChrZXl3b3JkLCBlbmdsaXNoKTtcclxuICAgICAgICAgIGlmIChtYXRjaCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBtZWRpYSA9IGFuaW1lO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm9tYWppICE9PSBudWxsICYmIHJvbWFqaSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBjb25zdCBtYXRjaCA9IGF3YWl0IHRoaXMuU2Nhbk1hdGNoKGtleXdvcmQsIHJvbWFqaSk7XHJcbiAgICAgICAgICBpZiAobWF0Y2ggPT09IHRydWUpIHtcclxuICAgICAgICAgICAgbWVkaWEgPSBhbmltZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG1lZGlhICE9PSBudWxsKSBmb3VuZC5wdXNoKG1lZGlhKTtcclxuICAgICAgICBpZiAoaSA9PT0gbGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgaWYgKGZvdW5kLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBmcm9tQXBpID0gYXdhaXQgTWVkaWFTZWFyY2guQWxsKGtleXdvcmQpO1xyXG4gICAgICAgICAgICB0aGlzLkxpc3QgPSB0aGlzLkxpc3QuY29uY2F0KGZyb21BcGkpO1xyXG4gICAgICAgICAgICB1bmlxdWUodGhpcy5MaXN0KTtcclxuICAgICAgICAgICAgcmVzb2x2ZShmcm9tQXBpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZm91bmQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBTY2FuTWF0Y2goa2V5d29yZDogc3RyaW5nLCB0aXRsZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBtYXRjaCA9IGF3YWl0IHRoaXMuU2NhblRpdGxlKGtleXdvcmQsIHRpdGxlKTtcclxuICAgICAgaWYgKG1hdGNoIDwgMCkge1xyXG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWMgYXN5bmMgU2NhblRpdGxlKGtleXdvcmQ6IHN0cmluZywgdGl0bGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBrZXl3b3JkcyA9IGtleXdvcmQuc3BsaXQoLyArL2cpO1xyXG4gICAgICBsZXQgbWF0Y2ggPSAwO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXdvcmRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgd29yZCA9IGtleXdvcmRzW2ldO1xyXG4gICAgICAgIGlmICh0aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHdvcmQpKSB7XHJcbiAgICAgICAgICBtYXRjaCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA9PT0ga2V5d29yZHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgaWYgKG1hdGNoID09PSBrZXl3b3Jkcy5sZW5ndGgpIHJlc29sdmUobWF0Y2gpO1xyXG4gICAgICAgICAgZWxzZSByZXNvbHZlKC0xKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=