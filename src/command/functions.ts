import { HelpFunction } from "./functions/help.command.function";
import { MediaFunction } from "./functions/media.command.function";
import { PingFunction } from "./functions/ping.command.function";

export const helpFunction = new HelpFunction();
export const whenAnimeFunction = new MediaFunction("anime");
export const whenMangaFunction = new MediaFunction("manga");
export const pingFunction = new PingFunction();
