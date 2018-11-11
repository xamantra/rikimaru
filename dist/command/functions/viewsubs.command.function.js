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
            const dUser = await client_1.ClientManager.GetUser(discordId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3N1YnMuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy92aWV3c3Vicy5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQWtEO0FBQ2xELHNFQUFrRTtBQUdsRSw2REFBeUQ7QUFDekQsMkRBQXVEO0FBQ3ZELDhDQUFrRDtBQUNsRCw0REFBbUM7QUFDbkMsc0RBQWtEO0FBQ2xELHdEQUFvRDtBQUVwRCxNQUFhLGdCQUFnQjtJQUMzQixnQkFBZSxDQUFDO0lBRVQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFpQixFQUFFLE9BQWtCLEVBQUUsRUFBWTtRQUN0RSxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksRUFBRSxLQUFLLElBQUksRUFBRTtZQUNmLE9BQU8sQ0FBQyxNQUFNO2lCQUNYLElBQUksQ0FBQyxLQUFLLENBQUM7aUJBQ1gsSUFBSSxDQUFDLENBQUMsRUFBVyxFQUFFLEVBQUU7Z0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsWUFBWSxFQUFFLENBQUMsRUFBRSxrQkFBa0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FDL0QsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFvQixFQUFFLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0wsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QjtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsS0FBSyxDQUFDLE9B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LEVBQUU7b0JBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSztvQkFDL0IsU0FBUyxFQUFFO3dCQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7cUJBQzNCO29CQUNELEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxRQUFRLDJCQUEyQjtvQkFDckQsV0FBVyxFQUFFLEtBQUssS0FBSywyR0FBMkc7b0JBQ2xJLE1BQU0sRUFBRSxJQUFJO29CQUNaLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDckIsTUFBTSxFQUFFO3dCQUNOLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7d0JBQy9CLElBQUksRUFBRSxZQUFZO3FCQUNuQjtpQkFDRjthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBN0hELDRDQTZIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IE1lc3NhZ2UsIFVzZXIsIERpc2NvcmRBUElFcnJvciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgVGltZUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3RpbWUuaGVscGVyXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgYXJyYXlTb3J0IGZyb20gXCJhcnJheS1zb3J0XCI7XG5pbXBvcnQgeyBTdWJNZWRpYSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3ViLm1vZGVsXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcblxuZXhwb3J0IGNsYXNzIFZpZXdTdWJzRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBFeGVjdXRlKG1lc3NhZ2U/OiBNZXNzYWdlLCBjb21tYW5kPzogSUNvbW1hbmQsIGRtPzogYm9vbGVhbikge1xuICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgdGhpcy5FbWJlZChtZXNzYWdlLCBkbSk7XG4gICAgaWYgKGRtID09PSB0cnVlKSB7XG4gICAgICBtZXNzYWdlLmF1dGhvclxuICAgICAgICAuc2VuZChlbWJlZClcbiAgICAgICAgLnRoZW4oKCRtOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgTWVzc2FnZSA8JHskbS5pZH0+IHdhcyBzZW50IHRvIDwke21lc3NhZ2UuYXV0aG9yLnVzZXJuYW1lfT4uYFxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBEaXNjb3JkQVBJRXJyb3IpID0+IHtcbiAgICAgICAgICBtZXNzYWdlLnJlcGx5KGBPaCEgaXQgc2VlbXMgdGhhdCBJIGNhbid0IERNIHlvdS5gKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlLnJlcGx5KGVtYmVkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIEVtYmVkKG1lc3NhZ2U6IE1lc3NhZ2UsIGRtOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IG1lbnRpb25JZDogc3RyaW5nID0gbnVsbDtcbiAgICAgIGlmIChtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuc2l6ZSA9PT0gMSkge1xuICAgICAgICBtZW50aW9uSWQgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKS5pZDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpc2NvcmRJZDogc3RyaW5nID1cbiAgICAgICAgbWVudGlvbklkID09PSBudWxsID8gbWVzc2FnZS5hdXRob3IuaWQgOiBtZW50aW9uSWQ7XG4gICAgICBjb25zdCBzb3J0ZWQ6IGFueVtdID0gW107XG4gICAgICBsZXQgdW5zb3J0ZWQ6IGFueVtdID0gW107XG4gICAgICBjb25zdCBkVXNlciA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0VXNlcihkaXNjb3JkSWQpO1xuICAgICAgaWYgKGRVc2VyID09PSBudWxsKSByZXR1cm47XG4gICAgICBjb25zdCB1ID0gYXdhaXQgVXNlckRhdGEuR2V0VXNlcihkaXNjb3JkSWQpO1xuICAgICAgaWYgKHUgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBkVXNlciBhcyBVc2VyLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgc29ydGVkXG4gICAgICAgICk7XG4gICAgICAgIHJlc29sdmUodGVtcGxhdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBzdWJzID0gYXdhaXQgU3Vic2NyaXB0aW9uRGF0YS5HZXRVc2VyU3Vicyh1LklkKTtcbiAgICAgIGlmIChzdWJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIGRVc2VyIGFzIFVzZXIsXG4gICAgICAgICAgMCxcbiAgICAgICAgICBzb3J0ZWRcbiAgICAgICAgKTtcbiAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IHYgPSAwOyB2IDwgc3Vicy5sZW5ndGg7IHYrKykge1xuICAgICAgICBjb25zdCBzdWIgPSBzdWJzW3ZdO1xuICAgICAgICBjb25zdCAkbSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0KHN1Yi5NZWRpYUlkKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQoJG0udGl0bGUpO1xuICAgICAgICBjb25zdCBlcGlzb2RlID0gJG0ubmV4dEFpcmluZ0VwaXNvZGUubmV4dDtcbiAgICAgICAgbGV0IGVwaXNvZGVzID0gXCJcIjtcbiAgICAgICAgaWYgKCRtLmVwaXNvZGVzICE9PSBudWxsICYmICRtLmVwaXNvZGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBlcGlzb2RlcyA9ICRtLmVwaXNvZGVzID09PSAwID8gYD9gIDogYCR7JG0uZXBpc29kZXN9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcGlzb2RlcyA9IGA/YDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb3VudGRvd24gPSBUaW1lSGVscGVyLkNvdW50ZG93bihcbiAgICAgICAgICAkbS5uZXh0QWlyaW5nRXBpc29kZS50aW1lVW50aWxBaXJpbmdcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcHJlID0gbmV3IFN1Yk1lZGlhKHtcbiAgICAgICAgICB0aW1lVW50aWxBaXJpbmc6ICRtLm5leHRBaXJpbmdFcGlzb2RlLnRpbWVVbnRpbEFpcmluZyxcbiAgICAgICAgICBmaWVsZDoge1xuICAgICAgICAgICAgbmFtZTogYFxcbiR7dGl0bGV9YCxcbiAgICAgICAgICAgIHZhbHVlOiBgW015QW5pbWVMaXN0XShodHRwczovL215YW5pbWVsaXN0Lm5ldC9hbmltZS8ke1xuICAgICAgICAgICAgICAkbS5pZE1hbFxuICAgICAgICAgICAgfS8pXFxuRXBpc29kZSAqKiR7ZXBpc29kZX0qKi8ke2VwaXNvZGVzfSBpbiAqKioke2NvdW50ZG93bn0qKipcXG7ilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqzilqxgXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdW5zb3J0ZWQucHVzaChwcmUuZGF0YSk7XG4gICAgICAgIGlmICh2ID09PSBzdWJzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICB1bnNvcnRlZCA9IGFycmF5U29ydCh1bnNvcnRlZCwgW1widGltZVVudGlsQWlyaW5nXCJdKTtcbiAgICAgICAgICBmb3IgKGxldCBiID0gMDsgYiA8IHVuc29ydGVkLmxlbmd0aDsgYisrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdW5zb3J0ZWRbYl07XG4gICAgICAgICAgICBzb3J0ZWQucHVzaChlbGVtZW50LmZpZWxkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUoXG4gICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgZFVzZXIgYXMgVXNlcixcbiAgICAgICAgICAgIHN1YnMubGVuZ3RoLFxuICAgICAgICAgICAgc29ydGVkXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBFbWJlZFRlbXBsYXRlKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgdXNlcjogVXNlcixcbiAgICBjb3VudDogbnVtYmVyLFxuICAgIGxpc3Q6IGFueVtdXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1lbWJlciA9IG1lc3NhZ2UuZ3VpbGQubWVtYmVycy5nZXQodXNlci5pZCk7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IG1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgIHVybDogbWVtYmVyLnVzZXIuYXZhdGFyVVJMXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dXNlci51c2VybmFtZX0qKioncyAqU3Vic2NyaXB0aW9uIExpc3QqYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYCoqJHtjb3VudH0gQW5pbWUqKlxcblxcblBsZWFzZSBOb3RlOiAqVGhlIGFpcmluZyBzY2hlZHVsZSBmb3IgdGhlIHN0cmVhbWluZyBzaXRlIHlvdSBhcmUgdXNpbmcgbWlnaHQgYmUgZGlmZmVyZW50LipcXG5gLFxuICAgICAgICAgIGZpZWxkczogbGlzdCxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19