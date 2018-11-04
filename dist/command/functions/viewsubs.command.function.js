"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = require("./../../data/user.data");
const subscription_data_1 = require("./../../data/subscription.data");
const media_data_1 = require("./../../data/media.data");
const discord_js_1 = require("discord.js");
const title_helper_1 = require("../../helpers/title.helper");
const time_helper_1 = require("../../helpers/time.helper");
const client_1 = require("../../core/client");
const array_sort_1 = __importDefault(require("array-sort"));
const sub_model_1 = require("../../models/sub.model");
class ViewSubsFunction {
    constructor() { }
    async Execute(message, command, dm) {
        const embed = await this.Embed(message, dm);
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
    }
    async Embed(message, dm) {
        return new Promise(async (resolve, reject) => {
            let mentionId = null;
            if (message.mentions.members.size === 1) {
                mentionId = message.mentions.members.first().id;
            }
            const discordId = mentionId === null ? message.author.id : mentionId;
            const sorted = [];
            let unsorted = [];
            const dUser = await client_1.ClientManager.GetUser(discordId).catch(err => {
                console.log(err);
            });
            if (dUser instanceof discord_js_1.User === false)
                return;
            user_data_1.UserData.GetUser(discordId)
                .then(async (u) => {
                const subs = await subscription_data_1.SubscriptionData.GetUserSubs(u.Id);
                if (subs.length === 0) {
                    const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                    resolve(template);
                    return;
                }
                for (let v = 0; v < subs.length; v++) {
                    const sub = subs[v];
                    media_data_1.MediaData.GetMedia(sub.MediaId)
                        .then(async ($m) => {
                        const title = title_helper_1.TitleHelper.Get($m.title);
                        const episode = $m.nextAiringEpisode.next;
                        let episodes = "";
                        if ($m.episodes !== null && $m.episodes !== undefined) {
                            episodes = $m.episodes === 0 ? `?` : `${$m.episodes}`;
                        }
                        else {
                            episodes = `?`;
                        }
                        const countdown = time_helper_1.TimeHelper.Countdown($m.nextAiringEpisode.timeUntilAiring);
                        const pre = new sub_model_1.SubMedia({
                            timeUntilAiring: $m.nextAiringEpisode.timeUntilAiring,
                            field: {
                                name: `\n${title}`,
                                value: `[MyAnimeList](https://myanimelist.net/anime/${$m.idMal}/)\nEpisode **${episode}**/${episodes} in ***${countdown}***\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`
                            }
                        });
                        unsorted.push(pre.data);
                        if (v === subs.length - 1) {
                            unsorted = array_sort_1.default(unsorted, ["timeUntilAiring"]);
                            for (let b = 0; b < unsorted.length; b++) {
                                const element = unsorted[b];
                                sorted.push(element.field);
                            }
                            const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                            resolve(template);
                        }
                    })
                        .catch(async (err) => {
                        const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                        resolve(template);
                        console.log(err.message);
                    });
                }
            })
                .catch(async (reason) => {
                const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                resolve(template);
                console.log(reason.message);
            });
        });
    }
    async EmbedTemplate(message, user, count, list) {
        return new Promise(async (resolve, reject) => {
            const member = message.guild.members.get(user.id);
            const client = await client_1.ClientManager.GetClient();
            resolve({
                embed: {
                    color: member.highestRole.color,
                    thumbnail: {
                        url: member.user.avatarURL
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
    }
}
exports.ViewSubsFunction = ViewSubsFunction;
