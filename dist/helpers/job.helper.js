"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./../core/client");
const title_helper_1 = require("./title.helper");
const user_data_1 = require("../data/user.data");
const subscription_data_1 = require("../data/subscription.data");
class JobHelper {
    static async Run(media, queue) {
        const users = client_1.ClientManager.GetClient.users;
        const title = await title_helper_1.TitleHelper.Get(media.title);
        await users.forEach(async (x) => {
            await user_data_1.UserData.All.forEach(u => {
                subscription_data_1.SubscriptionData.Exists(media.idMal, u.Id, e => {
                    if (e === true) {
                        x.send(`***${title}***  \`Episode ${queue.NextEpisode}\` has been aired!!`);
                    }
                });
            });
        });
    }
}
exports.JobHelper = JobHelper;
//# sourceMappingURL=job.helper.js.map