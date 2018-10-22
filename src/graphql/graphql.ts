export class GraphQL {
  private Page: string;
  private Anime: string;

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

  public Init(): void {
    if (this.Page !== null && this.Anime !== null) {
      console.log("GraphQL Queries are ready!");
    }
  }

  public get MediaQL(): string {
    return this.Page;
  }

  public get AnimeQL(): string {
    return this.Anime;
  }
}
