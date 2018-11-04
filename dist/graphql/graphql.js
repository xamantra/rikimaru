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
