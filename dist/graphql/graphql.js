"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GraphQL {
    static get SearchQL() {
        return this.Search;
    }
    static get AnimeQL() {
        return this.Media;
    }
    static get UserQL() {
        return this.User;
    }
    static get UserMediaListQL() {
        return this.UserMediaList;
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
GraphQL.User = `
  query($username: String) {
    User(name: $username) {
      id
      name
      about(asHtml: true)
      avatar {
        large
        medium
      }
      bannerImage
      siteUrl
    }
  }`;
GraphQL.UserMediaList = `
  query ($userId: Int) {
    MediaListCollection(userId: $userId, status: CURRENT, type: ANIME) {
      lists {
        entries {
          media {
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
      }
    }
  }`;
exports.GraphQL = GraphQL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ncmFwaHFsL2dyYXBocWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLE9BQU87SUFrSlgsTUFBTSxLQUFLLFFBQVE7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTSxNQUFNLEtBQUssT0FBTztRQUN2QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVNLE1BQU0sS0FBSyxNQUFNO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU0sTUFBTSxLQUFLLGVBQWU7UUFDL0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7O0FBL0pjLGNBQU0sR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5Q3RCLENBQUM7QUFDWSxhQUFLLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXVDckIsQ0FBQztBQUVZLFlBQUksR0FBRzs7Ozs7Ozs7Ozs7OztJQWFwQixDQUFDO0FBRVkscUJBQWEsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBNkM3QixDQUFDO0FBaEpMLDBCQWlLQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBHcmFwaFFMIHtcbiAgcHJpdmF0ZSBzdGF0aWMgU2VhcmNoID0gYFxuICBxdWVyeSgkaWQ6IEludCwgJHBhZ2U6IEludCwgJHBlclBhZ2U6IEludCwgJHNlYXJjaDogU3RyaW5nLCAkdHlwZTogTWVkaWFUeXBlKSB7XG4gICAgUGFnZShwYWdlOiAkcGFnZSwgcGVyUGFnZTogJHBlclBhZ2UpIHtcbiAgICAgIG1lZGlhKGlkOiAkaWQsIHNlYXJjaDogJHNlYXJjaCwgdHlwZTogJHR5cGUpIHtcbiAgICAgICAgY292ZXJJbWFnZSB7XG4gICAgICAgICAgbGFyZ2VcbiAgICAgICAgfVxuICAgICAgICBpZFxuICAgICAgICBpZE1hbFxuICAgICAgICB0aXRsZSB7XG4gICAgICAgICAgcm9tYWppXG4gICAgICAgICAgZW5nbGlzaFxuICAgICAgICAgIG5hdGl2ZVxuICAgICAgICB9XG4gICAgICAgIHR5cGVcbiAgICAgICAgc3RhdHVzXG4gICAgICAgIHVwZGF0ZWRBdFxuICAgICAgICBzdGFydERhdGUge1xuICAgICAgICAgIHllYXJcbiAgICAgICAgICBtb250aFxuICAgICAgICAgIGRheVxuICAgICAgICB9XG4gICAgICAgIGVuZERhdGUge1xuICAgICAgICAgIHllYXJcbiAgICAgICAgICBtb250aFxuICAgICAgICAgIGRheVxuICAgICAgICB9XG4gICAgICAgIGVwaXNvZGVzXG4gICAgICAgIG5leHRBaXJpbmdFcGlzb2RlIHtcbiAgICAgICAgICBlcGlzb2RlXG4gICAgICAgICAgYWlyaW5nQXRcbiAgICAgICAgICB0aW1lVW50aWxBaXJpbmdcbiAgICAgICAgfVxuICAgICAgICBzdHJlYW1pbmdFcGlzb2RlcyB7XG4gICAgICAgICAgdGl0bGVcbiAgICAgICAgICB0aHVtYm5haWxcbiAgICAgICAgICB1cmxcbiAgICAgICAgICBzaXRlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1gO1xuICBwcml2YXRlIHN0YXRpYyBNZWRpYSA9IGBcbiAgcXVlcnkoJGlkOiBJbnQpIHtcbiAgICBNZWRpYShpZE1hbDogJGlkLCB0eXBlOiBBTklNRSkge1xuICAgICAgY292ZXJJbWFnZSB7XG4gICAgICAgIGxhcmdlXG4gICAgICB9XG4gICAgICBpZFxuICAgICAgaWRNYWxcbiAgICAgIHRpdGxlIHtcbiAgICAgICAgcm9tYWppXG4gICAgICAgIGVuZ2xpc2hcbiAgICAgICAgbmF0aXZlXG4gICAgICB9XG4gICAgICB0eXBlXG4gICAgICBzdGF0dXNcbiAgICAgIHVwZGF0ZWRBdFxuICAgICAgc3RhcnREYXRlIHtcbiAgICAgICAgeWVhclxuICAgICAgICBtb250aFxuICAgICAgICBkYXlcbiAgICAgIH1cbiAgICAgIGVuZERhdGUge1xuICAgICAgICB5ZWFyXG4gICAgICAgIG1vbnRoXG4gICAgICAgIGRheVxuICAgICAgfVxuICAgICAgZXBpc29kZXNcbiAgICAgIG5leHRBaXJpbmdFcGlzb2RlIHtcbiAgICAgICAgZXBpc29kZVxuICAgICAgICBhaXJpbmdBdFxuICAgICAgICB0aW1lVW50aWxBaXJpbmdcbiAgICAgIH1cbiAgICAgIHN0cmVhbWluZ0VwaXNvZGVzIHtcbiAgICAgICAgdGl0bGVcbiAgICAgICAgdGh1bWJuYWlsXG4gICAgICAgIHVybFxuICAgICAgICBzaXRlXG4gICAgICB9XG4gICAgfVxuICB9YDtcblxuICBwcml2YXRlIHN0YXRpYyBVc2VyID0gYFxuICBxdWVyeSgkdXNlcm5hbWU6IFN0cmluZykge1xuICAgIFVzZXIobmFtZTogJHVzZXJuYW1lKSB7XG4gICAgICBpZFxuICAgICAgbmFtZVxuICAgICAgYWJvdXQoYXNIdG1sOiB0cnVlKVxuICAgICAgYXZhdGFyIHtcbiAgICAgICAgbGFyZ2VcbiAgICAgICAgbWVkaXVtXG4gICAgICB9XG4gICAgICBiYW5uZXJJbWFnZVxuICAgICAgc2l0ZVVybFxuICAgIH1cbiAgfWA7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgVXNlck1lZGlhTGlzdCA9IGBcbiAgcXVlcnkgKCR1c2VySWQ6IEludCkge1xuICAgIE1lZGlhTGlzdENvbGxlY3Rpb24odXNlcklkOiAkdXNlcklkLCBzdGF0dXM6IENVUlJFTlQsIHR5cGU6IEFOSU1FKSB7XG4gICAgICBsaXN0cyB7XG4gICAgICAgIGVudHJpZXMge1xuICAgICAgICAgIG1lZGlhIHtcbiAgICAgICAgICAgIGNvdmVySW1hZ2Uge1xuICAgICAgICAgICAgICBsYXJnZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWRcbiAgICAgICAgICAgIGlkTWFsXG4gICAgICAgICAgICB0aXRsZSB7XG4gICAgICAgICAgICAgIHJvbWFqaVxuICAgICAgICAgICAgICBlbmdsaXNoXG4gICAgICAgICAgICAgIG5hdGl2ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHlwZVxuICAgICAgICAgICAgc3RhdHVzXG4gICAgICAgICAgICB1cGRhdGVkQXRcbiAgICAgICAgICAgIHN0YXJ0RGF0ZSB7XG4gICAgICAgICAgICAgIHllYXJcbiAgICAgICAgICAgICAgbW9udGhcbiAgICAgICAgICAgICAgZGF5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmREYXRlIHtcbiAgICAgICAgICAgICAgeWVhclxuICAgICAgICAgICAgICBtb250aFxuICAgICAgICAgICAgICBkYXlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVwaXNvZGVzXG4gICAgICAgICAgICBuZXh0QWlyaW5nRXBpc29kZSB7XG4gICAgICAgICAgICAgIGVwaXNvZGVcbiAgICAgICAgICAgICAgYWlyaW5nQXRcbiAgICAgICAgICAgICAgdGltZVVudGlsQWlyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJlYW1pbmdFcGlzb2RlcyB7XG4gICAgICAgICAgICAgIHRpdGxlXG4gICAgICAgICAgICAgIHRodW1ibmFpbFxuICAgICAgICAgICAgICB1cmxcbiAgICAgICAgICAgICAgc2l0ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfWA7XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgU2VhcmNoUUwoKSB7XG4gICAgcmV0dXJuIHRoaXMuU2VhcmNoO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgQW5pbWVRTCgpIHtcbiAgICByZXR1cm4gdGhpcy5NZWRpYTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IFVzZXJRTCgpIHtcbiAgICByZXR1cm4gdGhpcy5Vc2VyO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgVXNlck1lZGlhTGlzdFFMKCkge1xuICAgIHJldHVybiB0aGlzLlVzZXJNZWRpYUxpc3Q7XG4gIH1cbn1cbiJdfQ==