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
            user_data_1.UserData.GetUser(discordId)
                .then(async (u) => {
                const subs = await subscription_data_1.SubscriptionData.GetUserSubs(u.Id);
                if (subs.length === 0) {
                    const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                    resolve(template);
                    return;
                }
                for (let v = 0; v < subs.length; v++) {
                    const sub = subs[v];
                    anime_cache_1.AnimeCache.Get(sub.MediaId)
                        .then(async ($m) => {
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
                    })
                        .catch(async (err) => {
                        const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                        resolve(template);
                        console.log(err.message);
                    });
                }
            })
                .catch(async (reason) => {
                const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                resolve(template);
                console.log(reason.message);
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3N1YnMuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy92aWV3c3Vicy5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQWtEO0FBQ2xELHNFQUFrRTtBQUVsRSwyQ0FBNEQ7QUFFNUQsNkRBQXlEO0FBQ3pELDJEQUF1RDtBQUN2RCw4Q0FBa0Q7QUFDbEQsNERBQW1DO0FBQ25DLHNEQUFrRDtBQUNsRCx3REFBb0Q7QUFFcEQsTUFBYSxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTTtpQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNYLElBQUksQ0FBQyxDQUFDLEVBQVcsRUFBRSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUNULFlBQVksRUFBRSxDQUFDLEVBQUUsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQy9ELENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFD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IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvbWVkaWEuZGF0YVwiO1xuaW1wb3J0IHsgTWVzc2FnZSwgVXNlciwgRGlzY29yZEFQSUVycm9yIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGltZS5oZWxwZXJcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCBhcnJheVNvcnQgZnJvbSBcImFycmF5LXNvcnRcIjtcbmltcG9ydCB7IFN1Yk1lZGlhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWIubW9kZWxcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuXG5leHBvcnQgY2xhc3MgVmlld1N1YnNGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcHVibGljIGFzeW5jIEV4ZWN1dGUobWVzc2FnZT86IE1lc3NhZ2UsIGNvbW1hbmQ/OiBJQ29tbWFuZCwgZG0/OiBib29sZWFuKSB7XG4gICAgY29uc3QgZW1iZWQgPSBhd2FpdCB0aGlzLkVtYmVkKG1lc3NhZ2UsIGRtKTtcbiAgICBpZiAoZG0gPT09IHRydWUpIHtcbiAgICAgIG1lc3NhZ2UuYXV0aG9yXG4gICAgICAgIC5zZW5kKGVtYmVkKVxuICAgICAgICAudGhlbigoJG06IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBNZXNzYWdlIDwkeyRtLmlkfT4gd2FzIHNlbnQgdG8gPCR7bWVzc2FnZS5hdXRob3IudXNlcm5hbWV9Pi5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnI6IERpc2NvcmRBUElFcnJvcikgPT4ge1xuICAgICAgICAgIG1lc3NhZ2UucmVwbHkoYE9oISBpdCBzZWVtcyB0aGF0IEkgY2FuJ3QgRE0geW91LmApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UucmVwbHkoZW1iZWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgRW1iZWQobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgbWVudGlvbklkOiBzdHJpbmcgPSBudWxsO1xuICAgICAgaWYgKG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAxKSB7XG4gICAgICAgIG1lbnRpb25JZCA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5maXJzdCgpLmlkO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlzY29yZElkOiBzdHJpbmcgPVxuICAgICAgICBtZW50aW9uSWQgPT09IG51bGwgPyBtZXNzYWdlLmF1dGhvci5pZCA6IG1lbnRpb25JZDtcbiAgICAgIGNvbnN0IHNvcnRlZDogYW55W10gPSBbXTtcbiAgICAgIGxldCB1bnNvcnRlZDogYW55W10gPSBbXTtcbiAgICAgIGNvbnN0IGRVc2VyID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRVc2VyKGRpc2NvcmRJZCkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGRVc2VyIGluc3RhbmNlb2YgVXNlciA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgIFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKVxuICAgICAgICAudGhlbihhc3luYyB1ID0+IHtcbiAgICAgICAgICBjb25zdCBzdWJzID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRVc2VyU3Vicyh1LklkKTtcbiAgICAgICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxuICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICBkVXNlciBhcyBVc2VyLFxuICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICBzb3J0ZWRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgdiA9IDA7IHYgPCBzdWJzLmxlbmd0aDsgdisrKSB7XG4gICAgICAgICAgICBjb25zdCBzdWIgPSBzdWJzW3ZdO1xuICAgICAgICAgICAgQW5pbWVDYWNoZS5HZXQoc3ViLk1lZGlhSWQpXG4gICAgICAgICAgICAgIC50aGVuKGFzeW5jICRtID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldCgkbS50aXRsZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZXBpc29kZSA9ICRtLm5leHRBaXJpbmdFcGlzb2RlLm5leHQ7XG4gICAgICAgICAgICAgICAgbGV0IGVwaXNvZGVzID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoJG0uZXBpc29kZXMgIT09IG51bGwgJiYgJG0uZXBpc29kZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgZXBpc29kZXMgPSAkbS5lcGlzb2RlcyA9PT0gMCA/IGA/YCA6IGAkeyRtLmVwaXNvZGVzfWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGVwaXNvZGVzID0gYD9gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBjb3VudGRvd24gPSBUaW1lSGVscGVyLkNvdW50ZG93bihcbiAgICAgICAgICAgICAgICAgICRtLm5leHRBaXJpbmdFcGlzb2RlLnRpbWVVbnRpbEFpcmluZ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJlID0gbmV3IFN1Yk1lZGlhKHtcbiAgICAgICAgICAgICAgICAgIHRpbWVVbnRpbEFpcmluZzogJG0ubmV4dEFpcmluZ0VwaXNvZGUudGltZVVudGlsQWlyaW5nLFxuICAgICAgICAgICAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogYFxcbiR7dGl0bGV9YCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGBbTXlBbmltZUxpc3RdKGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7XG4gICAgICAgICAgICAgICAgICAgICAgJG0uaWRNYWxcbiAgICAgICAgICAgICAgICAgICAgfS8pXFxuRXBpc29kZSAqKiR7ZXBpc29kZX0qKi8ke2VwaXNvZGVzfSBpbiAqKioke2NvdW50ZG93bn0qKipcXG7ilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqxgXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdW5zb3J0ZWQucHVzaChwcmUuZGF0YSk7XG4gICAgICAgICAgICAgICAgaWYgKHYgPT09IHN1YnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgICAgdW5zb3J0ZWQgPSBhcnJheVNvcnQodW5zb3J0ZWQsIFtcInRpbWVVbnRpbEFpcmluZ1wiXSk7XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBiID0gMDsgYiA8IHVuc29ydGVkLmxlbmd0aDsgYisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB1bnNvcnRlZFtiXTtcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkLnB1c2goZWxlbWVudC5maWVsZCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgZFVzZXIgYXMgVXNlcixcbiAgICAgICAgICAgICAgICAgICAgc3Vicy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIHNvcnRlZFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUodGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGFzeW5jIChlcnI6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUoXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgZFVzZXIgYXMgVXNlcixcbiAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICBzb3J0ZWRcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goYXN5bmMgKHJlYXNvbjogRXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICBkVXNlciBhcyBVc2VyLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHNvcnRlZFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVhc29uLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgRW1iZWRUZW1wbGF0ZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIHVzZXI6IFVzZXIsXG4gICAgY291bnQ6IG51bWJlcixcbiAgICBsaXN0OiBhbnlbXVxuICApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXIgPSBtZXNzYWdlLmd1aWxkLm1lbWJlcnMuZ2V0KHVzZXIuaWQpO1xuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBtZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgICAgICB1cmw6IG1lbWJlci51c2VyLmF2YXRhclVSTFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGl0bGU6IGAqKioke3VzZXIudXNlcm5hbWV9KioqJ3MgKlN1YnNjcmlwdGlvbiBMaXN0KmAsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqKiR7Y291bnR9IEFuaW1lKipcXG5cXG5QbGVhc2UgTm90ZTogKlRoZSBhaXJpbmcgc2NoZWR1bGUgZm9yIHRoZSBzdHJlYW1pbmcgc2l0ZSB5b3UgYXJlIHVzaW5nIG1pZ2h0IGJlIGRpZmZlcmVudC4qXFxuYCxcbiAgICAgICAgICBmaWVsZHM6IGxpc3QsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IFwiwqkgUmlraW1hcnVcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==