"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SearchVariables {
    static Get(search, page = 1, perPage = 100, type) {
        return {
            search: search,
            page: page,
            perPage: perPage,
            type: type
        };
    }
    static Media(id) {
        return { id: id };
    }
}
exports.SearchVariables = SearchVariables;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnZhcmlhYmxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3ZhcmlhYmxlcy9zZWFyY2gudmFyaWFibGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxlQUFlO0lBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQ2YsTUFBYyxFQUNkLE9BQWUsQ0FBQyxFQUNoQixVQUFrQixHQUFHLEVBQ3JCLElBQVk7UUFFWixPQUFPO1lBQ0wsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQVU7UUFDNUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFsQkQsMENBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVkaWFUeXBlIH0gZnJvbSBcIi4vLi4vLi4vY29yZS9lbnVtc1wiO1xuXG5leHBvcnQgY2xhc3MgU2VhcmNoVmFyaWFibGVzIHtcbiAgcHVibGljIHN0YXRpYyBHZXQoXG4gICAgc2VhcmNoOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyID0gMSxcbiAgICBwZXJQYWdlOiBudW1iZXIgPSAxMDAsXG4gICAgdHlwZTogc3RyaW5nXG4gICkge1xuICAgIHJldHVybiB7XG4gICAgICBzZWFyY2g6IHNlYXJjaCxcbiAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICBwZXJQYWdlOiBwZXJQYWdlLFxuICAgICAgdHlwZTogdHlwZVxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIE1lZGlhKGlkOiBudW1iZXIpIHtcbiAgICByZXR1cm4geyBpZDogaWQgfTtcbiAgfVxufVxuIl19