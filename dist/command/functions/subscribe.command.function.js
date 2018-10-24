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
        await media_search_1.MediaSearch.All(command.Parameter, async (res) => {
            const ongoing = await media_handler_1.MediaHandler.OngoingMedia(res);
            const unreleased = await media_handler_1.MediaHandler.UnreleasedMedia(res);
            if (ongoing.length === 0 && unreleased.length === 0) {
                await media_result_1.MediaResult.SendInfo(message, "There is nothing to subscribe. The anime you search might be already completed or it is not yet aired and the release date is currently unknown, or try another keyword.", dm);
                return;
            }
            const results = [];
            const formattedResults = [];
            await ongoing.forEach(async (m) => {
                results.push(m);
                await formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
            });
            await unreleased.forEach(async (m) => {
                results.push(m);
                await formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
            });
            if (results.length === 1) {
                const discordId = message.author.id;
                const mediaId = results[0].idMal;
                const title = title_helper_1.TitleHelper.Get(results[0].title);
                await media_data_1.MediaData.Exists(mediaId, async (exists) => {
                    if (exists === false) {
                        await media_data_1.MediaData.Insert(mediaId, title, async (insertId) => {
                            await console.log(insertId);
                        });
                    }
                });
                await user_data_1.UserData.GetUser(discordId, async (user, err) => {
                    if (err === false) {
                        await subscription_data_1.SubscriptionData.Exists(mediaId, user.Id, async (exists) => {
                            if (exists === false) {
                                await subscription_data_1.SubscriptionData.Insert(mediaId, user.Id, async () => {
                                    await media_result_1.MediaResult.SendInfo(message, `You are now subscribed to: ***${title}***. I will DM you when a new episode is aired!\nEnter the command: \`-mysubs\` to view your subscriptions.\nEnter the command: \`-unsub ${title}\` to unsubscribe to this anime.`, dm);
                                });
                            }
                            else {
                                await media_result_1.MediaResult.SendInfo(message, `Cool! You are already subscribed to ***${title}***.\nEnter the command \`-unsub ${title}\`  to unsubscribe to this anime.`, dm);
                            }
                        });
                    }
                });
                return;
            }
            else {
                await media_result_1.MediaResult.SendInfo(message, await search_list_1.SearchList.Embed(command, formattedResults), dm);
            }
        });
    }
}
exports.SubscribeFunction = SubscribeFunction;
//# sourceMappingURL=subscribe.command.function.js.map