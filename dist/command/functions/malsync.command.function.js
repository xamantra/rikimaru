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
                        .then(async (media) => {
                        const title = title_helper_1.TitleHelper.Get(media.title);
                        await media_data_1.MediaData.Insert(media, title).then(async (insertId) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbHN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUF1RDtBQUV2RCw4Q0FBMkM7QUFDM0MsNkRBQXlEO0FBQ3pELHNEQUFrRDtBQUNsRCxvREFBZ0Q7QUFDaEQsb0VBQWdFO0FBQ2hFLDhDQUFrRDtBQUNsRCx3Q0FBcUM7QUFFckMsZ0VBQXNEO0FBQ3RELHdFQUF1RDtBQUN2RCx3REFBb0Q7QUFFcEQsTUFBYSxlQUFlO0lBQzFCLEtBQUssQ0FBQyxPQUFPLENBQ1gsT0FBaUIsRUFDakIsT0FBa0IsRUFDbEIsRUFBWTtRQUVaLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0MsTUFBTSxLQUFLLEdBQUcsMkVBQTJFLENBQUM7UUFDMUYsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1A7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7Z0JBQ3ZDLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtnQkFDNUMsS0FBSyxFQUFFLDZCQUE2QjtnQkFDcEMsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDTjt3QkFDRSxJQUFJLEVB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QyxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDO3lCQUNELEtBQUssQ0FBQyxDQUFDLE1BQWEsRUFBRSxFQUFFO3dCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDNUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUN2QyxDQUFDLENBQUMsQ0FBQztvQkFDTCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVPLEtBQUssQ0FBQyxTQUFpQixFQUFFLFNBQXFCLEVBQUUsT0FBbUI7UUFDekUsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUNsQyxPQUFPLEVBQUUsQ0FBQztTQUNYO0lBQ0gsQ0FBQztJQUVPLFVBQVUsQ0FBQyxPQUFnQixFQUFFLEVBQVc7UUFDOUMsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1AsaUdBQWlHLEVBQ2pHLEVBQUUsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBdklELDBDQXVJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNYWxCaW5kRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL21hbC5iaW5kLmRhdGFcIjtcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWVkaWEuc2VhcmNoXCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBNZWRpYURhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tZWRpYS5kYXRhXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBNQUwgfSBmcm9tIFwiLi4vLi4vY29yZS9tYWxcIjtcbmltcG9ydCB7IE1hbEFuaW1lIH0gZnJvbSBcIi4uLy4uL21vZGVscy9tYWwuYW5pbWUubW9kZWxcIjtcbmltcG9ydCB7IE1hbEJpbmQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL21hbC5iaW5kLm1vZGVsXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuXG5leHBvcnQgY2xhc3MgTWFsU3luY0Z1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIGFzeW5jIEV4ZWN1dGUoXG4gICAgbWVzc2FnZT86IE1lc3NhZ2UsXG4gICAgY29tbWFuZD86IElDb21tYW5kLFxuICAgIGRtPzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLkdldEFsbChtZXNzYWdlLCBkbSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xuICAgIH0pO1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgY29uc3QgcmVzJG0gPSBgWW91ciAqTUFMIGN1cnJlbnRseSB3YXRjaGluZyBsaXN0KiBpcyBub3cgc3luY2VkIHdpdGggeW91ciBzdWJzY3JpcHRpb25zLmA7XG4gICAgU2VuZGVyLlNlbmQoXG4gICAgICBtZXNzYWdlLFxuICAgICAge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBtZXNzYWdlLm1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHsgdXJsOiBtZXNzYWdlLmF1dGhvci5hdmF0YXJVUkwgfSxcbiAgICAgICAgICB0aXRsZTogYFJpa2ltYXJ1IE1BTCBBdXRvIFN1YnNjcmliZWAsXG4gICAgICAgICAgZGVzY3JpcHRpb246IHJlcyRtLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgVG8gdW5zdWJzY3JpYmUsIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAtdW5zdWIgYW5pbWUgdGl0bGUgb3Iga2V5d29yZCBoZXJlXFxgYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHZpZXcgYWxsIHN1YnNjcmlwdGlvbiwgdHlwZTpgLFxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYC12aWV3c3Vic1xcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBQbGVhc2UgTm90ZTogYCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBJZiB5b3UndmUganVzdCBtb2RpZmllZCB5b3VyIGxpc3QsIHBsZWFzZSB3YWl0IGF0IGxlYXN0IDEgbWludXRlIHRvICoqLW1hbHN5bmMqKi5gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZG1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBHZXRBbGwobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgYXdhaXQgVXNlckRhdGEuSW5zZXJ0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICB0aGlzLlJ1bihyZXNvbHZlLCByZWplY3QsIG1lc3NhZ2UsIGRtKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgUnVuKFxuICAgIHJlc29sdmU6ICgpID0+IHZvaWQsXG4gICAgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkLFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgZG06IGJvb2xlYW5cbiAgKSB7XG4gICAgY29uc3QgbWFsID0gYXdhaXQgTWFsQmluZERhdGEuR2V0KG1lc3NhZ2UuYXV0aG9yLmlkKS5jYXRjaChlcnIgPT4ge1xuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfSk7XG4gICAgaWYgKG1hbCBpbnN0YW5jZW9mIE1hbEJpbmQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICBpZiAoKG1hbCBhcyBNYWxCaW5kKS5WZXJpZmllZCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgICAgIGlmICh1c2VyIGluc3RhbmNlb2YgVXNlciA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgIGF3YWl0IE1BTC5HZXRDV0xpc3QoKG1hbCBhcyBNYWxCaW5kKS5NYWxVc2VybmFtZSlcbiAgICAgICAgLnRoZW4oYXN5bmMgbGlzdCA9PiB7XG4gICAgICAgICAgYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRVc2VyU3VicygodXNlciBhcyBVc2VyKS5JZClcbiAgICAgICAgICAgIC50aGVuKHN1YnMgPT4ge1xuICAgICAgICAgICAgICBzdWJzLmZvckVhY2goJHMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hbEFuaW1lID0gbGlzdC5maW5kKCRtYSA9PiAkbWEuYW5pbWVfaWQgPT09ICRzLk1lZGlhSWQpO1xuICAgICAgICAgICAgICAgIGlmIChtYWxBbmltZSAhPT0gbnVsbCAmJiBtYWxBbmltZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIFN1YnNjcmlwdGlvbkRhdGEuRGVsZXRlKCRzLk1lZGlhSWQsICh1c2VyIGFzIFVzZXIpLkRpc2NvcmRJZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGxldCBpdGVyYXRpb24gPSAwO1xuICAgICAgICAgIGxpc3QuZm9yRWFjaChhc3luYyBhbmltZSA9PiB7XG4gICAgICAgICAgICBpdGVyYXRpb24rKztcbiAgICAgICAgICAgIGF3YWl0IEFuaW1lQ2FjaGUuR2V0KGFuaW1lLmFuaW1lX2lkKVxuICAgICAgICAgICAgICAudGhlbihhc3luYyBtZWRpYSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgICAgICAgICAgIGF3YWl0IE1lZGlhRGF0YS5JbnNlcnQobWVkaWEsIHRpdGxlKS50aGVuKGFzeW5jIGluc2VydElkID0+IHtcbiAgICAgICAgICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuSW5zZXJ0KG1lZGlhLmlkTWFsLCAodXNlciBhcyBVc2VyKS5JZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2soaXRlcmF0aW9uLCBsaXN0LCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb246IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWFzb24gPT09IFwiRVhJU1RTXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBBbHJlYWR5IHN1YnNjcmliZWQuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgbGlzdCwgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgbGlzdCwgcmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb246IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMuQ2hlY2soaXRlcmF0aW9uLCBsaXN0LCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLkNoZWNrKGl0ZXJhdGlvbiwgbGlzdCwgcmVzb2x2ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLlNlbmRTdGF0dXMobWVzc2FnZSwgZG0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgQ2hlY2soaXRlcmF0aW9uOiBudW1iZXIsIGFuaW1lTGlzdDogTWFsQW5pbWVbXSwgcmVzb2x2ZTogKCkgPT4gdm9pZCkge1xuICAgIGlmIChpdGVyYXRpb24gPT09IGFuaW1lTGlzdC5sZW5ndGgpIHtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIFNlbmRTdGF0dXMobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICBTZW5kZXIuU2VuZChcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBgT29wcyEgWW91ciBNQUwgYWNjb3VudCBpcyBub3QgdmVyaWZpZWQgYW5kIGJpbmRlZC5cXG4gRW50ZXIgdGhlIGNvbW1hbmQgKiotbWFsYmluZCBtYWx1c2VybmFtZSoqYCxcbiAgICAgIGRtXG4gICAgKTtcbiAgfVxufVxuIl19