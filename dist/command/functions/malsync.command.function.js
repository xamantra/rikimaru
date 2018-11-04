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
const anistrings_1 = require("../../core/anistrings");
const mal_1 = require("../../core/mal");
class MalSyncFunction {
    Execute(message, command, dm) {
        this.GetAll(message, dm)
            .then(() => {
            client_1.ClientManager.GetClient().then(client => {
                const res$m = `**${anistrings_1.AniStrings.Random}**, Your *MAL currently watching list* is now synced with your subscriptions.`;
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
            });
        })
            .catch(err => {
            console.log(err);
            this.SendStatus(message, dm);
        });
    }
    GetAll(message, dm) {
        return new Promise((resolve, reject) => {
            user_data_1.UserData.Insert(message.author.id)
                .then(insertId => {
                this.Run(resolve, reject, message, dm);
            })
                .catch(err => {
                this.Run(resolve, reject, message, dm);
            });
        });
    }
    Run(resolve, reject, message, dm) {
        mal_bind_data_1.MalBindData.Get(message.author.id)
            .then(async (mal) => {
            if (mal.Verified === true) {
                await user_data_1.UserData.GetUser(message.author.id)
                    .then(async (user) => {
                    await mal_1.MAL.AnimeList(mal.MalUsername)
                        .then(list => {
                        subscription_data_1.SubscriptionData.GetUserSubs(user.Id)
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
                    })
                        .catch(err => {
                        console.log(err);
                    });
                    await mal_1.MAL.AnimeList(mal.MalUsername)
                        .then(list => {
                        let iteration = 0;
                        list.forEach(anime => {
                            iteration++;
                            media_search_1.MediaSearch.Find(anime.anime_id)
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
                        reject(err);
                    });
                })
                    .catch(err => {
                    console.log(err);
                });
            }
            else {
                this.SendStatus(message, dm);
            }
        })
            .catch(err => {
            this.SendStatus(message, dm);
            console.log(err);
        });
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
