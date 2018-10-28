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
                message.author
                    .send(embed)
                    .then(($m) => {
                    console.log(`Message <${$m.id}> was sent to <${message.author.username}>.`);
                })
                    .catch((err) => {
                    message.reply(`Oh! it seems that I can't DM you.`);
                    console.log(err.name);
                });
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
            client_1.ClientManager.GetUser(discordId).then(user => {
                user_data_1.UserData.GetUser(discordId)
                    .then(u => {
                    subscription_data_1.SubscriptionData.GetUserSubs(u.Id).then(subs => {
                        let iteration = 0;
                        subs.forEach(async (sub) => {
                            iteration++;
                            const $m = await media_data_1.MediaData.GetMedia(sub.MediaId);
                            const title = title_helper_1.TitleHelper.Get($m.title);
                            const episode = $m.nextAiringEpisode.next;
                            const countdown = time_helper_1.TimeHelper.Countdown($m.nextAiringEpisode.timeUntilAiring);
                            list.push({
                                name: `\n${title}\nhttps://myanimelist.net/anime/${$m.idMal}/`,
                                value: `*Episode ${episode} :* ***${countdown}***\n-------------------------------------------------------------------`
                            });
                            if (iteration === subs.length) {
                                this.EmbedTemplate(user, subs.length, list).then(template => {
                                    resolve(template);
                                });
                            }
                        });
                    });
                })
                    .catch((reason) => {
                    this.EmbedTemplate(user, 0, list).then(template => {
                        resolve(template);
                    });
                    console.log(reason.message);
                });
            });
        });
    }
    async EmbedTemplate(user, count, list) {
        return new Promise((resolve, reject) => {
            client_1.ClientManager.GetClient().then(client => {
                resolve({
                    embed: {
                        color: colors_1.Color.Random,
                        thumbnail: {
                            url: user.avatarURL
                        },
                        title: `***${user.username}***'s *Subscription List*`,
                        description: `**${count} Anime**\n\nPlease Note: *The airing schedule for the streaming site you are using might be different.*\n`,
                        fields: list,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Rikimaru"
                        }
                    }
                });
            });
        });
    }
}
exports.ViewSubsFunction = ViewSubsFunction;
//# sourceMappingURL=viewsubs.command.function.js.map