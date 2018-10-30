"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
const cheerio_1 = __importDefault(require("cheerio"));
class MAL {
    static Read() {
        const options = {
            uri: "https://myanimelist.net/animelist/xamantra",
            transform: function (body) {
                return cheerio_1.default.load(body);
            }
        };
        request_promise_1.default(options)
            .then(function ($) {
            $(".data.title.clearfix").each(function (i, elem) {
                console.log($(this)
                    .find(".link.sort")
                    .text());
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    }
}
exports.MAL = MAL;
//# sourceMappingURL=mal.js.map