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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvdGl0bGUuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFhO1FBQzdCLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDMUIsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUksRUFBRTtZQUNoQyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDckI7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQztTQUNyQjtJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQWEsRUFBRSxNQUFjO1FBQy9DLElBQ0UsS0FBSyxDQUFDLE9BQU8sS0FBSyxJQUFJO1lBQ3RCLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEtBQUssTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUNwRDtZQUNBLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTSxJQUNMLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSTtZQUNyQixLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFDbkQ7WUFDQSxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFDTCxLQUFLLENBQUMsTUFBTSxLQUFLLElBQUk7WUFDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQ25EO1lBQ0EsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7Q0FDRjtBQS9CRCxrQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaXRsZSB9IGZyb20gXCIuLi9tb2RlbHMvdGl0bGUubW9kZWxcIjtcbmltcG9ydCB7IElUaXRsZSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBUaXRsZUhlbHBlciB7XG4gIHB1YmxpYyBzdGF0aWMgR2V0KHRpdGxlOiBJVGl0bGUpIHtcbiAgICBpZiAodGl0bGUuZW5nbGlzaCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRpdGxlLmVuZ2xpc2g7XG4gICAgfSBlbHNlIGlmICh0aXRsZS5yb21hamkgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aXRsZS5yb21hamk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aXRsZS5uYXRpdmU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBNYXRjaCh0aXRsZTogSVRpdGxlLCBzZWFyY2g6IHN0cmluZykge1xuICAgIGlmIChcbiAgICAgIHRpdGxlLmVuZ2xpc2ggIT09IG51bGwgJiZcbiAgICAgIHRpdGxlLmVuZ2xpc2gudG9Mb3dlckNhc2UoKSA9PT0gc2VhcmNoLnRvTG93ZXJDYXNlKClcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB0aXRsZS5yb21hamkgIT09IG51bGwgJiZcbiAgICAgIHRpdGxlLnJvbWFqaS50b0xvd2VyQ2FzZSgpID09PSBzZWFyY2gudG9Mb3dlckNhc2UoKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRpdGxlLm5hdGl2ZSAhPT0gbnVsbCAmJlxuICAgICAgdGl0bGUubmF0aXZlLnRvTG93ZXJDYXNlKCkgPT09IHNlYXJjaC50b0xvd2VyQ2FzZSgpXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuIl19