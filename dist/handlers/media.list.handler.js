"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_helper_1 = require("../helpers/title.helper");
class MediaFormatHandler {
    static Get(media) {
        const format = {
            name: `**${title_helper_1.TitleHelper.Get(media.title)}**`,
            value: `[MyAnimeList](https://myanimelist.net/anime/${media.idMal}/)\nStatus:  *${media.status}*\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`
        };
        return format;
    }
}
exports.MediaFormatHandler = MediaFormatHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEubGlzdC5oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hhbmRsZXJzL21lZGlhLmxpc3QuaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBEQUFzRDtBQUV0RCxNQUFhLGtCQUFrQjtJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQWE7UUFDN0IsTUFBTSxNQUFNLEdBQUc7WUFDYixJQUFJLEVBQUUsS0FBSywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUk7WUFDM0MsS0FBSyxFQUFFLCtDQUNMLEtBQUssQ0FBQyxLQUNSLGlCQUFpQixLQUFLLENBQUMsTUFBTSx5QkFBeUI7U0FDdkQsQ0FBQztRQUNGLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQVZELGdEQVVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBNZWRpYUZvcm1hdEhhbmRsZXIge1xuICBwdWJsaWMgc3RhdGljIEdldChtZWRpYTogSU1lZGlhKSB7XG4gICAgY29uc3QgZm9ybWF0ID0ge1xuICAgICAgbmFtZTogYCoqJHtUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpfSoqYCwgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm1heC1saW5lLWxlbmd0aFxuICAgICAgdmFsdWU6IGBbTXlBbmltZUxpc3RdKGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7XG4gICAgICAgIG1lZGlhLmlkTWFsXG4gICAgICB9LylcXG5TdGF0dXM6ICAqJHttZWRpYS5zdGF0dXN9KlxcbuKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrGBcbiAgICB9O1xuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cbn1cbiJdfQ==