"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./../data/queue.data");
const moment_1 = require("moment");
const client_1 = require("../core/client");
const title_helper_1 = require("../helpers/title.helper");
const colors_1 = require("../core/colors");
const subscription_data_1 = require("../data/subscription.data");
const media_status_1 = require("../core/media.status");
const anime_cache_1 = require("../core/anime.cache");
const null_checker_helper_1 = require("../helpers/null.checker.helper");
const config_1 = require("../core/config");
class QueueJob {
    constructor(media, queue) {
        this.media = media;
        this.queue = queue;
    }
    async Check() {
        return new Promise(async (resolve, reject) => {
            const queueEpisode = this.queue.NextEpisode;
            const media = this.media;
            const title = title_helper_1.TitleHelper.Get(media.title);
            this.JobDate = moment_1.unix(media.nextAiringEpisode.airingAt).toDate();
            if (media_status_1.MediaStatus.Completed(media) && media.episodes === 1) {
                await this.FindUser(title, queueEpisode, media);
                resolve();
            }
            else if (queueEpisode < media.nextAiringEpisode.next) {
                await this.FindUser(title, queueEpisode, media);
                resolve();
            }
        });
    }
    FindUser(title, nextEpisode, media) {
        return new Promise(async (resolve, reject) => {
            console.log(`Getting subscribers of "${title}"`);
            const subscribers = await subscription_data_1.SubscriptionData.GetSubscribers(this.media.idMal);
            if (subscribers.length === 0) {
                this.Update();
                resolve();
            }
            for (let i = 0; i < subscribers.length; i++) {
                const subscriber = subscribers[i];
                const user = await client_1.ClientManager.Client.fetchUser(subscriber.DiscordId);
                if (null_checker_helper_1.NullCheck.Fine(user)) {
                    await this.SendMessage(title, nextEpisode, media, user);
                    if (i === subscribers.length - 1) {
                        await this.Update();
                        resolve();
                    }
                }
                else {
                    if (i === subscribers.length - 1) {
                        await this.Update();
                        resolve();
                    }
                }
            }
        });
    }
    SendMessage(title, nextEpisode, media, user) {
        return new Promise(async (resolve, reject) => {
            const embed = await this.EmbedTemplate(media, nextEpisode);
            await user
                .send(embed)
                .then(async () => {
                console.log(`DM has been sent to "${user.username}" for "${title} Episode ${nextEpisode}"`);
                // await this.Sleep(1000);
                // const support = await this.SupportTemplate();
                // await user.send(support).catch(err => {
                //   console.log(err);
                // });
                resolve();
            })
                .catch(err => {
                console.log(err);
                resolve();
            });
        });
    }
    Update() {
        return new Promise(async (resolve, reject) => {
            const media = await anime_cache_1.AnimeCache.Get(this.media.idMal);
            if (null_checker_helper_1.NullCheck.Fine(media)) {
                await queue_data_1.QueueData.Update(media, this);
                console.log(`Removed Queue: ${media.idMal}`);
                resolve();
            }
            else {
                console.warn(`Error while searching : [MediaSearch.Find(${this.media.idMal})]. Trying again...`);
                await this.Update();
                resolve();
            }
        });
    }
    EmbedTemplate(media, episode) {
        return new Promise(async (resolve, reject) => {
            const prefix = config_1.Config.COMMAND_PREFIX;
            const client = client_1.ClientManager.Client;
            const t = title_helper_1.TitleHelper.Get(media.title);
            let episodes = `?`;
            if (null_checker_helper_1.NullCheck.Fine(media.episodes)) {
                episodes = `${media.episodes}`;
            }
            const embed = {
                embed: {
                    color: colors_1.Color.Random,
                    thumbnail: {
                        url: media.coverImage.large
                    },
                    title: `${t}`,
                    url: `${config_1.Config.MAL_ANIME_BASE}/${media.idMal}/`,
                    description: `Episode ***${episode}***/${episodes} is now airing.`,
                    fields: [
                        {
                            name: `Links:`,
                            value: `[MyAnimeList](${config_1.Config.MAL_ANIME_BASE}/${media.idMal}/)  |  [AniList](${config_1.Config.ANI_ANIME_BASE}/${media.id}/)`
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: `© ${config_1.Config.BOT_NAME}`
                    }
                }
            };
            resolve(embed);
        });
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxREFBaUQ7QUFDakQsbUNBQXNDO0FBQ3RDLDJDQUErQztBQUUvQywwREFBc0Q7QUFFdEQsMkNBQXVDO0FBQ3ZDLGlFQUE2RDtBQUU3RCx1REFBbUQ7QUFDbkQscURBQWlEO0FBQ2pELHdFQUEyRDtBQUMzRCwyQ0FBd0M7QUFFeEMsTUFBYSxRQUFRO0lBRW5CLFlBQW1CLEtBQWEsRUFBUyxLQUFZO1FBQWxDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO0lBQUcsQ0FBQztJQUVsRCxLQUFLLENBQUMsS0FBSztRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDNUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLEtBQUssR0FBRywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9ELElBQUksMEJBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsQ0FBQzthQUNYO2lCQUFNLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3RELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsQ0FBQzthQUNYO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sUUFBUSxDQUFDLEtBQWEsRUFBRSxXQUFtQixFQUFFLEtBQWE7UUFDaEUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDakQsTUFBTSxXQUFXLEdBQUcsTUFBTSxvQ0FBZ0IsQ0FBQyxjQUFjLENBQ3ZELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUNqQixDQUFDO1lBQ0YsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0MsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLHNCQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hFLElBQUksK0JBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3hCLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLEtBQUssV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ2hDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3dCQUNwQixPQUFPLEVBQUUsQ0FBQztxQkFDWDtpQkFDRjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDaEMsTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ3BCLE9BQU8sRUFBRSxDQUFDO3FCQUNYO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxXQUFXLENBQ2pCLEtBQWEsRUFDYixXQUFtQixFQUNuQixLQUFhLEVBQ2IsSUFBVTtRQUVWLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQzNELE1BQU0sSUFBSTtpQkFDUCxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNYLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDZixPQUFPLENBQUMsR0FBRyxDQUNULHdCQUNFLElBQUksQ0FBQyxRQUNQLFVBQVUsS0FBSyxZQUFZLFdBQVcsR0FBRyxDQUMxQyxDQUFDO2dCQUNGLDBCQUEwQjtnQkFDMUIsZ0RBQWdEO2dCQUNoRCwwQ0FBMEM7Z0JBQzFDLHNCQUFzQjtnQkFDdEIsTUFBTTtnQkFDTixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLE1BQU07UUFDWixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSx3QkFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JELElBQUksK0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3pCLE1BQU0sc0JBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFDN0MsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUNWLDZDQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FDYixxQkFBcUIsQ0FDdEIsQ0FBQztnQkFDRixNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDcEIsT0FBTyxFQUFFLENBQUM7YUFDWDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGFBQWEsQ0FBQyxLQUFhLEVBQUUsT0FBZTtRQUNsRCxPQUFPLElBQUksT0FBTyxDQUFNLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDaEQsTUFBTSxNQUFNLEdBQUcsZUFBTSxDQUFDLGNBQWMsQ0FBQztZQUNyQyxNQUFNLE1BQU0sR0FBRyxzQkFBYSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxNQUFNLENBQUMsR0FBRywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkMsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ25CLElBQUksK0JBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNsQyxRQUFRLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDaEM7WUFDRCxNQUFNLEtBQUssR0FBRztnQkFDWixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLGNBQUssQ0FBQyxNQUFNO29CQUNuQixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSztxQkFDNUI7b0JBQ0QsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNiLEdBQUcsRUFBRSxHQUFHLGVBQU0sQ0FBQyxjQUFjLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRztvQkFDL0MsV0FBVyxFQUFFLGNBQWMsT0FBTyxPQUFPLFFBQVEsaUJBQWlCO29CQUNsRSxNQUFNLEVBQUU7d0JBQ047NEJBQ0UsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsS0FBSyxFQUFFLGlCQUFpQixlQUFNLENBQUMsY0FBYyxJQUMzQyxLQUFLLENBQUMsS0FDUixvQkFBb0IsZUFBTSxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsRUFBRSxJQUFJO3lCQUMxRDtxQkFDRjtvQkFDRCxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRTt3QkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUMvQixJQUFJLEVBQUUsS0FBSyxlQUFNLENBQUMsUUFBUSxFQUFFO3FCQUM3QjtpQkFDRjthQUNGLENBQUM7WUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBMEJGO0FBL0pELDRCQStKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXVlIH0gZnJvbSBcIi4vc3Vic2NyaXB0aW9uLm1vZGVsXCI7XG5pbXBvcnQgeyBRdWV1ZURhdGEgfSBmcm9tIFwiLi8uLi9kYXRhL3F1ZXVlLmRhdGFcIjtcbmltcG9ydCBtb21lbnQsIHsgdW5peCB9IGZyb20gXCJtb21lbnRcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IElNZWRpYSB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL3BhZ2UuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgTWVkaWFTZWFyY2ggfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zZWFyY2hcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcIi4uL2NvcmUvY29sb3JzXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgTWVkaWFTdGF0dXMgfSBmcm9tIFwiLi4vY29yZS9tZWRpYS5zdGF0dXNcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgTnVsbENoZWNrIH0gZnJvbSBcIi4uL2hlbHBlcnMvbnVsbC5jaGVja2VyLmhlbHBlclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBRdWV1ZUpvYiB7XG4gIHByaXZhdGUgSm9iRGF0ZTogRGF0ZTtcbiAgY29uc3RydWN0b3IocHVibGljIG1lZGlhOiBJTWVkaWEsIHB1YmxpYyBxdWV1ZTogUXVldWUpIHt9XG5cbiAgcHVibGljIGFzeW5jIENoZWNrKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBxdWV1ZUVwaXNvZGUgPSB0aGlzLnF1ZXVlLk5leHRFcGlzb2RlO1xuICAgICAgY29uc3QgbWVkaWEgPSB0aGlzLm1lZGlhO1xuICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgdGhpcy5Kb2JEYXRlID0gdW5peChtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5haXJpbmdBdCkudG9EYXRlKCk7XG4gICAgICBpZiAoTWVkaWFTdGF0dXMuQ29tcGxldGVkKG1lZGlhKSAmJiBtZWRpYS5lcGlzb2RlcyA9PT0gMSkge1xuICAgICAgICBhd2FpdCB0aGlzLkZpbmRVc2VyKHRpdGxlLCBxdWV1ZUVwaXNvZGUsIG1lZGlhKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIGlmIChxdWV1ZUVwaXNvZGUgPCBtZWRpYS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0KSB7XG4gICAgICAgIGF3YWl0IHRoaXMuRmluZFVzZXIodGl0bGUsIHF1ZXVlRXBpc29kZSwgbWVkaWEpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIEZpbmRVc2VyKHRpdGxlOiBzdHJpbmcsIG5leHRFcGlzb2RlOiBudW1iZXIsIG1lZGlhOiBJTWVkaWEpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYEdldHRpbmcgc3Vic2NyaWJlcnMgb2YgXCIke3RpdGxlfVwiYCk7XG4gICAgICBjb25zdCBzdWJzY3JpYmVycyA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0U3Vic2NyaWJlcnMoXG4gICAgICAgIHRoaXMubWVkaWEuaWRNYWxcbiAgICAgICk7XG4gICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuVXBkYXRlKCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgQ2xpZW50TWFuYWdlci5DbGllbnQuZmV0Y2hVc2VyKHN1YnNjcmliZXIuRGlzY29yZElkKTtcbiAgICAgICAgaWYgKE51bGxDaGVjay5GaW5lKHVzZXIpKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5TZW5kTWVzc2FnZSh0aXRsZSwgbmV4dEVwaXNvZGUsIG1lZGlhLCB1c2VyKTtcbiAgICAgICAgICBpZiAoaSA9PT0gc3Vic2NyaWJlcnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5VcGRhdGUoKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGkgPT09IHN1YnNjcmliZXJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuVXBkYXRlKCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIFNlbmRNZXNzYWdlKFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbmV4dEVwaXNvZGU6IG51bWJlcixcbiAgICBtZWRpYTogSU1lZGlhLFxuICAgIHVzZXI6IFVzZXJcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKG1lZGlhLCBuZXh0RXBpc29kZSk7XG4gICAgICBhd2FpdCB1c2VyXG4gICAgICAgIC5zZW5kKGVtYmVkKVxuICAgICAgICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgRE0gaGFzIGJlZW4gc2VudCB0byBcIiR7XG4gICAgICAgICAgICAgIHVzZXIudXNlcm5hbWVcbiAgICAgICAgICAgIH1cIiBmb3IgXCIke3RpdGxlfSBFcGlzb2RlICR7bmV4dEVwaXNvZGV9XCJgXG4gICAgICAgICAgKTtcbiAgICAgICAgICAvLyBhd2FpdCB0aGlzLlNsZWVwKDEwMDApO1xuICAgICAgICAgIC8vIGNvbnN0IHN1cHBvcnQgPSBhd2FpdCB0aGlzLlN1cHBvcnRUZW1wbGF0ZSgpO1xuICAgICAgICAgIC8vIGF3YWl0IHVzZXIuc2VuZChzdXBwb3J0KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIC8vICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgVXBkYXRlKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZWRpYSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KHRoaXMubWVkaWEuaWRNYWwpO1xuICAgICAgaWYgKE51bGxDaGVjay5GaW5lKG1lZGlhKSkge1xuICAgICAgICBhd2FpdCBRdWV1ZURhdGEuVXBkYXRlKG1lZGlhLCB0aGlzKTtcbiAgICAgICAgY29uc29sZS5sb2coYFJlbW92ZWQgUXVldWU6ICR7bWVkaWEuaWRNYWx9YCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICBgRXJyb3Igd2hpbGUgc2VhcmNoaW5nIDogW01lZGlhU2VhcmNoLkZpbmQoJHtcbiAgICAgICAgICAgIHRoaXMubWVkaWEuaWRNYWxcbiAgICAgICAgICB9KV0uIFRyeWluZyBhZ2Fpbi4uLmBcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5VcGRhdGUoKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBFbWJlZFRlbXBsYXRlKG1lZGlhOiBJTWVkaWEsIGVwaXNvZGU6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHByZWZpeCA9IENvbmZpZy5DT01NQU5EX1BSRUZJWDtcbiAgICAgIGNvbnN0IGNsaWVudCA9IENsaWVudE1hbmFnZXIuQ2xpZW50O1xuICAgICAgY29uc3QgdCA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XG4gICAgICBsZXQgZXBpc29kZXMgPSBgP2A7XG4gICAgICBpZiAoTnVsbENoZWNrLkZpbmUobWVkaWEuZXBpc29kZXMpKSB7XG4gICAgICAgIGVwaXNvZGVzID0gYCR7bWVkaWEuZXBpc29kZXN9YDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGVtYmVkID0ge1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBDb2xvci5SYW5kb20sXG4gICAgICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgICAgICB1cmw6IG1lZGlhLmNvdmVySW1hZ2UubGFyZ2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiBgJHt0fWAsXG4gICAgICAgICAgdXJsOiBgJHtDb25maWcuTUFMX0FOSU1FX0JBU0V9LyR7bWVkaWEuaWRNYWx9L2AsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGBFcGlzb2RlICoqKiR7ZXBpc29kZX0qKiovJHtlcGlzb2Rlc30gaXMgbm93IGFpcmluZy5gLFxuICAgICAgICAgIGZpZWxkczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgTGlua3M6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBbTXlBbmltZUxpc3RdKCR7Q29uZmlnLk1BTF9BTklNRV9CQVNFfS8ke1xuICAgICAgICAgICAgICAgIG1lZGlhLmlkTWFsXG4gICAgICAgICAgICAgIH0vKSAgfCAgW0FuaUxpc3RdKCR7Q29uZmlnLkFOSV9BTklNRV9CQVNFfS8ke21lZGlhLmlkfS8pYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBwcml2YXRlIFN1cHBvcnRUZW1wbGF0ZSgpIHtcbiAgLy8gICByZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIC8vICAgICBjb25zdCBlbWJlZCA9IHtcbiAgLy8gICAgICAgZW1iZWQ6IHtcbiAgLy8gICAgICAgICBjb2xvcjogQ29sb3IuUmFuZG9tLFxuICAvLyAgICAgICAgIGZpZWxkczogW1xuICAvLyAgICAgICAgICAge1xuICAvLyAgICAgICAgICAgICBuYW1lOiBgU3VwcG9ydCBtZSBvbiBEaXNjb3JkIEJvdCBMaXN0IChEQkwpYCxcbiAgLy8gICAgICAgICAgICAgdmFsdWU6IGBbVm90ZSB0byAke0NvbmZpZy5CT1RfTkFNRX1dKCR7Q29uZmlnLkRCTF9CT1RfTElOS30vdm90ZSlgXG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgXVxuICAvLyAgICAgICB9XG4gIC8vICAgICB9O1xuICAvLyAgICAgcmVzb2x2ZShlbWJlZCk7XG4gIC8vICAgfSk7XG4gIC8vIH1cblxuICAvLyBwcml2YXRlIFNsZWVwKHRpbWVvdXQ6IG51bWJlcikge1xuICAvLyAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIC8vICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgLy8gICAgICAgcmVzb2x2ZSgpO1xuICAvLyAgICAgfSwgdGltZW91dCk7XG4gIC8vICAgfSk7XG4gIC8vIH1cbn1cbiJdfQ==