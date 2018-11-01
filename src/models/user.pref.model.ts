export class UserPref {
  constructor(
    public discordId: string,
    public schedType: "Date" | "Countdown",
    public subsSort: "ASC" | "DESC",
    public remindInH: number
  ) {
    if (remindInH > 24) {
      remindInH = 24;
    }
    if (remindInH < 1) {
      remindInH = 1;
    }
  }
}
