"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_helper_1 = require("../helpers/title.helper");
const config_1 = require("../core/config");
class MediaFormatHandler {
    static Get(media) {
        const format = {
            name: `**${title_helper_1.TitleHelper.Get(media.title)}**`,
            value: `[MyAnimeList](${config_1.Config.MAL_ANIME_BASE}/${media.idMal}/)\nStatus:  *${media.status}*\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`
        };
        return format;
    }
}
exports.MediaFormatHandler = MediaFormatHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEubGlzdC5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXJzL21lZGlhLmxpc3QuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBEQUFzRDtBQUN0RCwyQ0FBd0M7QUFFeEMsTUFBYSxrQkFBa0I7SUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFhO1FBQzdCLE1BQU0sTUFBTSxHQUFHO1lBQ2IsSUFBSSxFQUFFLEtBQUssMEJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJO1lBQzNDLEtBQUssRUFBRSxpQkFBaUIsZUFBTSxDQUFDLGNBQWMsSUFDM0MsS0FBSyxDQUFDLEtBQ1IsaUJBQWlCLEtBQUssQ0FBQyxNQUFNLHlCQUF5QjtTQUN2RCxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBVkQsZ0RBVUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb3JlL2NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgTWVkaWFGb3JtYXRIYW5kbGVyIHtcbiAgcHVibGljIHN0YXRpYyBHZXQobWVkaWE6IElNZWRpYSkge1xuICAgIGNvbnN0IGZvcm1hdCA9IHtcbiAgICAgIG5hbWU6IGAqKiR7VGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKX0qKmAsIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTptYXgtbGluZS1sZW5ndGhcbiAgICAgIHZhbHVlOiBgW015QW5pbWVMaXN0XSgke0NvbmZpZy5NQUxfQU5JTUVfQkFTRX0vJHtcbiAgICAgICAgbWVkaWEuaWRNYWxcbiAgICAgIH0vKVxcblN0YXR1czogICoke21lZGlhLnN0YXR1c30qXFxu4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pasYFxuICAgIH07XG4gICAgcmV0dXJuIGZvcm1hdDtcbiAgfVxufVxuIl19