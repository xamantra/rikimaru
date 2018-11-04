"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const request_promise_1 = __importDefault(require("request-promise"));
const json_helper_1 = require("../helpers/json.helper");
const mal_anime_model_1 = require("../models/mal.anime.model");
class MAL {
    static GetCWList(username) {
        return new Promise((resolve, reject) => {
            const url = config_1.Config.MAL_CW_LINK(username);
            const options = {
                uri: url,
                json: true
            };
            request_promise_1.default(options)
                .then(async (result) => {
                const converted = await json_helper_1.JsonHelper.ArrayConvert(result, mal_anime_model_1.MalAnime);
                if (converted != null || converted !== undefined) {
                    resolve(converted);
                }
                else {
                    reject(new Error(`Result is either 'null' or 'undefined'.`));
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    static GetProfileAbout(username) {
        return new Promise((resolve, reject) => {
            const url = `${config_1.Config.MAL_PROFILE_BASE}/${username}`;
            const options = {
                uri: url,
                transform: function (body) {
                    return cheerio.load(body);
                }
            };
            request_promise_1.default(options)
                .then(($) => {
                resolve($(".profile-about-user")
                    .find(".word-break")
                    .text());
            })
                .catch(err => {
                reject(new Error(`Go me nasai! I couldn't find mal user **${username}**. Check your spelling or try again later.`));
            });
        });
    }
}
exports.MAL = MAL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQWtDO0FBQ2xDLHNFQUFpQztBQUNqQyx3REFBb0Q7QUFDcEQsK0RBQXFEO0FBR3JELE1BQWEsR0FBRztJQUNQLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBZ0I7UUFDdEMsT0FBTyxJQUFJLE9BQU8sQ0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNqRCxNQUFNLEdBQUcsR0FBRyxlQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sT0FBTyxHQUFHO2dCQUNkLEdBQUcsRUFBRSxHQUFHO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ1gsQ0FBQztZQUVGLHlCQUFFLENBQUMsT0FBTyxDQUFDO2lCQUNSLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBVyxFQUFFLEVBQUU7Z0JBQzFCLE1BQU0sU0FBUyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQzdDLE1BQU0sRUFDTiwwQkFBUSxDQUNULENBQUM7Z0JBQ0YsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7b0JBQ2hELE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDcEI7cUJBQU07b0JBQ0wsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUMsQ0FBQztpQkFDOUQ7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFnQjtRQUM1QyxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLE1BQU0sR0FBRyxHQUFHLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3JELE1BQU0sT0FBTyxHQUFHO2dCQUNkLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFNBQVMsRUFBRSxVQUFTLElBQVk7b0JBQzlCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzthQUNGLENBQUM7WUFFRix5QkFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDUixJQUFJLENBQUMsQ0FBQyxDQUFnQixFQUFFLEVBQUU7Z0JBQ3pCLE9BQU8sQ0FDTCxDQUFDLENBQUMscUJBQXFCLENBQUM7cUJBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUM7cUJBQ25CLElBQUksRUFBRSxDQUNWLENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sQ0FDSixJQUFJLEtBQUssQ0FDUCwyQ0FBMkMsUUFBUSw2Q0FBNkMsQ0FDakcsQ0FDRixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXRERCxrQkFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcclxuaW1wb3J0IHJwIGZyb20gXCJyZXF1ZXN0LXByb21pc2VcIjtcclxuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XHJcbmltcG9ydCB7IE1hbEFuaW1lIH0gZnJvbSBcIi4uL21vZGVscy9tYWwuYW5pbWUubW9kZWxcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1BTCB7XHJcbiAgcHVibGljIHN0YXRpYyBHZXRDV0xpc3QodXNlcm5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPE1hbEFuaW1lW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgdXJsID0gQ29uZmlnLk1BTF9DV19MSU5LKHVzZXJuYW1lKTtcclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICB1cmk6IHVybCxcclxuICAgICAgICBqc29uOiB0cnVlXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBycChvcHRpb25zKVxyXG4gICAgICAgIC50aGVuKGFzeW5jIChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY29udmVydGVkID0gYXdhaXQgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8TWFsQW5pbWU+KFxyXG4gICAgICAgICAgICByZXN1bHQsXHJcbiAgICAgICAgICAgIE1hbEFuaW1lXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKGNvbnZlcnRlZCAhPSBudWxsIHx8IGNvbnZlcnRlZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoY29udmVydGVkKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFJlc3VsdCBpcyBlaXRoZXIgJ251bGwnIG9yICd1bmRlZmluZWQnLmApKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIEdldFByb2ZpbGVBYm91dCh1c2VybmFtZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHVybCA9IGAke0NvbmZpZy5NQUxfUFJPRklMRV9CQVNFfS8ke3VzZXJuYW1lfWA7XHJcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgdXJpOiB1cmwsXHJcbiAgICAgICAgdHJhbnNmb3JtOiBmdW5jdGlvbihib2R5OiBzdHJpbmcpIHtcclxuICAgICAgICAgIHJldHVybiBjaGVlcmlvLmxvYWQoYm9keSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgcnAob3B0aW9ucylcclxuICAgICAgICAudGhlbigoJDogQ2hlZXJpb1N0YXRpYykgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZShcclxuICAgICAgICAgICAgJChcIi5wcm9maWxlLWFib3V0LXVzZXJcIilcclxuICAgICAgICAgICAgICAuZmluZChcIi53b3JkLWJyZWFrXCIpXHJcbiAgICAgICAgICAgICAgLnRleHQoKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgICBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgYEdvIG1lIG5hc2FpISBJIGNvdWxkbid0IGZpbmQgbWFsIHVzZXIgKioke3VzZXJuYW1lfSoqLiBDaGVjayB5b3VyIHNwZWxsaW5nIG9yIHRyeSBhZ2FpbiBsYXRlci5gXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19