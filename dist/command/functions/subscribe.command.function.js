"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./../../data/queue.data");
const queue_job_model_1 = require("./../../models/queue.job.model");
const media_search_1 = require("./../../core/media.search");
const subscription_data_1 = require("./../../data/subscription.data");
const title_helper_1 = require("./../../helpers/title.helper");
const media_data_1 = require("./../../data/media.data");
const user_data_1 = require("./../../data/user.data");
const search_list_1 = require("./../../core/search.list");
const media_list_handler_1 = require("./../../handlers/media.list.handler");
const media_handler_1 = require("../../handlers/media.handler");
const client_1 = require("../../core/client");
const colors_1 = require("../../core/colors");
const sender_1 = require("../../core/sender");
class SubscribeFunction {
    async Execute(message, command, dm) {
        await this.Search(message, command, dm);
    }
    async Search(message, command, dm) {
        user_data_1.UserData.Insert(message.author.id).catch((reason) => {
            console.log(reason.message);
        });
        media_search_1.MediaSearch.All(command.Parameter)
            .then(res => {
            console.log(`There are "${res.length} results" for the search "${command.Parameter}".`);
            const ongoing = media_handler_1.MediaHandler.OngoingMedia(res);
            const unreleased = media_handler_1.MediaHandler.UnreleasedMedia(res);
            if (ongoing.length === 0 && unreleased.length === 0) {
                sender_1.Sender.SendInfo(message, "There is nothing to subscribe. The anime you search might be **already completed** or it is **not yet aired and the release date is currently unknown**, or try **another keyword**.", dm);
                return;
            }
            const results = [];
            const formattedResults = [];
            ongoing.forEach(async (m) => {
                results.push(m);
                formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
            });
            unreleased.forEach(async (m) => {
                results.push(m);
                formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
            });
            if (results.length === 1) {
                const discordId = message.author.id;
                const media = results[0];
                console.log(media);
                const title = title_helper_1.TitleHelper.Get(results[0].title);
                media_data_1.MediaData.Insert(media, title)
                    .then(insertId => {
                    user_data_1.UserData.GetUser(discordId)
                        .then(user => {
                        subscription_data_1.SubscriptionData.Insert(media.idMal, user.Id)
                            .then(() => {
                            queue_data_1.QueueData.GetQueue(media.idMal).then(queue => {
                                const queueJob = new queue_job_model_1.QueueJob(media, queue);
                                queue_data_1.QueueData.AddJob(queueJob).then(() => {
                                    this.Embed(media, true).then(embed => {
                                        sender_1.Sender.SendInfo(message, embed, dm);
                                        console.log(`Added to queue: ${insertId}`);
                                        return;
                                    });
                                });
                            });
                        })
                            .catch((reason) => {
                            if (reason === "EXISTS") {
                                this.Embed(media, false).then(embed => {
                                    sender_1.Sender.SendInfo(message, embed, dm);
                                    return;
                                });
                            }
                            else {
                                console.log(reason);
                                return;
                            }
                        });
                    })
                        .catch((reason) => {
                        console.log(reason.message);
                        return;
                    });
                })
                    .catch((reason) => {
                    console.log(reason.message);
                    return;
                });
                return;
            }
            else if (results.length > 1) {
                search_list_1.SearchList.Embed(command, formattedResults).then(embed => {
                    sender_1.Sender.SendInfo(message, embed, dm);
                });
            }
        })
            .catch((reason) => {
            sender_1.Sender.SendInfo(message, "SYSTEM ERROR!!!. I couldn't apprehend. Please try again.", dm);
            console.log(reason.message);
        });
    }
    // tslint:disable-next-line:member-ordering
    async Embed(media, newSub) {
        return new Promise((resolve, reject) => {
            client_1.ClientManager.GetClient().then(client => {
                const t = title_helper_1.TitleHelper.Get(media.title);
                const embed = {
                    embed: {
                        color: colors_1.Color.Random,
                        thumbnail: {
                            url: media.coverImage.large
                        },
                        title: `***${t}***`,
                        url: `https://myanimelist.net/anime/${media.idMal}/`,
                        description: newSub
                            ? `You are now subscribed to this anime. *I will DM you when new episode is aired.*`
                            : `You are already subscribed to this anime.`,
                        fields: [
                            { name: `To unsubscribe, type:`, value: `\`-unsub ${t}\`` },
                            {
                                name: `To view all subscription, type:`,
                                value: `\`-viewsubs\``
                            }
                        ],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Rikimaru"
                        }
                    }
                };
                resolve(embed);
            });
        });
    }
}
exports.SubscribeFunction = SubscribeFunction;
//# sourceMappingURL=subscribe.command.function.js.map