export class SubMedia {
  constructor(
    public data: {
      timeUntilAiring: number;
      field: { name: string; value: string };
    }
  ) {}
}
