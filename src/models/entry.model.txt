import { IEntry } from "../interfaces/entry.interface";
export class Entry implements IEntry {
  public Id: number;
  public MalId: number;
  public Name: string;
  public ScheduleNext: Date;
  public Countdown: string;
  public Current: number;
  public EndDate: string;
  public StartDate: string;
  public UpdatedAt: string;
  public Thumbnail: string;

  constructor(
    id: number,
    malId: number,
    name: string,
    scheduleNext: Date,
    countdown: string,
    current: number,
    endDate: string,
    startDate: string,
    updatedAt: string,
    thumbnail: string
  ) {
    this.Id = id;
    this.MalId = malId;
    this.Name = name;
    this.ScheduleNext = scheduleNext;
    this.Countdown = countdown;
    this.Current = current;
    this.EndDate = endDate;
    this.StartDate = startDate;
    this.UpdatedAt = updatedAt;
    this.Thumbnail = thumbnail;
  }
}
