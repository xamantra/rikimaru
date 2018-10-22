import { Config } from "./config";
import { ResponseMessageHelper } from "./../helpers/response.message.helper";
import { TitleHelper } from "./../helpers/title.helper";
import { TimeHelper } from "./../helpers/time.helper";
import { MediaFunction } from "../command/functions/media.command.function";
import { MediaHandler } from "./../handlers/media.handler";
import { SearchVariables } from "../graphql/variables/search.variables";
import { MediaVariables } from "../graphql/variables/media.variables";
import { PingFunction } from "../command/functions/ping.command.function";
import { Color } from "./colors";
import { HelpFunction } from "../command/functions/help.command.function";
import { EmbedHelper } from "./../helpers/embed.helper";
import { CommandManager } from "../command/manager.command";
import { MessageHelper } from "../helpers/message.helper";
import { MessageHandler } from "../handlers/message.handler";
import { GraphQL } from "../graphql/graphql";
import { Anilist } from "./anilist";
import { ResponseHandler } from "../handlers/response.handler";
import { MediaResult } from "./media.result";
import { ClientManager } from "./client";
import { ExampleCommand } from "../command/example.command";

export class Container {
  public static Config: Config;
  public static ClientManager: ClientManager;
  public static MessageHelper: MessageHelper;
  public static TimeHelper: TimeHelper;
  public static TitleHelper: TitleHelper;
  public static ResponseMessageHelper: ResponseMessageHelper;
  public static EmbedHelper: EmbedHelper;
  public static MessageHandler: MessageHandler;
  public static ResponseHandler: ResponseHandler;
  public static MediaHandler: MediaHandler;
  public static CommandExample: ExampleCommand;
  public static CommandManager: CommandManager;
  public static MediaVariables: SearchVariables;
  public static AnimeVariables: MediaVariables;
  public static MediaResult: MediaResult;
  public static GraphQL: GraphQL;
  public static Anilist: Anilist;
  public static Color: Color;

  public static get Instance(): Container {
    return this;
  }
}
