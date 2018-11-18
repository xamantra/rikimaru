import endeavor = require("endeavor");
import { SearchVariables } from "../graphql/variables/search.variables";
import { GraphQL } from "../graphql/graphql";
import { Root, Data } from "../models/anilist.user.model";
import { IMediaListData } from "../interfaces/ani.sync.interface";
import {
  ListRoot,
  MediaListCollection,
  MediaListData
} from "../models/ani.sync.model";

export class Anilist {
  public static async MediaSearch(search: string) {
    return new Promise<object>((resolve, reject) => {
      const query = GraphQL.SearchQL;
      const variables = SearchVariables.Get(search, 1, 100, "ANIME");
      endeavor
        .queryAnilist({ query, variables })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public static async MediaQuery(id: number) {
    return new Promise<object>((resolve, reject) => {
      const query = GraphQL.AnimeQL;
      const variables = SearchVariables.Media(id);
      endeavor
        .queryAnilist({ query, variables })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  public static async UserQuery(username: string) {
    return new Promise<object>((resolve, reject) => {
      const query = GraphQL.UserQL;
      const variables = SearchVariables.User(username);
      endeavor
        .queryAnilist({ query, variables })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          console.log(error);
          const root = new Root();
          root.data = new Data();
          root.data.User = null;
          resolve(root);
        });
    });
  }

  public static async MediaListQuery(id: number) {
    return new Promise<object>((resolve, reject) => {
      const query = GraphQL.UserMediaListQL;
      const variables = SearchVariables.UserMediaList(id);
      endeavor
        .queryAnilist({ query, variables })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          console.log(error);
          const root = new ListRoot();
          root.data = new MediaListData();
          root.data.collection = new MediaListCollection();
          root.data.collection.lists = [];
          resolve(root);
        });
    });
  }
}
