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
                    const $m = await anime_cache_1.AnimeCache.Get(sub.MediaId);
                    if ($m !== null) {
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
                    else {
                        const template = await this.EmbedTemplate(message, dUser, 0, sorted);
                        resolve(template);
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld3N1YnMuY29tbWFuZC5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kL2Z1bmN0aW9ucy92aWV3c3Vicy5jb21tYW5kLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esc0RBQWtEO0FBQ2xELHNFQUFrRTtBQUVsRSwyQ0FBNEQ7QUFFNUQsNkRBQXlEO0FBQ3pELDJEQUF1RDtBQUN2RCw4Q0FBa0Q7QUFDbEQsNERBQW1DO0FBQ25DLHNEQUFrRDtBQUNsRCx3REFBb0Q7QUFFcEQsTUFBYSxnQkFBZ0I7SUFDM0IsZ0JBQWUsQ0FBQztJQUVULEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBaUIsRUFBRSxPQUFrQixFQUFFLEVBQVk7UUFDdEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDZixPQUFPLENBQUMsTUFBTTtpQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDO2lCQUNYLElBQUksQ0FBQyxDQUFDLEVBQVcsRUFBRSxFQUFFO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUNULFlBQVksRUFBRSxDQUFDLEVBQUUsa0JBQWtCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQy9ELENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRU8sS0FBSyxDQUFD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QUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLEtBQUssQ0FBQyxhQUFhLENBQ3pCLE9BQWdCLEVBQ2hCLElBQVUsRUFDVixLQUFhLEVBQ2IsSUFBVztRQUVYLE9BQU8sSUFBSSxPQUFPLENBQU0sS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNoRCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMvQyxPQUFPLENBQUM7Z0JBQ04sS0FBSyxFQUFFO29CQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7b0JBQy9CLFNBQVMsRUFBRTt3QkFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3FCQUMzQjtvQkFDRCxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsUUFBUSwyQkFBMkI7b0JBQ3JELFdBQVcsRUFBRSxLQUFLLEtBQUssMkdBQTJHO29CQUNsSSxNQUFNLEVBQUUsSUFBSTtvQkFDWixTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUU7b0JBQ3JCLE1BQU0sRUFBRTt3QkFDTixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUMvQixJQUFJLEVBQUUsWUFBWTtxQkFDbkI7aUJBQ0Y7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTNJRCw0Q0EySUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgVXNlckRhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL3VzZXIuZGF0YVwiO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb25EYXRhIH0gZnJvbSBcIi4vLi4vLi4vZGF0YS9zdWJzY3JpcHRpb24uZGF0YVwiO1xyXG5pbXBvcnQgeyBNZWRpYURhdGEgfSBmcm9tIFwiLi8uLi8uLi9kYXRhL21lZGlhLmRhdGFcIjtcclxuaW1wb3J0IHsgTWVzc2FnZSwgVXNlciwgRGlzY29yZEFQSUVycm9yIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBUaW1lSGVscGVyIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvdGltZS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL2NsaWVudFwiO1xyXG5pbXBvcnQgYXJyYXlTb3J0IGZyb20gXCJhcnJheS1zb3J0XCI7XHJcbmltcG9ydCB7IFN1Yk1lZGlhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9zdWIubW9kZWxcIjtcclxuaW1wb3J0IHsgQW5pbWVDYWNoZSB9IGZyb20gXCIuLi8uLi9jb3JlL2FuaW1lLmNhY2hlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVmlld1N1YnNGdW5jdGlvbiBpbXBsZW1lbnRzIElDb21tYW5kRnVuY3Rpb24ge1xyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgcHVibGljIGFzeW5jIEV4ZWN1dGUobWVzc2FnZT86IE1lc3NhZ2UsIGNvbW1hbmQ/OiBJQ29tbWFuZCwgZG0/OiBib29sZWFuKSB7XHJcbiAgICBjb25zdCBlbWJlZCA9IGF3YWl0IHRoaXMuRW1iZWQobWVzc2FnZSwgZG0pO1xyXG4gICAgaWYgKGRtID09PSB0cnVlKSB7XHJcbiAgICAgIG1lc3NhZ2UuYXV0aG9yXHJcbiAgICAgICAgLnNlbmQoZW1iZWQpXHJcbiAgICAgICAgLnRoZW4oKCRtOiBNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgYE1lc3NhZ2UgPCR7JG0uaWR9PiB3YXMgc2VudCB0byA8JHttZXNzYWdlLmF1dGhvci51c2VybmFtZX0+LmBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycjogRGlzY29yZEFQSUVycm9yKSA9PiB7XHJcbiAgICAgICAgICBtZXNzYWdlLnJlcGx5KGBPaCEgaXQgc2VlbXMgdGhhdCBJIGNhbid0IERNIHlvdS5gKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1lc3NhZ2UucmVwbHkoZW1iZWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyBFbWJlZChtZXNzYWdlOiBNZXNzYWdlLCBkbTogYm9vbGVhbikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgbWVudGlvbklkOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgICBpZiAobWVzc2FnZS5tZW50aW9ucy5tZW1iZXJzLnNpemUgPT09IDEpIHtcclxuICAgICAgICBtZW50aW9uSWQgPSBtZXNzYWdlLm1lbnRpb25zLm1lbWJlcnMuZmlyc3QoKS5pZDtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBkaXNjb3JkSWQ6IHN0cmluZyA9XHJcbiAgICAgICAgbWVudGlvbklkID09PSBudWxsID8gbWVzc2FnZS5hdXRob3IuaWQgOiBtZW50aW9uSWQ7XHJcbiAgICAgIGNvbnN0IHNvcnRlZDogYW55W10gPSBbXTtcclxuICAgICAgbGV0IHVuc29ydGVkOiBhbnlbXSA9IFtdO1xyXG4gICAgICBjb25zdCBkVXNlciA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0VXNlcihkaXNjb3JkSWQpLmNhdGNoKGVyciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChkVXNlciBpbnN0YW5jZW9mIFVzZXIgPT09IGZhbHNlKSByZXR1cm47XHJcbiAgICAgIFVzZXJEYXRhLkdldFVzZXIoZGlzY29yZElkKVxyXG4gICAgICAgIC50aGVuKGFzeW5jIHUgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgc3VicyA9IGF3YWl0IFN1YnNjcmlwdGlvbkRhdGEuR2V0VXNlclN1YnModS5JZCk7XHJcbiAgICAgICAgICBpZiAoc3Vicy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29uc3QgdGVtcGxhdGUgPSBhd2FpdCB0aGlzLkVtYmVkVGVtcGxhdGUoXHJcbiAgICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgICBkVXNlciBhcyBVc2VyLFxyXG4gICAgICAgICAgICAgIDAsXHJcbiAgICAgICAgICAgICAgc29ydGVkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHJlc29sdmUodGVtcGxhdGUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBmb3IgKGxldCB2ID0gMDsgdiA8IHN1YnMubGVuZ3RoOyB2KyspIHtcclxuICAgICAgICAgICAgY29uc3Qgc3ViID0gc3Vic1t2XTtcclxuICAgICAgICAgICAgY29uc3QgJG0gPSBhd2FpdCBBbmltZUNhY2hlLkdldChzdWIuTWVkaWFJZCk7XHJcbiAgICAgICAgICAgIGlmICgkbSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KCRtLnRpdGxlKTtcclxuICAgICAgICAgICAgICBjb25zdCBlcGlzb2RlID0gJG0ubmV4dEFpcmluZ0VwaXNvZGUubmV4dDtcclxuICAgICAgICAgICAgICBsZXQgZXBpc29kZXMgPSBcIlwiO1xyXG4gICAgICAgICAgICAgIGlmICgkbS5lcGlzb2RlcyAhPT0gbnVsbCAmJiAkbS5lcGlzb2RlcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBlcGlzb2RlcyA9ICRtLmVwaXNvZGVzID09PSAwID8gYD9gIDogYCR7JG0uZXBpc29kZXN9YDtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXBpc29kZXMgPSBgP2A7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnN0IGNvdW50ZG93biA9IFRpbWVIZWxwZXIuQ291bnRkb3duKFxyXG4gICAgICAgICAgICAgICAgJG0ubmV4dEFpcmluZ0VwaXNvZGUudGltZVVudGlsQWlyaW5nXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICBjb25zdCBwcmUgPSBuZXcgU3ViTWVkaWEoe1xyXG4gICAgICAgICAgICAgICAgdGltZVVudGlsQWlyaW5nOiAkbS5uZXh0QWlyaW5nRXBpc29kZS50aW1lVW50aWxBaXJpbmcsXHJcbiAgICAgICAgICAgICAgICBmaWVsZDoge1xyXG4gICAgICAgICAgICAgICAgICBuYW1lOiBgXFxuJHt0aXRsZX1gLFxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogYFtNeUFuaW1lTGlzdF0oaHR0cHM6Ly9teWFuaW1lbGlzdC5uZXQvYW5pbWUvJHtcclxuICAgICAgICAgICAgICAgICAgICAkbS5pZE1hbFxyXG4gICAgICAgICAgICAgICAgICB9LylcXG5FcGlzb2RlICoqJHtlcGlzb2RlfSoqLyR7ZXBpc29kZXN9IGluICoqKiR7Y291bnRkb3dufSoqKlxcbuKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrOKWrGBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB1bnNvcnRlZC5wdXNoKHByZS5kYXRhKTtcclxuICAgICAgICAgICAgICBpZiAodiA9PT0gc3Vicy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB1bnNvcnRlZCA9IGFycmF5U29ydCh1bnNvcnRlZCwgW1widGltZVVudGlsQWlyaW5nXCJdKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgdW5zb3J0ZWQubGVuZ3RoOyBiKyspIHtcclxuICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHVuc29ydGVkW2JdO1xyXG4gICAgICAgICAgICAgICAgICBzb3J0ZWQucHVzaChlbGVtZW50LmZpZWxkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxyXG4gICAgICAgICAgICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICBkVXNlciBhcyBVc2VyLFxyXG4gICAgICAgICAgICAgICAgICBzdWJzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgICAgc29ydGVkXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHRlbXBsYXRlID0gYXdhaXQgdGhpcy5FbWJlZFRlbXBsYXRlKFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgICAgIGRVc2VyIGFzIFVzZXIsXHJcbiAgICAgICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICAgICAgc29ydGVkXHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICByZXNvbHZlKHRlbXBsYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGFzeW5jIChyZWFzb246IEVycm9yKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGF3YWl0IHRoaXMuRW1iZWRUZW1wbGF0ZShcclxuICAgICAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICAgICAgZFVzZXIgYXMgVXNlcixcclxuICAgICAgICAgICAgMCxcclxuICAgICAgICAgICAgc29ydGVkXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgcmVzb2x2ZSh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24ubWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgRW1iZWRUZW1wbGF0ZShcclxuICAgIG1lc3NhZ2U6IE1lc3NhZ2UsXHJcbiAgICB1c2VyOiBVc2VyLFxyXG4gICAgY291bnQ6IG51bWJlcixcclxuICAgIGxpc3Q6IGFueVtdXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8YW55Pihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IG1lbWJlciA9IG1lc3NhZ2UuZ3VpbGQubWVtYmVycy5nZXQodXNlci5pZCk7XHJcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XHJcbiAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgIGVtYmVkOiB7XHJcbiAgICAgICAgICBjb2xvcjogbWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxyXG4gICAgICAgICAgdGh1bWJuYWlsOiB7XHJcbiAgICAgICAgICAgIHVybDogbWVtYmVyLnVzZXIuYXZhdGFyVVJMXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdGl0bGU6IGAqKioke3VzZXIudXNlcm5hbWV9KioqJ3MgKlN1YnNjcmlwdGlvbiBMaXN0KmAsXHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogYCoqJHtjb3VudH0gQW5pbWUqKlxcblxcblBsZWFzZSBOb3RlOiAqVGhlIGFpcmluZyBzY2hlZHVsZSBmb3IgdGhlIHN0cmVhbWluZyBzaXRlIHlvdSBhcmUgdXNpbmcgbWlnaHQgYmUgZGlmZmVyZW50LipcXG5gLFxyXG4gICAgICAgICAgZmllbGRzOiBsaXN0LFxyXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxyXG4gICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgIGljb25fdXJsOiBjbGllbnQudXNlci5hdmF0YXJVUkwsXHJcbiAgICAgICAgICAgIHRleHQ6IFwiwqkgUmlraW1hcnVcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19