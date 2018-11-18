export interface IOngoingResponse {
  Id: number;
  IdMal: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  Current: number;
  Countdown: string;
  UpdatedAt: string;
}

export interface IUnreleasedWithDate {
  Id: number;
  IdMal: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  Countdown: string;
  StartDate: string;
  UpdatedAt: string;
}

export interface IUnreleasedNoDate {
  Id: number;
  IdMal: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  StartDate: string;
  UpdatedAt: string;
}

export interface ICompleted {
  Id: number;
  IdMal: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  StartDate: string;
  EndDate: string;
}
