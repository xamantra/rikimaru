"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = require("./../../data/user.data");
const subscription_data_1 = require("./../../data/subscription.data");
const media_data_1 = require("./../../data/media.data");
const discord_js_1 = require("discord.js");
const title_helper_1 = require("../../helpers/title.helper");
const time_helper_1 = require("../../helpers/time.helper");
const client_1 = require("../../core/client");
const array_sort_1 = __importDefault(require("array-sort"));
const sub_model_1 = require("../../models/sub.model");
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
                    media_data_1.MediaData.GetMedia(sub.MediaId)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3N1YnMuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy92aWV3c3Vicy5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQWtEO0FBQ2xELHNFQUFrRTtBQUNsRSx3REFBb0Q7QUFDcEQsMkNBQTREO0FBRTVELDZEQUF5RDtBQUN6RCwyREFBdUQ7QUFDdkQsOENBQWtEO0FBQ2xELDREQUFtQztBQUNuQyxzREFBa0Q7QUFFbEQsTUFBYSxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTTtpQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNYLElBQUksQ0FBQyxDQUFDLEVBQVcsRUFBRSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUNULFlBQVksRUFBRSxDQUFDLEVBQUUsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQy9ELENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFD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IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvbWVkaWEuZGF0YVwiO1xuaW1wb3J0IHsgTWVzc2FnZSwgVXNlciwgRGlzY29yZEFQSUVycm9yIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGltZS5oZWxwZXJcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCBhcnJheVNvcnQgZnJvbSBcImFycmF5LXNvcnRcIjtcbmltcG9ydCB7IFN1Yk1lZGlhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWIubW9kZWxcIjtcblxuZXhwb3J0IGNsYXNzIFZpZXdTdWJzRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBFeGVjdXRlKG1lc3NhZ2U/OiBNZXNzYWdlLCBjb21tYW5kPzogSUNvbW1hbmQsIGRtPzogYm9vbGVhbikge1xuICAgIGNvbnN0IGVtYmVkID0gYXdhaXQgdGhpcy5FbWJlZChtZXNzYWdlLCBkbSk7XG4gICAgaWYgKGRtID09PSB0cnVlKSB7XG4gICAgICBtZXNzYWdlLmF1dGhvclxuICAgICAgICAuc2VuZChlbWJlZClcbiAgICAgICAgLnRoZW4oKCRtOiBNZXNzYWdlKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICBgTWVzc2FnZSA8JHskbS5pZH0+IHdhcyBzZW50IHRvIDwke21lc3NhZ2UuYXV0aG9yLnVzZXJuYW1lfT4uYFxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBEaXNjb3JkQVBJRXJyb3IpID0+IHtcbiAgICAgICAgICBtZXNzYWdlLnJlcGx5KGBPaCEgaXQgc2VlbXMgdGhhdCBJIGNhbid0IERNIHlvdS5gKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlLnJlcGx5KGVtYmVkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIEVtYmVkKG1lc3NhZ2U6IE1lc3NhZ2UsIGRtOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IG1lbnRpb25JZDogc3RyaW5nID0gbnVsbDtcbiAgICAgIGlmIChtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuc2l6ZSA9PT0gMSkge1xuICAgICAgICBtZW50aW9uSWQgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKS5pZDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRpc2NvcmRJZDogc3RyaW5nID1cbiAgICAgICAgbWVudGlvbklkID09PSBudWxsID8gbWVzc2FnZS5hdXRob3IuaWQgOiBtZW50aW9uSWQ7XG4gICAgICBjb25zdCBzb3J0ZWQ6IGFueVtdID0gW107XG4gICAgICBsZXQgdW5zb3J0ZWQ6IGFueVtdID0gW107XG4gICAgICBjb25zdCBkVXNlciA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0VXNlcihkaXNjb3JkSWQpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICB9KTtcbiAgICAgIGlmIChkVXNlciBpbnN0YW5jZW9mIFVzZXIgPT09IGZhbHNlKSByZXR1cm47XG4gICAgICBVc2VyRGF0YS5HZXRVc2VyKGRpc2NvcmRJZClcbiAgICAgICAgLnRoZW4oYXN5bmMgdSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3VicyA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0VXNlclN1YnModS5JZCk7XG4gICAgICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcbiAgICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgICAgZFVzZXIgYXMgVXNlcixcbiAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgc29ydGVkXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAobGV0IHYgPSAwOyB2IDwgc3Vicy5sZW5ndGg7IHYrKykge1xuICAgICAgICAgICAgY29uc3Qgc3ViID0gc3Vic1t2XTtcbiAgICAgICAgICAgIE1lZGlhRGF0YS5HZXRNZWRpYShzdWIuTWVkaWFJZClcbiAgICAgICAgICAgICAgLnRoZW4oYXN5bmMgJG0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KCRtLnRpdGxlKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlcGlzb2RlID0gJG0ubmV4dEFpcmluZ0VwaXNvZGUubmV4dDtcbiAgICAgICAgICAgICAgICBsZXQgZXBpc29kZXMgPSBcIlwiO1xuICAgICAgICAgICAgICAgIGlmICgkbS5lcGlzb2RlcyAhPT0gbnVsbCAmJiAkbS5lcGlzb2RlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICBlcGlzb2RlcyA9ICRtLmVwaXNvZGVzID09PSAwID8gYD9gIDogYCR7JG0uZXBpc29kZXN9YDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZXBpc29kZXMgPSBgP2A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50ZG93biA9IFRpbWVIZWxwZXIuQ291bnRkb3duKFxuICAgICAgICAgICAgICAgICAgJG0ubmV4dEFpcmluZ0VwaXNvZGUudGltZVVudGlsQWlyaW5nXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmUgPSBuZXcgU3ViTWVkaWEoe1xuICAgICAgICAgICAgICAgICAgdGltZVVudGlsQWlyaW5nOiAkbS5uZXh0QWlyaW5nRXBpc29kZS50aW1lVW50aWxBaXJpbmcsXG4gICAgICAgICAgICAgICAgICBmaWVsZDoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBgXFxuJHt0aXRsZX1gLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYFtNeUFuaW1lTGlzdF0oaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHtcbiAgICAgICAgICAgICAgICAgICAgICAkbS5pZE1hbFxuICAgICAgICAgICAgICAgICAgICB9LylcXG5FcGlzb2RlICoqJHtlcGlzb2RlfSoqLyR7ZXBpc29kZXN9IGluICoqKiR7Y291bnRkb3dufSoqKlxcbuKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrGBcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1bnNvcnRlZC5wdXNoKHByZS5kYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAodiA9PT0gc3Vicy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICB1bnNvcnRlZCA9IGFycmF5U29ydCh1bnNvcnRlZCwgW1widGltZVVudGlsQWlyaW5nXCJdKTtcbiAgICAgICAgICAgICAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgdW5zb3J0ZWQubGVuZ3RoOyBiKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHVuc29ydGVkW2JdO1xuICAgICAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChlbGVtZW50LmZpZWxkKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICBkVXNlciBhcyBVc2VyLFxuICAgICAgICAgICAgICAgICAgICBzdWJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAuY2F0Y2goYXN5bmMgKGVycjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICBkVXNlciBhcyBVc2VyLFxuICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgIHNvcnRlZFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChhc3luYyAocmVhc29uOiBFcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIGRVc2VyIGFzIFVzZXIsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgc29ydGVkXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBFbWJlZFRlbXBsYXRlKFxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXG4gICAgdXNlcjogVXNlcixcbiAgICBjb3VudDogbnVtYmVyLFxuICAgIGxpc3Q6IGFueVtdXG4gICkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IG1lbWJlciA9IG1lc3NhZ2UuZ3VpbGQubWVtYmVycy5nZXQodXNlci5pZCk7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgICAgcmVzb2x2ZSh7XG4gICAgICAgIGVtYmVkOiB7XG4gICAgICAgICAgY29sb3I6IG1lbWJlci5oaWdoZXN0Um9sZS5jb2xvcixcbiAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgIHVybDogbWVtYmVyLnVzZXIuYXZhdGFyVVJMXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dXNlci51c2VybmFtZX0qKioncyAqU3Vic2NyaXB0aW9uIExpc3QqYCxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYCoqJHtjb3VudH0gQW5pbWUqKlxcblxcblBsZWFzZSBOb3RlOiAqVGhlIGFpcmluZyBzY2hlZHVsZSBmb3IgdGhlIHN0cmVhbWluZyBzaXRlIHlvdSBhcmUgdXNpbmcgbWlnaHQgYmUgZGlmZmVyZW50LipcXG5gLFxuICAgICAgICAgIGZpZWxkczogbGlzdCxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXG4gICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19