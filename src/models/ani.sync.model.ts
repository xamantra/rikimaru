import {
  IMediaList,
  IMediaListData,
  IListRoot
} from "../interfaces/ani.sync.interface";
import { JsonObject, JsonProperty } from "json2typescript";
import { Media } from "../models/media.model";
import { IMedia } from "../interfaces/page.interface";
import {
  IMediaListCollection,
  IMediaListGroup
} from "../interfaces/ani.sync.interface";

@JsonObject("")
export class MediaList implements IMediaList {
  @JsonProperty("media", Media)
  media: IMedia = undefined;
}

@JsonObject("")
export class MediaListGroup implements IMediaListGroup {
  @JsonProperty("entries", [MediaList])
  entries: IMediaList[] = undefined;
}

@JsonObject("MediaListCollection")
export class MediaListCollection implements IMediaListCollection {
  @JsonProperty("lists", [MediaListGroup])
  lists: IMediaListGroup[] = undefined;
}

@JsonObject("data")
export class MediaListData implements IMediaListData {
  @JsonProperty("MediaListCollection", MediaListCollection)
  collection: IMediaListCollection = undefined;
}

@JsonObject("")
export class ListRoot implements IListRoot {
  @JsonProperty("data", MediaListData)
  data: IMediaListData = undefined;
}
