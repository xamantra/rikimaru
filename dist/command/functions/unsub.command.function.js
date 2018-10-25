"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./../../core/media.search");
const subscription_data_1 = require("./../../data/subscription.data");
const user_data_1 = require("../../data/user.data");
const media_result_1 = require("../../core/media.result");
const media_list_handler_1 = require("../../handlers/media.list.handler");
const search_list_1 = require("../../core/search.list");
const title_helper_1 = require("../../helpers/title.helper");
const queue_data_1 = require("../../data/queue.data");
class UnsubFunction {
    async Execute(message, command, dm) {
        await this.Search(message, command, dm);
    }
    async Search(message, command, dm) {
        const userData = user_data_1.UserData.Instance;
        const queueData = queue_data_1.QueueData.Instance;
        const subsData = subscription_data_1.SubscriptionData.Instance;
        const title = command.Parameter;
        let media = [];
        const discordId = message.author.id;
        const userMedia = [];
        const filteredMedia = [];
        const formattedResults = [];
        userData
            .GetUser(discordId)
            .then(user => {
            media_search_1.MediaSearch.All(command.Parameter, async (res) => {
                media = res;
                await subsData.All.forEach(async (sub) => {
                    if (sub.UserId === user.Id) {
                        await userMedia.push(sub.MediaId);
                    }
                });
                await media.forEach(async (m) => {
                    if (userMedia.includes(m.idMal)) {
                        await filteredMedia.push(m);
                        await formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
                    }
                });
                if (filteredMedia.length === 0) {
                    await media_result_1.MediaResult.SendInfo(message, `Hmm..It seems that you are not subscribe to any anime that matches your keyword  ***${title}***.`, dm);
                }
                else if (filteredMedia.length === 1) {
                    await subsData.Delete(filteredMedia[0].idMal, discordId, async () => {
                        await media_result_1.MediaResult.SendInfo(message, `You are now unsubscribed from  ***${title_helper_1.TitleHelper.Get(filteredMedia[0].title)}***`, dm);
                    });
                }
                else {
                    await media_result_1.MediaResult.SendInfo(message, search_list_1.SearchList.Embed(command, formattedResults), dm);
                }
            });
        })
            .catch((reason) => {
            console.log(reason.message);
        });
    }
}
exports.UnsubFunction = UnsubFunction;
//# sourceMappingURL=unsub.command.function.js.map