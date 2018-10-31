"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("../../core/sender");
const random_helper_1 = require("../../helpers/random.helper");
const mal_sync_data_1 = require("../../data/mal.sync.data");
const cheerio_1 = __importDefault(require("cheerio"));
const request_promise_1 = __importDefault(require("request-promise"));
const config_1 = require("../../core/config");
const mal_model_1 = require("../../models/mal.model");
const client_1 = require("../../core/client");
class MalSyncFunction {
    Execute(message, command, dm) {
        mal_sync_data_1.MalSyncData.Get(message.author.id)
            .then(result => {
            sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`, dm);
        })
            .catch(e => {
            this.CheckProfile(message, command, dm)
                .then(about => {
                this.SetCode(message, command).then(c => {
                    const code = mal_model_1.MalSync.CodeFormat(c);
                    if (about.includes(code)) {
                        mal_sync_data_1.MalSyncData.Verify(message.author.id)
                            .then(msync => {
                            sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`, dm);
                        })
                            .catch(err => {
                            console.log(err);
                        });
                    }
                    else {
                        this.EmbedTemplate(message, command, code).then(embed => {
                            sender_1.Sender.Send(message, embed, dm);
                        });
                    }
                });
            })
                .catch((err) => {
                sender_1.Sender.Send(message, err.message, dm);
            });
        });
    }
    CheckProfile(message, command, dm) {
        return new Promise((resolve, reject) => {
            const url = `${config_1.Config.MAL_PROFILE_BASE}${command.Parameter}`;
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
                reject(new Error(`Go me nasai! I couldn't find mal user **${command.Parameter}**. Check your spelling or try again later.`));
            });
        });
    }
    EmbedTemplate(message, command, code) {
        return new Promise((resolve, reject) => {
            client_1.ClientManager.GetClient().then(client => {
                const embed = {
                    embed: {
                        title: `Rikimaru MAL Sync Center`,
                        description: `**Rikimaru Code not found** on your profile. You first need to verify your ownership.`,
                        color: message.member.highestRole.color,
                        thumbnail: { url: message.author.avatarURL },
                        image: { url: `https://i.imgur.com/9h3vere.png` },
                        fields: [
                            {
                                name: `Instruction`,
                                value: `*Copy and paste* the verification code below in your *MAL about section.*. You can place it anywhere.\n[Edit Profile](https://myanimelist.net/editprofile.php)`
                            },
                            { name: `Code`, value: `***${code}***\n\nExample:` }
                        ],
                        timestamp: new Date(),
                        footer: { icon_url: client.user.avatarURL, text: "© Rikimaru" }
                    }
                };
                resolve(embed);
            });
        });
    }
    SetCode(message, command) {
        return new Promise((resolve, reject) => {
            const code = random_helper_1.Randomizer.randomInt(10000000, 99999999).toString();
            mal_sync_data_1.MalSyncData.Insert(message.author.id, command.Parameter, code)
                .then(() => {
                resolve(code);
            })
                .catch((m) => {
                resolve(m.Code);
            });
        });
    }
}
exports.MalSyncFunction = MalSyncFunction;
//# sourceMappingURL=malsync.command.function.js.map