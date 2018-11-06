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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQWtDO0FBQ2xDLHNFQUFpQztBQUNqQyx3REFBb0Q7QUFDcEQsK0RBQXFEO0FBR3JELE1BQWEsR0FBRztJQUNQLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBZ0I7UUFDdEMsT0FBTyxJQUFJLE9BQU8sQ0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNqRCxNQUFNLEdBQUcsR0FBRyxlQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sT0FBTyxHQUFHO2dCQUNkLEdBQUcsRUFBRSxHQUFHO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ1gsQ0FBQztZQUVGLHlCQUFFLENBQUMsT0FBTyxDQUFDO2lCQUNSLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBVyxFQUFFLEVBQUU7Z0JBQzFCLE1BQU0sU0FBUyxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQzdDLE1BQU0sRUFDTiwwQkFBUSxDQUNULENBQUM7Z0JBQ0YsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7b0JBQ2hELE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDcEI7cUJBQU07b0JBQ0wsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUMsQ0FBQztpQkFDOUQ7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUFnQjtRQUM1QyxPQUFPLElBQUksT0FBTyxDQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLE1BQU0sR0FBRyxHQUFHLEdBQUcsZUFBTSxDQUFDLGdCQUFnQixJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3JELE1BQU0sT0FBTyxHQUFHO2dCQUNkLEdBQUcsRUFBRSxHQUFHO2dCQUNSLFNBQVMsRUFBRSxVQUFTLElBQVk7b0JBQzlCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzthQUNGLENBQUM7WUFFRix5QkFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDUixJQUFJLENBQUMsQ0FBQyxDQUFnQixFQUFFLEVBQUU7Z0JBQ3pCLE9BQU8sQ0FDTCxDQUFDLENBQUMscUJBQXFCLENBQUM7cUJBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUM7cUJBQ25CLElBQUksRUFBRSxDQUNWLENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sQ0FDSixJQUFJLEtBQUssQ0FDUCwyQ0FBMkMsUUFBUSw2Q0FBNkMsQ0FDakcsQ0FDRixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXRERCxrQkFzREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBycCBmcm9tIFwicmVxdWVzdC1wcm9taXNlXCI7XG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcbmltcG9ydCB7IE1hbEFuaW1lIH0gZnJvbSBcIi4uL21vZGVscy9tYWwuYW5pbWUubW9kZWxcIjtcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIE1BTCB7XG4gIHB1YmxpYyBzdGF0aWMgR2V0Q1dMaXN0KHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8TWFsQW5pbWVbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gQ29uZmlnLk1BTF9DV19MSU5LKHVzZXJuYW1lKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHVyaTogdXJsLFxuICAgICAgICBqc29uOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBycChvcHRpb25zKVxuICAgICAgICAudGhlbihhc3luYyAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBhd2FpdCBKc29uSGVscGVyLkFycmF5Q29udmVydDxNYWxBbmltZT4oXG4gICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICBNYWxBbmltZVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGNvbnZlcnRlZCAhPSBudWxsIHx8IGNvbnZlcnRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXNvbHZlKGNvbnZlcnRlZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFJlc3VsdCBpcyBlaXRoZXIgJ251bGwnIG9yICd1bmRlZmluZWQnLmApKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEdldFByb2ZpbGVBYm91dCh1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gYCR7Q29uZmlnLk1BTF9QUk9GSUxFX0JBU0V9LyR7dXNlcm5hbWV9YDtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHVyaTogdXJsLFxuICAgICAgICB0cmFuc2Zvcm06IGZ1bmN0aW9uKGJvZHk6IHN0cmluZykge1xuICAgICAgICAgIHJldHVybiBjaGVlcmlvLmxvYWQoYm9keSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHJwKG9wdGlvbnMpXG4gICAgICAgIC50aGVuKCgkOiBDaGVlcmlvU3RhdGljKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICAgICQoXCIucHJvZmlsZS1hYm91dC11c2VyXCIpXG4gICAgICAgICAgICAgIC5maW5kKFwiLndvcmQtYnJlYWtcIilcbiAgICAgICAgICAgICAgLnRleHQoKVxuICAgICAgICAgICk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgIG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYEdvIG1lIG5hc2FpISBJIGNvdWxkbid0IGZpbmQgbWFsIHVzZXIgKioke3VzZXJuYW1lfSoqLiBDaGVjayB5b3VyIHNwZWxsaW5nIG9yIHRyeSBhZ2FpbiBsYXRlci5gXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==