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
                const user = await client_1.ClientManager.GetUser(subscriber.DiscordId);
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
                await this.Sleep(1000);
                const support = await this.SupportTemplate();
                await user.send(support).catch(err => {
                    console.log(err);
                });
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
            const client = await client_1.ClientManager.GetClient();
            const t = title_helper_1.TitleHelper.Get(media.title);
            const embed = {
                embed: {
                    color: colors_1.Color.Random,
                    thumbnail: {
                        url: media.coverImage.large
                    },
                    title: `***${t}***`,
                    url: `https://myanimelist.net/anime/${media.idMal}/`,
                    description: `**Episode ${episode}** *has been aired!*`,
                    fields: [
                        {
                            name: `To unsub, type:`,
                            value: `\`${prefix}unsub ${t}\``
                        },
                        {
                            name: `To view subscriptions, type:`,
                            value: `\`${prefix}viewsubs\``
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
    SupportTemplate() {
        return new Promise((resolve, reject) => {
            const embed = {
                embed: {
                    color: colors_1.Color.Random,
                    fields: [
                        {
                            name: `Support me on Discord Bot List (DBL)`,
                            value: `[Vote to ${config_1.Config.BOT_NAME}](${config_1.Config.DBL_BOT_LINK}/vote)`
                        }
                    ]
                }
            };
            resolve(embed);
        });
    }
    Sleep(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, timeout);
        });
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxREFBaUQ7QUFDakQsbUNBQXNDO0FBQ3RDLDJDQUErQztBQUUvQywwREFBc0Q7QUFFdEQsMkNBQXVDO0FBQ3ZDLGlFQUE2RDtBQUU3RCx1REFBbUQ7QUFDbkQscURBQWlEO0FBQ2pELHdFQUEyRDtBQUMzRCwyQ0FBd0M7QUFFeEMsTUFBYSxRQUFRO0lBRW5CLFlBQW1CLEtBQWEsRUFBUyxLQUFZO1FBQWxDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFPO0lBQUcsQ0FBQztJQUVsRCxLQUFLLENBQUMsS0FBSztRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDNUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLEtBQUssR0FBRywwQkFBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQy9ELElBQUksMEJBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLEVBQUUsQ0FBQzthQUNYO2lCQUFNLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxpQkFB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QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTdKRCw0QkE2SkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBRdWV1ZSB9IGZyb20gXCIuL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuaW1wb3J0IHsgUXVldWVEYXRhIH0gZnJvbSBcIi4vLi4vZGF0YS9xdWV1ZS5kYXRhXCI7XG5pbXBvcnQgbW9tZW50LCB7IHVuaXggfSBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgeyBJTWVkaWEgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9wYWdlLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcbmltcG9ydCB7IE1lZGlhU2VhcmNoIH0gZnJvbSBcIi4uL2NvcmUvbWVkaWEuc2VhcmNoXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCIuLi9jb3JlL2NvbG9yc1wiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IE1lZGlhU3RhdHVzIH0gZnJvbSBcIi4uL2NvcmUvbWVkaWEuc3RhdHVzXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcbmltcG9ydCB7IE51bGxDaGVjayB9IGZyb20gXCIuLi9oZWxwZXJzL251bGwuY2hlY2tlci5oZWxwZXJcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb3JlL2NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgUXVldWVKb2Ige1xuICBwcml2YXRlIEpvYkRhdGU6IERhdGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBtZWRpYTogSU1lZGlhLCBwdWJsaWMgcXVldWU6IFF1ZXVlKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBDaGVjaygpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcXVldWVFcGlzb2RlID0gdGhpcy5xdWV1ZS5OZXh0RXBpc29kZTtcbiAgICAgIGNvbnN0IG1lZGlhID0gdGhpcy5tZWRpYTtcbiAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcbiAgICAgIHRoaXMuSm9iRGF0ZSA9IHVuaXgobWVkaWEubmV4dEFpcmluZ0VwaXNvZGUuYWlyaW5nQXQpLnRvRGF0ZSgpO1xuICAgICAgaWYgKE1lZGlhU3RhdHVzLkNvbXBsZXRlZChtZWRpYSkgJiYgbWVkaWEuZXBpc29kZXMgPT09IDEpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5GaW5kVXNlcih0aXRsZSwgcXVldWVFcGlzb2RlLCBtZWRpYSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSBpZiAocXVldWVFcGlzb2RlIDwgbWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dCkge1xuICAgICAgICBhd2FpdCB0aGlzLkZpbmRVc2VyKHRpdGxlLCBxdWV1ZUVwaXNvZGUsIG1lZGlhKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBGaW5kVXNlcih0aXRsZTogc3RyaW5nLCBuZXh0RXBpc29kZTogbnVtYmVyLCBtZWRpYTogSU1lZGlhKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBHZXR0aW5nIHN1YnNjcmliZXJzIG9mIFwiJHt0aXRsZX1cImApO1xuICAgICAgY29uc3Qgc3Vic2NyaWJlcnMgPSBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkdldFN1YnNjcmliZXJzKFxuICAgICAgICB0aGlzLm1lZGlhLmlkTWFsXG4gICAgICApO1xuICAgICAgaWYgKHN1YnNjcmliZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLlVwZGF0ZSgpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN1YnNjcmliZXIgPSBzdWJzY3JpYmVyc1tpXTtcbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0VXNlcihzdWJzY3JpYmVyLkRpc2NvcmRJZCk7XG4gICAgICAgIGlmIChOdWxsQ2hlY2suRmluZSh1c2VyKSkge1xuICAgICAgICAgIGF3YWl0IHRoaXMuU2VuZE1lc3NhZ2UodGl0bGUsIG5leHRFcGlzb2RlLCBtZWRpYSwgdXNlcik7XG4gICAgICAgICAgaWYgKGkgPT09IHN1YnNjcmliZXJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuVXBkYXRlKCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpID09PSBzdWJzY3JpYmVycy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLlVwZGF0ZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBTZW5kTWVzc2FnZShcbiAgICB0aXRsZTogc3RyaW5nLFxuICAgIG5leHRFcGlzb2RlOiBudW1iZXIsXG4gICAgbWVkaWE6IElNZWRpYSxcbiAgICB1c2VyOiBVc2VyXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShtZWRpYSwgbmV4dEVwaXNvZGUpO1xuICAgICAgYXdhaXQgdXNlclxuICAgICAgICAuc2VuZChlbWJlZClcbiAgICAgICAgLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYERNIGhhcyBiZWVuIHNlbnQgdG8gXCIke1xuICAgICAgICAgICAgICB1c2VyLnVzZXJuYW1lXG4gICAgICAgICAgICB9XCIgZm9yIFwiJHt0aXRsZX0gRXBpc29kZSAke25leHRFcGlzb2RlfVwiYFxuICAgICAgICAgICk7XG4gICAgICAgICAgYXdhaXQgdGhpcy5TbGVlcCgxMDAwKTtcbiAgICAgICAgICBjb25zdCBzdXBwb3J0ID0gYXdhaXQgdGhpcy5TdXBwb3J0VGVtcGxhdGUoKTtcbiAgICAgICAgICBhd2FpdCB1c2VyLnNlbmQoc3VwcG9ydCkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIFVwZGF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVkaWEgPSBhd2FpdCBBbmltZUNhY2hlLkdldCh0aGlzLm1lZGlhLmlkTWFsKTtcbiAgICAgIGlmIChOdWxsQ2hlY2suRmluZShtZWRpYSkpIHtcbiAgICAgICAgYXdhaXQgUXVldWVEYXRhLlVwZGF0ZShtZWRpYSwgdGhpcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBSZW1vdmVkIFF1ZXVlOiAke21lZGlhLmlkTWFsfWApO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgYEVycm9yIHdoaWxlIHNlYXJjaGluZyA6IFtNZWRpYVNlYXJjaC5GaW5kKCR7XG4gICAgICAgICAgICB0aGlzLm1lZGlhLmlkTWFsXG4gICAgICAgICAgfSldLiBUcnlpbmcgYWdhaW4uLi5gXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IHRoaXMuVXBkYXRlKCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgRW1iZWRUZW1wbGF0ZShtZWRpYTogSU1lZGlhLCBlcGlzb2RlOiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBwcmVmaXggPSBDb25maWcuQ09NTUFORF9QUkVGSVg7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgICAgY29uc3QgdCA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XG4gICAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogQ29sb3IuUmFuZG9tLFxuICAgICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgICAgdXJsOiBtZWRpYS5jb3ZlckltYWdlLmxhcmdlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dH0qKipgLFxuICAgICAgICAgIHVybDogYGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7bWVkaWEuaWRNYWx9L2AsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqKkVwaXNvZGUgJHtlcGlzb2RlfSoqICpoYXMgYmVlbiBhaXJlZCEqYCxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFRvIHVuc3ViLCB0eXBlOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgJHtwcmVmaXh9dW5zdWIgJHt0fVxcYGBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6IGBUbyB2aWV3IHN1YnNjcmlwdGlvbnMsIHR5cGU6YCxcbiAgICAgICAgICAgICAgdmFsdWU6IGBcXGAke3ByZWZpeH12aWV3c3Vic1xcYGBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICB0ZXh0OiBgwqkgJHtDb25maWcuQk9UX05BTUV9YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc29sdmUoZW1iZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBTdXBwb3J0VGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IENvbG9yLlJhbmRvbSxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFN1cHBvcnQgbWUgb24gRGlzY29yZCBCb3QgTGlzdCAoREJMKWAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgW1ZvdGUgdG8gJHtDb25maWcuQk9UX05BTUV9XSgke0NvbmZpZy5EQkxfQk9UX0xJTkt9L3ZvdGUpYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc29sdmUoZW1iZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBTbGVlcCh0aW1lb3V0OiBudW1iZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0sIHRpbWVvdXQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=