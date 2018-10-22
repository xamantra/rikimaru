export class GraphQL {
  private Search: string;
  private Media: string;

  constructor() {
    this.Search = `
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
    this.Media = `
    query($id: Int, $type: MediaType) {
      media(id: $id, type: $type) {
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
    console.log(`Constructed: "${GraphQL.name}"`);
  }

  public Init(): void {
    if (this.Search !== null && this.Media !== null) {
      console.log("GraphQL Queries are ready!");
    }
  }

  public get SearchQL(): string {
    return this.Search;
  }

  public get AnimeQL(): string {
    return this.Media;
  }
}
