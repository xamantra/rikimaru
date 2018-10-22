import { Config } from "./config";
import { EmbedHelper } from "./../helpers/embed.helper";
import { BotCommand } from "./../command/bot.command";
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
  public static CommandHandler: MessageHandler;
  public static GraphQL: GraphQL;
  public static Anilist: Anilist;
  public static MediaResult: MediaResult;
  public static ResponseHandler: ResponseHandler;
  public static CommandExample: ExampleCommand;
  public static BotCommand: BotCommand;
  public static EmbedHelper: EmbedHelper;
}
