import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject("")
export class MySqlResult {
  @JsonProperty("fieldCount", Number)
  public FieldCount: number = undefined;
  @JsonProperty("affectedRows", Number)
  public AffectedRows: number = undefined;
  @JsonProperty("insertId", Number)
  public InsertId: number = undefined;
  @JsonProperty("serverStatus", Number)
  public ServerStatus: number = undefined;
  @JsonProperty("warningCount", Number)
  public WarningCount: number = undefined;
  @JsonProperty("message", String)
  public message: string = undefined;
  @JsonProperty("protocol41", Boolean)
  public Protocol41: boolean = undefined;
  @JsonProperty("changedRows", Number)
  public ChangedRows: number = undefined;
}
