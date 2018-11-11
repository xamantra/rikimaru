"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = require("./../../data/user.data");
const subscription_data_1 = require("./../../data/subscription.data");
const discord_js_1 = require("discord.js");
const title_helper_1 = require("../../helpers/title.helper");
const time_helper_1 = require("../../helpers/time.helper");
const client_1 = require("../../core/client");
const array_sort_1 = __importDefault(require("array-sort"));
const sub_model_1 = require("../../models/sub.model");
const anime_cache_1 = require("../../core/anime.cache");
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
            const dUser = await client_1.ClientManager.GetUser(discordId).catch(err => {
                console.log(err);
            });
            if (dUser instanceof discord_js_1.User === false)
                return;
            const u = await user_data_1.UserData.GetUser(discordId);
            if (u === null)
                return;
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
                        value: `[MyAnimeList](https://myanimelist.net/anime/${$m.idMal}/)\nEpisode **${episode}**/${episodes} in ***${countdown}***\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`
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
            const client = await client_1.ClientManager.GetClient();
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
                        text: "© Rikimaru"
                    }
                }
            });
        });
    }
}
exports.ViewSubsFunction = ViewSubsFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3N1YnMuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy92aWV3c3Vicy5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQWtEO0FBQ2xELHNFQUFrRTtBQUVsRSwyQ0FBNEQ7QUFFNUQsNkRBQXlEO0FBQ3pELDJEQUF1RDtBQUN2RCw4Q0FBa0Q7QUFDbEQsNERBQW1DO0FBQ25DLHNEQUFrRDtBQUNsRCx3REFBb0Q7QUFFcEQsTUFBYSxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTTtpQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNYLElBQUksQ0FBQyxDQUFDLEVBQVcsRUFBRSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUNULFlBQVksRUFBRSxDQUFDLEVBQUUsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQy9ELENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFD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TUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUMvQixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztxQkFDM0I7b0JBQ0QsS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDLFFBQVEsMkJBQTJCO29CQUNyRCxXQUFXLEVBQUUsS0FBSyxLQUFLLDJHQUEyRztvQkFDbEksTUFBTSxFQUFFLElBQUk7b0JBQ1osU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLEVBQUU7d0JBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUzt3QkFDL0IsSUFBSSxFQUFFLFlBQVk7cUJBQ25CO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF0SEQsNENBc0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgTWVkaWFEYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9tZWRpYS5kYXRhXCI7XG5pbXBvcnQgeyBNZXNzYWdlLCBVc2VyLCBEaXNjb3JkQVBJRXJyb3IgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcbmltcG9ydCB7IFRpbWVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vaGVscGVycy90aW1lLmhlbHBlclwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IGFycmF5U29ydCBmcm9tIFwiYXJyYXktc29ydFwiO1xuaW1wb3J0IHsgU3ViTWVkaWEgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1Yi5tb2RlbFwiO1xuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaW1lLmNhY2hlXCI7XG5cbmV4cG9ydCBjbGFzcyBWaWV3U3Vic0Z1bmN0aW9uIGltcGxlbWVudHMgSUNvbW1hbmRGdW5jdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBwdWJsaWMgYXN5bmMgRXhlY3V0ZShtZXNzYWdlPzogTWVzc2FnZSwgY29tbWFuZD86IElDb21tYW5kLCBkbT86IGJvb2xlYW4pIHtcbiAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWQobWVzc2FnZSwgZG0pO1xuICAgIGlmIChkbSA9PT0gdHJ1ZSkge1xuICAgICAgbWVzc2FnZS5hdXRob3JcbiAgICAgICAgLnNlbmQoZW1iZWQpXG4gICAgICAgIC50aGVuKCgkbTogTWVzc2FnZSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgICAgYE1lc3NhZ2UgPCR7JG0uaWR9PiB3YXMgc2VudCB0byA8JHttZXNzYWdlLmF1dGhvci51c2VybmFtZX0+LmBcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycjogRGlzY29yZEFQSUVycm9yKSA9PiB7XG4gICAgICAgICAgbWVzc2FnZS5yZXBseShgT2ghIGl0IHNlZW1zIHRoYXQgSSBjYW4ndCBETSB5b3UuYCk7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZS5yZXBseShlbWJlZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBFbWJlZChtZXNzYWdlOiBNZXNzYWdlLCBkbTogYm9vbGVhbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGxldCBtZW50aW9uSWQ6IHN0cmluZyA9IG51bGw7XG4gICAgICBpZiAobWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDEpIHtcbiAgICAgICAgbWVudGlvbklkID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCkuaWQ7XG4gICAgICB9XG4gICAgICBjb25zdCBkaXNjb3JkSWQ6IHN0cmluZyA9XG4gICAgICAgIG1lbnRpb25JZCA9PT0gbnVsbCA/IG1lc3NhZ2UuYXV0aG9yLmlkIDogbWVudGlvbklkO1xuICAgICAgY29uc3Qgc29ydGVkOiBhbnlbXSA9IFtdO1xuICAgICAgbGV0IHVuc29ydGVkOiBhbnlbXSA9IFtdO1xuICAgICAgY29uc3QgZFVzZXIgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldFVzZXIoZGlzY29yZElkKS5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfSk7XG4gICAgICBpZiAoZFVzZXIgaW5zdGFuY2VvZiBVc2VyID09PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgY29uc3QgdSA9IGF3YWl0IFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKTtcbiAgICAgIGlmICh1ID09PSBudWxsKSByZXR1cm47XG4gICAgICBjb25zdCBzdWJzID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRVc2VyU3Vicyh1LklkKTtcbiAgICAgIGlmIChzdWJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIGRVc2VyIGFzIFVzZXIsXG4gICAgICAgICAgMCxcbiAgICAgICAgICBzb3J0ZWRcbiAgICAgICAgKTtcbiAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IHYgPSAwOyB2IDwgc3Vicy5sZW5ndGg7IHYrKykge1xuICAgICAgICBjb25zdCBzdWIgPSBzdWJzW3ZdO1xuICAgICAgICBjb25zdCAkbSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KHN1Yi5NZWRpYUlkKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQoJG0udGl0bGUpO1xuICAgICAgICBjb25zdCBlcGlzb2RlID0gJG0ubmV4dEFpcmluZ0VwaXNvZGUubmV4dDtcbiAgICAgICAgbGV0IGVwaXNvZGVzID0gXCJcIjtcbiAgICAgICAgaWYgKCRtLmVwaXNvZGVzICE9PSBudWxsICYmICRtLmVwaXNvZGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBlcGlzb2RlcyA9ICRtLmVwaXNvZGVzID09PSAwID8gYD9gIDogYCR7JG0uZXBpc29kZXN9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcGlzb2RlcyA9IGA/YDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3VudGRvd24gPSBUaW1lSGVscGVyLkNvdW50ZG93bihcbiAgICAgICAgICAkbS5uZXh0QWlyaW5nRXBpc29kZS50aW1lVW50aWxBaXJpbmdcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcHJlID0gbmV3IFN1Yk1lZGlhKHtcbiAgICAgICAgICB0aW1lVW50aWxBaXJpbmc6ICRtLm5leHRBaXJpbmdFcGlzb2RlLnRpbWVVbnRpbEFpcmluZyxcbiAgICAgICAgICBmaWVsZDoge1xuICAgICAgICAgICAgbmFtZTogYFxcbiR7dGl0bGV9YCxcbiAgICAgICAgICAgIHZhbHVlOiBgW015QW5pbWVMaXN0XShodHRwczovL215YW5pbWVsaXN0Lm5ldC9hbmltZS8ke1xuICAgICAgICAgICAgICAkbS5pZE1hbFxuICAgICAgICAgICAgfS8pXFxuRXBpc29kZSAqKiR7ZXBpc29kZX0qKi8ke2VwaXNvZGVzfSBpbiAqKioke2NvdW50ZG93bn0qKipcXG7ilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqxgXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdW5zb3J0ZWQucHVzaChwcmUuZGF0YSk7XG4gICAgICAgIGlmICh2ID09PSBzdWJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICB1bnNvcnRlZCA9IGFycmF5U29ydCh1bnNvcnRlZCwgW1widGltZVVudGlsQWlyaW5nXCJdKTtcbiAgICAgICAgICBmb3IgKGxldCBiID0gMDsgYiA8IHVuc29ydGVkLmxlbmd0aDsgYisrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdW5zb3J0ZWRbYl07XG4gICAgICAgICAgICBzb3J0ZWQucHVzaChlbGVtZW50LmZpZWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUoXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgZFVzZXIgYXMgVXNlcixcbiAgICAgICAgICAgIHN1YnMubGVuZ3RoLFxuICAgICAgICAgICAgc29ydGVkXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBFbWJlZFRlbXBsYXRlKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgdXNlcjogVXNlcixcbiAgICBjb3VudDogbnVtYmVyLFxuICAgIGxpc3Q6IGFueVtdXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1lbWJlciA9IG1lc3NhZ2UuZ3VpbGQubWVtYmVycy5nZXQodXNlci5pZCk7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IG1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgIHVybDogbWVtYmVyLnVzZXIuYXZhdGFyVVJMXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dXNlci51c2VybmFtZX0qKioncyAqU3Vic2NyaXB0aW9uIExpc3QqYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYCoqJHtjb3VudH0gQW5pbWUqKlxcblxcblBsZWFzZSBOb3RlOiAqVGhlIGFpcmluZyBzY2hlZHVsZSBmb3IgdGhlIHN0cmVhbWluZyBzaXRlIHlvdSBhcmUgdXNpbmcgbWlnaHQgYmUgZGlmZmVyZW50LipcXG5gLFxuICAgICAgICAgIGZpZWxkczogbGlzdCxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19