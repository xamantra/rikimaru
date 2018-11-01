"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sender {
    static Send(message, content, isDM = false, callback) {
        if (isDM) {
            message.author
                .send(content)
                .then(($m) => {
                if (callback !== null && callback !== undefined) {
                    callback();
                }
                console.log(`Message <${$m.id}> was sent to "${message.author.username}".`);
            })
                .catch((err) => {
                message.reply(`Oh!, it seems that I can't dm you.`);
                if (callback !== null && callback !== undefined) {
                    callback();
                }
                console.log(`Sender.ts: "${err.message}"`);
            });
        }
        else {
            message
                .reply(content)
                .then(($m) => {
                if (callback !== null && callback !== undefined) {
                    callback();
                }
                console.log(`Message <${$m.id}> was sent in <${message.channel.id}>.`);
            })
                .catch((err) => {
                if (callback !== null && callback !== undefined) {
                    callback();
                }
                console.log(`Sender.ts: "${err.message}"`);
            });
        }
    }
    static SendInfo(message, content, isDM = false) {
        this.Send(message, content, isDM);
    }
}
exports.Sender = Sender;
//# sourceMappingURL=sender.js.map