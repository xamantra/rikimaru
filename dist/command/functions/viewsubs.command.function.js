"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = require("./../../data/user.data");
const subscription_data_1 = require("./../../data/subscription.data");
const title_helper_1 = require("../../helpers/title.helper");
const time_helper_1 = require("../../helpers/time.helper");
const client_1 = require("../../core/client");
const array_sort_1 = __importDefault(require("array-sort"));
const sub_model_1 = require("../../models/sub.model");
const anime_cache_1 = require("../../core/anime.cache");
const config_1 = require("../../core/config");
class ViewSubsFunction {
    constructor() { }
    async Execute(message, command, dm) {
        const embed = await this.Embed(message, dm);
        if (dm === true) {
            message.author
                .send(embed)
                .then(($m) => {
                console.log(`Message <${$m.id}> was sent to <${message.author.username}>.`);
            })
                .catch((err) => {
                message.reply(`Oh! it seems that I can't DM you.`);
                console.log(err.name);
            });
        }
        else {
            message.reply(embed);
        }
    }
    async Embed(message, dm) {
        return new Promise(async (resolve, reject) => {
            let mentionId = null;
            if (message.mentions.members.size === 1) {
                mentionId = message.mentions.members.first().id;
            }
            const discordId = mentionId === null ? message.author.id : mentionId;
            const sorted = [];
            let unsorted = [];
            const dUser = await client_1.ClientManager.Client.fetchUser(discordId);
            if (dUser === null)
                return;
            const u = await user_data_1.UserData.GetUser(discordId);
            if (u === null) {
                const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                resolve(template);
                return;
            }
            const subs = await subscription_data_1.SubscriptionData.GetUserSubs(u.Id);
            if (subs.length === 0) {
                const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                resolve(template);
                return;
            }
            for (let v = 0; v < subs.length; v++) {
                const sub = subs[v];
                const $m = await anime_cache_1.AnimeCache.Get(sub.MediaId);
                const title = title_helper_1.TitleHelper.Get($m.title);
                const episode = $m.nextAiringEpisode.next;
                let episodes = "";
                if ($m.episodes !== null && $m.episodes !== undefined) {
                    episodes = $m.episodes === 0 ? `?` : `${$m.episodes}`;
                }
                else {
                    episodes = `?`;
                }
                const countdown = time_helper_1.TimeHelper.Countdown($m.nextAiringEpisode.timeUntilAiring);
                const pre = new sub_model_1.SubMedia({
                    timeUntilAiring: $m.nextAiringEpisode.timeUntilAiring,
                    field: {
                        name: `\n${title}`,
                        value: `[MyAnimeList](${config_1.Config.MAL_ANIME_BASE}/${$m.idMal})  |  [AniList](${config_1.Config.ANI_ANIME_BASE}/${$m.id})\nEpisode **${episode}**/${episodes} in ***${countdown}***\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`
                    }
                });
                unsorted.push(pre.data);
                if (v === subs.length - 1) {
                    unsorted = array_sort_1.default(unsorted, ["timeUntilAiring"]);
                    for (let b = 0; b < unsorted.length; b++) {
                        const element = unsorted[b];
                        sorted.push(element.field);
                    }
                    const template = await this.EmbedTemplate(message, dUser, subs.length, sorted);
                    resolve(template);
                }
            }
        });
    }
    async EmbedTemplate(message, user, count, list) {
        return new Promise(async (resolve, reject) => {
            const member = message.guild.members.get(user.id);
            const client = client_1.ClientManager.Client;
            resolve({
                embed: {
                    color: member.highestRole.color,
                    thumbnail: {
                        url: member.user.avatarURL
                    },
                    title: `***${user.username}***'s *Subscription List*`,
                    description: `**${count} Anime**\n\nPlease Note: *The airing schedule for the streaming site you are using might be different.*\n`,
                    fields: list,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: `© ${config_1.Config.BOT_NAME}`
                    }
                }
            });
        });
    }
}
exports.ViewSubsFunction = ViewSubsFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3N1YnMuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy92aWV3c3Vicy5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQWtEO0FBQ2xELHNFQUFrRTtBQUdsRSw2REFBeUQ7QUFDekQsMkRBQXVEO0FBQ3ZELDhDQUFrRDtBQUNsRCw0REFBbUM7QUFDbkMsc0RBQWtEO0FBQ2xELHdEQUFvRDtBQUNwRCw4Q0FBMkM7QUFFM0MsTUFBYSxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTTtpQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNYLElBQUksQ0FBQyxDQUFDLEVBQVcsRUFBRSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUNULFlBQVksRUFBRSxDQUFDLEVBQUUsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQy9ELENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFD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Q0FBQyxDQUFDO1lBQ2xELE1BQU0sTUFBTSxHQUFHLHNCQUFhLENBQUMsTUFBTSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQztnQkFDTixLQUFLLEVBQUU7b0JBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDL0IsU0FBUyxFQUFFO3dCQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7cUJBQzNCO29CQUNELEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxRQUFRLDJCQUEyQjtvQkFDckQsV0FBVyxFQUFFLEtBQUssS0FBSywyR0FBMkc7b0JBQ2xJLE1BQU0sRUFBRSxJQUFJO29CQUNaLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDckIsTUFBTSxFQUFFO3dCQUNOLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7d0JBQy9CLElBQUksRUFBRSxLQUFLLGVBQU0sQ0FBQyxRQUFRLEVBQUU7cUJBQzdCO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUEvSEQsNENBK0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgTWVzc2FnZSwgVXNlciwgRGlzY29yZEFQSUVycm9yIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGltZS5oZWxwZXJcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCBhcnJheVNvcnQgZnJvbSBcImFycmF5LXNvcnRcIjtcbmltcG9ydCB7IFN1Yk1lZGlhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWIubW9kZWxcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvcmUvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBWaWV3U3Vic0Z1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcbiAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWQobWVzc2FnZSwgZG0pO1xuICAgIGlmIChkbSA9PT0gdHJ1ZSkge1xuICAgICAgbWVzc2FnZS5hdXRob3JcbiAgICAgICAgLnNlbmQoZW1iZWQpXG4gICAgICAgIC50aGVuKCgkbTogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYE1lc3NhZ2UgPCR7JG0uaWR9PiB3YXMgc2VudCB0byA8JHttZXNzYWdlLmF1dGhvci51c2VybmFtZX0+LmBcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycjogRGlzY29yZEFQSUVycm9yKSA9PiB7XG4gICAgICAgICAgbWVzc2FnZS5yZXBseShgT2ghIGl0IHNlZW1zIHRoYXQgSSBjYW4ndCBETSB5b3UuYCk7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZS5yZXBseShlbWJlZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBFbWJlZChtZXNzYWdlOiBNZXNzYWdlLCBkbTogYm9vbGVhbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBtZW50aW9uSWQ6IHN0cmluZyA9IG51bGw7XG4gICAgICBpZiAobWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDEpIHtcbiAgICAgICAgbWVudGlvbklkID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCkuaWQ7XG4gICAgICB9XG4gICAgICBjb25zdCBkaXNjb3JkSWQ6IHN0cmluZyA9XG4gICAgICAgIG1lbnRpb25JZCA9PT0gbnVsbCA/IG1lc3NhZ2UuYXV0aG9yLmlkIDogbWVudGlvbklkO1xuICAgICAgY29uc3Qgc29ydGVkOiBhbnlbXSA9IFtdO1xuICAgICAgbGV0IHVuc29ydGVkOiBhbnlbXSA9IFtdO1xuICAgICAgY29uc3QgZFVzZXIgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkNsaWVudC5mZXRjaFVzZXIoZGlzY29yZElkKTtcbiAgICAgIGlmIChkVXNlciA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3QgdSA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKTtcbiAgICAgIGlmICh1ID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgZFVzZXIgYXMgVXNlcixcbiAgICAgICAgICAwLFxuICAgICAgICAgIHNvcnRlZFxuICAgICAgICApO1xuICAgICAgICByZXNvbHZlKHRlbXBsYXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3VicyA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0VXNlclN1YnModS5JZCk7XG4gICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBkVXNlciBhcyBVc2VyLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgc29ydGVkXG4gICAgICAgICk7XG4gICAgICAgIHJlc29sdmUodGVtcGxhdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHN1YnMubGVuZ3RoOyB2KyspIHtcbiAgICAgICAgY29uc3Qgc3ViID0gc3Vic1t2XTtcbiAgICAgICAgY29uc3QgJG0gPSBhd2FpdCBBbmltZUNhY2hlLkdldChzdWIuTWVkaWFJZCk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KCRtLnRpdGxlKTtcbiAgICAgICAgY29uc3QgZXBpc29kZSA9ICRtLm5leHRBaXJpbmdFcGlzb2RlLm5leHQ7XG4gICAgICAgIGxldCBlcGlzb2RlcyA9IFwiXCI7XG4gICAgICAgIGlmICgkbS5lcGlzb2RlcyAhPT0gbnVsbCAmJiAkbS5lcGlzb2RlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXBpc29kZXMgPSAkbS5lcGlzb2RlcyA9PT0gMCA/IGA/YCA6IGAkeyRtLmVwaXNvZGVzfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXBpc29kZXMgPSBgP2A7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY291bnRkb3duID0gVGltZUhlbHBlci5Db3VudGRvd24oXG4gICAgICAgICAgJG0ubmV4dEFpcmluZ0VwaXNvZGUudGltZVVudGlsQWlyaW5nXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHByZSA9IG5ldyBTdWJNZWRpYSh7XG4gICAgICAgICAgdGltZVVudGlsQWlyaW5nOiAkbS5uZXh0QWlyaW5nRXBpc29kZS50aW1lVW50aWxBaXJpbmcsXG4gICAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgIG5hbWU6IGBcXG4ke3RpdGxlfWAsXG4gICAgICAgICAgICB2YWx1ZTogYFtNeUFuaW1lTGlzdF0oJHtDb25maWcuTUFMX0FOSU1FX0JBU0V9LyR7XG4gICAgICAgICAgICAgICRtLmlkTWFsXG4gICAgICAgICAgICB9KSAgfCAgW0FuaUxpc3RdKCR7Q29uZmlnLkFOSV9BTklNRV9CQVNFfS8ke1xuICAgICAgICAgICAgICAkbS5pZFxuICAgICAgICAgICAgfSlcXG5FcGlzb2RlICoqJHtlcGlzb2RlfSoqLyR7ZXBpc29kZXN9IGluICoqKiR7Y291bnRkb3dufSoqKlxcbuKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrGBcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB1bnNvcnRlZC5wdXNoKHByZS5kYXRhKTtcbiAgICAgICAgaWYgKHYgPT09IHN1YnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHVuc29ydGVkID0gYXJyYXlTb3J0KHVuc29ydGVkLCBbXCJ0aW1lVW50aWxBaXJpbmdcIl0pO1xuICAgICAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgdW5zb3J0ZWQubGVuZ3RoOyBiKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB1bnNvcnRlZFtiXTtcbiAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZW1lbnQuZmllbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICBkVXNlciBhcyBVc2VyLFxuICAgICAgICAgICAgc3Vicy5sZW5ndGgsXG4gICAgICAgICAgICBzb3J0ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc29sdmUodGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIEVtYmVkVGVtcGxhdGUoXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcbiAgICB1c2VyOiBVc2VyLFxuICAgIGNvdW50OiBudW1iZXIsXG4gICAgbGlzdDogYW55W11cbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVtYmVyID0gbWVzc2FnZS5ndWlsZC5tZW1iZXJzLmdldCh1c2VyLmlkKTtcbiAgICAgIGNvbnN0IGNsaWVudCA9IENsaWVudE1hbmFnZXIuQ2xpZW50O1xuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IG1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgIHVybDogbWVtYmVyLnVzZXIuYXZhdGFyVVJMXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dXNlci51c2VybmFtZX0qKioncyAqU3Vic2NyaXB0aW9uIExpc3QqYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYCoqJHtjb3VudH0gQW5pbWUqKlxcblxcblBsZWFzZSBOb3RlOiAqVGhlIGFpcmluZyBzY2hlZHVsZSBmb3IgdGhlIHN0cmVhbWluZyBzaXRlIHlvdSBhcmUgdXNpbmcgbWlnaHQgYmUgZGlmZmVyZW50LipcXG5gLFxuICAgICAgICAgIGZpZWxkczogbGlzdCxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogYMKpICR7Q29uZmlnLkJPVF9OQU1FfWBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=