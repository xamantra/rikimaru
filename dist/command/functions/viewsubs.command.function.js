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
            const list = [];
            const mediaSubs = [];
            const mediaList = media_data_1.MediaData.GetMediaList;
            client_1.ClientManager.GetUser(discordId).then(user => {
                user_data_1.UserData.GetUser(discordId)
                    .then(u => {
                    subscription_data_1.SubscriptionData.GetUserSubs(u.Id).then(subs => {
                        subs.forEach(sub => {
                            const media = mediaList.find(x => x.idMal === sub.MediaId);
                            mediaSubs.push(media);
                        });
                        let iteration = 1;
                        mediaSubs.forEach(async (media) => {
                            const title = title_helper_1.TitleHelper.Get(media.title);
                            const episode = media.nextAiringEpisode.next;
                            const countdown = await time_helper_1.TimeHelper.Countdown(media.nextAiringEpisode.timeUntilAiring);
                            await list.push({
                                name: `\n${title}\nhttps://myanimelist.net/anime/${media.idMal}/`,
                                value: `*Episode ${episode} :* ***${countdown}***\n-------------------------------------------------------------------`
                            });
                            if (iteration === list.length) {
                                resolve(this.EmbedTemplate(user, mediaSubs, list));
                            }
                            iteration++;
                        });
                    });
                })
                    .catch((reason) => {
                    resolve(this.EmbedTemplate(user, mediaSubs, list));
                    console.log(reason.message);
                });
            });
        });
    }
    EmbedTemplate(user, mediaSubs, list) {
        const client = client_1.ClientManager.GetClient;
        return {
            embed: {
                color: colors_1.Color.Random,
                thumbnail: {
                    url: user.avatarURL
                },
                title: `***${user.username}***'s *Subscription List*`,
                description: `**${mediaSubs.length} Anime**\n\nPlease Note: *The airing schedule for the streaming site you are using might be different.*\n`,
                fields: list,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
    }
}
exports.ViewSubsFunction = ViewSubsFunction;
//# sourceMappingURL=viewsubs.command.function.js.map