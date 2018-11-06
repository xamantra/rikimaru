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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbHN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUF1RDtBQUV2RCw4Q0FBMkM7QUFDM0MsNkRBQXlEO0FBQ3pELHNEQUFrRDtBQUNsRCxvREFBZ0Q7QUFDaEQsb0VBQWdFO0FBQ2hFLDhDQUFrRDtBQUNsRCx3Q0FBcUM7QUFFckMsZ0VBQXNEO0FBQ3RELHdFQUF1RDtBQUN2RCx3REFBb0Q7QUFFcEQsTUFBYSxlQUFlO0lBQzFCLEtBQUssQ0FBQyxPQUFPLENBQ1gsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0MsTUFBTSxLQUFLLEdBQUcsMkVBQTJFLENBQUM7UUFDMUYsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1A7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7Z0JBQ3ZDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDNUMsS0FBSyxFQUFFLDZCQUE2QjtnQkFDcEMsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDTjt3QkFDRSxJQUFJLEVB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UCxDQUFDLENBQUMsQ0FBQzt3QkFDSCxPQUFPO29CQUNULENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsQ0FBQyxNQUFhLEVBQUUsRUFBRTt3QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDdkMsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsU0FBaUIsRUFBRSxTQUFxQixFQUFFLE9BQW1CO1FBQ3pFLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7SUFFTyxVQUFVLENBQUMsT0FBZ0IsRUFBRSxFQUFXO1FBQzlDLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQLGlHQUFpRyxFQUNqRyxFQUFFLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXhJRCwwQ0F3SUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgTWFsQmluZERhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tYWwuYmluZC5kYXRhXCI7XHJcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWVkaWEuc2VhcmNoXCI7XHJcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xyXG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBNZWRpYURhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tZWRpYS5kYXRhXCI7XHJcbmltcG9ydCB7IFVzZXJEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XHJcbmltcG9ydCB7IE1BTCB9IGZyb20gXCIuLi8uLi9jb3JlL21hbFwiO1xyXG5pbXBvcnQgeyBNYWxBbmltZSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvbWFsLmFuaW1lLm1vZGVsXCI7XHJcbmltcG9ydCB7IE1hbEJpbmQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL21hbC5iaW5kLm1vZGVsXCI7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xyXG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWxTeW5jRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcclxuICBhc3luYyBFeGVjdXRlKFxyXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXHJcbiAgICBjb21tYW5kPzogSUNvbW1hbmQsXHJcbiAgICBkbT86IGJvb2xlYW5cclxuICApOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGF3YWl0IHRoaXMuR2V0QWxsKG1lc3NhZ2UsIGRtKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xyXG4gICAgY29uc3QgcmVzJG0gPSBgWW91ciAqTUFMIGN1cnJlbnRseSB3YXRjaGluZyBsaXN0KiBpcyBub3cgc3luY2VkIHdpdGggeW91ciBzdWJzY3JpcHRpb25zLmA7XHJcbiAgICBTZW5kZXIuU2VuZChcclxuICAgICAgbWVzc2FnZSxcclxuICAgICAge1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXHJcbiAgICAgICAgICB0aHVtYm5haWw6IHsgdXJsOiBtZXNzYWdlLmF1dGhvci5hdmF0YXJVUkwgfSxcclxuICAgICAgICAgIHRpdGxlOiBgUmlraW1hcnUgTUFMIEF1dG8gU3Vic2NyaWJlYCxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiByZXMkbSxcclxuICAgICAgICAgIGZpZWxkczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHVuc3Vic2NyaWJlLCB0eXBlOmAsXHJcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAtdW5zdWIgYW5pbWUgdGl0bGUgb3Iga2V5d29yZCBoZXJlXFxgYFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHZpZXcgYWxsIHN1YnNjcmlwdGlvbiwgdHlwZTpgLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgLXZpZXdzdWJzXFxgYFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbmFtZTogYFBsZWFzZSBOb3RlOiBgLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBgSWYgeW91J3ZlIGp1c3QgbW9kaWZpZWQgeW91ciBsaXN0LCBwbGVhc2Ugd2FpdCBhdCBsZWFzdCAxIG1pbnV0ZSB0byAqKi1tYWxzeW5jKiouYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiwqkgUmlraW1hcnVcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZG1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIEdldEFsbChtZXNzYWdlOiBNZXNzYWdlLCBkbTogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XHJcbiAgICAgIHRoaXMuUnVuKHJlc29sdmUsIHJlamVjdCwgbWVzc2FnZSwgZG0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIFJ1bihcclxuICAgIHJlc29sdmU6ICgpID0+IHZvaWQsXHJcbiAgICByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQsXHJcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxyXG4gICAgZG06IGJvb2xlYW5cclxuICApIHtcclxuICAgIGNvbnN0IG1hbCA9IGF3YWl0IE1hbEJpbmREYXRhLkdldChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IHtcclxuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gICAgaWYgKG1hbCBpbnN0YW5jZW9mIE1hbEJpbmQgPT09IGZhbHNlKSByZXR1cm47XHJcblxyXG4gICAgaWYgKChtYWwgYXMgTWFsQmluZCkuVmVyaWZpZWQgPT09IHRydWUpIHtcclxuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGlmICh1c2VyIGluc3RhbmNlb2YgVXNlciA9PT0gZmFsc2UpIHJldHVybjtcclxuICAgICAgYXdhaXQgTUFMLkdldENXTGlzdCgobWFsIGFzIE1hbEJpbmQpLk1hbFVzZXJuYW1lKVxyXG4gICAgICAgIC50aGVuKGFzeW5jIGxpc3QgPT4ge1xyXG4gICAgICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRVc2VyU3VicygodXNlciBhcyBVc2VyKS5JZClcclxuICAgICAgICAgICAgLnRoZW4oc3VicyA9PiB7XHJcbiAgICAgICAgICAgICAgc3Vicy5mb3JFYWNoKCRzID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hbEFuaW1lID0gbGlzdC5maW5kKCRtYSA9PiAkbWEuYW5pbWVfaWQgPT09ICRzLk1lZGlhSWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hbEFuaW1lICE9PSBudWxsICYmIG1hbEFuaW1lICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIFN1YnNjcmlwdGlvbkRhdGEuRGVsZXRlKCRzLk1lZGlhSWQsICh1c2VyIGFzIFVzZXIpLkRpc2NvcmRJZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgbGV0IGl0ZXJhdGlvbiA9IDA7XHJcbiAgICAgICAgICBsaXN0LmZvckVhY2goYXN5bmMgYW5pbWUgPT4ge1xyXG4gICAgICAgICAgICBpdGVyYXRpb24rKztcclxuICAgICAgICAgICAgYXdhaXQgQW5pbWVDYWNoZS5HZXQoYW5pbWUuYW5pbWVfaWQpXHJcbiAgICAgICAgICAgICAgLnRoZW4obWVkaWEgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgTWVkaWFEYXRhLkluc2VydChtZWRpYSwgdGl0bGUpLnRoZW4oYXN5bmMgaW5zZXJ0SWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkluc2VydChtZWRpYS5pZE1hbCwgKHVzZXIgYXMgVXNlcikuSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5DaGVjayhpdGVyYXRpb24sIGxpc3QsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb246IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYXNvbiA9PT0gXCJFWElTVFNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQWxyZWFkeSBzdWJzY3JpYmVkLmApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgbGlzdCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgbGlzdCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgbGlzdCwgcmVzb2x2ZSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hlY2soaXRlcmF0aW9uLCBsaXN0LCByZXNvbHZlKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgQ2hlY2soaXRlcmF0aW9uOiBudW1iZXIsIGFuaW1lTGlzdDogTWFsQW5pbWVbXSwgcmVzb2x2ZTogKCkgPT4gdm9pZCkge1xyXG4gICAgaWYgKGl0ZXJhdGlvbiA9PT0gYW5pbWVMaXN0Lmxlbmd0aCkge1xyXG4gICAgICByZXNvbHZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIFNlbmRTdGF0dXMobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcclxuICAgIFNlbmRlci5TZW5kKFxyXG4gICAgICBtZXNzYWdlLFxyXG4gICAgICBgT29wcyEgWW91ciBNQUwgYWNjb3VudCBpcyBub3QgdmVyaWZpZWQgYW5kIGJpbmRlZC5cXG4gRW50ZXIgdGhlIGNvbW1hbmQgKiotbWFsYmluZCBtYWx1c2VybmFtZSoqYCxcclxuICAgICAgZG1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==