"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const subscription_data_1 = require("./data/subscription.data");
const media_data_1 = require("./data/media.data");
const user_data_1 = require("./data/user.data");
const data_helper_1 = require("./helpers/data.helper");
const response_message_helper_1 = require("./helpers/response.message.helper");
const config_1 = require("./core/config");
const client_1 = require("./core/client");
const message_helper_1 = require("./helpers/message.helper");
const message_handler_1 = require("./handlers/message.handler");
const graphql_1 = require("./graphql/graphql");
const openshift_1 = require("./others/openshift");
const anilist_1 = require("./core/anilist");
const response_handler_1 = require("./handlers/response.handler");
const container_1 = require("./core/container");
const media_result_1 = require("./core/media.result");
const example_command_1 = require("./command/example.command");
const manager_command_1 = require("./command/manager.command");
const embed_helper_1 = require("./helpers/embed.helper");
const colors_1 = require("./core/colors");
const media_variables_1 = require("./graphql/variables/media.variables");
const search_variables_1 = require("./graphql/variables/search.variables");
const media_handler_1 = require("./handlers/media.handler");
const time_helper_1 = require("./helpers/time.helper");
const title_helper_1 = require("./helpers/title.helper");
openshift_1.OpenShiftUptimer.Log(true);
openshift_1.OpenShiftUptimer.AutoConfigure();
container_1.Container.Config = new config_1.Config();
container_1.Container.ClientManager = new client_1.ClientManager(new discord_js_1.Client());
container_1.Container.MessageHelper = new message_helper_1.MessageHelper();
container_1.Container.MediaResult = new media_result_1.MediaResult();
container_1.Container.MessageHandler = new message_handler_1.MessageHandler();
container_1.Container.GraphQL = new graphql_1.GraphQL();
container_1.Container.AnimeVariables = new media_variables_1.MediaVariables();
container_1.Container.MediaVariables = new search_variables_1.SearchVariables();
container_1.Container.Anilist = new anilist_1.Anilist();
container_1.Container.Color = new colors_1.Color();
container_1.Container.ResponseHandler = new response_handler_1.ResponseHandler();
container_1.Container.CommandExample = new example_command_1.ExampleCommand();
container_1.Container.TitleHelper = new title_helper_1.TitleHelper();
container_1.Container.TimeHelper = new time_helper_1.TimeHelper();
container_1.Container.ResponseMessageHelper = new response_message_helper_1.ResponseMessageHelper();
container_1.Container.MediaHandler = new media_handler_1.MediaHandler();
container_1.Container.CommandManager = new manager_command_1.CommandManager();
container_1.Container.EmbedHelper = new embed_helper_1.EmbedHelper();
container_1.Container.ClientManager.Init();
container_1.Container.MessageHandler.Init();
container_1.Container.GraphQL.Init();
container_1.Container.CommandManager.Init();
data_helper_1.DataHelper.Init();
user_data_1.UserData.Init();
media_data_1.MediaData.Init();
subscription_data_1.SubscriptionData.Init();
//# sourceMappingURL=index.js.map