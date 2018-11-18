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
                .catch(() => {
                console.log(`MAL user "${username}" not found...`);
                resolve(null);
            });
        });
    }
}
exports.MAL = MAL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUNBQWtDO0FBQ2xDLHNFQUFpQztBQUNqQyx3REFBb0Q7QUFDcEQsK0RBQXFEO0FBQ3JELHNEQUE4QjtBQUc5QixNQUFhLEdBQUc7SUFDUCxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQWdCO1FBQ3RDLE9BQU8sSUFBSSxPQUFPLENBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDakQsTUFBTSxHQUFHLEdBQUcsZUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6QyxNQUFNLE9BQU8sR0FBRztnQkFDZCxHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsSUFBSTthQUNYLENBQUM7WUFFRix5QkFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDUixJQUFJLENBQUMsS0FBSyxFQUFFLE1BQVcsRUFBRSxFQUFFO2dCQUMxQixNQUFNLFNBQVMsR0FBRyxNQUFNLHdCQUFVLENBQUMsWUFBWSxDQUM3QyxNQUFNLEVBQ04sMEJBQVEsQ0FDVCxDQUFDO2dCQUNGLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO29CQUNoRCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztvQkFDdkQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNmO1lBQ0gsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQWdCO1FBQzVDLE9BQU8sSUFBSSxPQUFPLENBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDN0MsTUFBTSxHQUFHLEdBQUcsR0FBRyxlQUFNLENBQUMsZ0JBQWdCLElBQUksUUFBUSxFQUFFLENBQUM7WUFDckQsTUFBTSxPQUFPLEdBQUc7Z0JBQ2QsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsU0FBUyxFQUFFLFVBQVMsSUFBWTtvQkFDOUIsT0FBTyxpQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsQ0FBQzthQUNGLENBQUM7WUFFRix5QkFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDUixJQUFJLENBQUMsQ0FBQyxDQUFnQixFQUFFLEVBQUU7Z0JBQ3pCLE9BQU8sQ0FDTCxDQUFDLENBQUMscUJBQXFCLENBQUM7cUJBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUM7cUJBQ25CLElBQUksRUFBRSxDQUNWLENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTtnQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsUUFBUSxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXJERCxrQkFxREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBycCBmcm9tIFwicmVxdWVzdC1wcm9taXNlXCI7XG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcbmltcG9ydCB7IE1hbEFuaW1lIH0gZnJvbSBcIi4uL21vZGVscy9tYWwuYW5pbWUubW9kZWxcIjtcbmltcG9ydCBjaGVlcmlvIGZyb20gXCJjaGVlcmlvXCI7XG5pbXBvcnQgeyBTdGF0dXNDb2RlRXJyb3IgfSBmcm9tIFwicmVxdWVzdC1wcm9taXNlL2Vycm9yc1wiO1xuXG5leHBvcnQgY2xhc3MgTUFMIHtcbiAgcHVibGljIHN0YXRpYyBHZXRDV0xpc3QodXNlcm5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxNYWxBbmltZVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB1cmwgPSBDb25maWcuTUFMX0NXX0xJTksodXNlcm5hbWUpO1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgdXJpOiB1cmwsXG4gICAgICAgIGpzb246IHRydWVcbiAgICAgIH07XG5cbiAgICAgIHJwKG9wdGlvbnMpXG4gICAgICAgIC50aGVuKGFzeW5jIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnRlZCA9IGF3YWl0IEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PE1hbEFuaW1lPihcbiAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgIE1hbEFuaW1lXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoY29udmVydGVkICE9IG51bGwgfHwgY29udmVydGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc29sdmUoY29udmVydGVkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFJlc3VsdCBpcyBlaXRoZXIgJ251bGwnIG9yICd1bmRlZmluZWQnLmApO1xuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBHZXRQcm9maWxlQWJvdXQodXNlcm5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHVybCA9IGAke0NvbmZpZy5NQUxfUFJPRklMRV9CQVNFfS8ke3VzZXJuYW1lfWA7XG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICB1cmk6IHVybCxcbiAgICAgICAgdHJhbnNmb3JtOiBmdW5jdGlvbihib2R5OiBzdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gY2hlZXJpby5sb2FkKGJvZHkpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBycChvcHRpb25zKVxuICAgICAgICAudGhlbigoJDogQ2hlZXJpb1N0YXRpYykgPT4ge1xuICAgICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgICAkKFwiLnByb2ZpbGUtYWJvdXQtdXNlclwiKVxuICAgICAgICAgICAgICAuZmluZChcIi53b3JkLWJyZWFrXCIpXG4gICAgICAgICAgICAgIC50ZXh0KClcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBNQUwgdXNlciBcIiR7dXNlcm5hbWV9XCIgbm90IGZvdW5kLi4uYCk7XG4gICAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==