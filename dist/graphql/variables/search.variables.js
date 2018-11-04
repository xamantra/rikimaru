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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnZhcmlhYmxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3ZhcmlhYmxlcy9zZWFyY2gudmFyaWFibGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxlQUFlO0lBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQ2YsTUFBYyxFQUNkLE9BQWUsQ0FBQyxFQUNoQixVQUFrQixHQUFHLEVBQ3JCLElBQVk7UUFFWixPQUFPO1lBQ0wsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQVU7UUFDNUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFsQkQsMENBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVkaWFUeXBlIH0gZnJvbSBcIi4vLi4vLi4vY29yZS9lbnVtc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlYXJjaFZhcmlhYmxlcyB7XHJcbiAgcHVibGljIHN0YXRpYyBHZXQoXHJcbiAgICBzZWFyY2g6IHN0cmluZyxcclxuICAgIHBhZ2U6IG51bWJlciA9IDEsXHJcbiAgICBwZXJQYWdlOiBudW1iZXIgPSAxMDAsXHJcbiAgICB0eXBlOiBzdHJpbmdcclxuICApIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHNlYXJjaDogc2VhcmNoLFxyXG4gICAgICBwYWdlOiBwYWdlLFxyXG4gICAgICBwZXJQYWdlOiBwZXJQYWdlLFxyXG4gICAgICB0eXBlOiB0eXBlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBNZWRpYShpZDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4geyBpZDogaWQgfTtcclxuICB9XHJcbn1cclxuIl19