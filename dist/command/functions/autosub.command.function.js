"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_sync_data_1 = require("../../data/mal.sync.data");
const jikan_1 = require("../../core/jikan");
const media_search_1 = require("../../core/media.search");
const sender_1 = require("../../core/sender");
const title_helper_1 = require("../../helpers/title.helper");
const media_data_1 = require("../../data/media.data");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
const client_1 = require("../../core/client");
const awaiter_1 = require("../awaiter");
const message_helper_1 = require("../../helpers/message.helper");
class AutoSubFunction {
    Execute(message, command, dm) {
        awaiter_1.Awaiter.Send(message, 2000, async (m) => {
            this.GetAll(message, dm)
                .then(count => {
                client_1.ClientManager.GetClient().then(client => {
                    message_helper_1.MessageHelper.Delete(m);
                    console.log(`New Sub Count: "${count}"`);
                    const res$m = count > 0
                        ? `**${awaiter_1.Awaiter.Random}**, You are now subcribe to **${count} ongoing anime** from your MAL List.`
                        : `**${awaiter_1.Awaiter.Random}**, Cool! You are already subscribe to **all ongoing anime** in your list.`;
                    sender_1.Sender.Send(message, {
                        embed: {
                            color: message.member.highestRole.color,
                            thumbnail: { url: message.author.avatarURL },
                            title: `**Rikimaru MAL Auto Subscribe**`,
                            description: res$m,
                            fields: [
                                {
                                    name: `To unsubscribe, type:`,
                                    value: `\`-unsub anime title or keyword here\``
                                },
                                {
                                    name: `To view all subscription, type:`,
                                    value: `\`-viewsubs\``
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
                message_helper_1.MessageHelper.Delete(m);
                console.log(err);
                sender_1.Sender.Send(message, `Oops! It looks like you haven't binded you account with rikimaru discord yet.\nEnter the command **-malbind malusername** to bind your account.`, dm);
            });
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
        mal_sync_data_1.MalBindData.Get(message.author.id)
            .then(mal => {
            if (mal.Verified === true) {
                let newCount = 0;
                let oldCount = 0;
                jikan_1.JikanRequest.AnimeList(mal.MalUsername, "watching")
                    .then(animeList => {
                    let iteration = 0;
                    animeList.anime.forEach(anime => {
                        iteration++;
                        media_search_1.MediaSearch.Find(anime.mal_id)
                            .then(media => {
                            const discordId = message.author.id;
                            console.log(media);
                            const title = title_helper_1.TitleHelper.Get(media.title);
                            media_data_1.MediaData.Insert(media, title)
                                .then(insertId => {
                                console.log(insertId);
                                user_data_1.UserData.GetUser(discordId)
                                    .then(user => {
                                    console.log(user);
                                    subscription_data_1.SubscriptionData.Insert(media.idMal, user.Id)
                                        .then(() => {
                                        newCount++;
                                        this.Check(iteration, animeList, newCount, resolve);
                                    })
                                        .catch((reason) => {
                                        if (reason === "EXISTS") {
                                            console.log(`Already subscribed.`);
                                            oldCount++;
                                            this.Check(iteration, animeList, newCount, resolve);
                                        }
                                        else {
                                            console.log(reason);
                                            this.Check(iteration, animeList, newCount, resolve);
                                            return;
                                        }
                                    });
                                })
                                    .catch((reason) => {
                                    console.log(reason.message);
                                    this.Check(iteration, animeList, newCount, resolve);
                                    return;
                                });
                            })
                                .catch((reason) => {
                                console.log(reason.message);
                                this.Check(iteration, animeList, newCount, resolve);
                                return;
                            });
                            return;
                        })
                            .catch((reason) => {
                            console.log(reason.message);
                            this.Check(iteration, animeList, newCount, resolve);
                        });
                        this.Check(iteration, animeList, newCount, resolve);
                    });
                })
                    .catch(err => {
                    console.log(err);
                });
            }
            else {
                sender_1.Sender.Send(message, `Oops! Your MAL account is not verified and binded.\n Enter the command **-malbind malusername**`, dm);
            }
        })
            .catch(err => {
            reject(err);
        });
    }
    Check(iteration, animeList, count, resolve) {
        if (iteration === animeList.anime.length) {
            resolve(count);
        }
    }
}
exports.AutoSubFunction = AutoSubFunction;
//# sourceMappingURL=autosub.command.function.js.map