export class GraphQL {
  private static Search = `
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
  private static Media = `
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

  private static User = `
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

  private static UserMediaList = `
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

  public static get SearchQL() {
    return this.Search;
  }

  public static get AnimeQL() {
    return this.Media;
  }

  public static get UserQL() {
    return this.User;
  }

  public static get UserMediaListQL() {
    return this.UserMediaList;
  }
}
