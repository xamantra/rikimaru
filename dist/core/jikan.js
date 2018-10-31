"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const request_promise_1 = __importDefault(require("request-promise"));
const json_helper_1 = require("../helpers/json.helper");
const jikan_profile_1 = require("../models/jikan.profile");
const jikan_anime_list_1 = require("../models/jikan.anime.list");
class JikanRequest {
    static Profile(path, param1, param2 = null) {
        return new Promise((resolve, reject) => {
            let url = `${config_1.Config.JIKAN_BASE_URL}/${path}/${param1}`;
            if (param2 !== null) {
                url = `${url}/${param2}`;
            }
            const options = {
                uri: url,
                json: true
            };
            request_promise_1.default(options)
                .then(async (result) => {
                const converted = await json_helper_1.JsonHelper.Convert(result, jikan_profile_1.Profile);
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
    static AnimeList(username, type) {
        return new Promise((resolve, reject) => {
            const url = `${config_1.Config.JIKAN_BASE_URL}user/${username}/animelist/${type}`;
            const options = {
                uri: url,
                json: true
            };
            request_promise_1.default(options)
                .then(async (result) => {
                const converted = await json_helper_1.JsonHelper.Convert(result, jikan_anime_list_1.AnimeList);
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
}
exports.JikanRequest = JikanRequest;
//# sourceMappingURL=jikan.js.map