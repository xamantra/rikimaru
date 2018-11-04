"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_data_1 = require("../data/media.data");
const title_helper_1 = require("../helpers/title.helper");
const client_1 = require("./client");
const random_helper_1 = require("../helpers/random.helper");
class BotPresence {
    static Init() {
        return new Promise(async (resolve, reject) => {
            const media = await media_data_1.MediaData.GetRandom();
            const title = title_helper_1.TitleHelper.Get(media.title);
            const action = random_helper_1.Random.Range(2, 3);
            let musicType = "";
            if (action === 2) {
                musicType = this.MusicType[random_helper_1.Random.Range(0, 1)];
            }
            const client = await client_1.ClientManager.GetClient();
            client.user
                .setActivity(`${musicType} ${title}`, { type: action })
                .then(presence => {
                resolve();
            })
                .catch((err) => {
                console.log(err.name);
            });
        });
    }
}
BotPresence.MusicType = ["Ending Song of", "Opening Song of"];
exports.BotPresence = BotPresence;
