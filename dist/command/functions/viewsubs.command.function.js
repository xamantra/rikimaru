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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3N1YnMuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy92aWV3c3Vicy5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQWtEO0FBQ2xELHNFQUFrRTtBQUNsRSwyQ0FBNEQ7QUFFNUQsNkRBQXlEO0FBQ3pELDJEQUF1RDtBQUN2RCw4Q0FBa0Q7QUFDbEQsNERBQW1DO0FBQ25DLHNEQUFrRDtBQUNsRCx3REFBb0Q7QUFFcEQsTUFBYSxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTTtpQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNYLElBQUksQ0FBQyxDQUFDLEVBQVcsRUFBRSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUNULFlBQVksRUFBRSxDQUFDLEVBQUUsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQy9ELENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFD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TUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUMvQixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztxQkFDM0I7b0JBQ0QsS0FBSyxFQUFFLE1BQU0sSUFBSSxDQUFDLFFBQVEsMkJBQTJCO29CQUNyRCxXQUFXLEVBQUUsS0FBSyxLQUFLLDJHQUEyRztvQkFDbEksTUFBTSxFQUFFLElBQUk7b0JBQ1osU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO29CQUNyQixNQUFNLEVBQUU7d0JBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUzt3QkFDL0IsSUFBSSxFQUFFLFlBQVk7cUJBQ25CO2lCQUNGO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF0SEQsNENBc0hDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUNvbW1hbmRGdW5jdGlvbiB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZnVuY3Rpb24uaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBVc2VyRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvdXNlci5kYXRhXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xuaW1wb3J0IHsgTWVzc2FnZSwgVXNlciwgRGlzY29yZEFQSUVycm9yIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IFRpdGxlSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGl0bGUuaGVscGVyXCI7XG5pbXBvcnQgeyBUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGltZS5oZWxwZXJcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCBhcnJheVNvcnQgZnJvbSBcImFycmF5LXNvcnRcIjtcbmltcG9ydCB7IFN1Yk1lZGlhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWIubW9kZWxcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi4vLi4vY29yZS9hbmltZS5jYWNoZVwiO1xuXG5leHBvcnQgY2xhc3MgVmlld1N1YnNGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcHVibGljIGFzeW5jIEV4ZWN1dGUobWVzc2FnZT86IE1lc3NhZ2UsIGNvbW1hbmQ/OiBJQ29tbWFuZCwgZG0/OiBib29sZWFuKSB7XG4gICAgY29uc3QgZW1iZWQgPSBhd2FpdCB0aGlzLkVtYmVkKG1lc3NhZ2UsIGRtKTtcbiAgICBpZiAoZG0gPT09IHRydWUpIHtcbiAgICAgIG1lc3NhZ2UuYXV0aG9yXG4gICAgICAgIC5zZW5kKGVtYmVkKVxuICAgICAgICAudGhlbigoJG06IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBNZXNzYWdlIDwkeyRtLmlkfT4gd2FzIHNlbnQgdG8gPCR7bWVzc2FnZS5hdXRob3IudXNlcm5hbWV9Pi5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnI6IERpc2NvcmRBUElFcnJvcikgPT4ge1xuICAgICAgICAgIG1lc3NhZ2UucmVwbHkoYE9oISBpdCBzZWVtcyB0aGF0IEkgY2FuJ3QgRE0geW91LmApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UucmVwbHkoZW1iZWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgRW1iZWQobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgbWVudGlvbklkOiBzdHJpbmcgPSBudWxsO1xuICAgICAgaWYgKG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAxKSB7XG4gICAgICAgIG1lbnRpb25JZCA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5maXJzdCgpLmlkO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlzY29yZElkOiBzdHJpbmcgPVxuICAgICAgICBtZW50aW9uSWQgPT09IG51bGwgPyBtZXNzYWdlLmF1dGhvci5pZCA6IG1lbnRpb25JZDtcbiAgICAgIGNvbnN0IHNvcnRlZDogYW55W10gPSBbXTtcbiAgICAgIGxldCB1bnNvcnRlZDogYW55W10gPSBbXTtcbiAgICAgIGNvbnN0IGRVc2VyID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRVc2VyKGRpc2NvcmRJZCkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGRVc2VyIGluc3RhbmNlb2YgVXNlciA9PT0gZmFsc2UpIHJldHVybjtcbiAgICAgIGNvbnN0IHUgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyKGRpc2NvcmRJZCk7XG4gICAgICBpZiAodSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgY29uc3Qgc3VicyA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0VXNlclN1YnModS5JZCk7XG4gICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUoXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICBkVXNlciBhcyBVc2VyLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgc29ydGVkXG4gICAgICAgICk7XG4gICAgICAgIHJlc29sdmUodGVtcGxhdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHN1YnMubGVuZ3RoOyB2KyspIHtcbiAgICAgICAgY29uc3Qgc3ViID0gc3Vic1t2XTtcbiAgICAgICAgY29uc3QgJG0gPSBhd2FpdCBBbmltZUNhY2hlLkdldChzdWIuTWVkaWFJZCk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KCRtLnRpdGxlKTtcbiAgICAgICAgY29uc3QgZXBpc29kZSA9ICRtLm5leHRBaXJpbmdFcGlzb2RlLm5leHQ7XG4gICAgICAgIGxldCBlcGlzb2RlcyA9IFwiXCI7XG4gICAgICAgIGlmICgkbS5lcGlzb2RlcyAhPT0gbnVsbCAmJiAkbS5lcGlzb2RlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZXBpc29kZXMgPSAkbS5lcGlzb2RlcyA9PT0gMCA/IGA/YCA6IGAkeyRtLmVwaXNvZGVzfWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXBpc29kZXMgPSBgP2A7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY291bnRkb3duID0gVGltZUhlbHBlci5Db3VudGRvd24oXG4gICAgICAgICAgJG0ubmV4dEFpcmluZ0VwaXNvZGUudGltZVVudGlsQWlyaW5nXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHByZSA9IG5ldyBTdWJNZWRpYSh7XG4gICAgICAgICAgdGltZVVudGlsQWlyaW5nOiAkbS5uZXh0QWlyaW5nRXBpc29kZS50aW1lVW50aWxBaXJpbmcsXG4gICAgICAgICAgZmllbGQ6IHtcbiAgICAgICAgICAgIG5hbWU6IGBcXG4ke3RpdGxlfWAsXG4gICAgICAgICAgICB2YWx1ZTogYFtNeUFuaW1lTGlzdF0oaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHtcbiAgICAgICAgICAgICAgJG0uaWRNYWxcbiAgICAgICAgICAgIH0vKVxcbkVwaXNvZGUgKioke2VwaXNvZGV9KiovJHtlcGlzb2Rlc30gaW4gKioqJHtjb3VudGRvd259KioqXFxu4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pas4pasYFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHVuc29ydGVkLnB1c2gocHJlLmRhdGEpO1xuICAgICAgICBpZiAodiA9PT0gc3Vicy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgdW5zb3J0ZWQgPSBhcnJheVNvcnQodW5zb3J0ZWQsIFtcInRpbWVVbnRpbEFpcmluZ1wiXSk7XG4gICAgICAgICAgZm9yIChsZXQgYiA9IDA7IGIgPCB1bnNvcnRlZC5sZW5ndGg7IGIrKykge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHVuc29ydGVkW2JdO1xuICAgICAgICAgICAgc29ydGVkLnB1c2goZWxlbWVudC5maWVsZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxuICAgICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICAgIGRVc2VyIGFzIFVzZXIsXG4gICAgICAgICAgICBzdWJzLmxlbmd0aCxcbiAgICAgICAgICAgIHNvcnRlZFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgRW1iZWRUZW1wbGF0ZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlLFxuICAgIHVzZXI6IFVzZXIsXG4gICAgY291bnQ6IG51bWJlcixcbiAgICBsaXN0OiBhbnlbXVxuICApIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXIgPSBtZXNzYWdlLmd1aWxkLm1lbWJlcnMuZ2V0KHVzZXIuaWQpO1xuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcbiAgICAgIHJlc29sdmUoe1xuICAgICAgICBlbWJlZDoge1xuICAgICAgICAgIGNvbG9yOiBtZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgICAgICB1cmw6IG1lbWJlci51c2VyLmF2YXRhclVSTFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGl0bGU6IGAqKioke3VzZXIudXNlcm5hbWV9KioqJ3MgKlN1YnNjcmlwdGlvbiBMaXN0KmAsXG4gICAgICAgICAgZGVzY3JpcHRpb246IGAqKiR7Y291bnR9IEFuaW1lKipcXG5cXG5QbGVhc2UgTm90ZTogKlRoZSBhaXJpbmcgc2NoZWR1bGUgZm9yIHRoZSBzdHJlYW1pbmcgc2l0ZSB5b3UgYXJlIHVzaW5nIG1pZ2h0IGJlIGRpZmZlcmVudC4qXFxuYCxcbiAgICAgICAgICBmaWVsZHM6IGxpc3QsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICAgIHRleHQ6IFwiwqkgUmlraW1hcnVcIlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==