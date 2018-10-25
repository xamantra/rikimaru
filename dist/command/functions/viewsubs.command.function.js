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
    async Execute(message, command, dm) {
        await this.Embed(message).then(async (embed) => {
            if (dm === true) {
                await message.author.send(embed);
            }
            else {
                await message.reply(embed);
            }
        });
    }
    async Embed(message) {
        const mediaData = media_data_1.MediaData.Instance;
        const userData = user_data_1.UserData.Instance;
        const subsData = subscription_data_1.SubscriptionData.Instance;
        let mentionId = null;
        if (message.mentions.members.size === 1) {
            mentionId = message.mentions.members.first().id;
        }
        const discordId = mentionId === null ? message.author.id : mentionId;
        const client = client_1.ClientManager.GetClient;
        const list = [];
        const mediaSubs = [];
        const mediaList = mediaData.GetMediaList;
        userData
            .GetUser(discordId)
            .then(user => {
            subsData.All.forEach(async (sub) => {
                if (user.Id === sub.UserId) {
                    await mediaSubs.push(mediaList.find(x => x.idMal === sub.MediaId));
                }
            });
        })
            .catch((reason) => {
            console.log(reason.message);
        });
        await mediaSubs.forEach(async (media) => {
            const title = title_helper_1.TitleHelper.Get(media.title);
            const episode = media.nextAiringEpisode.next;
            const countdown = await time_helper_1.TimeHelper.Countdown(media.nextAiringEpisode.timeUntilAiring);
            await list.push({
                name: `\n:tv:  ***${title}***`,
                value: `:alarm_clock:  \`Episode ${episode} : ${countdown}\` - [MAL Link](https://myanimelist.net/anime/${media.idMal}/)\n  -`
            });
        });
        const embed = {
            embed: {
                color: colors_1.Color.Random,
                thumbnail: {
                    url: message.author.avatarURL
                },
                title: `***${message.author.username}***'s *Subscription List*`,
                description: `**${mediaSubs.length} Anime**\n\nPlease Note: *The airing schedule for the streaming site you are using might be different.*\n`,
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