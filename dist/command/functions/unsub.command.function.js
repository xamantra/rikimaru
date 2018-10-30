"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_search_1 = require("./../../core/media.search");
const subscription_data_1 = require("./../../data/subscription.data");
const user_data_1 = require("../../data/user.data");
const media_list_handler_1 = require("../../handlers/media.list.handler");
const search_list_1 = require("../../core/search.list");
const title_helper_1 = require("../../helpers/title.helper");
const sender_1 = require("./../../core/sender");
class UnsubFunction {
    async Execute(message, command, dm) {
        await this.Search(message, command, dm);
    }
    async Search(message, command, dm) {
        const title = command.Parameter;
        let media = [];
        const discordId = message.author.id;
        const userMedia = [];
        const filteredMedia = [];
        const formattedResults = [];
        user_data_1.UserData.GetUser(discordId)
            .then(user => {
            media_search_1.MediaSearch.All(command.Parameter)
                .then(res => {
                media = res;
                subscription_data_1.SubscriptionData.All.forEach(async (sub) => {
                    if (sub.UserId === user.Id) {
                        await userMedia.push(sub.MediaId);
                    }
                });
                media.forEach(async (m) => {
                    if (userMedia.includes(m.idMal)) {
                        await filteredMedia.push(m);
                        await formattedResults.push(media_list_handler_1.MediaFormatHandler.Get(m));
                    }
                });
                if (filteredMedia.length === 0) {
                    sender_1.Sender.SendInfo(message, `Hmm..It seems that you are not subscribe to any anime that matches your keyword  ***${title}***.`, dm);
                }
                else if (filteredMedia.length === 1) {
                    subscription_data_1.SubscriptionData.Delete(filteredMedia[0].idMal, discordId).then(() => {
                        sender_1.Sender.SendInfo(message, `You are now unsubscribed from  ***${title_helper_1.TitleHelper.Get(filteredMedia[0].title)}***`, dm);
                    });
                }
                else {
                    search_list_1.SearchList.Embed(message, command, formattedResults).then(embed => {
                        sender_1.Sender.SendInfo(message, embed, dm);
                    });
                }
            })
                .catch(error => {
                sender_1.Sender.Send(message, `Ge mo nasai! I didn't find anime that matches your keyword \`${command.Parameter}\``, dm);
                console.warn(`Error while searching : [MediaSearch.All(${command.Parameter})]`);
            });
        })
            .catch((reason) => {
            console.log(reason.message);
        });
    }
}
exports.UnsubFunction = UnsubFunction;
//# sourceMappingURL=unsub.command.function.js.map