import moment from "moment";
import countdown from "countdown";

export class TimeHelper {
  public static Countdown(seconds: number): string {
    let _countdown: any;
    // countdown = moment.duration(seconds, "s").humanize();
    _countdown = countdown(
      null,
      moment()
        .add(seconds, "s")
        .toDate(),
      countdown.DEFAULTS,
      2
    );
    return _countdown.toString();
  }

  public static Elapsed(timestamp: number): string {
    const elapsed: string = moment(moment.unix(timestamp)).fromNow();
    return elapsed;
  }

  public static YearMonthDay(y: number, m: number, d: number): string {
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
}
