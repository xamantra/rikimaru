import { BotCommand } from "./bot.command";
import { tweakFunction } from "./functions";
import { Response } from "../core/enums";
import {
  helpFunction,
  whenAnimeFunction,
  pingFunction,
  subscribeFunction,
  logAllFunction,
  viewSubsFunction,
  unsubFunction
} from "./functions";
import { mediaExample } from "./examples";

export const help = new BotCommand(
  "help",
  "Show all my command list.",
  false,
  Response.ChannelReply,
  helpFunction
);
export const dmhelp = new BotCommand(
  "dmhelp",
  "Just similar with the* ***-help*** *command.",
  false,
  Response.DirectMessage,
  helpFunction
);
export const when = new BotCommand(
  "when",
  `Search for a schedule of an anime that matches the keyword/parameter.\nYou can either put the exact anime title or just a keyword.`,
  true,
  Response.ChannelReply,
  whenAnimeFunction,
  mediaExample
);
export const dmwhen = new BotCommand(
  "dmwhen",
  "Just similar with the* ***-when*** *command.",
  true,
  Response.DirectMessage,
  whenAnimeFunction,
  mediaExample
);
export const subscribe = new BotCommand(
  "subscribe",
  "Subscribe to an ongoing anime. You can provide keyword or anime title.",
  true,
  Response.DirectMessage,
  subscribeFunction,
  mediaExample
);
export const mysubs = new BotCommand(
  "mysubs",
  "View your own subscription list.",
  false,
  Response.ChannelReply,
  viewSubsFunction
);
export const dmmysubs = new BotCommand(
  "dmmysubs",
  "Just similar with ***-mysubs***.",
  false,
  Response.DirectMessage,
  viewSubsFunction
);
export const unsub = new BotCommand(
  "unsub",
  "Unsubscribe to an ongoing anime. You can provide keyword or anime title.",
  true,
  Response.DirectMessage,
  unsubFunction,
  mediaExample
);
export const ping = new BotCommand(
  "ping",
  "Just check your ping and the API's ping.",
  false,
  Response.ChannelReply,
  pingFunction
);
export const dmping = new BotCommand(
  "dmping",
  "Just similar with* ***-ping*** *command.",
  false,
  Response.DirectMessage,
  pingFunction
);
export const logall = new BotCommand(
  "logall",
  "Developer only..",
  false,
  Response.DirectMessage,
  logAllFunction,
  null,
  true
);
export const tweak = new BotCommand(
  "tweak",
  "Developer only...",
  false,
  Response.DirectMessage,
  tweakFunction,
  null,
  true
);