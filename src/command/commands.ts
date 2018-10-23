import { BotCommand } from "./bot.command";
import { Response } from "../core/enums";
import {
  helpFunction,
  whenAnimeFunction,
  whenMangaFunction,
  pingFunction
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
export const whenmanga = new BotCommand(
  "whenmanga",
  `Search for a schedule of a manga that matches the keyword/parameter.\nYou can either put the exact manga title or just a keyword.`,
  true,
  Response.ChannelReply,
  whenMangaFunction,
  mediaExample
);
export const dmwhenmanga = new BotCommand(
  "dmwhenmanga",
  `Just similar with the* ***-whenmanga*** *command.`,
  true,
  Response.DirectMessage,
  whenMangaFunction,
  mediaExample
);
export const subscribe = new BotCommand(
  "subscribe",
  "",
  true,
  Response.DirectMessage,
  null
);
export const mysubs = new BotCommand(
  "viewsubs",
  "",
  true,
  Response.DirectMessage,
  null
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
