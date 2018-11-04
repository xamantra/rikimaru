"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TitleHelper {
    static Get(title) {
        if (title.english !== null) {
            return title.english;
        }
        else if (title.romaji !== null) {
            return title.romaji;
        }
        else {
            return title.native;
        }
    }
    static Match(title, search) {
        if (title.english !== null &&
            title.english.toLowerCase() === search.toLowerCase()) {
            return true;
        }
        else if (title.romaji !== null &&
            title.romaji.toLowerCase() === search.toLowerCase()) {
            return true;
        }
        else if (title.native !== null &&
            title.native.toLowerCase() === search.toLowerCase()) {
            return true;
        }
        else {
            return false;
        }
    }
}
exports.TitleHelper = TitleHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvdGl0bGUuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFhO1FBQzdCLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUNoQyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDckI7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQy9DLElBQ0UsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJO1lBQ3RCLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUNwRDtZQUNBLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUNMLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSTtZQUNyQixLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFDbkQ7WUFDQSxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFDTCxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUk7WUFDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQ25EO1lBQ0EsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Q0FDRjtBQS9CRCxrQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaXRsZSB9IGZyb20gXCIuLi9tb2RlbHMvdGl0bGUubW9kZWxcIjtcclxuaW1wb3J0IHsgSVRpdGxlIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUaXRsZUhlbHBlciB7XHJcbiAgcHVibGljIHN0YXRpYyBHZXQodGl0bGU6IElUaXRsZSkge1xyXG4gICAgaWYgKHRpdGxlLmVuZ2xpc2ggIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHRpdGxlLmVuZ2xpc2g7XHJcbiAgICB9IGVsc2UgaWYgKHRpdGxlLnJvbWFqaSAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gdGl0bGUucm9tYWppO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRpdGxlLm5hdGl2ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgTWF0Y2godGl0bGU6IElUaXRsZSwgc2VhcmNoOiBzdHJpbmcpIHtcclxuICAgIGlmIChcclxuICAgICAgdGl0bGUuZW5nbGlzaCAhPT0gbnVsbCAmJlxyXG4gICAgICB0aXRsZS5lbmdsaXNoLnRvTG93ZXJDYXNlKCkgPT09IHNlYXJjaC50b0xvd2VyQ2FzZSgpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aXRsZS5yb21hamkgIT09IG51bGwgJiZcclxuICAgICAgdGl0bGUucm9tYWppLnRvTG93ZXJDYXNlKCkgPT09IHNlYXJjaC50b0xvd2VyQ2FzZSgpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2UgaWYgKFxyXG4gICAgICB0aXRsZS5uYXRpdmUgIT09IG51bGwgJiZcclxuICAgICAgdGl0bGUubmF0aXZlLnRvTG93ZXJDYXNlKCkgPT09IHNlYXJjaC50b0xvd2VyQ2FzZSgpXHJcbiAgICApIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==