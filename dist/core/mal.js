"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const request_promise_1 = __importDefault(require("request-promise"));
const json_helper_1 = require("../helpers/json.helper");
const mal_anime_model_1 = require("../models/mal.anime.model");
const cheerio_1 = __importDefault(require("cheerio"));
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
                    console.log(`Result is either 'null' or 'undefined'.`);
                    resolve(null);
                }
            })
                .catch((err) => {
                console.log(err);
                resolve(null);
            });
        });
    }
    static GetProfileAbout(username) {
        return new Promise((resolve, reject) => {
            const url = `${config_1.Config.MAL_PROFILE_BASE}/${username}`;
            const options = {
                uri: url,
                transform: function (body) {
                    return cheerio_1.default.load(body);
                }
            };
            request_promise_1.default(options)
                .then(($) => {
                resolve($(".profile-about-user")
                    .find(".word-break")
                    .text());
            })
                .catch(err => {
                console.log(err);
                resolve(null);
            });
        });
    }
}
exports.MAL = MAL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQWtDO0FBQ2xDLHNFQUFpQztBQUNqQyx3REFBb0Q7QUFDcEQsK0RBQXFEO0FBQ3JELHNEQUE4QjtBQUU5QixNQUFhLEdBQUc7SUFDUCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQWdCO1FBQ3RDLE9BQU8sSUFBSSxPQUFPLENBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxNQUFNLE9BQU8sR0FBRztnQkFDZCxHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsSUFBSTthQUNYLENBQUM7WUFFRix5QkFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDUixJQUFJLENBQUMsS0FBSyxFQUFFLE1BQVcsRUFBRSxFQUFFO2dCQUMxQixNQUFNLFNBQVMsR0FBRyxNQUFNLHdCQUFVLENBQUMsWUFBWSxDQUM3QyxNQUFNLEVBQ04sMEJBQVEsQ0FDVCxDQUFDO2dCQUNGLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUNoRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztvQkFDdkQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNmO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQWdCO1FBQzVDLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxHQUFHLEdBQUcsR0FBRyxlQUFNLENBQUMsZ0JBQWdCLElBQUksUUFBUSxFQUFFLENBQUM7WUFDckQsTUFBTSxPQUFPLEdBQUc7Z0JBQ2QsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsU0FBUyxFQUFFLFVBQVMsSUFBWTtvQkFDOUIsT0FBTyxpQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzthQUNGLENBQUM7WUFFRix5QkFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDUixJQUFJLENBQUMsQ0FBQyxDQUFnQixFQUFFLEVBQUU7Z0JBQ3pCLE9BQU8sQ0FDTCxDQUFDLENBQUMscUJBQXFCLENBQUM7cUJBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUM7cUJBQ25CLElBQUksRUFBRSxDQUNWLENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBckRELGtCQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHJwIGZyb20gXCJyZXF1ZXN0LXByb21pc2VcIjtcbmltcG9ydCB7IEpzb25IZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9qc29uLmhlbHBlclwiO1xuaW1wb3J0IHsgTWFsQW5pbWUgfSBmcm9tIFwiLi4vbW9kZWxzL21hbC5hbmltZS5tb2RlbFwiO1xuaW1wb3J0IGNoZWVyaW8gZnJvbSBcImNoZWVyaW9cIjtcblxuZXhwb3J0IGNsYXNzIE1BTCB7XG4gIHB1YmxpYyBzdGF0aWMgR2V0Q1dMaXN0KHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8TWFsQW5pbWVbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gQ29uZmlnLk1BTF9DV19MSU5LKHVzZXJuYW1lKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIHVyaTogdXJsLFxuICAgICAgICBqc29uOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICBycChvcHRpb25zKVxuICAgICAgICAudGhlbihhc3luYyAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zdCBjb252ZXJ0ZWQgPSBhd2FpdCBKc29uSGVscGVyLkFycmF5Q29udmVydDxNYWxBbmltZT4oXG4gICAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgICBNYWxBbmltZVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGNvbnZlcnRlZCAhPSBudWxsIHx8IGNvbnZlcnRlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXNvbHZlKGNvbnZlcnRlZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZXN1bHQgaXMgZWl0aGVyICdudWxsJyBvciAndW5kZWZpbmVkJy5gKTtcbiAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgR2V0UHJvZmlsZUFib3V0KHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBgJHtDb25maWcuTUFMX1BST0ZJTEVfQkFTRX0vJHt1c2VybmFtZX1gO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgdXJpOiB1cmwsXG4gICAgICAgIHRyYW5zZm9ybTogZnVuY3Rpb24oYm9keTogc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWVyaW8ubG9hZChib2R5KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcnAob3B0aW9ucylcbiAgICAgICAgLnRoZW4oKCQ6IENoZWVyaW9TdGF0aWMpID0+IHtcbiAgICAgICAgICByZXNvbHZlKFxuICAgICAgICAgICAgJChcIi5wcm9maWxlLWFib3V0LXVzZXJcIilcbiAgICAgICAgICAgICAgLmZpbmQoXCIud29yZC1icmVha1wiKVxuICAgICAgICAgICAgICAudGV4dCgpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19