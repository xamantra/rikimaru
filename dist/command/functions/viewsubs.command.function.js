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
                        text: `© ${config_1.Config.BOT_NAME}`
                    }
                }
            });
        });
    }
}
exports.ViewSubsFunction = ViewSubsFunction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3N1YnMuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy92aWV3c3Vicy5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQWtEO0FBQ2xELHNFQUFrRTtBQUdsRSw2REFBeUQ7QUFDekQsMkRBQXVEO0FBQ3ZELDhDQUFrRDtBQUNsRCw0REFBbUM7QUFDbkMsc0RBQWtEO0FBQ2xELHdEQUFvRDtBQUNwRCw4Q0FBMkM7QUFFM0MsTUFBYSxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTTtpQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNYLElBQUksQ0FBQyxDQUFDLEVBQVcsRUFBRSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUNULFlBQVksRUFBRSxDQUFDLEVBQUUsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQy9ELENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFD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QUM7Z0JBQ04sS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7b0JBQy9CLFNBQVMsRUFBRTt3QkFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3FCQUMzQjtvQkFDRCxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsUUFBUSwyQkFBMkI7b0JBQ3JELFdBQVcsRUFBRSxLQUFLLEtBQUssMkdBQTJHO29CQUNsSSxNQUFNLEVBQUUsSUFBSTtvQkFDWixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRTt3QkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUMvQixJQUFJLEVBQUUsS0FBSyxlQUFNLENBQUMsUUFBUSxFQUFFO3FCQUM3QjtpQkFDRjthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBN0hELDRDQTZIQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRnVuY3Rpb24gfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmZ1bmN0aW9uLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uRGF0YSB9IGZyb20gXCIuLy4uLy4uL2RhdGEvc3Vic2NyaXB0aW9uLmRhdGFcIjtcbmltcG9ydCB7IE1lc3NhZ2UsIFVzZXIsIERpc2NvcmRBUElFcnJvciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgVGltZUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3RpbWUuaGVscGVyXCI7XG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvY2xpZW50XCI7XG5pbXBvcnQgYXJyYXlTb3J0IGZyb20gXCJhcnJheS1zb3J0XCI7XG5pbXBvcnQgeyBTdWJNZWRpYSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvc3ViLm1vZGVsXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4uLy4uL2NvcmUvYW5pbWUuY2FjaGVcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgVmlld1N1YnNGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcHVibGljIGFzeW5jIEV4ZWN1dGUobWVzc2FnZT86IE1lc3NhZ2UsIGNvbW1hbmQ/OiBJQ29tbWFuZCwgZG0/OiBib29sZWFuKSB7XG4gICAgY29uc3QgZW1iZWQgPSBhd2FpdCB0aGlzLkVtYmVkKG1lc3NhZ2UsIGRtKTtcbiAgICBpZiAoZG0gPT09IHRydWUpIHtcbiAgICAgIG1lc3NhZ2UuYXV0aG9yXG4gICAgICAgIC5zZW5kKGVtYmVkKVxuICAgICAgICAudGhlbigoJG06IE1lc3NhZ2UpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgIGBNZXNzYWdlIDwkeyRtLmlkfT4gd2FzIHNlbnQgdG8gPCR7bWVzc2FnZS5hdXRob3IudXNlcm5hbWV9Pi5gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnI6IERpc2NvcmRBUElFcnJvcikgPT4ge1xuICAgICAgICAgIG1lc3NhZ2UucmVwbHkoYE9oISBpdCBzZWVtcyB0aGF0IEkgY2FuJ3QgRE0geW91LmApO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1lc3NhZ2UucmVwbHkoZW1iZWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgRW1iZWQobWVzc2FnZTogTWVzc2FnZSwgZG06IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBsZXQgbWVudGlvbklkOiBzdHJpbmcgPSBudWxsO1xuICAgICAgaWYgKG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5zaXplID09PSAxKSB7XG4gICAgICAgIG1lbnRpb25JZCA9IG1lc3NhZ2UubWVudGlvbnMubWVtYmVycy5maXJzdCgpLmlkO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlzY29yZElkOiBzdHJpbmcgPVxuICAgICAgICBtZW50aW9uSWQgPT09IG51bGwgPyBtZXNzYWdlLmF1dGhvci5pZCA6IG1lbnRpb25JZDtcbiAgICAgIGNvbnN0IHNvcnRlZDogYW55W10gPSBbXTtcbiAgICAgIGxldCB1bnNvcnRlZDogYW55W10gPSBbXTtcbiAgICAgIGNvbnN0IGRVc2VyID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRVc2VyKGRpc2NvcmRJZCk7XG4gICAgICBpZiAoZFVzZXIgPT09IG51bGwpIHJldHVybjtcbiAgICAgIGNvbnN0IHUgPSBhd2FpdCBVc2VyRGF0YS5HZXRVc2VyKGRpc2NvcmRJZCk7XG4gICAgICBpZiAodSA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIGRVc2VyIGFzIFVzZXIsXG4gICAgICAgICAgMCxcbiAgICAgICAgICBzb3J0ZWRcbiAgICAgICAgKTtcbiAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN1YnMgPSBhd2FpdCBTdWJzY3JpcHRpb25EYXRhLkdldFVzZXJTdWJzKHUuSWQpO1xuICAgICAgaWYgKHN1YnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxuICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgZFVzZXIgYXMgVXNlcixcbiAgICAgICAgICAwLFxuICAgICAgICAgIHNvcnRlZFxuICAgICAgICApO1xuICAgICAgICByZXNvbHZlKHRlbXBsYXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgdiA9IDA7IHYgPCBzdWJzLmxlbmd0aDsgdisrKSB7XG4gICAgICAgIGNvbnN0IHN1YiA9IHN1YnNbdl07XG4gICAgICAgIGNvbnN0ICRtID0gYXdhaXQgQW5pbWVDYWNoZS5HZXQoc3ViLk1lZGlhSWQpO1xuICAgICAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldCgkbS50aXRsZSk7XG4gICAgICAgIGNvbnN0IGVwaXNvZGUgPSAkbS5uZXh0QWlyaW5nRXBpc29kZS5uZXh0O1xuICAgICAgICBsZXQgZXBpc29kZXMgPSBcIlwiO1xuICAgICAgICBpZiAoJG0uZXBpc29kZXMgIT09IG51bGwgJiYgJG0uZXBpc29kZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGVwaXNvZGVzID0gJG0uZXBpc29kZXMgPT09IDAgPyBgP2AgOiBgJHskbS5lcGlzb2Rlc31gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVwaXNvZGVzID0gYD9gO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvdW50ZG93biA9IFRpbWVIZWxwZXIuQ291bnRkb3duKFxuICAgICAgICAgICRtLm5leHRBaXJpbmdFcGlzb2RlLnRpbWVVbnRpbEFpcmluZ1xuICAgICAgICApO1xuICAgICAgICBjb25zdCBwcmUgPSBuZXcgU3ViTWVkaWEoe1xuICAgICAgICAgIHRpbWVVbnRpbEFpcmluZzogJG0ubmV4dEFpcmluZ0VwaXNvZGUudGltZVVudGlsQWlyaW5nLFxuICAgICAgICAgIGZpZWxkOiB7XG4gICAgICAgICAgICBuYW1lOiBgXFxuJHt0aXRsZX1gLFxuICAgICAgICAgICAgdmFsdWU6IGBbTXlBbmltZUxpc3RdKGh0dHBzOi8vbXlhbmltZWxpc3QubmV0L2FuaW1lLyR7XG4gICAgICAgICAgICAgICRtLmlkTWFsXG4gICAgICAgICAgICB9LylcXG5FcGlzb2RlICoqJHtlcGlzb2RlfSoqLyR7ZXBpc29kZXN9IGluICoqKiR7Y291bnRkb3dufSoqKlxcbuKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrGBcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB1bnNvcnRlZC5wdXNoKHByZS5kYXRhKTtcbiAgICAgICAgaWYgKHYgPT09IHN1YnMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIHVuc29ydGVkID0gYXJyYXlTb3J0KHVuc29ydGVkLCBbXCJ0aW1lVW50aWxBaXJpbmdcIl0pO1xuICAgICAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgdW5zb3J0ZWQubGVuZ3RoOyBiKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB1bnNvcnRlZFtiXTtcbiAgICAgICAgICAgIHNvcnRlZC5wdXNoKGVsZW1lbnQuZmllbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcbiAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICBkVXNlciBhcyBVc2VyLFxuICAgICAgICAgICAgc3Vicy5sZW5ndGgsXG4gICAgICAgICAgICBzb3J0ZWRcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc29sdmUodGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIEVtYmVkVGVtcGxhdGUoXG4gICAgbWVzc2FnZTogTWVzc2FnZSxcbiAgICB1c2VyOiBVc2VyLFxuICAgIGNvdW50OiBudW1iZXIsXG4gICAgbGlzdDogYW55W11cbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVtYmVyID0gbWVzc2FnZS5ndWlsZC5tZW1iZXJzLmdldCh1c2VyLmlkKTtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgICByZXNvbHZlKHtcbiAgICAgICAgZW1iZWQ6IHtcbiAgICAgICAgICBjb2xvcjogbWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxuICAgICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgICAgdXJsOiBtZW1iZXIudXNlci5hdmF0YXJVUkxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiBgKioqJHt1c2VyLnVzZXJuYW1lfSoqKidzICpTdWJzY3JpcHRpb24gTGlzdCpgLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBgKioke2NvdW50fSBBbmltZSoqXFxuXFxuUGxlYXNlIE5vdGU6ICpUaGUgYWlyaW5nIHNjaGVkdWxlIGZvciB0aGUgc3RyZWFtaW5nIHNpdGUgeW91IGFyZSB1c2luZyBtaWdodCBiZSBkaWZmZXJlbnQuKlxcbmAsXG4gICAgICAgICAgZmllbGRzOiBsaXN0LFxuICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXG4gICAgICAgICAgICB0ZXh0OiBgwqkgJHtDb25maWcuQk9UX05BTUV9YFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==