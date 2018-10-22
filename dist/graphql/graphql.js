"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GraphQL {
    constructor() {
        this.Page = `
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
        this.Anime = `
    query($id: Int) {
      media(id: $id, type: ANIME) {
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
      }
    }
    `;
    }
    Init() {
        if (this.Page !== null && this.Anime !== null) {
            console.log("GraphQL Queries are ready!");
        }
    }
    get MediaQL() {
        return this.Page;
    }
    get AnimeQL() {
        return this.Anime;
    }
}
exports.GraphQL = GraphQL;
//# sourceMappingURL=graphql.js.map