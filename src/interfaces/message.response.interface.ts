export interface IOngoingResponse {
  Id: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  Current: number;
  Countdown: string;
  UpdatedAt: string;
}

export interface IUnreleasedWithDate {
  Id: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  Countdown: string;
  StartDate: string;
  UpdatedAt: string;
}

export interface IUnreleasedNoDate {
  Id: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  StartDate: string;
  UpdatedAt: string;
}

export interface ICompleted {
  Id: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  StartDate: string;
  EndDate: string;
}
