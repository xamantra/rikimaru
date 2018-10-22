import {
  IOngoingResponse,
  IUnreleasedWithDate,
  IUnreleasedNoDate,
  ICompleted
} from "../interfaces/message.response.interface";
export class ResponseMessage
  implements
    IOngoingResponse,
    IUnreleasedWithDate,
    IUnreleasedNoDate,
    ICompleted {
  Id: number;
  Color: number;
  Thumbnail: string;
  Title: string;
  Type: string;
  Status: string;
  Current: number;
  Countdown: string = null;
  UpdatedAt: string;
  StartDate: string;
  EndDate: string;

  constructor(
    $Id: number,
    $Color: number,
    $Thumbnail: string,
    $Title: string,
    $Type: string,
    $Status: string,
    $Current: number,
    $Countdown: string = null,
    $UpdatedAt: string,
    $StartDate: string,
    $EndDate: string
  ) {
    this.Id = $Id;
    this.Color = $Color;
    this.Thumbnail = $Thumbnail;
    this.Title = $Title;
    this.Type = $Type;
    this.Status = $Status;
    this.Current = $Current;
    this.Countdown = $Countdown;
    this.UpdatedAt = $UpdatedAt;
    this.StartDate = $StartDate;
    this.EndDate = $EndDate;
  }
}
