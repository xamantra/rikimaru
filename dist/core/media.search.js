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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc2VhcmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWVkaWEuc2VhcmNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQW9DO0FBRXBDLHdEQUFvRDtBQUNwRCxxREFBMkQ7QUFFM0QsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBYTtRQUNuQyxPQUFPLElBQUksT0FBTyxDQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQy9DLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztZQUN6QixNQUFNO2lCQUNILElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDVCxLQUFLLEdBQUksd0JBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxxQkFBUSxDQUFjO3FCQUNqRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdkIsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEI7cUJBQU07b0JBQ0wsTUFBTSxDQUNKLElBQUksS0FBSyxDQUNQLG9HQUFvRyxDQUNyRyxDQUNGLENBQUM7aUJBQ0g7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQVU7UUFDakMsT0FBTyxJQUFJLE9BQU8sQ0FBUyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25ELE1BQU0sRUFBRSxHQUFHLE1BQU0saUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDeEMsSUFBSSxLQUFhLENBQUM7WUFDbEIsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO2dCQUNmLEtBQUssR0FBSSx3QkFBVSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLHNCQUFTLENBQWU7cUJBQ25FLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdENELGtDQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuaWxpc3QgfSBmcm9tIFwiLi9hbmlsaXN0XCI7XHJcbmltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLy4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XHJcbmltcG9ydCB7IFJvb3RQYWdlLCBSb290TWVkaWEgfSBmcm9tIFwiLi4vbW9kZWxzL3Jvb3QubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNZWRpYVNlYXJjaCB7XHJcbiAgcHVibGljIHN0YXRpYyBhc3luYyBBbGwodGl0bGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPElNZWRpYVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IEFuaWxpc3QuTWVkaWFTZWFyY2godGl0bGUpO1xyXG4gICAgICBsZXQgbWVkaWE6IElNZWRpYVtdID0gW107XHJcbiAgICAgIHJlc3VsdFxyXG4gICAgICAgIC50aGVuKCRwID0+IHtcclxuICAgICAgICAgIG1lZGlhID0gKEpzb25IZWxwZXIuQ29udmVydGVyLmRlc2VyaWFsaXplKCRwLCBSb290UGFnZSkgYXMgUm9vdFBhZ2UpXHJcbiAgICAgICAgICAgIC5EYXRhUGFnZS5QYWdlLm1lZGlhO1xyXG4gICAgICAgICAgaWYgKG1lZGlhICE9PSB1bmRlZmluZWQgJiYgbWVkaWEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmVzb2x2ZShtZWRpYSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZWplY3QoXHJcbiAgICAgICAgICAgICAgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgYFwiKEpzb25IZWxwZXIuQ29udmVydGVyLmRlc2VyaWFsaXplKHJvb3QsIFJvb3QpIGFzIFJvb3QpLkRhdGEuUGFnZS5tZWRpYVwiIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgRmluZChpZDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SU1lZGlhPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0ICRtID0gYXdhaXQgQW5pbGlzdC5NZWRpYVF1ZXJ5KGlkKTtcclxuICAgICAgbGV0IG1lZGlhOiBJTWVkaWE7XHJcbiAgICAgIGlmICgkbSAhPT0gbnVsbCkge1xyXG4gICAgICAgIG1lZGlhID0gKEpzb25IZWxwZXIuQ29udmVydGVyLmRlc2VyaWFsaXplKCRtLCBSb290TWVkaWEpIGFzIFJvb3RNZWRpYSlcclxuICAgICAgICAgIC5EYXRhTWVkaWEuTWVkaWE7XHJcbiAgICAgICAgcmVzb2x2ZShtZWRpYSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==