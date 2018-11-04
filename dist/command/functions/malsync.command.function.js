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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbHN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUF1RDtBQUN2RCwwREFBc0Q7QUFDdEQsOENBQTJDO0FBQzNDLDZEQUF5RDtBQUN6RCxzREFBa0Q7QUFDbEQsb0RBQWdEO0FBQ2hELG9FQUFnRTtBQUNoRSw4Q0FBa0Q7QUFDbEQsd0NBQXFDO0FBRXJDLGdFQUFzRDtBQUN0RCx3RUFBdUQ7QUFFdkQsTUFBYSxlQUFlO0lBQzFCLEtBQUssQ0FBQyxPQUFPLENBQ1gsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0MsTUFBTSxLQUFLLEdBQUcsMkVBQTJFLENBQUM7UUFDMUYsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1A7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7Z0JBQ3ZDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDNUMsS0FBSyxFQUFFLDZCQUE2QjtnQkFDcEMsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDTjt3QkFDRSxJQUFJLEVB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UCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxPQUFPO29CQUNULENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTt3QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsU0FBaUIsRUFBRSxTQUFxQixFQUFFLE9BQW1CO1FBQ3pFLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7SUFFTyxVQUFVLENBQUMsT0FBZ0IsRUFBRSxFQUFXO1FBQzlDLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQLGlHQUFpRyxFQUNqRyxFQUFFLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXhJRCwwQ0F3SUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFsQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XHJcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWVkaWEuc2VhcmNoXCI7XHJcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xyXG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBNZWRpYURhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tZWRpYS5kYXRhXCI7XHJcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XHJcbmltcG9ydCB7IE1BTCB9IGZyb20gXCIuLi8uLi9jb3JlL21hbFwiO1xyXG5pbXBvcnQgeyBNYWxBbmltZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbWFsLmFuaW1lLm1vZGVsXCI7XHJcbmltcG9ydCB7IE1hbEJpbmQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL21hbC5iaW5kLm1vZGVsXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hbFN5bmNGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xyXG4gIGFzeW5jIEV4ZWN1dGUoXHJcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcclxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcclxuICAgIGRtPzogYm9vbGVhblxyXG4gICk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgYXdhaXQgdGhpcy5HZXRBbGwobWVzc2FnZSwgZG0pLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIHRoaXMuU2VuZFN0YXR1cyhtZXNzYWdlLCBkbSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XHJcbiAgICBjb25zdCByZXMkbSA9IGBZb3VyICpNQUwgY3VycmVudGx5IHdhdGNoaW5nIGxpc3QqIGlzIG5vdyBzeW5jZWQgd2l0aCB5b3VyIHN1YnNjcmlwdGlvbnMuYDtcclxuICAgIFNlbmRlci5TZW5kKFxyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICB7XHJcbiAgICAgICAgZW1iZWQ6IHtcclxuICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcclxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IG1lc3NhZ2UuYXV0aG9yLmF2YXRhclVSTCB9LFxyXG4gICAgICAgICAgdGl0bGU6IGBSaWtpbWFydSBNQUwgQXV0byBTdWJzY3JpYmVgLFxyXG4gICAgICAgICAgZGVzY3JpcHRpb246IHJlcyRtLFxyXG4gICAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBgVG8gdW5zdWJzY3JpYmUsIHR5cGU6YCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYC11bnN1YiBhbmltZSB0aXRsZSBvciBrZXl3b3JkIGhlcmVcXGBgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBgVG8gdmlldyBhbGwgc3Vic2NyaXB0aW9uLCB0eXBlOmAsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAtdmlld3N1YnNcXGBgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBuYW1lOiBgUGxlYXNlIE5vdGU6IGAsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGBJZiB5b3UndmUganVzdCBtb2RpZmllZCB5b3VyIGxpc3QsIHBsZWFzZSB3YWl0IGF0IGxlYXN0IDEgbWludXRlIHRvICoqLW1hbHN5bmMqKi5gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF0sXHJcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcclxuICAgICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBkbVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgR2V0QWxsKG1lc3NhZ2U6IE1lc3NhZ2UsIGRtOiBib29sZWFuKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCBVc2VyRGF0YS5JbnNlcnQobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcclxuICAgICAgdGhpcy5SdW4ocmVzb2x2ZSwgcmVqZWN0LCBtZXNzYWdlLCBkbSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgUnVuKFxyXG4gICAgcmVzb2x2ZTogKCkgPT4gdm9pZCxcclxuICAgIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCxcclxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXHJcbiAgICBkbTogYm9vbGVhblxyXG4gICkge1xyXG4gICAgY29uc3QgbWFsID0gYXdhaXQgTWFsQmluZERhdGEuR2V0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAobWFsIGluc3RhbmNlb2YgTWFsQmluZCA9PT0gZmFsc2UpIHJldHVybjtcclxuXHJcbiAgICBpZiAoKG1hbCBhcyBNYWxCaW5kKS5WZXJpZmllZCA9PT0gdHJ1ZSkge1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB9KTtcclxuICAgICAgaWYgKHVzZXIgaW5zdGFuY2VvZiBVc2VyID09PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICBhd2FpdCBNQUwuR2V0Q1dMaXN0KChtYWwgYXMgTWFsQmluZCkuTWFsVXNlcm5hbWUpXHJcbiAgICAgICAgLnRoZW4oYXN5bmMgbGlzdCA9PiB7XHJcbiAgICAgICAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkdldFVzZXJTdWJzKCh1c2VyIGFzIFVzZXIpLklkKVxyXG4gICAgICAgICAgICAudGhlbihzdWJzID0+IHtcclxuICAgICAgICAgICAgICBzdWJzLmZvckVhY2goJHMgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFsQW5pbWUgPSBsaXN0LmZpbmQoJG1hID0+ICRtYS5hbmltZV9pZCA9PT0gJHMuTWVkaWFJZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWFsQW5pbWUgIT09IG51bGwgJiYgbWFsQW5pbWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgU3Vic2NyaXB0aW9uRGF0YS5EZWxldGUoJHMuTWVkaWFJZCwgKHVzZXIgYXMgVXNlcikuRGlzY29yZElkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICBsZXQgaXRlcmF0aW9uID0gMDtcclxuICAgICAgICAgIGxpc3QuZm9yRWFjaChhc3luYyBhbmltZSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZXJhdGlvbisrO1xyXG4gICAgICAgICAgICBhd2FpdCBNZWRpYVNlYXJjaC5GaW5kKGFuaW1lLmFuaW1lX2lkKVxyXG4gICAgICAgICAgICAgIC50aGVuKG1lZGlhID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcclxuICAgICAgICAgICAgICAgIE1lZGlhRGF0YS5JbnNlcnQobWVkaWEsIHRpdGxlKS50aGVuKGFzeW5jIGluc2VydElkID0+IHtcclxuICAgICAgICAgICAgICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5JbnNlcnQobWVkaWEuaWRNYWwsICh1c2VyIGFzIFVzZXIpLklkKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2soaXRlcmF0aW9uLCBsaXN0LCByZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWFzb24gPT09IFwiRVhJU1RTXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEFscmVhZHkgc3Vic2NyaWJlZC5gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpdGVyYXRpb24sIGxpc3QsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpdGVyYXRpb24sIGxpc3QsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uOiBFcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpdGVyYXRpb24sIGxpc3QsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgbGlzdCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuU2VuZFN0YXR1cyhtZXNzYWdlLCBkbSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIENoZWNrKGl0ZXJhdGlvbjogbnVtYmVyLCBhbmltZUxpc3Q6IE1hbEFuaW1lW10sIHJlc29sdmU6ICgpID0+IHZvaWQpIHtcclxuICAgIGlmIChpdGVyYXRpb24gPT09IGFuaW1lTGlzdC5sZW5ndGgpIHtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBTZW5kU3RhdHVzKG1lc3NhZ2U6IE1lc3NhZ2UsIGRtOiBib29sZWFuKSB7XHJcbiAgICBTZW5kZXIuU2VuZChcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAgYE9vcHMhIFlvdXIgTUFMIGFjY291bnQgaXMgbm90IHZlcmlmaWVkIGFuZCBiaW5kZWQuXFxuIEVudGVyIHRoZSBjb21tYW5kICoqLW1hbGJpbmQgbWFsdXNlcm5hbWUqKmAsXHJcbiAgICAgIGRtXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=