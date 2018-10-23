"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = require("./../../data/user.data");
const subscription_data_1 = require("./../../data/subscription.data");
const media_data_1 = require("./../../data/media.data");
const title_helper_1 = require("../../helpers/title.helper");
const time_helper_1 = require("../../helpers/time.helper");
const colors_1 = require("../../core/colors");
const client_1 = require("../../core/client");
class ViewSubsFunction {
    constructor() { }
    Execute(message, command, dm) {
        dm
            ? message.author.send(this.Embed(message))
            : message.reply(this.Embed(message));
    }
    Embed(message) {
        let mentionId = null;
        if (message.mentions.members.size === 1) {
            mentionId = message.mentions.members.first().id;
        }
        const discordId = mentionId === null ? message.author.id : mentionId;
        console.log(discordId);
        const client = client_1.ClientManager.GetClient;
        const list = [];
        const userId = user_data_1.UserData.All.find(x => x.DiscordId === discordId).Id;
        const mediaSubs = [];
        const mediaList = media_data_1.MediaData.GetMediaList;
        subscription_data_1.SubscriptionData.All.forEach(sub => {
            if (userId === sub.UserId) {
                mediaSubs.push(mediaList.find(x => x.idMal === sub.MediaId));
            }
        });
        mediaSubs.forEach(media => {
            const title = title_helper_1.TitleHelper.Get(media.title);
            const episode = media.nextAiringEpisode.next;
            const countdown = time_helper_1.TimeHelper.Countdown(media.nextAiringEpisode.timeUntilAiring);
            list.push({
                name: `\n***${title}***`,
                value: `*[Episode ${episode} :* **${countdown}**](https://myanimelist.net/anime/${media.idMal}/)\n|`
            });
        });
        const embed = {
            embed: {
                color: colors_1.Color.Random,
                thumbnail: {
                    url: message.author.avatarURL
                },
                title: `***${message.author.username}***'s *Subscription List*`,
                description: `**${mediaSubs.length} Anime**`,
                fields: list,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
        return embed;
    }
}
exports.ViewSubsFunction = ViewSubsFunction;
//# sourceMappingURL=viewsubs.command.function.js.map