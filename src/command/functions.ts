import { HelpFunction } from "./functions/help.command.function";
import { TweakFunction } from "./functions/tweak.command.function";
import { UnsubFunction } from "./functions/unsub.command.function";
import { ViewSubsFunction } from "./functions/viewsubs.command.function";
import { LogAllFunction } from "./functions/logall.command.function";
import { SubscribeFunction } from "./functions/subscribe.command.function";
import { MediaFunction } from "./functions/media.command.function";
import { PingFunction } from "./functions/ping.command.function";

export const helpFunction = new HelpFunction();
export const whenAnimeFunction = new MediaFunction();
export const pingFunction = new PingFunction();
export const subscribeFunction = new SubscribeFunction();
export const viewSubsFunction = new ViewSubsFunction();
export const unsubFunction = new UnsubFunction();
export const logAllFunction = new LogAllFunction();
export const tweakFunction = new TweakFunction();
