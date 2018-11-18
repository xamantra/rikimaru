import { BotCommand } from "./bot.command";
import { Response } from "./../core/enums";
import {
  helpFunction,
  whenAnimeFunction,
  pingFunction,
  subscribeFunction,
  logAllFunction,
  viewSubsFunction,
  unsubFunction
} from "./functions";
import { mediaExample, malBindExample, aniBindExample } from "./examples";
import {
  malBindFunction,
  malSyncFunction,
  aniBindFunction,
  aniSyncFunction
} from "./functions";
import { Config } from "../core/config";

const prefix = Config.COMMAND_PREFIX;

export const help = new BotCommand(
  "help",
  "Show all my command list.",
  false,
  false,
  Response.ChannelReply,
  10,
  helpFunction
);
export const dmhelp = new BotCommand(
  "dmhelp",
  `Just similar with the* ***${prefix}help*** *command.`,
  false,
  false,
  Response.DirectMessage,
  10,
  helpFunction
);
export const when = new BotCommand(
  "when",
  `Search for a schedule of an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.`,
  true,
  false,
  Response.ChannelReply,
  5,
  whenAnimeFunction,
  mediaExample
);
export const dmwhen = new BotCommand(
  "dmwhen",
  `Just similar with the* ***${prefix}when*** *command.`,
  true,
  false,
  Response.DirectMessage,
  5,
  whenAnimeFunction,
  mediaExample
);
export const sub = new BotCommand(
  "sub",
  "Subscribe to an ongoing anime. You can provide keyword or anime title.",
  true,
  false,
  Response.ChannelReply,
  5,
  subscribeFunction,
  mediaExample
);
export const dmsub = new BotCommand(
  "dmsub",
  `Just similar with* ***${prefix}sub.**`,
  true,
  false,
  Response.DirectMessage,
  5,
  subscribeFunction,
  mediaExample
);
export const viewsubs = new BotCommand(
  "viewsubs",
  "View your own or other's subscription list.",
  false,
  true,
  Response.ChannelReply,
  20,
  viewSubsFunction
);
export const dmviewsubs = new BotCommand(
  "dmviewsubs",
  `Just similar with* ***${prefix}viewsubs.**`,
  false,
  true,
  Response.DirectMessage,
  20,
  viewSubsFunction
);
export const unsub = new BotCommand(
  "unsub",
  "Unsubscribe to an ongoing anime. You can provide keyword or anime title.",
  true,
  false,
  Response.ChannelReply,
  5,
  unsubFunction,
  mediaExample
);
export const dmunsub = new BotCommand(
  "dmunsub",
  "Just similar with* ***unsub.**",
  true,
  false,
  Response.DirectMessage,
  5,
  unsubFunction,
  mediaExample
);
export const malbind = new BotCommand(
  "malbind",
  `Bind your mal account with your C.C. data.`,
  true,
  false,
  Response.ChannelReply,
  10,
  malBindFunction,
  malBindExample,
  false
);
export const malsync = new BotCommand(
  "malsync",
  `Automatically subscribe to all ongoing anime in your MAL CW list. And also unsubscribe to any anime that it is not in your list.`,
  false,
  false,
  Response.ChannelReply,
  60,
  malSyncFunction,
  null,
  false
);
export const anibind = new BotCommand(
  "anibind",
  `Bind your AniList account with your C.C. data.`,
  true,
  false,
  Response.ChannelReply,
  30,
  aniBindFunction,
  aniBindExample,
  false
);
export const anisync = new BotCommand(
  "anisync",
  `Automatically subscribe to all ongoing anime in your AniList CW list. And also unsubscribe to any anime that it is not in your list.`,
  false,
  false,
  Response.ChannelReply,
  30,
  aniSyncFunction,
  null,
  false
);
export const ping = new BotCommand(
  "ping",
  "Just check your ping and the API's ping.",
  false,
  false,
  Response.ChannelReply,
  3,
  pingFunction
);
export const dmping = new BotCommand(
  "dmping",
  `Just similar with* ***${prefix}ping*** *command.`,
  false,
  false,
  Response.DirectMessage,
  3,
  pingFunction
);
export const logall = new BotCommand(
  "logall",
  "Developer only..",
  false,
  false,
  Response.DirectMessage,
  0,
  logAllFunction,
  null,
  true
);
