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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3N1YnMuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy92aWV3c3Vicy5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQWtEO0FBQ2xELHNFQUFrRTtBQUNsRSx3REFBb0Q7QUFDcEQsMkNBQTREO0FBRTVELDZEQUF5RDtBQUN6RCwyREFBdUQ7QUFDdkQsOENBQWtEO0FBQ2xELDREQUFtQztBQUNuQyxzREFBa0Q7QUFFbEQsTUFBYSxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTTtpQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNYLElBQUksQ0FBQyxDQUFDLEVBQVcsRUFBRSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUNULFlBQVksRUFBRSxDQUFDLEVBQUUsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQy9ELENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFD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IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbkRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3N1YnNjcmlwdGlvbi5kYXRhXCI7XHJcbmltcG9ydCB7IE1lZGlhRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvbWVkaWEuZGF0YVwiO1xyXG5pbXBvcnQgeyBNZXNzYWdlLCBVc2VyLCBEaXNjb3JkQVBJRXJyb3IgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XHJcbmltcG9ydCB7IFRpbWVIZWxwZXIgfSBmcm9tIFwiLi4vLi4vaGVscGVycy90aW1lLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XHJcbmltcG9ydCBhcnJheVNvcnQgZnJvbSBcImFycmF5LXNvcnRcIjtcclxuaW1wb3J0IHsgU3ViTWVkaWEgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3N1Yi5tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXdTdWJzRnVuY3Rpb24gaW1wbGVtZW50cyBJQ29tbWFuZEZ1bmN0aW9uIHtcclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBFeGVjdXRlKG1lc3NhZ2U/OiBNZXNzYWdlLCBjb21tYW5kPzogSUNvbW1hbmQsIGRtPzogYm9vbGVhbikge1xyXG4gICAgY29uc3QgZW1iZWQgPSBhd2FpdCB0aGlzLkVtYmVkKG1lc3NhZ2UsIGRtKTtcclxuICAgIGlmIChkbSA9PT0gdHJ1ZSkge1xyXG4gICAgICBtZXNzYWdlLmF1dGhvclxyXG4gICAgICAgIC5zZW5kKGVtYmVkKVxyXG4gICAgICAgIC50aGVuKCgkbTogTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIGBNZXNzYWdlIDwkeyRtLmlkfT4gd2FzIHNlbnQgdG8gPCR7bWVzc2FnZS5hdXRob3IudXNlcm5hbWV9Pi5gXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnI6IERpc2NvcmRBUElFcnJvcikgPT4ge1xyXG4gICAgICAgICAgbWVzc2FnZS5yZXBseShgT2ghIGl0IHNlZW1zIHRoYXQgSSBjYW4ndCBETSB5b3UuYCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtZXNzYWdlLnJlcGx5KGVtYmVkKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgRW1iZWQobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IG1lbnRpb25JZDogc3RyaW5nID0gbnVsbDtcclxuICAgICAgaWYgKG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAxKSB7XHJcbiAgICAgICAgbWVudGlvbklkID0gbWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLmZpcnN0KCkuaWQ7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgZGlzY29yZElkOiBzdHJpbmcgPVxyXG4gICAgICAgIG1lbnRpb25JZCA9PT0gbnVsbCA/IG1lc3NhZ2UuYXV0aG9yLmlkIDogbWVudGlvbklkO1xyXG4gICAgICBjb25zdCBzb3J0ZWQ6IGFueVtdID0gW107XHJcbiAgICAgIGxldCB1bnNvcnRlZDogYW55W10gPSBbXTtcclxuICAgICAgY29uc3QgZFVzZXIgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldFVzZXIoZGlzY29yZElkKS5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoZFVzZXIgaW5zdGFuY2VvZiBVc2VyID09PSBmYWxzZSkgcmV0dXJuO1xyXG4gICAgICBVc2VyRGF0YS5HZXRVc2VyKGRpc2NvcmRJZClcclxuICAgICAgICAudGhlbihhc3luYyB1ID0+IHtcclxuICAgICAgICAgIGNvbnN0IHN1YnMgPSBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkdldFVzZXJTdWJzKHUuSWQpO1xyXG4gICAgICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxyXG4gICAgICAgICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgZFVzZXIgYXMgVXNlcixcclxuICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgIHNvcnRlZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZm9yIChsZXQgdiA9IDA7IHYgPCBzdWJzLmxlbmd0aDsgdisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1YiA9IHN1YnNbdl07XHJcbiAgICAgICAgICAgIE1lZGlhRGF0YS5HZXRNZWRpYShzdWIuTWVkaWFJZClcclxuICAgICAgICAgICAgICAudGhlbihhc3luYyAkbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldCgkbS50aXRsZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlcGlzb2RlID0gJG0ubmV4dEFpcmluZ0VwaXNvZGUubmV4dDtcclxuICAgICAgICAgICAgICAgIGxldCBlcGlzb2RlcyA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoJG0uZXBpc29kZXMgIT09IG51bGwgJiYgJG0uZXBpc29kZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICBlcGlzb2RlcyA9ICRtLmVwaXNvZGVzID09PSAwID8gYD9gIDogYCR7JG0uZXBpc29kZXN9YDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGVwaXNvZGVzID0gYD9gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnRkb3duID0gVGltZUhlbHBlci5Db3VudGRvd24oXHJcbiAgICAgICAgICAgICAgICAgICRtLm5leHRBaXJpbmdFcGlzb2RlLnRpbWVVbnRpbEFpcmluZ1xyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZSA9IG5ldyBTdWJNZWRpYSh7XHJcbiAgICAgICAgICAgICAgICAgIHRpbWVVbnRpbEFpcmluZzogJG0ubmV4dEFpcmluZ0VwaXNvZGUudGltZVVudGlsQWlyaW5nLFxyXG4gICAgICAgICAgICAgICAgICBmaWVsZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGBcXG4ke3RpdGxlfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGBbTXlBbmltZUxpc3RdKGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7XHJcbiAgICAgICAgICAgICAgICAgICAgICAkbS5pZE1hbFxyXG4gICAgICAgICAgICAgICAgICAgIH0vKVxcbkVwaXNvZGUgKioke2VwaXNvZGV9KiovJHtlcGlzb2Rlc30gaW4gKioqJHtjb3VudGRvd259KioqXFxu4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pasYFxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHVuc29ydGVkLnB1c2gocHJlLmRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHYgPT09IHN1YnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICB1bnNvcnRlZCA9IGFycmF5U29ydCh1bnNvcnRlZCwgW1widGltZVVudGlsQWlyaW5nXCJdKTtcclxuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYiA9IDA7IGIgPCB1bnNvcnRlZC5sZW5ndGg7IGIrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB1bnNvcnRlZFtiXTtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChlbGVtZW50LmZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRVc2VyIGFzIFVzZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3Vicy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkXHJcbiAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIHJlc29sdmUodGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKGFzeW5jIChlcnI6IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcclxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgICAgZFVzZXIgYXMgVXNlcixcclxuICAgICAgICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgICAgICAgc29ydGVkXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goYXN5bmMgKHJlYXNvbjogRXJyb3IpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxyXG4gICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICBkVXNlciBhcyBVc2VyLFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBzb3J0ZWRcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbi5tZXNzYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBFbWJlZFRlbXBsYXRlKFxyXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcclxuICAgIHVzZXI6IFVzZXIsXHJcbiAgICBjb3VudDogbnVtYmVyLFxyXG4gICAgbGlzdDogYW55W11cclxuICApIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgbWVtYmVyID0gbWVzc2FnZS5ndWlsZC5tZW1iZXJzLmdldCh1c2VyLmlkKTtcclxuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcclxuICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgZW1iZWQ6IHtcclxuICAgICAgICAgIGNvbG9yOiBtZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXHJcbiAgICAgICAgICB0aHVtYm5haWw6IHtcclxuICAgICAgICAgICAgdXJsOiBtZW1iZXIudXNlci5hdmF0YXJVUkxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0aXRsZTogYCoqKiR7dXNlci51c2VybmFtZX0qKioncyAqU3Vic2NyaXB0aW9uIExpc3QqYCxcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKioke2NvdW50fSBBbmltZSoqXFxuXFxuUGxlYXNlIE5vdGU6ICpUaGUgYWlyaW5nIHNjaGVkdWxlIGZvciB0aGUgc3RyZWFtaW5nIHNpdGUgeW91IGFyZSB1c2luZyBtaWdodCBiZSBkaWZmZXJlbnQuKlxcbmAsXHJcbiAgICAgICAgICBmaWVsZHM6IGxpc3QsXHJcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcclxuICAgICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=