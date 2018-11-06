"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GraphQL {
    static get SearchQL() {
        return this.Search;
    }
    static get AnimeQL() {
        return this.Media;
    }
}
GraphQL.Search = `
  query($id: Int, $page: Int, $perPage: Int, $search: String, $type: MediaType) {
    Page(page: $page, perPage: $perPage) {
      media(id: $id, search: $search, type: $type) {
        coverImage {
          large
        }
        id
        idMal
        title {
          romaji
          english
          native
        }
        type
        status
        updatedAt
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        episodes
        nextAiringEpisode {
          episode
          airingAt
          timeUntilAiring
        }
        streamingEpisodes {
          title
          thumbnail
          url
          site
        }
      }
    }
  }`;
GraphQL.Media = `
  query($id: Int) {
    Media(idMal: $id, type: ANIME) {
      coverImage {
        large
      }
      id
      idMal
      title {
        romaji
        english
        native
      }
      type
      status
      updatedAt
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      episodes
      nextAiringEpisode {
        episode
        airingAt
        timeUntilAiring
      }
      streamingEpisodes {
        title
        thumbnail
        url
        site
      }
    }
  }`;
exports.GraphQL = GraphQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL2dyYXBocWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLE9BQU87SUFvRlgsTUFBTSxLQUFLLFFBQVE7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxNQUFNLEtBQUssT0FBTztRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7QUF6RmMsY0FBTSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXlDdEIsQ0FBQztBQUNZLGFBQUssR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUNyQixDQUFDO0FBbEZMLDBCQTJGQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHcmFwaFFMIHtcbiAgcHJpdmF0ZSBzdGF0aWMgU2VhcmNoID0gYFxuICBxdWVyeSgkaWQ6IEludCwgJHBhZ2U6IEludCwgJHBlclBhZ2U6IEludCwgJHNlYXJjaDogU3RyaW5nLCAkdHlwZTogTWVkaWFUeXBlKSB7XG4gICAgUGFnZShwYWdlOiAkcGFnZSwgcGVyUGFnZTogJHBlclBhZ2UpIHtcbiAgICAgIG1lZGlhKGlkOiAkaWQsIHNlYXJjaDogJHNlYXJjaCwgdHlwZTogJHR5cGUpIHtcbiAgICAgICAgY292ZXJJbWFnZSB7XG4gICAgICAgICAgbGFyZ2VcbiAgICAgICAgfVxuICAgICAgICBpZFxuICAgICAgICBpZE1hbFxuICAgICAgICB0aXRsZSB7XG4gICAgICAgICAgcm9tYWppXG4gICAgICAgICAgZW5nbGlzaFxuICAgICAgICAgIG5hdGl2ZVxuICAgICAgICB9XG4gICAgICAgIHR5cGVcbiAgICAgICAgc3RhdHVzXG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBzdGFydERhdGUge1xuICAgICAgICAgIHllYXJcbiAgICAgICAgICBtb250aFxuICAgICAgICAgIGRheVxuICAgICAgICB9XG4gICAgICAgIGVuZERhdGUge1xuICAgICAgICAgIHllYXJcbiAgICAgICAgICBtb250aFxuICAgICAgICAgIGRheVxuICAgICAgICB9XG4gICAgICAgIGVwaXNvZGVzXG4gICAgICAgIG5leHRBaXJpbmdFcGlzb2RlIHtcbiAgICAgICAgICBlcGlzb2RlXG4gICAgICAgICAgYWlyaW5nQXRcbiAgICAgICAgICB0aW1lVW50aWxBaXJpbmdcbiAgICAgICAgfVxuICAgICAgICBzdHJlYW1pbmdFcGlzb2RlcyB7XG4gICAgICAgICAgdGl0bGVcbiAgICAgICAgICB0aHVtYm5haWxcbiAgICAgICAgICB1cmxcbiAgICAgICAgICBzaXRlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1gO1xuICBwcml2YXRlIHN0YXRpYyBNZWRpYSA9IGBcbiAgcXVlcnkoJGlkOiBJbnQpIHtcbiAgICBNZWRpYShpZE1hbDogJGlkLCB0eXBlOiBBTklNRSkge1xuICAgICAgY292ZXJJbWFnZSB7XG4gICAgICAgIGxhcmdlXG4gICAgICB9XG4gICAgICBpZFxuICAgICAgaWRNYWxcbiAgICAgIHRpdGxlIHtcbiAgICAgICAgcm9tYWppXG4gICAgICAgIGVuZ2xpc2hcbiAgICAgICAgbmF0aXZlXG4gICAgICB9XG4gICAgICB0eXBlXG4gICAgICBzdGF0dXNcbiAgICAgIHVwZGF0ZWRBdFxuICAgICAgc3RhcnREYXRlIHtcbiAgICAgICAgeWVhclxuICAgICAgICBtb250aFxuICAgICAgICBkYXlcbiAgICAgIH1cbiAgICAgIGVuZERhdGUge1xuICAgICAgICB5ZWFyXG4gICAgICAgIG1vbnRoXG4gICAgICAgIGRheVxuICAgICAgfVxuICAgICAgZXBpc29kZXNcbiAgICAgIG5leHRBaXJpbmdFcGlzb2RlIHtcbiAgICAgICAgZXBpc29kZVxuICAgICAgICBhaXJpbmdBdFxuICAgICAgICB0aW1lVW50aWxBaXJpbmdcbiAgICAgIH1cbiAgICAgIHN0cmVhbWluZ0VwaXNvZGVzIHtcbiAgICAgICAgdGl0bGVcbiAgICAgICAgdGh1bWJuYWlsXG4gICAgICAgIHVybFxuICAgICAgICBzaXRlXG4gICAgICB9XG4gICAgfVxuICB9YDtcblxuICBwdWJsaWMgc3RhdGljIGdldCBTZWFyY2hRTCgpIHtcbiAgICByZXR1cm4gdGhpcy5TZWFyY2g7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldCBBbmltZVFMKCkge1xuICAgIHJldHVybiB0aGlzLk1lZGlhO1xuICB9XG59XG4iXX0=