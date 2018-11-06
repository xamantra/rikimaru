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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEubGlzdC5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXJzL21lZGlhLmxpc3QuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBEQUFzRDtBQUV0RCxNQUFhLGtCQUFrQjtJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQWE7UUFDN0IsTUFBTSxNQUFNLEdBQUc7WUFDYixJQUFJLEVBQUUsS0FBSywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDM0MsS0FBSyxFQUFFLCtDQUNMLEtBQUssQ0FBQyxLQUNSLGlCQUNFLEtBQUssQ0FBQyxNQUNSLGtHQUFrRztTQUNuRyxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBWkQsZ0RBWUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIE1lZGlhRm9ybWF0SGFuZGxlciB7XG4gIHB1YmxpYyBzdGF0aWMgR2V0KG1lZGlhOiBJTWVkaWEpIHtcbiAgICBjb25zdCBmb3JtYXQgPSB7XG4gICAgICBuYW1lOiBgKioke1RpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSl9KipgLCAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bWF4LWxpbmUtbGVuZ3RoXG4gICAgICB2YWx1ZTogYFtNeUFuaW1lTGlzdF0oaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHtcbiAgICAgICAgbWVkaWEuaWRNYWxcbiAgICAgIH0vKVxcblN0YXR1czogICoke1xuICAgICAgICBtZWRpYS5zdGF0dXNcbiAgICAgIH0qXFxu4pas4pas4pas4pas4pas4pas4pas4pas4pas4pasICA6c21hbGxfb3JhbmdlX2RpYW1vbmQ6IDpzbWFsbF9vcmFuZ2VfZGlhbW9uZDogOnNtYWxsX29yYW5nZV9kaWFtb25kOiAgIOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrGBcbiAgICB9O1xuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cbn1cbiJdfQ==