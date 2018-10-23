"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./../../core/media.search");
const subscription_data_1 = require("./../../data/subscription.data");
const user_data_1 = require("../../data/user.data");
const media_result_1 = require("../../core/media.result");
const media_list_handler_1 = require("../../handlers/media.list.handler");
const search_list_1 = require("../../core/search.list");
class UnsubFunction {
    Execute(message, command, dm) {
        this.Search(message, command, dm);
    }
    Search(message, command, dm) {
        const title = command.Parameter;
        let media = [];
        const discordId = message.author.id;
        const userId = user_data_1.UserData.GetUser(discordId).Id;
        const userMedia = [];
        const filteredMedia = [];
        const formattedResults = [];
        media_search_1.MediaSearch.All(command.Parameter, (res) => {
            media = res;
            subscription_data_1.SubscriptionData.All.forEach(sub => {
                if (sub.UserId === userId) {
                    userMedia.push(sub.MediaId);
                }
            });
            media.forEach(m => {
                if (userMedia.includes(m.idMal)) {
                    filteredMedia.push(m);
                    formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
                }
                if (filteredMedia.length === 0) {
                    media_result_1.MediaResult.SendInfo(message, `Hmm..It seems that you are not subscribe to any anime that matches your keyword  ***${title}***.`, dm);
                }
                else if (filteredMedia.length === 1) {
                    subscription_data_1.SubscriptionData.Delete(filteredMedia[0].idMal, discordId, () => {
                        media_result_1.MediaResult.SendInfo(message, `You are now unsubscribed from  ***${title}***`, dm);
                    });
                }
                else {
                    media_result_1.MediaResult.SendInfo(message, search_list_1.SearchList.Embed(command, formattedResults), dm);
                }
            });
        });
    }
}
exports.UnsubFunction = UnsubFunction;
//# sourceMappingURL=unsub.command.function.js.map