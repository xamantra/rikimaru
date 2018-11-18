export class Scheduler {
  public static LoopJob(
    seconds: number = null,
    minutes: number = null,
    hours: number = null,
    callback: () => void
  ) {
    let totalInterval = 0;
    if (seconds !== null) totalInterval += seconds * 1000;
    if (minutes !== null) totalInterval += minutes * 1000 * 60;
    if (hours !== null) totalInterval += hours * 1000 * 60 * 60;
    setInterval(callback, totalInterval);
  }
}
