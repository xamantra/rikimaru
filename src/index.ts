import { Client } from "discord.js";
import { Config } from "./core/config";
import { ClientManager } from "./core/client";
import { MessageHelper } from "./helpers/message.helper";
import { MessageHandler } from "./handlers/message.handler";
import { GraphQL } from "./graphql/graphql";
import { OpenShiftUptimer } from "./others/openshift";
import { Anilist } from "./core/anilist";
import { ResponseHandler } from "./handlers/response.handler";
import { Container } from "./core/container";
import { MediaResult } from "./core/media.result";
import { ExampleCommand } from "./command/example.command";
import { BotCommand } from "./command/bot.command";
import { EmbedHelper } from "./helpers/embed.helper";

OpenShiftUptimer.Log(true);
OpenShiftUptimer.AutoConfigure();

Container.Config = new Config();
Container.ClientManager = new ClientManager(new Client());
Container.MessageHelper = new MessageHelper();
Container.CommandHandler = new MessageHandler();
Container.GraphQL = new GraphQL();
Container.Anilist = new Anilist();
Container.MediaResult = new MediaResult();
Container.ResponseHandler = new ResponseHandler();
Container.CommandExample = new ExampleCommand();
Container.BotCommand = new BotCommand();
Container.EmbedHelper = new EmbedHelper();

Container.Config.Init();
Container.ClientManager.Init();
Container.CommandHandler.Init();
Container.GraphQL.Init();
Container.BotCommand.Init();
