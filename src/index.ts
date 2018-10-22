import { Client } from "discord.js";
import { SubscriptionData } from "./data/subscription.data";
import { MediaData } from "./data/media.data";
import { UserData } from "./data/user.data";
import { DataHelper } from "./helpers/data.helper";
import { ResponseMessageHelper } from "./helpers/response.message.helper";
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
import { CommandManager } from "./command/manager.command";
import { EmbedHelper } from "./helpers/embed.helper";
import { Color } from "./core/colors";
import { MediaVariables } from "./graphql/variables/media.variables";
import { SearchVariables } from "./graphql/variables/search.variables";
import { MediaHandler } from "./handlers/media.handler";
import { TimeHelper } from "./helpers/time.helper";
import { TitleHelper } from "./helpers/title.helper";

OpenShiftUptimer.Log(true);
OpenShiftUptimer.AutoConfigure();

Container.Config = new Config();
Container.ClientManager = new ClientManager(new Client());
Container.MessageHelper = new MessageHelper();
Container.MediaResult = new MediaResult();
Container.MessageHandler = new MessageHandler();
Container.GraphQL = new GraphQL();
Container.AnimeVariables = new MediaVariables();
Container.MediaVariables = new SearchVariables();
Container.Anilist = new Anilist();
Container.Color = new Color();
Container.ResponseHandler = new ResponseHandler();
Container.CommandExample = new ExampleCommand();
Container.TitleHelper = new TitleHelper();
Container.TimeHelper = new TimeHelper();
Container.ResponseMessageHelper = new ResponseMessageHelper();
Container.MediaHandler = new MediaHandler();
Container.CommandManager = new CommandManager();
Container.EmbedHelper = new EmbedHelper();

Container.ClientManager.Init();
Container.MessageHandler.Init();
Container.GraphQL.Init();
Container.CommandManager.Init();
DataHelper.Init();
UserData.Init();
MediaData.Init();
SubscriptionData.Init();
