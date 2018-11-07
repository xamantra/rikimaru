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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQWtDO0FBQ2xDLHNFQUFpQztBQUNqQyx3REFBb0Q7QUFDcEQsK0RBQXFEO0FBQ3JELHNEQUE4QjtBQUU5QixNQUFhLEdBQUc7SUFDUCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQWdCO1FBQ3RDLE9BQU8sSUFBSSxPQUFPLENBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxNQUFNLE9BQU8sR0FBRztnQkFDZCxHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsSUFBSTthQUNYLENBQUM7WUFFRix5QkFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDUixJQUFJLENBQUMsS0FBSyxFQUFFLE1BQVcsRUFBRSxFQUFFO2dCQUMxQixNQUFNLFNBQVMsR0FBRyxNQUFNLHdCQUFVLENBQUMsWUFBWSxDQUM3QyxNQUFNLEVBQ04sMEJBQVEsQ0FDVCxDQUFDO2dCQUNGLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUNoRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNMLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLENBQUM7aUJBQzlEO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBZ0I7UUFDNUMsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM3QyxNQUFNLEdBQUcsR0FBRyxHQUFHLGVBQU0sQ0FBQyxnQkFBZ0IsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNyRCxNQUFNLE9BQU8sR0FBRztnQkFDZCxHQUFHLEVBQUUsR0FBRztnQkFDUixTQUFTLEVBQUUsVUFBUyxJQUFZO29CQUM5QixPQUFPLGlCQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2FBQ0YsQ0FBQztZQUVGLHlCQUFFLENBQUMsT0FBTyxDQUFDO2lCQUNSLElBQUksQ0FBQyxDQUFDLENBQWdCLEVBQUUsRUFBRTtnQkFDekIsT0FBTyxDQUNMLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztxQkFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQztxQkFDbkIsSUFBSSxFQUFFLENBQ1YsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFuREQsa0JBbURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgcnAgZnJvbSBcInJlcXVlc3QtcHJvbWlzZVwiO1xuaW1wb3J0IHsgSnNvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL2pzb24uaGVscGVyXCI7XG5pbXBvcnQgeyBNYWxBbmltZSB9IGZyb20gXCIuLi9tb2RlbHMvbWFsLmFuaW1lLm1vZGVsXCI7XG5pbXBvcnQgY2hlZXJpbyBmcm9tIFwiY2hlZXJpb1wiO1xuXG5leHBvcnQgY2xhc3MgTUFMIHtcbiAgcHVibGljIHN0YXRpYyBHZXRDV0xpc3QodXNlcm5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxNYWxBbmltZVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBDb25maWcuTUFMX0NXX0xJTksodXNlcm5hbWUpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgdXJpOiB1cmwsXG4gICAgICAgIGpzb246IHRydWVcbiAgICAgIH07XG5cbiAgICAgIHJwKG9wdGlvbnMpXG4gICAgICAgIC50aGVuKGFzeW5jIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGF3YWl0IEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PE1hbEFuaW1lPihcbiAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgIE1hbEFuaW1lXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoY29udmVydGVkICE9IG51bGwgfHwgY29udmVydGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoY29udmVydGVkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgUmVzdWx0IGlzIGVpdGhlciAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgR2V0UHJvZmlsZUFib3V0KHVzZXJuYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBgJHtDb25maWcuTUFMX1BST0ZJTEVfQkFTRX0vJHt1c2VybmFtZX1gO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgdXJpOiB1cmwsXG4gICAgICAgIHRyYW5zZm9ybTogZnVuY3Rpb24oYm9keTogc3RyaW5nKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWVyaW8ubG9hZChib2R5KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgcnAob3B0aW9ucylcbiAgICAgICAgLnRoZW4oKCQ6IENoZWVyaW9TdGF0aWMpID0+IHtcbiAgICAgICAgICByZXNvbHZlKFxuICAgICAgICAgICAgJChcIi5wcm9maWxlLWFib3V0LXVzZXJcIilcbiAgICAgICAgICAgICAgLmZpbmQoXCIud29yZC1icmVha1wiKVxuICAgICAgICAgICAgICAudGV4dCgpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19