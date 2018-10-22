export interface IPage {
  media: IMedia[];
}

export interface IMedia {
  coverImage: ICoverImage;
  id: number;
  idMal: number;
  title: ITitle;
  type: string;
  status: string;
  updatedAt: number;
  startDate: IDate;
  endDate: IDate;
  episodes: number;
  nextAiringEpisode: INextAiringEpisode;
  streamingEpisodes: IMediaStreamingEpisode[];
}

export interface ICoverImage {
  large: string;
}

export interface ITitle {
  romaji: string;
  english: string;
  native: string;
}

export interface IDate {
  year: number;
  month: number;
  day: number;
}

export interface INextAiringEpisode {
  next: number;
  airingAt: number;
  timeUntilAiring: number;
}

export interface IMediaStreamingEpisode {
  title: string;
  thumbnail: string;
  url: string;
  site: string;
}
