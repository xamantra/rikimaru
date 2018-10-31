"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
const mal_model_1 = require("../models/mal.model");
const config_1 = require("../core/config");
const cheerio_1 = __importDefault(require("cheerio"));
class MalHelper {
    static GetProfile(malUsername) {
        return new Promise((resolve, reject) => {
            const url = `${config_1.Config.MAL_PROFILE_BASE}${malUsername}`;
            console.log(url);
            const options = {
                uri: url,
                transform: function (body) {
                    return cheerio_1.default.load(body);
                }
            };
            request_promise_1.default(options)
                .then(($) => {
                const imageUrl = $(".content-container")
                    .find(".container-left")
                    .find(".user-image")
                    .find("img")
                    .attr("src");
                const status = $(".user-status .border-top .pb8 .mb4")
                    .find(".clearfix")
                    .find(".user-status-data .di-ib .fl-r")
                    .get();
                const lastOnline = status[0];
                const gender = status[1];
                const bday = status[2];
                const location = status[3];
                const joined = status[4];
                const stats = $(".user-statistics-stats").find(".stats .anime");
                const days = stats
                    .find(".stat-score")
                    .find(".di-tc .al .pl8 .fs12 .fw-b")
                    .remove(".fn-grey2 .fw-n")
                    .text();
                const meanScore = stats
                    .find(".stat-score")
                    .find("di-tc .ar .pr8 .fs12 .fw-b")
                    .remove(".fn-grey2 .fw-n")
                    .text();
                const watchStatus = stats
                    .find(".stats-status")
                    .find("di-ib .fl-r .lh10")
                    .get();
                const watching = watchStatus[0];
                console.log(watchStatus);
                const completed = watchStatus[1];
                const onhold = watchStatus[2];
                const dropped = watchStatus[3];
                const ptw = watchStatus[4];
                const statsData = stats
                    .find(".stats-data")
                    .find(".di-ib .fl-r")
                    .get();
                const rewatch = statsData[1];
                const episodes = statsData[2];
                const animeStats = new mal_model_1.AnimeStats(days, meanScore, Number(watching), Number(completed), Number(onhold), Number(dropped), Number(ptw), Number(rewatch), Number(episodes));
                const profileStatus = new mal_model_1.ProfileStatus(lastOnline, gender, bday, location, joined);
                const malProfile = new mal_model_1.MalProfile(imageUrl, profileStatus, animeStats);
                console.log(malProfile.Image, malProfile.Status, malProfile.AnimeStatus);
                resolve(malProfile);
            })
                .catch(err => {
                console.log(err);
                reject(new Error(`Go me nasai! I couldn't find mal user **${malUsername}**. Check your spelling or try again later.`));
            });
        });
    }
}
exports.MalHelper = MalHelper;
//# sourceMappingURL=mal.helper.js.map