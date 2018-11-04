"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("../../core/sender");
const random_helper_1 = require("../../helpers/random.helper");
const mal_bind_data_1 = require("../../data/mal.bind.data");
const cheerio_1 = __importDefault(require("cheerio"));
const request_promise_1 = __importDefault(require("request-promise"));
const config_1 = require("../../core/config");
const mal_bind_model_1 = require("../../models/mal.bind.model");
const client_1 = require("../../core/client");
const user_data_1 = require("../../data/user.data");
class MalBindFunction {
    Execute(message, command, dm) {
        user_data_1.UserData.Insert(message.author.id)
            .then(insertId => {
            this.CheckBind(message, command, dm);
        })
            .catch(err => {
            this.CheckBind(message, command, dm);
        });
    }
    CheckBind(message, command, dm) {
        this.SetCode(message, command).then(c => {
            this.ProcessCode(message, command, dm, c);
        });
    }
    ProcessCode(message, command, dm, c) {
        const code = mal_bind_model_1.MalBind.CodeFormat(c);
        mal_bind_data_1.MalBindData.Get(message.author.id)
            .then(mal => {
            if (mal.Verified === true) {
                sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`, dm);
            }
            else {
                this.CheckProfile(message, command, dm, mal_bind_model_1.MalBind.CodeFormat(mal.Code));
            }
        })
            .catch(e => {
            this.CheckProfile(message, command, dm, code);
        });
    }
    CheckProfile(message, command, dm, code) {
        this.GetProfile(command).then(about => {
            if (about.includes(code)) {
                mal_bind_data_1.MalBindData.Verify(message.author.id)
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
    }
    GetProfile(command) {
        return new Promise((resolve, reject) => {
            const url = `${config_1.Config.MAL_PROFILE_BASE}/${command.Parameter}`;
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
            const code = random_helper_1.Random.Range(10000000, 99999999).toString();
            mal_bind_data_1.MalBindData.Insert(message.author.id, command.Parameter, code)
                .then(() => {
                resolve(code);
            })
                .catch((m) => {
                resolve(m.Code);
            });
        });
    }
}
exports.MalBindFunction = MalBindFunction;
