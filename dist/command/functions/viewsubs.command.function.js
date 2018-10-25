"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = require("./../../data/user.data");
const subscription_data_1 = require("./../../data/subscription.data");
const media_data_1 = require("./../../data/media.data");
const title_helper_1 = require("../../helpers/title.helper");
const time_helper_1 = require("../../helpers/time.helper");
const colors_1 = require("../../core/colors");
const client_1 = require("../../core/client");
const media_result_1 = require("../../core/media.result");
class ViewSubsFunction {
    constructor() { }
    Execute(message, command, dm) {
        this.Embed(message, dm).then(async (embed) => {
            if (dm === true) {
                message.author.send(embed);
            }
            else {
                message.reply(embed);
            }
        });
    }
    async Embed(message, dm) {
        return new Promise((resolve, reject) => {
            let mentionId = null;
            if (message.mentions.members.size === 1) {
                mentionId = message.mentions.members.first().id;
            }
            const discordId = mentionId === null ? message.author.id : mentionId;
            const client = client_1.ClientManager.GetClient;
            const list = [];
            const mediaSubs = [];
            const mediaList = media_data_1.MediaData.GetMediaList;
            user_data_1.UserData.GetUser(discordId)
                .then(user => {
                subscription_data_1.SubscriptionData.All.forEach(async (sub) => {
                    if (user.Id === sub.UserId) {
                        const media = mediaList.find(x => x.idMal === sub.MediaId);
                        mediaSubs.push(media);
                    }
                });
                mediaSubs.forEach(async (media) => {
                    const title = title_helper_1.TitleHelper.Get(media.title);
                    const episode = media.nextAiringEpisode.next;
                    const countdown = await time_helper_1.TimeHelper.Countdown(media.nextAiringEpisode.timeUntilAiring);
                    await list.push({
                        name: `\n***${title}***`,
                        value: `\`Episode ${episode} : ${countdown}\` - [MAL Link](https://myanimelist.net/anime/${media.idMal}/)\n-------------------------------------------------------------------`
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
                resolve(embed);
            })
                .catch((reason) => {
                media_result_1.MediaResult.SendInfo(message, `You haven't subscribe to anything yet!\nType the command \`-subscribe anime title or keyword here\` to subscribe.`, dm);
                console.log(reason.message);
            });
        });
    }
}
exports.ViewSubsFunction = ViewSubsFunction;
//# sourceMappingURL=viewsubs.command.function.js.map