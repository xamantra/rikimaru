"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_bind_data_1 = require("../../data/mal.bind.data");
const media_search_1 = require("../../core/media.search");
const sender_1 = require("../../core/sender");
const title_helper_1 = require("../../helpers/title.helper");
const media_data_1 = require("../../data/media.data");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
const client_1 = require("../../core/client");
const mal_1 = require("../../core/mal");
const mal_bind_model_1 = require("../../models/mal.bind.model");
const subscription_model_1 = require("../../models/subscription.model");
class MalSyncFunction {
    async Execute(message, command, dm) {
        await this.GetAll(message, dm).catch(err => {
            console.log(err);
            this.SendStatus(message, dm);
        });
        const client = await client_1.ClientManager.GetClient();
        const res$m = `Your *MAL currently watching list* is now synced with your subscriptions.`;
        sender_1.Sender.Send(message, {
            embed: {
                color: message.member.highestRole.color,
                thumbnail: { url: message.author.avatarURL },
                title: `Rikimaru MAL Auto Subscribe`,
                description: res$m,
                fields: [
                    {
                        name: `To unsubscribe, type:`,
                        value: `\`-unsub anime title or keyword here\``
                    },
                    {
                        name: `To view all subscription, type:`,
                        value: `\`-viewsubs\``
                    },
                    {
                        name: `Please Note: `,
                        value: `If you've just modified your list, please wait at least 1 minute to **-malsync**.`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        }, dm);
    }
    GetAll(message, dm) {
        return new Promise(async (resolve, reject) => {
            await user_data_1.UserData.Insert(message.author.id).catch(err => console.log(err));
            this.Run(resolve, reject, message, dm);
        });
    }
    async Run(resolve, reject, message, dm) {
        const mal = await mal_bind_data_1.MalBindData.Get(message.author.id).catch(err => {
            this.SendStatus(message, dm);
            console.log(err);
        });
        if (mal instanceof mal_bind_model_1.MalBind === false)
            return;
        if (mal.Verified === true) {
            const user = await user_data_1.UserData.GetUser(message.author.id).catch(err => {
                console.log(err);
            });
            if (user instanceof subscription_model_1.User === false)
                return;
            await mal_1.MAL.GetCWList(mal.MalUsername)
                .then(async (list) => {
                await subscription_data_1.SubscriptionData.GetUserSubs(user.Id)
                    .then(subs => {
                    subs.forEach($s => {
                        const malAnime = list.find($ma => $ma.anime_id === $s.MediaId);
                        if (malAnime !== null && malAnime !== undefined) {
                        }
                        else {
                            subscription_data_1.SubscriptionData.Delete($s.MediaId, user.DiscordId);
                        }
                    });
                })
                    .catch(err => {
                    console.log(err);
                });
                let iteration = 0;
                list.forEach(async (anime) => {
                    iteration++;
                    await media_search_1.MediaSearch.Find(anime.anime_id)
                        .then(media => {
                        const title = title_helper_1.TitleHelper.Get(media.title);
                        media_data_1.MediaData.Insert(media, title).then(async (insertId) => {
                            await subscription_data_1.SubscriptionData.Insert(media.idMal, user.Id)
                                .then(() => {
                                this.Check(iteration, list, resolve);
                            })
                                .catch((reason) => {
                                if (reason === "EXISTS") {
                                    console.log(`Already subscribed.`);
                                    this.Check(iteration, list, resolve);
                                }
                                else {
                                    console.log(reason);
                                    this.Check(iteration, list, resolve);
                                    return;
                                }
                            });
                        });
                        return;
                    })
                        .catch((reason) => {
                        console.log(reason.message);
                        this.Check(iteration, list, resolve);
                    });
                    this.Check(iteration, list, resolve);
                });
            })
                .catch(err => {
                console.log(err);
            });
        }
        else {
            this.SendStatus(message, dm);
        }
    }
    Check(iteration, animeList, resolve) {
        if (iteration === animeList.length) {
            resolve();
        }
    }
    SendStatus(message, dm) {
        sender_1.Sender.Send(message, `Oops! Your MAL account is not verified and binded.\n Enter the command **-malbind malusername**`, dm);
    }
}
exports.MalSyncFunction = MalSyncFunction;
