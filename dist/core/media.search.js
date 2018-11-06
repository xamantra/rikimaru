"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anilist_1 = require("./anilist");
const json_helper_1 = require("../helpers/json.helper");
const root_model_1 = require("../models/root.model");
class MediaSearch {
    static async All(title) {
        return new Promise((resolve, reject) => {
            const result = anilist_1.Anilist.MediaSearch(title);
            let media = [];
            result
                .then($p => {
                media = json_helper_1.JsonHelper.Converter.deserialize($p, root_model_1.RootPage)
                    .DataPage.Page.media;
                if (media !== undefined && media !== null) {
                    resolve(media);
                }
                else {
                    reject(new Error(`"(JsonHelper.Converter.deserialize(root, Root) as Root).Data.Page.media" is 'null' or 'undefined'.`));
                }
            })
                .catch(error => {
                reject(error);
            });
        });
    }
    static async Find(id) {
        return new Promise(async (resolve, reject) => {
            const $m = await anilist_1.Anilist.MediaQuery(id);
            let media;
            if ($m !== null) {
                media = json_helper_1.JsonHelper.Converter.deserialize($m, root_model_1.RootMedia)
                    .DataMedia.Media;
                resolve(media);
            }
            else {
                resolve(null);
            }
        });
    }
}
exports.MediaSearch = MediaSearch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWVkaWEuc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQW9DO0FBRXBDLHdEQUFvRDtBQUNwRCxxREFBMkQ7QUFFM0QsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBYTtRQUNuQyxPQUFPLElBQUksT0FBTyxDQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQy9DLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztZQUN6QixNQUFNO2lCQUNILElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDVCxLQUFLLEdBQUksd0JBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxxQkFBUSxDQUFjO3FCQUNqRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEI7cUJBQU07b0JBQ0wsTUFBTSxDQUNKLElBQUksS0FBSyxDQUNQLG9HQUFvRyxDQUNyRyxDQUNGLENBQUM7aUJBQ0g7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQVU7UUFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBUyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25ELE1BQU0sRUFBRSxHQUFHLE1BQU0saUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEMsSUFBSSxLQUFhLENBQUM7WUFDbEIsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNmLEtBQUssR0FBSSx3QkFBVSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLHNCQUFTLENBQWU7cUJBQ25FLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdENELGtDQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaWxpc3QgfSBmcm9tIFwiLi9hbmlsaXN0XCI7XG5pbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi8uLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcbmltcG9ydCB7IFJvb3RQYWdlLCBSb290TWVkaWEgfSBmcm9tIFwiLi4vbW9kZWxzL3Jvb3QubW9kZWxcIjtcblxuZXhwb3J0IGNsYXNzIE1lZGlhU2VhcmNoIHtcbiAgcHVibGljIHN0YXRpYyBhc3luYyBBbGwodGl0bGU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJTWVkaWFbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0ID0gQW5pbGlzdC5NZWRpYVNlYXJjaCh0aXRsZSk7XG4gICAgICBsZXQgbWVkaWE6IElNZWRpYVtdID0gW107XG4gICAgICByZXN1bHRcbiAgICAgICAgLnRoZW4oJHAgPT4ge1xuICAgICAgICAgIG1lZGlhID0gKEpzb25IZWxwZXIuQ29udmVydGVyLmRlc2VyaWFsaXplKCRwLCBSb290UGFnZSkgYXMgUm9vdFBhZ2UpXG4gICAgICAgICAgICAuRGF0YVBhZ2UuUGFnZS5tZWRpYTtcbiAgICAgICAgICBpZiAobWVkaWEgIT09IHVuZGVmaW5lZCAmJiBtZWRpYSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzb2x2ZShtZWRpYSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBcIihKc29uSGVscGVyLkNvbnZlcnRlci5kZXNlcmlhbGl6ZShyb290LCBSb290KSBhcyBSb290KS5EYXRhLlBhZ2UubWVkaWFcIiBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRmluZChpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgJG0gPSBhd2FpdCBBbmlsaXN0Lk1lZGlhUXVlcnkoaWQpO1xuICAgICAgbGV0IG1lZGlhOiBJTWVkaWE7XG4gICAgICBpZiAoJG0gIT09IG51bGwpIHtcbiAgICAgICAgbWVkaWEgPSAoSnNvbkhlbHBlci5Db252ZXJ0ZXIuZGVzZXJpYWxpemUoJG0sIFJvb3RNZWRpYSkgYXMgUm9vdE1lZGlhKVxuICAgICAgICAgIC5EYXRhTWVkaWEuTWVkaWE7XG4gICAgICAgIHJlc29sdmUobWVkaWEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19