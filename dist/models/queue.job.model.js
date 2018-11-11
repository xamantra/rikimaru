"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const queue_data_1 = require("./../data/queue.data");
const moment_1 = __importStar(require("moment"));
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
                }
                if (i === subscribers.length - 1) {
                    resolve();
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
                await this.Update();
                const support = await this.SupportTemplate();
                user.send(support).catch(err => {
                    console.log(err);
                });
                resolve();
            })
                .catch(err => {
                console.log(err);
            });
        });
    }
    Log() {
        const countdown = moment_1.default(this.JobDate).toNow(true);
        const title = title_helper_1.TitleHelper.Get(this.media.title);
        console.log(`Queue Job { Queue Episode: "${this.queue.NextEpisode}", "${title} Episode ${this.media.nextAiringEpisode.next}"  in  ${countdown} }`);
    }
    Update() {
        return new Promise(async (resolve, reject) => {
            const media = await anime_cache_1.AnimeCache.Get(this.media.idMal);
            if (media !== null) {
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
                        { name: `To unsub, type:`, value: `\`-unsub ${t}\`` },
                        {
                            name: `To view subscriptions, type:`,
                            value: `\`-viewsubs\``
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Rikimaru"
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
                            value: `[Vote to Rikimaru](${config_1.Config.DBL_BOT_LINK}/vote)`
                        }
                    ]
                }
            };
            resolve(embed);
        });
    }
}
exports.QueueJob = QueueJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuam9iLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9xdWV1ZS5qb2IubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EscURBQWlEO0FBQ2pELGlEQUFzQztBQUN0QywyQ0FBK0M7QUFFL0MsMERBQXNEO0FBRXRELDJDQUF1QztBQUN2QyxpRUFBNkQ7QUFFN0QsdURBQW1EO0FBQ25ELHFEQUFpRDtBQUNqRCx3RUFBMkQ7QUFDM0QsMkNBQXdDO0FBRXhDLE1BQWEsUUFBUTtJQUVuQixZQUFtQixLQUFhLEVBQVMsS0FBWTtRQUFsQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBTztJQUFHLENBQUM7SUFFbEQsS0FBSyxDQUFDLEtBQUs7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzNDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQzVDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsTUFBTSxLQUFLLEdBQUcsMEJBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvRCxJQUFJLDBCQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO2dCQUN4RCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTSxJQUFJLFlBQVksR0FBRyxLQUFLLENB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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVldWUgfSBmcm9tIFwiLi9zdWJzY3JpcHRpb24ubW9kZWxcIjtcbmltcG9ydCB7IFF1ZXVlRGF0YSB9IGZyb20gXCIuLy4uL2RhdGEvcXVldWUuZGF0YVwiO1xuaW1wb3J0IG1vbWVudCwgeyB1bml4IH0gZnJvbSBcIm1vbWVudFwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgSU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvcGFnZS5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBNZWRpYVNlYXJjaCB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnNlYXJjaFwiO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi4vY29yZS9jb2xvcnNcIjtcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBNZWRpYVN0YXR1cyB9IGZyb20gXCIuLi9jb3JlL21lZGlhLnN0YXR1c1wiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5pbXBvcnQgeyBOdWxsQ2hlY2sgfSBmcm9tIFwiLi4vaGVscGVycy9udWxsLmNoZWNrZXIuaGVscGVyXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vY29yZS9jb25maWdcIjtcblxuZXhwb3J0IGNsYXNzIFF1ZXVlSm9iIHtcbiAgcHJpdmF0ZSBKb2JEYXRlOiBEYXRlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgbWVkaWE6IElNZWRpYSwgcHVibGljIHF1ZXVlOiBRdWV1ZSkge31cblxuICBwdWJsaWMgYXN5bmMgQ2hlY2soKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHF1ZXVlRXBpc29kZSA9IHRoaXMucXVldWUuTmV4dEVwaXNvZGU7XG4gICAgICBjb25zdCBtZWRpYSA9IHRoaXMubWVkaWE7XG4gICAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XG4gICAgICB0aGlzLkpvYkRhdGUgPSB1bml4KG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLmFpcmluZ0F0KS50b0RhdGUoKTtcbiAgICAgIGlmIChNZWRpYVN0YXR1cy5Db21wbGV0ZWQobWVkaWEpICYmIG1lZGlhLmVwaXNvZGVzID09PSAxKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuRmluZFVzZXIodGl0bGUsIHF1ZXVlRXBpc29kZSwgbWVkaWEpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9IGVsc2UgaWYgKHF1ZXVlRXBpc29kZSA8IG1lZGlhLm5leHRBaXJpbmdFcGlzb2RlLm5leHQpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5GaW5kVXNlcih0aXRsZSwgcXVldWVFcGlzb2RlLCBtZWRpYSk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgRmluZFVzZXIodGl0bGU6IHN0cmluZywgbmV4dEVwaXNvZGU6IG51bWJlciwgbWVkaWE6IElNZWRpYSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgR2V0dGluZyBzdWJzY3JpYmVycyBvZiBcIiR7dGl0bGV9XCJgKTtcbiAgICAgIGNvbnN0IHN1YnNjcmliZXJzID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRTdWJzY3JpYmVycyhcbiAgICAgICAgdGhpcy5tZWRpYS5pZE1hbFxuICAgICAgKTtcbiAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5VcGRhdGUoKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzdWJzY3JpYmVyID0gc3Vic2NyaWJlcnNbaV07XG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldFVzZXIoc3Vic2NyaWJlci5EaXNjb3JkSWQpO1xuICAgICAgICBpZiAoTnVsbENoZWNrLkZpbmUodXNlcikpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLlNlbmRNZXNzYWdlKHRpdGxlLCBuZXh0RXBpc29kZSwgbWVkaWEsIHVzZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpID09PSBzdWJzY3JpYmVycy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIFNlbmRNZXNzYWdlKFxuICAgIHRpdGxlOiBzdHJpbmcsXG4gICAgbmV4dEVwaXNvZGU6IG51bWJlcixcbiAgICBtZWRpYTogSU1lZGlhLFxuICAgIHVzZXI6IFVzZXJcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKG1lZGlhLCBuZXh0RXBpc29kZSk7XG4gICAgICBhd2FpdCB1c2VyXG4gICAgICAgIC5zZW5kKGVtYmVkKVxuICAgICAgICAudGhlbihhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgRE0gaGFzIGJlZW4gc2VudCB0byBcIiR7XG4gICAgICAgICAgICAgIHVzZXIudXNlcm5hbWVcbiAgICAgICAgICAgIH1cIiBmb3IgXCIke3RpdGxlfSBFcGlzb2RlICR7bmV4dEVwaXNvZGV9XCJgXG4gICAgICAgICAgKTtcbiAgICAgICAgICBhd2FpdCB0aGlzLlVwZGF0ZSgpO1xuICAgICAgICAgIGNvbnN0IHN1cHBvcnQgPSBhd2FpdCB0aGlzLlN1cHBvcnRUZW1wbGF0ZSgpO1xuICAgICAgICAgIHVzZXIuc2VuZChzdXBwb3J0KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIExvZygpIHtcbiAgICBjb25zdCBjb3VudGRvd24gPSBtb21lbnQodGhpcy5Kb2JEYXRlKS50b05vdyh0cnVlKTtcbiAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldCh0aGlzLm1lZGlhLnRpdGxlKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIGBRdWV1ZSBKb2IgeyBRdWV1ZSBFcGlzb2RlOiBcIiR7XG4gICAgICAgIHRoaXMucXVldWUuTmV4dEVwaXNvZGVcbiAgICAgIH1cIiwgXCIke3RpdGxlfSBFcGlzb2RlICR7XG4gICAgICAgIHRoaXMubWVkaWEubmV4dEFpcmluZ0VwaXNvZGUubmV4dFxuICAgICAgfVwiICBpbiAgJHtjb3VudGRvd259IH1gXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgVXBkYXRlKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZWRpYSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KHRoaXMubWVkaWEuaWRNYWwpO1xuICAgICAgaWYgKG1lZGlhICE9PSBudWxsKSB7XG4gICAgICAgIGF3YWl0IFF1ZXVlRGF0YS5VcGRhdGUobWVkaWEsIHRoaXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhgUmVtb3ZlZCBRdWV1ZTogJHttZWRpYS5pZE1hbH1gKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgIGBFcnJvciB3aGlsZSBzZWFyY2hpbmcgOiBbTWVkaWFTZWFyY2guRmluZCgke1xuICAgICAgICAgICAgdGhpcy5tZWRpYS5pZE1hbFxuICAgICAgICAgIH0pXS4gVHJ5aW5nIGFnYWluLi4uYFxuICAgICAgICApO1xuICAgICAgICBhd2FpdCB0aGlzLlVwZGF0ZSgpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIEVtYmVkVGVtcGxhdGUobWVkaWE6IElNZWRpYSwgZXBpc29kZTogbnVtYmVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcbiAgICAgIGNvbnN0IHQgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IENvbG9yLlJhbmRvbSxcbiAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgIHVybDogbWVkaWEuY292ZXJJbWFnZS5sYXJnZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGl0bGU6IGAqKioke3R9KioqYCxcbiAgICAgICAgICB1cmw6IGBodHRwczovL215YW5pbWVsaXN0Lm5ldC9hbmltZS8ke21lZGlhLmlkTWFsfS9gLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKipFcGlzb2RlICR7ZXBpc29kZX0qKiAqaGFzIGJlZW4gYWlyZWQhKmAsXG4gICAgICAgICAgZmllbGRzOiBbXG4gICAgICAgICAgICB7IG5hbWU6IGBUbyB1bnN1YiwgdHlwZTpgLCB2YWx1ZTogYFxcYC11bnN1YiAke3R9XFxgYCB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiBgVG8gdmlldyBzdWJzY3JpcHRpb25zLCB0eXBlOmAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgXFxgLXZpZXdzdWJzXFxgYFxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IFwiwqkgUmlraW1hcnVcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc29sdmUoZW1iZWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBTdXBwb3J0VGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IENvbG9yLlJhbmRvbSxcbiAgICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogYFN1cHBvcnQgbWUgb24gRGlzY29yZCBCb3QgTGlzdCAoREJMKWAsXG4gICAgICAgICAgICAgIHZhbHVlOiBgW1ZvdGUgdG8gUmlraW1hcnVdKCR7Q29uZmlnLkRCTF9CT1RfTElOS30vdm90ZSlgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzb2x2ZShlbWJlZCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==