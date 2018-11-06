"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_bind_data_1 = require("../../data/mal.bind.data");
const sender_1 = require("../../core/sender");
const title_helper_1 = require("../../helpers/title.helper");
const media_data_1 = require("../../data/media.data");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
const client_1 = require("../../core/client");
const mal_1 = require("../../core/mal");
const mal_bind_model_1 = require("../../models/mal.bind.model");
const subscription_model_1 = require("../../models/subscription.model");
const anime_cache_1 = require("../../core/anime.cache");
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
                    await anime_cache_1.AnimeCache.Get(anime.anime_id)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbHN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUF1RDtBQUV2RCw4Q0FBMkM7QUFDM0MsNkRBQXlEO0FBQ3pELHNEQUFrRDtBQUNsRCxvREFBZ0Q7QUFDaEQsb0VBQWdFO0FBQ2hFLDhDQUFrRDtBQUNsRCx3Q0FBcUM7QUFFckMsZ0VBQXNEO0FBQ3RELHdFQUF1RDtBQUN2RCx3REFBb0Q7QUFFcEQsTUFBYSxlQUFlO0lBQzFCLEtBQUssQ0FBQyxPQUFPLENBQ1gsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0MsTUFBTSxLQUFLLEdBQUcsMkVBQTJFLENBQUM7UUFDMUYsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1A7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7Z0JBQ3ZDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDNUMsS0FBSyxFQUFFLDZCQUE2QjtnQkFDcEMsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDTjt3QkFDRSxJQUFJLEVB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UCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxPQUFPO29CQUNULENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTt3QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsU0FBaUIsRUFBRSxTQUFxQixFQUFFLE9BQW1CO1FBQ3pFLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7SUFFTyxVQUFVLENBQUMsT0FBZ0IsRUFBRSxFQUFXO1FBQzlDLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQLGlHQUFpRyxFQUNqRyxFQUFFLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXhJRCwwQ0F3SUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWFsQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuLi8uLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xuaW1wb3J0IHsgU2VuZGVyIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VuZGVyXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgTWVkaWFEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvbWVkaWEuZGF0YVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS91c2VyLmRhdGFcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgTUFMIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWFsXCI7XG5pbXBvcnQgeyBNYWxBbmltZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbWFsLmFuaW1lLm1vZGVsXCI7XG5pbXBvcnQgeyBNYWxCaW5kIH0gZnJvbSBcIi4uLy4uL21vZGVscy9tYWwuYmluZC5tb2RlbFwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3Vic2NyaXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcblxuZXhwb3J0IGNsYXNzIE1hbFN5bmNGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBhc3luYyBFeGVjdXRlKFxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcbiAgICBkbT86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5HZXRBbGwobWVzc2FnZSwgZG0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcbiAgICB9KTtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgIGNvbnN0IHJlcyRtID0gYFlvdXIgKk1BTCBjdXJyZW50bHkgd2F0Y2hpbmcgbGlzdCogaXMgbm93IHN5bmNlZCB3aXRoIHlvdXIgc3Vic2NyaXB0aW9ucy5gO1xuICAgIFNlbmRlci5TZW5kKFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXG4gICAgICAgICAgdGl0bGU6IGBSaWtpbWFydSBNQUwgQXV0byBTdWJzY3JpYmVgLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiByZXMkbSxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHVuc3Vic2NyaWJlLCB0eXBlOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgLXVuc3ViIGFuaW1lIHRpdGxlIG9yIGtleXdvcmQgaGVyZVxcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IGFsbCBzdWJzY3JpcHRpb24sIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAtdmlld3N1YnNcXGBgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgUGxlYXNlIE5vdGU6IGAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgSWYgeW91J3ZlIGp1c3QgbW9kaWZpZWQgeW91ciBsaXN0LCBwbGVhc2Ugd2FpdCBhdCBsZWFzdCAxIG1pbnV0ZSB0byAqKi1tYWxzeW5jKiouYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IFwiwqkgUmlraW1hcnVcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRtXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgR2V0QWxsKG1lc3NhZ2U6IE1lc3NhZ2UsIGRtOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAgdGhpcy5SdW4ocmVzb2x2ZSwgcmVqZWN0LCBtZXNzYWdlLCBkbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFJ1bihcbiAgICByZXNvbHZlOiAoKSA9PiB2b2lkLFxuICAgIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCxcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGRtOiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IG1hbCA9IGF3YWl0IE1hbEJpbmREYXRhLkdldChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IHtcbiAgICAgIHRoaXMuU2VuZFN0YXR1cyhtZXNzYWdlLCBkbSk7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0pO1xuICAgIGlmIChtYWwgaW5zdGFuY2VvZiBNYWxCaW5kID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgaWYgKChtYWwgYXMgTWFsQmluZCkuVmVyaWZpZWQgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyKG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gICAgICBpZiAodXNlciBpbnN0YW5jZW9mIFVzZXIgPT09IGZhbHNlKSByZXR1cm47XG4gICAgICBhd2FpdCBNQUwuR2V0Q1dMaXN0KChtYWwgYXMgTWFsQmluZCkuTWFsVXNlcm5hbWUpXG4gICAgICAgIC50aGVuKGFzeW5jIGxpc3QgPT4ge1xuICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0VXNlclN1YnMoKHVzZXIgYXMgVXNlcikuSWQpXG4gICAgICAgICAgICAudGhlbihzdWJzID0+IHtcbiAgICAgICAgICAgICAgc3Vicy5mb3JFYWNoKCRzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYWxBbmltZSA9IGxpc3QuZmluZCgkbWEgPT4gJG1hLmFuaW1lX2lkID09PSAkcy5NZWRpYUlkKTtcbiAgICAgICAgICAgICAgICBpZiAobWFsQW5pbWUgIT09IG51bGwgJiYgbWFsQW5pbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBTdWJzY3JpcHRpb25EYXRhLkRlbGV0ZSgkcy5NZWRpYUlkLCAodXNlciBhcyBVc2VyKS5EaXNjb3JkSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgaXRlcmF0aW9uID0gMDtcbiAgICAgICAgICBsaXN0LmZvckVhY2goYXN5bmMgYW5pbWUgPT4ge1xuICAgICAgICAgICAgaXRlcmF0aW9uKys7XG4gICAgICAgICAgICBhd2FpdCBBbmltZUNhY2hlLkdldChhbmltZS5hbmltZV9pZClcbiAgICAgICAgICAgICAgLnRoZW4obWVkaWEgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcbiAgICAgICAgICAgICAgICBNZWRpYURhdGEuSW5zZXJ0KG1lZGlhLCB0aXRsZSkudGhlbihhc3luYyBpbnNlcnRJZCA9PiB7XG4gICAgICAgICAgICAgICAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkluc2VydChtZWRpYS5pZE1hbCwgKHVzZXIgYXMgVXNlcikuSWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgbGlzdCwgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocmVhc29uID09PSBcIkVYSVNUU1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQWxyZWFkeSBzdWJzY3JpYmVkLmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpdGVyYXRpb24sIGxpc3QsIHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpdGVyYXRpb24sIGxpc3QsIHJlc29sdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpdGVyYXRpb24sIGxpc3QsIHJlc29sdmUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuQ2hlY2soaXRlcmF0aW9uLCBsaXN0LCByZXNvbHZlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuU2VuZFN0YXR1cyhtZXNzYWdlLCBkbSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBDaGVjayhpdGVyYXRpb246IG51bWJlciwgYW5pbWVMaXN0OiBNYWxBbmltZVtdLCByZXNvbHZlOiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKGl0ZXJhdGlvbiA9PT0gYW5pbWVMaXN0Lmxlbmd0aCkge1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgU2VuZFN0YXR1cyhtZXNzYWdlOiBNZXNzYWdlLCBkbTogYm9vbGVhbikge1xuICAgIFNlbmRlci5TZW5kKFxuICAgICAgbWVzc2FnZSxcbiAgICAgIGBPb3BzISBZb3VyIE1BTCBhY2NvdW50IGlzIG5vdCB2ZXJpZmllZCBhbmQgYmluZGVkLlxcbiBFbnRlciB0aGUgY29tbWFuZCAqKi1tYWxiaW5kIG1hbHVzZXJuYW1lKipgLFxuICAgICAgZG1cbiAgICApO1xuICB9XG59XG4iXX0=