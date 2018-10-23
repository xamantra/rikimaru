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
const subscription_model_1 = require("../../models/subscription.model");
class SubscribeFunction {
    Execute(message, command, dm) {
        this.Search(message, command, dm);
    }
    Search(message, command, dm) {
        media_search_1.MediaSearch.All(command.Parameter, (res) => {
            const ongoing = media_handler_1.MediaHandler.OngoingMedia(res);
            const unreleased = media_handler_1.MediaHandler.UnreleasedMedia(res);
            if (ongoing.length === 0 && unreleased.length === 0) {
                media_result_1.MediaResult.SendInfo(message, "There is nothing to subscribe. The anime you search might be already completed or it is not yet aired and the release date is currently unknown.", dm);
                return;
            }
            const results = [];
            const formattedResults = [];
            ongoing.forEach(m => {
                results.push(m);
                formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
            });
            unreleased.forEach(m => {
                results.push(m);
                formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
            });
            if (results.length === 1) {
                const discordId = message.author.id;
                let user = user_data_1.UserData.GetUser(discordId);
                if (user === undefined) {
                    user = new subscription_model_1.User();
                    user.Id = -1;
                    user.DiscordId = discordId;
                }
                const mediaId = results[0].idMal;
                const title = title_helper_1.TitleHelper.Get(results[0].title);
                if (!user_data_1.UserData.Exists(discordId)) {
                    user_data_1.UserData.Add(discordId);
                }
                if (!media_data_1.MediaData.Exist(mediaId)) {
                    media_data_1.MediaData.Add(mediaId, title);
                }
                if (!subscription_data_1.SubscriptionData.Exists(mediaId, user.Id)) {
                    subscription_data_1.SubscriptionData.Add(mediaId, user.Id);
                    media_result_1.MediaResult.SendInfo(message, `You are now subscribed to: ***${title}***. I will DM you when a new episode is aired!\nEnter the command: ***-mysubs*** to view your subscriptions.`, dm);
                }
                else {
                    media_result_1.MediaResult.SendInfo(message, `Cool! You are already subscribed to ***${title}***.\nEnter the command ***-unsub ${title}***  to unsubscribe to this anime.`, dm);
                }
                return;
            }
            else {
                media_result_1.MediaResult.SendInfo(message, search_list_1.SearchList.Embed(command, formattedResults), dm);
            }
        });
    }
}
exports.SubscribeFunction = SubscribeFunction;
//# sourceMappingURL=subscribe.command.function.js.map