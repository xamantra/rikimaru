export class UserPref {
  constructor(
    public discordId: string,
    public schedType: "Date" | "Countdown",
    public subsSort: "ASC" | "DESC",
    public dmDelayMS: number
  ) {
    if (dmDelayMS > 24) {
      dmDelayMS = 24;
    }
    if (dmDelayMS < 1) {
      dmDelayMS = 1;
    }
  }
}
