import { IMedia } from "./page.interface";

export interface IListRoot {
  data: IMediaListData;
}

export interface IMediaListData {
  collection: IMediaListCollection;
}

export interface IMediaListCollection {
  lists: IMediaListGroup[];
}

export interface IMediaListGroup {
  entries: IMediaList[];
}

export interface IMediaList {
  media: IMedia;
}
