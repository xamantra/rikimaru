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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL2dyYXBocWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLE9BQU87SUFvRlgsTUFBTSxLQUFLLFFBQVE7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxNQUFNLEtBQUssT0FBTztRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQzs7QUF6RmMsY0FBTSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXlDdEIsQ0FBQztBQUNZLGFBQUssR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUNyQixDQUFDO0FBbEZMLDBCQTJGQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHcmFwaFFMIHtcclxuICBwcml2YXRlIHN0YXRpYyBTZWFyY2ggPSBgXHJcbiAgcXVlcnkoJGlkOiBJbnQsICRwYWdlOiBJbnQsICRwZXJQYWdlOiBJbnQsICRzZWFyY2g6IFN0cmluZywgJHR5cGU6IE1lZGlhVHlwZSkge1xyXG4gICAgUGFnZShwYWdlOiAkcGFnZSwgcGVyUGFnZTogJHBlclBhZ2UpIHtcclxuICAgICAgbWVkaWEoaWQ6ICRpZCwgc2VhcmNoOiAkc2VhcmNoLCB0eXBlOiAkdHlwZSkge1xyXG4gICAgICAgIGNvdmVySW1hZ2Uge1xyXG4gICAgICAgICAgbGFyZ2VcclxuICAgICAgICB9XHJcbiAgICAgICAgaWRcclxuICAgICAgICBpZE1hbFxyXG4gICAgICAgIHRpdGxlIHtcclxuICAgICAgICAgIHJvbWFqaVxyXG4gICAgICAgICAgZW5nbGlzaFxyXG4gICAgICAgICAgbmF0aXZlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR5cGVcclxuICAgICAgICBzdGF0dXNcclxuICAgICAgICB1cGRhdGVkQXRcclxuICAgICAgICBzdGFydERhdGUge1xyXG4gICAgICAgICAgeWVhclxyXG4gICAgICAgICAgbW9udGhcclxuICAgICAgICAgIGRheVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbmREYXRlIHtcclxuICAgICAgICAgIHllYXJcclxuICAgICAgICAgIG1vbnRoXHJcbiAgICAgICAgICBkYXlcclxuICAgICAgICB9XHJcbiAgICAgICAgZXBpc29kZXNcclxuICAgICAgICBuZXh0QWlyaW5nRXBpc29kZSB7XHJcbiAgICAgICAgICBlcGlzb2RlXHJcbiAgICAgICAgICBhaXJpbmdBdFxyXG4gICAgICAgICAgdGltZVVudGlsQWlyaW5nXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0cmVhbWluZ0VwaXNvZGVzIHtcclxuICAgICAgICAgIHRpdGxlXHJcbiAgICAgICAgICB0aHVtYm5haWxcclxuICAgICAgICAgIHVybFxyXG4gICAgICAgICAgc2l0ZVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1gO1xyXG4gIHByaXZhdGUgc3RhdGljIE1lZGlhID0gYFxyXG4gIHF1ZXJ5KCRpZDogSW50KSB7XHJcbiAgICBNZWRpYShpZE1hbDogJGlkLCB0eXBlOiBBTklNRSkge1xyXG4gICAgICBjb3ZlckltYWdlIHtcclxuICAgICAgICBsYXJnZVxyXG4gICAgICB9XHJcbiAgICAgIGlkXHJcbiAgICAgIGlkTWFsXHJcbiAgICAgIHRpdGxlIHtcclxuICAgICAgICByb21hamlcclxuICAgICAgICBlbmdsaXNoXHJcbiAgICAgICAgbmF0aXZlXHJcbiAgICAgIH1cclxuICAgICAgdHlwZVxyXG4gICAgICBzdGF0dXNcclxuICAgICAgdXBkYXRlZEF0XHJcbiAgICAgIHN0YXJ0RGF0ZSB7XHJcbiAgICAgICAgeWVhclxyXG4gICAgICAgIG1vbnRoXHJcbiAgICAgICAgZGF5XHJcbiAgICAgIH1cclxuICAgICAgZW5kRGF0ZSB7XHJcbiAgICAgICAgeWVhclxyXG4gICAgICAgIG1vbnRoXHJcbiAgICAgICAgZGF5XHJcbiAgICAgIH1cclxuICAgICAgZXBpc29kZXNcclxuICAgICAgbmV4dEFpcmluZ0VwaXNvZGUge1xyXG4gICAgICAgIGVwaXNvZGVcclxuICAgICAgICBhaXJpbmdBdFxyXG4gICAgICAgIHRpbWVVbnRpbEFpcmluZ1xyXG4gICAgICB9XHJcbiAgICAgIHN0cmVhbWluZ0VwaXNvZGVzIHtcclxuICAgICAgICB0aXRsZVxyXG4gICAgICAgIHRodW1ibmFpbFxyXG4gICAgICAgIHVybFxyXG4gICAgICAgIHNpdGVcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1gO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIGdldCBTZWFyY2hRTCgpIHtcclxuICAgIHJldHVybiB0aGlzLlNlYXJjaDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEFuaW1lUUwoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5NZWRpYTtcclxuICB9XHJcbn1cclxuIl19