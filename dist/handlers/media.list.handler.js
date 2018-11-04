"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_helper_1 = require("../helpers/title.helper");
class MediaFormatHandler {
    static Get(media) {
        const format = {
            name: `**${title_helper_1.TitleHelper.Get(media.title)}**`,
            value: `[MyAnimeList](https://myanimelist.net/anime/${media.idMal}/)\nStatus:  *${media.status}*\n▬▬▬▬▬▬▬▬▬▬  :small_orange_diamond: :small_orange_diamond: :small_orange_diamond:   ▬▬▬▬▬▬▬▬▬▬`
        };
        return format;
    }
}
exports.MediaFormatHandler = MediaFormatHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEubGlzdC5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXJzL21lZGlhLmxpc3QuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBEQUFzRDtBQUV0RCxNQUFhLGtCQUFrQjtJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQWE7UUFDN0IsTUFBTSxNQUFNLEdBQUc7WUFDYixJQUFJLEVBQUUsS0FBSywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDM0MsS0FBSyxFQUFFLCtDQUNMLEtBQUssQ0FBQyxLQUNSLGlCQUNFLEtBQUssQ0FBQyxNQUNSLGtHQUFrRztTQUNuRyxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBWkQsZ0RBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lZGlhRm9ybWF0SGFuZGxlciB7XHJcbiAgcHVibGljIHN0YXRpYyBHZXQobWVkaWE6IElNZWRpYSkge1xyXG4gICAgY29uc3QgZm9ybWF0ID0ge1xyXG4gICAgICBuYW1lOiBgKioke1RpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSl9KipgLCAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXHJcbiAgICAgIHZhbHVlOiBgW015QW5pbWVMaXN0XShodHRwczovL215YW5pbWVsaXN0Lm5ldC9hbmltZS8ke1xyXG4gICAgICAgIG1lZGlhLmlkTWFsXHJcbiAgICAgIH0vKVxcblN0YXR1czogICoke1xyXG4gICAgICAgIG1lZGlhLnN0YXR1c1xyXG4gICAgICB9KlxcbuKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrCAgOnNtYWxsX29yYW5nZV9kaWFtb25kOiA6c21hbGxfb3JhbmdlX2RpYW1vbmQ6IDpzbWFsbF9vcmFuZ2VfZGlhbW9uZDogICDilqzilqzilqzilqzilqzilqzilqzilqzilqzilqxgXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZvcm1hdDtcclxuICB9XHJcbn1cclxuIl19