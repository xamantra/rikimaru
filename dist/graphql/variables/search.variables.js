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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnZhcmlhYmxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ncmFwaHFsL3ZhcmlhYmxlcy9zZWFyY2gudmFyaWFibGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxlQUFlO0lBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQ2YsTUFBYyxFQUNkLE9BQWUsQ0FBQyxFQUNoQixVQUFrQixHQUFHLEVBQ3JCLElBQVk7UUFFWixPQUFPO1lBQ0wsTUFBTSxFQUFFLE1BQU07WUFDZCxJQUFJLEVBQUUsSUFBSTtZQUNWLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQVU7UUFDNUIsT0FBTyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFsQkQsMENBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNlYXJjaFZhcmlhYmxlcyB7XG4gIHB1YmxpYyBzdGF0aWMgR2V0KFxuICAgIHNlYXJjaDogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlciA9IDEsXG4gICAgcGVyUGFnZTogbnVtYmVyID0gMTAwLFxuICAgIHR5cGU6IHN0cmluZ1xuICApIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VhcmNoOiBzZWFyY2gsXG4gICAgICBwYWdlOiBwYWdlLFxuICAgICAgcGVyUGFnZTogcGVyUGFnZSxcbiAgICAgIHR5cGU6IHR5cGVcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBNZWRpYShpZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuIHsgaWQ6IGlkIH07XG4gIH1cbn1cbiJdfQ==