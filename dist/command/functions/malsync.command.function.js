"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_bind_data_1 = require("../../data/mal.bind.data");
const sender_1 = require("../../core/sender");
const user_data_1 = require("../../data/user.data");
const subscription_data_1 = require("../../data/subscription.data");
const client_1 = require("../../core/client");
const mal_1 = require("../../core/mal");
const anime_cache_1 = require("../../core/anime.cache");
const queue_data_1 = require("../../data/queue.data");
const media_status_1 = require("../../core/media.status");
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
        const mal = await mal_bind_data_1.MalBindData.Get(message.author.id);
        if (mal === null) {
            this.SendStatus(message, dm);
            return;
        }
        if (mal.Verified === true) {
            const user = await user_data_1.UserData.GetUser(message.author.id);
            if (user === null)
                return;
            const list = await mal_1.MAL.GetCWList(mal.MalUsername);
            if (list === null)
                return;
            const subs = await subscription_data_1.SubscriptionData.GetUserSubs(user.Id);
            for (let i = 0; i < subs.length; i++) {
                const $s = subs[i];
                const malAnime = list.find($ma => $ma.anime_id === $s.MediaId);
                if (malAnime !== null && malAnime !== undefined) {
                }
                else {
                    await subscription_data_1.SubscriptionData.Delete($s.MediaId, user.DiscordId);
                }
            }
            for (let i = 0; i < list.length; i++) {
                const fromList = list[i];
                const anime = await anime_cache_1.AnimeCache.Get(fromList.anime_id);
                if (media_status_1.MediaStatus.Ongoing(anime) || media_status_1.MediaStatus.NotYetAired(anime)) {
                    await queue_data_1.QueueData.Insert(anime.idMal, anime.nextAiringEpisode.next);
                    await subscription_data_1.SubscriptionData.Insert(anime.idMal, user.Id);
                    if (i === list.length - 1) {
                        resolve();
                    }
                }
                else {
                    if (i === list.length - 1) {
                        resolve();
                    }
                }
            }
        }
        else {
            this.SendStatus(message, dm);
        }
    }
    SendStatus(message, dm) {
        sender_1.Sender.Send(message, `Oops! Your MAL account is not verified and binded.\n Enter the command **-malbind malusername**`, dm);
    }
}
exports.MalSyncFunction = MalSyncFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbHN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUF1RDtBQUV2RCw4Q0FBMkM7QUFHM0Msb0RBQWdEO0FBQ2hELG9FQUFnRTtBQUNoRSw4Q0FBa0Q7QUFDbEQsd0NBQXFDO0FBSXJDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFDbEQsMERBQXNEO0FBRXRELE1BQWEsZUFBZTtJQUMxQixLQUFLLENBQUMsT0FBTyxDQUNYLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9DLE1BQU0sS0FBSyxHQUFHLDJFQUEyRSxDQUFDO1FBQzFGLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2dCQUN2QyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQzVDLEtBQUssRUFBRSw2QkFBNkI7Z0JBQ3BDLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixNQUFNLEVBQUU7b0JBQ047d0JBQ0UsSUFBSSxFQUFFLHVCQUF1Qjt3QkFDN0IsS0FBSyxFQUFFLHdDQUF3QztxQkFDaEQ7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLGlDQUFpQzt3QkFDdkMsS0FBSyxFQUFFLGVBQWU7cUJBQ3ZCO29CQUNEO3dCQUNFLElBQUksRUFBRSxlQUFlO3dCQUNyQixLQUFLLEVBQUUsbUZBQW1GO3FCQUMzRjtpQkFDRjtnQkFDRCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7Z0JBQ3JCLE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO29CQUMvQixJQUFJLEVBQUUsWUFBWTtpQkFDbkI7YUFDRjtTQUNGLEVBQ0QsRUFBRSxDQUNILENBQUM7SUFDSixDQUFDO0lBRU8sTUFBTSxDQUFDLE9BQWdCLEVBQUUsRUFBVztRQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLEtBQUssQ0FBQyxHQUFHLENBQ2YsT0FBbUIsRUFDbkIsTUFBOEIsRUFDOUIsT0FBZ0IsRUFDaEIsRUFBVztRQUVYLE1BQU0sR0FBRyxHQUFHLE1BQU0sMkJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRCxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUN6QixNQUFNLElBQUksR0FBRyxNQUFNLG9CQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkQsSUFBSSxJQUFJLEtBQUssSUFBSTtnQkFBRSxPQUFPO1lBQzFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEQsSUFBSSxJQUFJLEtBQUssSUFBSTtnQkFBRSxPQUFPO1lBQzFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sb0NBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9ELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO2lCQUNoRDtxQkFBTTtvQkFDTCxNQUFNLG9DQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDM0Q7YUFDRjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sS0FBSyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLDBCQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLDBCQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNoRSxNQUFNLHNCQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsRSxNQUFNLG9DQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ3pCLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2lCQUNGO3FCQUFNO29CQUNMLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QixPQUFPLEVBQUUsQ0FBQztxQkFDWDtpQkFDRjthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVPLFVBQVUsQ0FBQyxPQUFnQixFQUFFLEVBQVc7UUFDOUMsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1AsaUdBQWlHLEVBQ2pHLEVBQUUsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBMUdELDBDQTBHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNYWxCaW5kRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL21hbC5iaW5kLmRhdGFcIjtcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWVkaWEuc2VhcmNoXCI7XG5pbXBvcnQgeyBTZW5kZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9zZW5kZXJcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBNZWRpYURhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9tZWRpYS5kYXRhXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBNQUwgfSBmcm9tIFwiLi4vLi4vY29yZS9tYWxcIjtcbmltcG9ydCB7IE1hbEFuaW1lIH0gZnJvbSBcIi4uLy4uL21vZGVscy9tYWwuYW5pbWUubW9kZWxcIjtcbmltcG9ydCB7IE1hbEJpbmQgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL21hbC5iaW5kLm1vZGVsXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWJzY3JpcHRpb24ubW9kZWxcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4uLy4uL2RhdGEvcXVldWUuZGF0YVwiO1xuaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi4vLi4vY29yZS9tZWRpYS5zdGF0dXNcIjtcblxuZXhwb3J0IGNsYXNzIE1hbFN5bmNGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBhc3luYyBFeGVjdXRlKFxuICAgIG1lc3NhZ2U/OiBNZXNzYWdlLFxuICAgIGNvbW1hbmQ/OiBJQ29tbWFuZCxcbiAgICBkbT86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5HZXRBbGwobWVzc2FnZSwgZG0pLmNhdGNoKGVyciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcbiAgICB9KTtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgIGNvbnN0IHJlcyRtID0gYFlvdXIgKk1BTCBjdXJyZW50bHkgd2F0Y2hpbmcgbGlzdCogaXMgbm93IHN5bmNlZCB3aXRoIHlvdXIgc3Vic2NyaXB0aW9ucy5gO1xuICAgIFNlbmRlci5TZW5kKFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogbWVzc2FnZS5tZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7IHVybDogbWVzc2FnZS5hdXRob3IuYXZhdGFyVVJMIH0sXG4gICAgICAgICAgdGl0bGU6IGBSaWtpbWFydSBNQUwgQXV0byBTdWJzY3JpYmVgLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiByZXMkbSxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHVuc3Vic2NyaWJlLCB0eXBlOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgLXVuc3ViIGFuaW1lIHRpdGxlIG9yIGtleXdvcmQgaGVyZVxcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IGFsbCBzdWJzY3JpcHRpb24sIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAtdmlld3N1YnNcXGBgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgUGxlYXNlIE5vdGU6IGAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgSWYgeW91J3ZlIGp1c3QgbW9kaWZpZWQgeW91ciBsaXN0LCBwbGVhc2Ugd2FpdCBhdCBsZWFzdCAxIG1pbnV0ZSB0byAqKi1tYWxzeW5jKiouYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IFwiwqkgUmlraW1hcnVcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRtXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgR2V0QWxsKG1lc3NhZ2U6IE1lc3NhZ2UsIGRtOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IFVzZXJEYXRhLkluc2VydChtZXNzYWdlLmF1dGhvci5pZCkuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAgdGhpcy5SdW4ocmVzb2x2ZSwgcmVqZWN0LCBtZXNzYWdlLCBkbSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIFJ1bihcbiAgICByZXNvbHZlOiAoKSA9PiB2b2lkLFxuICAgIHJlamVjdDogKHJlYXNvbj86IGFueSkgPT4gdm9pZCxcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIGRtOiBib29sZWFuXG4gICkge1xuICAgIGNvbnN0IG1hbCA9IGF3YWl0IE1hbEJpbmREYXRhLkdldChtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgaWYgKG1hbCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWFsLlZlcmlmaWVkID09PSB0cnVlKSB7XG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihtZXNzYWdlLmF1dGhvci5pZCk7XG4gICAgICBpZiAodXNlciA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IE1BTC5HZXRDV0xpc3QobWFsLk1hbFVzZXJuYW1lKTtcbiAgICAgIGlmIChsaXN0ID09PSBudWxsKSByZXR1cm47XG4gICAgICBjb25zdCBzdWJzID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRVc2VyU3Vicyh1c2VyLklkKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vicy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCAkcyA9IHN1YnNbaV07XG4gICAgICAgIGNvbnN0IG1hbEFuaW1lID0gbGlzdC5maW5kKCRtYSA9PiAkbWEuYW5pbWVfaWQgPT09ICRzLk1lZGlhSWQpO1xuICAgICAgICBpZiAobWFsQW5pbWUgIT09IG51bGwgJiYgbWFsQW5pbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuRGVsZXRlKCRzLk1lZGlhSWQsIHVzZXIuRGlzY29yZElkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZnJvbUxpc3QgPSBsaXN0W2ldO1xuICAgICAgICBjb25zdCBhbmltZSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KGZyb21MaXN0LmFuaW1lX2lkKTtcbiAgICAgICAgaWYgKE1lZGlhU3RhdHVzLk9uZ29pbmcoYW5pbWUpIHx8IE1lZGlhU3RhdHVzLk5vdFlldEFpcmVkKGFuaW1lKSkge1xuICAgICAgICAgIGF3YWl0IFF1ZXVlRGF0YS5JbnNlcnQoYW5pbWUuaWRNYWwsIGFuaW1lLm5leHRBaXJpbmdFcGlzb2RlLm5leHQpO1xuICAgICAgICAgIGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuSW5zZXJ0KGFuaW1lLmlkTWFsLCB1c2VyLklkKTtcbiAgICAgICAgICBpZiAoaSA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpID09PSBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5TZW5kU3RhdHVzKG1lc3NhZ2UsIGRtKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIFNlbmRTdGF0dXMobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICBTZW5kZXIuU2VuZChcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBgT29wcyEgWW91ciBNQUwgYWNjb3VudCBpcyBub3QgdmVyaWZpZWQgYW5kIGJpbmRlZC5cXG4gRW50ZXIgdGhlIGNvbW1hbmQgKiotbWFsYmluZCBtYWx1c2VybmFtZSoqYCxcbiAgICAgIGRtXG4gICAgKTtcbiAgfVxufVxuIl19