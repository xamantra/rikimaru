import { CoverImage } from "./cover.image.model";
import { MediaStreamingEpisode } from "./media.streaming.episode.model";
import { Title } from "./title.model";
import {
  IMedia,
  ICoverImage,
  IMediaStreamingEpisode,
  INextAiringEpisode,
  IDate,
  ITitle
} from "../interfaces/page.interface";
import { StartDate } from "./start.date.model";
import { NextAiringEpisode } from "./next.airing.episode.model";
import { JsonObject, JsonProperty } from "json2typescript";
import { EndDate } from "./end.date.model";

@JsonObject("media")
export class Media implements IMedia {
  @JsonProperty("coverImage", CoverImage)
  public coverImage: ICoverImage = undefined;
  @JsonProperty("id", Number)
  public id: number = undefined;
  @JsonProperty("idMal", Number)
  public idMal: number = undefined;
  @JsonProperty("title", Title)
  public title: ITitle = undefined;
  @JsonProperty("type", String)
  public type: string = undefined;
  @JsonProperty("status", String)
  public status: string = undefined;
  @JsonProperty("updatedAt", Number)
  public updatedAt: number = undefined;
  @JsonProperty("startDate", StartDate)
  public startDate: IDate = undefined;
  @JsonProperty("endDate", EndDate)
  public endDate: IDate = undefined;
  @JsonProperty("episodes", Number)
  public episodes: number = undefined;
  @JsonProperty("nextAiringEpisode", NextAiringEpisode)
  public nextAiringEpisode: INextAiringEpisode = undefined;
  @JsonProperty("streamingEpisodes", [MediaStreamingEpisode])
  public streamingEpisodes: IMediaStreamingEpisode[] = undefined;
}
