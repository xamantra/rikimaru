"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./../../core/media.search");
const subscription_data_1 = require("./../../data/subscription.data");
const title_helper_1 = require("./../../helpers/title.helper");
const media_data_1 = require("./../../data/media.data");
const user_data_1 = require("./../../data/user.data");
const media_result_1 = require("./../../core/media.result");
const search_list_1 = require("./../../core/search.list");
const media_list_handler_1 = require("./../../handlers/media.list.handler");
const media_handler_1 = require("../../handlers/media.handler");
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
            const ongoing = media_handler_1.MediaHandler.OngoingMedia(res);
            const unreleased = media_handler_1.MediaHandler.UnreleasedMedia(res);
            if (ongoing.length === 0 && unreleased.length === 0) {
                media_result_1.MediaResult.SendInfo(message, "There is nothing to subscribe. The anime you search might be already completed or it is not yet aired and the release date is currently unknown, or try another keyword.", dm);
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
                const title = title_helper_1.TitleHelper.Get(results[0].title);
                media_data_1.MediaData.Insert(media.idMal, title)
                    .then(insertId => {
                    console.log(`New Media Id: "${insertId}"`);
                    user_data_1.UserData.GetUser(discordId)
                        .then(user => {
                        subscription_data_1.SubscriptionData.Insert(media.idMal, user.Id, message, dm)
                            .then(() => {
                            media_result_1.MediaResult.SendInfo(message, `You are now subscribed to: ***${title}***. I will DM you when a new episode is aired!\nEnter the command: \`-mysubs\` to view your subscriptions.\nEnter the command: \`-unsub ${title}\` to unsubscribe to this anime.`, dm);
                        })
                            .catch((reason) => {
                            console.log(reason.message);
                        });
                    })
                        .catch((reason) => {
                        console.log(reason.message);
                    });
                })
                    .catch((reason) => {
                    console.log(reason.message);
                });
            }
            else {
                media_result_1.MediaResult.SendInfo(message, search_list_1.SearchList.Embed(command, formattedResults), dm);
            }
        })
            .catch((reason) => {
            media_result_1.MediaResult.SendInfo(message, "There is nothing to subscribe. The anime you search might be already completed or it is not yet aired and the release date is currently unknown, or try another keyword.", dm);
            console.log(reason.message);
        });
    }
}
exports.SubscribeFunction = SubscribeFunction;
//# sourceMappingURL=subscribe.command.function.js.map