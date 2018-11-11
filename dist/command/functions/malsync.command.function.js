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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZnVuY3Rpb25zL21hbHN5bmMuY29tbWFuZC5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLDREQUF1RDtBQUN2RCw4Q0FBMkM7QUFDM0Msb0RBQWdEO0FBQ2hELG9FQUFnRTtBQUNoRSw4Q0FBa0Q7QUFDbEQsd0NBQXFDO0FBQ3JDLHdEQUFvRDtBQUNwRCxzREFBa0Q7QUFDbEQsMERBQXNEO0FBRXRELE1BQWEsZUFBZTtJQUMxQixLQUFLLENBQUMsT0FBTyxDQUNYLE9BQWlCLEVBQ2pCLE9BQWtCLEVBQ2xCLEVBQVk7UUFFWixNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9DLE1BQU0sS0FBSyxHQUFHLDJFQUEyRSxDQUFDO1FBQzFGLGVBQU0sQ0FBQyxJQUFJLENBQ1QsT0FBTyxFQUNQO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2dCQUN2QyxTQUFTLEVBQUUsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7Z0JBQzVDLEtBQUssRUFBRSw2QkFBNkI7Z0JBQ3BDLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixNQUFNLEVBQUU7b0JBQ047d0JBQ0UsSUFBSSxFQUFFLHVCQUF1Qjt3QkFDN0IsS0FBSyxFQUFFLHdDQUF3QztxQkFDaEQ7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLGlDQUFpQzt3QkFDdkMsS0FBSyxFQUFFLGVBQWU7cUJBQ3ZCO29CQUNEO3dCQUNFLElBQUksRUFBRSxlQUFlO3dCQUNyQixLQUFLLEVBQUUsbUZBQW1GO3FCQUMzRjtpQkFDRjtnQkFDRCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7Z0JBQ3JCLE1BQU0sRUFBRTtvQkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO29CQUMvQixJQUFJLEVBQUUsWUFBWTtpQkFDbkI7YUFDRjtTQUNGLEVBQ0QsRUFBRSxDQUNILENBQUM7SUFDSixDQUFDO0lBRU8sTUFBTSxDQUFDLE9BQWdCLEVBQUUsRUFBVztRQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxvQkFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLEtBQUssQ0FBQyxHQUFHLENBQ2YsT0FBbUIsRUFDbkIsTUFBOEIsRUFDOUIsT0FBZ0IsRUFDaEIsRUFBVztRQUVYLE1BQU0sR0FBRyxHQUFHLE1BQU0sMkJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyRCxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxHQUFHLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUN6QixNQUFNLElBQUksR0FBRyxNQUFNLG9CQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkQsSUFBSSxJQUFJLEtBQUssSUFBSTtnQkFBRSxPQUFPO1lBQzFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sU0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEQsSUFBSSxJQUFJLEtBQUssSUFBSTtnQkFBRSxPQUFPO1lBQzFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sb0NBQWdCLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDcEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQy9ELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO2lCQUNoRDtxQkFBTTtvQkFDTCxNQUFNLG9DQUFnQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDM0Q7YUFDRjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNwQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU0sS0FBSyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLDBCQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLDBCQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNoRSxNQUFNLHNCQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsRSxNQUFNLG9DQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ3pCLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2lCQUNGO3FCQUFNO29CQUNMLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUN6QixPQUFPLEVBQUUsQ0FBQztxQkFDWDtpQkFDRjthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVPLFVBQVUsQ0FBQyxPQUFnQixFQUFFLEVBQVc7UUFDOUMsZUFBTSxDQUFDLElBQUksQ0FDVCxPQUFPLEVBQ1AsaUdBQWlHLEVBQ2pHLEVBQUUsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBMUdELDBDQTBHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBNYWxCaW5kRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL21hbC5iaW5kLmRhdGFcIjtcbmltcG9ydCB7IFNlbmRlciB9IGZyb20gXCIuLi8uLi9jb3JlL3NlbmRlclwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS91c2VyLmRhdGFcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgTUFMIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWFsXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCB7IE1lZGlhU3RhdHVzIH0gZnJvbSBcIi4uLy4uL2NvcmUvbWVkaWEuc3RhdHVzXCI7XG5cbmV4cG9ydCBjbGFzcyBNYWxTeW5jRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcbiAgYXN5bmMgRXhlY3V0ZShcbiAgICBtZXNzYWdlPzogTWVzc2FnZSxcbiAgICBjb21tYW5kPzogSUNvbW1hbmQsXG4gICAgZG0/OiBib29sZWFuXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuR2V0QWxsKG1lc3NhZ2UsIGRtKS5jYXRjaChlcnIgPT4ge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIHRoaXMuU2VuZFN0YXR1cyhtZXNzYWdlLCBkbSk7XG4gICAgfSk7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcbiAgICBjb25zdCByZXMkbSA9IGBZb3VyICpNQUwgY3VycmVudGx5IHdhdGNoaW5nIGxpc3QqIGlzIG5vdyBzeW5jZWQgd2l0aCB5b3VyIHN1YnNjcmlwdGlvbnMuYDtcbiAgICBTZW5kZXIuU2VuZChcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IG1lc3NhZ2UubWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxuICAgICAgICAgIHRodW1ibmFpbDogeyB1cmw6IG1lc3NhZ2UuYXV0aG9yLmF2YXRhclVSTCB9LFxuICAgICAgICAgIHRpdGxlOiBgUmlraW1hcnUgTUFMIEF1dG8gU3Vic2NyaWJlYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogcmVzJG0sXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB1bnN1YnNjcmliZSwgdHlwZTpgLFxuICAgICAgICAgICAgICB2YWx1ZTogYFxcYC11bnN1YiBhbmltZSB0aXRsZSBvciBrZXl3b3JkIGhlcmVcXGBgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgVG8gdmlldyBhbGwgc3Vic2NyaXB0aW9uLCB0eXBlOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgLXZpZXdzdWJzXFxgYFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFBsZWFzZSBOb3RlOiBgLFxuICAgICAgICAgICAgICB2YWx1ZTogYElmIHlvdSd2ZSBqdXN0IG1vZGlmaWVkIHlvdXIgbGlzdCwgcGxlYXNlIHdhaXQgYXQgbGVhc3QgMSBtaW51dGUgdG8gKiotbWFsc3luYyoqLmBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkbVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIEdldEFsbChtZXNzYWdlOiBNZXNzYWdlLCBkbTogYm9vbGVhbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCBVc2VyRGF0YS5JbnNlcnQobWVzc2FnZS5hdXRob3IuaWQpLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgIHRoaXMuUnVuKHJlc29sdmUsIHJlamVjdCwgbWVzc2FnZSwgZG0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBSdW4oXG4gICAgcmVzb2x2ZTogKCkgPT4gdm9pZCxcbiAgICByZWplY3Q6IChyZWFzb24/OiBhbnkpID0+IHZvaWQsXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcbiAgICBkbTogYm9vbGVhblxuICApIHtcbiAgICBjb25zdCBtYWwgPSBhd2FpdCBNYWxCaW5kRGF0YS5HZXQobWVzc2FnZS5hdXRob3IuaWQpO1xuICAgIGlmIChtYWwgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuU2VuZFN0YXR1cyhtZXNzYWdlLCBkbSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1hbC5WZXJpZmllZCA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIobWVzc2FnZS5hdXRob3IuaWQpO1xuICAgICAgaWYgKHVzZXIgPT09IG51bGwpIHJldHVybjtcbiAgICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBNQUwuR2V0Q1dMaXN0KG1hbC5NYWxVc2VybmFtZSk7XG4gICAgICBpZiAobGlzdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3Qgc3VicyA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0VXNlclN1YnModXNlci5JZCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgJHMgPSBzdWJzW2ldO1xuICAgICAgICBjb25zdCBtYWxBbmltZSA9IGxpc3QuZmluZCgkbWEgPT4gJG1hLmFuaW1lX2lkID09PSAkcy5NZWRpYUlkKTtcbiAgICAgICAgaWYgKG1hbEFuaW1lICE9PSBudWxsICYmIG1hbEFuaW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkRlbGV0ZSgkcy5NZWRpYUlkLCB1c2VyLkRpc2NvcmRJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGZyb21MaXN0ID0gbGlzdFtpXTtcbiAgICAgICAgY29uc3QgYW5pbWUgPSBhd2FpdCBBbmltZUNhY2hlLkdldChmcm9tTGlzdC5hbmltZV9pZCk7XG4gICAgICAgIGlmIChNZWRpYVN0YXR1cy5PbmdvaW5nKGFuaW1lKSB8fCBNZWRpYVN0YXR1cy5Ob3RZZXRBaXJlZChhbmltZSkpIHtcbiAgICAgICAgICBhd2FpdCBRdWV1ZURhdGEuSW5zZXJ0KGFuaW1lLmlkTWFsLCBhbmltZS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KTtcbiAgICAgICAgICBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkluc2VydChhbmltZS5pZE1hbCwgdXNlci5JZCk7XG4gICAgICAgICAgaWYgKGkgPT09IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaSA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuU2VuZFN0YXR1cyhtZXNzYWdlLCBkbSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBTZW5kU3RhdHVzKG1lc3NhZ2U6IE1lc3NhZ2UsIGRtOiBib29sZWFuKSB7XG4gICAgU2VuZGVyLlNlbmQoXG4gICAgICBtZXNzYWdlLFxuICAgICAgYE9vcHMhIFlvdXIgTUFMIGFjY291bnQgaXMgbm90IHZlcmlmaWVkIGFuZCBiaW5kZWQuXFxuIEVudGVyIHRoZSBjb21tYW5kICoqLW1hbGJpbmQgbWFsdXNlcm5hbWUqKmAsXG4gICAgICBkbVxuICAgICk7XG4gIH1cbn1cbiJdfQ==