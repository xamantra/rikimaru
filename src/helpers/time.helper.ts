import moment from "moment";
import countdown from "countdown";

export class TimeHelper {
  public static Countdown(seconds: number) {
    const _countdown: any = countdown(
      null,
      moment()
        .add(seconds, "s")
        .toDate(),
      countdown.DEFAULTS,
      2
    );
    return _countdown.toString();
  }

  public static Elapsed(timestamp: number) {
    const elapsed = moment(moment.unix(timestamp)).fromNow();
    return elapsed;
  }

  public static Date(timestamp: number) {
    const date = moment(moment.unix(timestamp)).toDate();
    return date;
  }

  public static YearMonthDay(y: number, m: number, d: number) {
    let yearmonthday: string;
    if (y !== null && m !== null && d !== null) {
      yearmonthday = moment(`${y}-${m}-${m}`).format("YYYY MMM D");
    } else if (y !== null && m !== null) {
      yearmonthday = moment(`${y}-${m}`).format("YYYY MMMM");
    } else if (y !== null) {
      yearmonthday = moment(`${y}`).format("YYYY");
    } else {
      yearmonthday = "Unknown";
    }
    return yearmonthday;
  }

  public static Seconds(milliseconds: number) {
    const diff = milliseconds / 1000;
    const diffString = diff.toString();
    return diffString.substr(0, 3);
  }

  public static DiffSeconds(a: Date, b: Date) {
    const bMoment = moment(b);
    const aMoment = moment(a);
    const diff = aMoment.diff(bMoment);
    return Number(this.Seconds(diff));
  }
}
