"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sender_1 = require("../../core/sender");
const random_helper_1 = require("../../helpers/random.helper");
const mal_bind_data_1 = require("../../data/mal.bind.data");
const mal_bind_model_1 = require("../../models/mal.bind.model");
const client_1 = require("../../core/client");
const user_data_1 = require("../../data/user.data");
const mal_1 = require("../../core/mal");
class MalBindFunction {
    async Execute(message, command, dm) {
        await user_data_1.UserData.Insert(message.author.id).catch(err => {
            this.CheckBind(message, command, dm);
        });
        this.CheckBind(message, command, dm);
    }
    async CheckBind(message, command, dm) {
        const c = await this.SetCode(message, command);
        this.ProcessCode(message, command, dm, c);
    }
    async ProcessCode(message, command, dm, c) {
        const code = mal_bind_model_1.MalBind.CodeFormat(c);
        const mal = await mal_bind_data_1.MalBindData.Get(message.author.id);
        if (mal instanceof mal_bind_model_1.MalBind) {
            if (mal.Verified === true) {
                sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`, dm);
            }
            else {
                this.CheckProfile(message, command, dm, mal_bind_model_1.MalBind.CodeFormat(mal.Code));
            }
        }
        else {
            this.CheckProfile(message, command, dm, code);
        }
    }
    async CheckProfile(message, command, dm, code) {
        const about = await mal_1.MAL.GetProfileAbout(command.Parameter);
        if (about.includes(code)) {
            await mal_bind_data_1.MalBindData.Verify(message.author.id).catch(err => {
                console.log(err);
            });
            sender_1.Sender.Send(message, `Cool! Your MAL account is **binded** with rikimaru discord. You can **remove** the code in your **mal about section**.`, dm);
        }
        else {
            const embed = await this.EmbedTemplate(message, command, code);
            sender_1.Sender.Send(message, embed, dm);
        }
    }
    EmbedTemplate(message, command, code) {
        return new Promise(async (resolve, reject) => {
            const client = await client_1.ClientManager.GetClient();
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
