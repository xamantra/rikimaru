"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sender {
    static Send(message, content, isDM = false) {
        if (isDM) {
            message.author
                .send(content)
                .then(($m) => {
                console.log(`Message <${$m.id}> was sent to "${message.author.username}".`);
            })
                .catch((err) => {
                message.reply(`Oh!, it seems that I can't dm you.`);
                console.log(err.message);
            });
        }
        else {
            message
                .reply(content)
                .then(($m) => {
                console.log(`Message <${$m.id}> was sent in <${message.channel.id}>.`);
            })
                .catch((err) => {
                console.log(err.message);
            });
        }
    }
    static async SendInfo(message, content, isDM = false) {
        this.Send(message, content, isDM);
    }
}
exports.Sender = Sender;
//# sourceMappingURL=sender.js.map