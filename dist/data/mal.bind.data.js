"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../core/mongo");
const tables_1 = require("../core/tables");
const mal_bind_model_1 = require("../models/mal.bind.model");
const json_helper_1 = require("../helpers/json.helper");
const array_helper_1 = require("../helpers/array.helper");
class MalBindData {
    static Init() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            this.Initializing = true;
            const results = await mongo_1.Mongo.FindAll(tables_1.Tables.malbind);
            const list = await json_helper_1.JsonHelper.ArrayConvert(results, mal_bind_model_1.MalBind);
            if (list === undefined || list === null) {
                this.Initializing = false;
                reject(new Error(`JsonHelper.ArrayConvert<MalSync>(results, MalSync) is 'null' or 'undefined'.`));
            }
            else {
                if (list.length === 0) {
                    this.Initializing = false;
                    resolve();
                }
                else {
                    for (let i = 0; i < list.length; i++) {
                        const malBind = list[i];
                        this.List.push(malBind);
                        if (i === list.length - 1) {
                            this.Initializing = false;
                            resolve();
                        }
                    }
                }
            }
        });
    }
    static Insert(discordId, malUsername, code) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(discordId);
            if (exists === false) {
                const data = {
                    discord_id: discordId,
                    mal_username: malUsername,
                    code: code,
                    verified: false
                };
                const result = await mongo_1.Mongo.Insert(tables_1.Tables.malbind, data);
                console.log(result.insertedId);
                const malsync = new mal_bind_model_1.MalBind();
                malsync.Id = result.insertedId;
                malsync.DiscordId = discordId;
                malsync.MalUsername = malUsername;
                malsync.Code = code;
                malsync.Verified = false;
                this.List.push(malsync);
                resolve(malsync);
            }
            else {
                resolve(this.All.find(x => x.DiscordId === discordId));
            }
        });
    }
    static get All() {
        return this.List;
    }
    static Verify(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const query = { discord_id: discordId };
            const newValue = { $set: { verified: true } };
            await mongo_1.Mongo.Update(tables_1.Tables.malbind, query, newValue);
            const oldValue = await this.Get(discordId);
            array_helper_1.ArrayHelper.remove(this.List, oldValue, async () => {
                const res = await mongo_1.Mongo.FindOne(tables_1.Tables.malbind, query);
                const ms = await json_helper_1.JsonHelper.ArrayConvert(res, mal_bind_model_1.MalBind);
                const m = ms[0];
                console.log(`Update MAL bind: ${m.Code}`);
                if (m !== null && m !== undefined) {
                    this.List.push(m);
                    resolve(m);
                }
                else {
                    reject(new Error(`JsonHelper.Convert<MalSync>(res, MalSync) is 'null' or 'undefined'.`));
                }
            });
        });
    }
    static Exists(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const malsync = this.List.find(m => m.DiscordId === discordId);
            if (malsync === null || malsync === undefined) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    }
    static Get(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            let iteration = 0;
            if (this.List.length === 0) {
                reject(new Error(`List is empty.`));
            }
            this.List.forEach(m => {
                iteration++;
                if (m.DiscordId === discordId) {
                    resolve(m);
                }
                else {
                    if (iteration === this.List.length) {
                        reject(new Error(`this.List.find(m => m.DiscordId === discordId) is 'null' or 'undefined'.`));
                    }
                }
            });
        });
    }
    static LogAll() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            if (this.List === null ||
                this.List === undefined ||
                this.List.length === 0) {
                reject(new Error(`this.List is 'null' or 'empty'.`));
            }
            else {
                console.log(this.List);
                resolve();
            }
        });
    }
    static OnReady() {
        return new Promise((resolve, reject) => {
            setInterval(() => {
                if (this.Initializing === false) {
                    resolve();
                }
            }, 1);
        });
    }
}
MalBindData.List = [];
MalBindData.Initializing = false;
exports.MalBindData = MalBindData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmJpbmQuZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL21hbC5iaW5kLmRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBc0M7QUFDdEMsMkNBQXdDO0FBQ3hDLDZEQUFtRDtBQUNuRCx3REFBb0Q7QUFDcEQsMERBQXNEO0FBRXRELE1BQWEsV0FBVztJQUlmLE1BQU0sQ0FBQyxJQUFJO1FBQ2hCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsZUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELE1BQU0sSUFBSSxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQVUsT0FBTyxFQUFFLHdCQUFPLENBQUMsQ0FBQztZQUN0RSxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE1BQU0sQ0FDSixJQUFJLEtBQUssQ0FDUCw4RUFBOEUsQ0FDL0UsQ0FDRixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtvQkFDckIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBQzFCLE9BQU8sRUFBRSxDQUFDO2lCQUNYO3FCQUFNO29CQUNMLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNwQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JB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Q0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLE9BQU87UUFDbkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNmLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLEVBQUU7b0JBQy9CLE9BQU8sRUFBRSxDQUFDO2lCQUNYO1lBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXZKYSxnQkFBSSxHQUFjLEVBQUUsQ0FBQztBQUNyQix3QkFBWSxHQUFHLEtBQUssQ0FBQztBQUZyQyxrQ0F5SkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25nbyB9IGZyb20gXCIuLi9jb3JlL21vbmdvXCI7XHJcbmltcG9ydCB7IFRhYmxlcyB9IGZyb20gXCIuLi9jb3JlL3RhYmxlc1wiO1xyXG5pbXBvcnQgeyBNYWxCaW5kIH0gZnJvbSBcIi4uL21vZGVscy9tYWwuYmluZC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcclxuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWxCaW5kRGF0YSB7XHJcbiAgcHVibGljIHN0YXRpYyBMaXN0OiBNYWxCaW5kW10gPSBbXTtcclxuICBwdWJsaWMgc3RhdGljIEluaXRpYWxpemluZyA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIEluaXQoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSB0cnVlO1xyXG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgTW9uZ28uRmluZEFsbChUYWJsZXMubWFsYmluZCk7XHJcbiAgICAgIGNvbnN0IGxpc3QgPSBhd2FpdCBKc29uSGVscGVyLkFycmF5Q29udmVydDxNYWxCaW5kPihyZXN1bHRzLCBNYWxCaW5kKTtcclxuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZCB8fCBsaXN0ID09PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcclxuICAgICAgICByZWplY3QoXHJcbiAgICAgICAgICBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgIGBKc29uSGVscGVyLkFycmF5Q29udmVydDxNYWxTeW5jPihyZXN1bHRzLCBNYWxTeW5jKSBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbWFsQmluZCA9IGxpc3RbaV07XHJcbiAgICAgICAgICAgIHRoaXMuTGlzdC5wdXNoKG1hbEJpbmQpO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBJbnNlcnQoZGlzY29yZElkOiBzdHJpbmcsIG1hbFVzZXJuYW1lOiBzdHJpbmcsIGNvZGU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPE1hbEJpbmQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKGRpc2NvcmRJZCk7XHJcbiAgICAgIGlmIChleGlzdHMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIGRpc2NvcmRfaWQ6IGRpc2NvcmRJZCxcclxuICAgICAgICAgIG1hbF91c2VybmFtZTogbWFsVXNlcm5hbWUsXHJcbiAgICAgICAgICBjb2RlOiBjb2RlLFxyXG4gICAgICAgICAgdmVyaWZpZWQ6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBNb25nby5JbnNlcnQoVGFibGVzLm1hbGJpbmQsIGRhdGEpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5pbnNlcnRlZElkKTtcclxuICAgICAgICBjb25zdCBtYWxzeW5jID0gbmV3IE1hbEJpbmQoKTtcclxuICAgICAgICBtYWxzeW5jLklkID0gcmVzdWx0Lmluc2VydGVkSWQ7XHJcbiAgICAgICAgbWFsc3luYy5EaXNjb3JkSWQgPSBkaXNjb3JkSWQ7XHJcbiAgICAgICAgbWFsc3luYy5NYWxVc2VybmFtZSA9IG1hbFVzZXJuYW1lO1xyXG4gICAgICAgIG1hbHN5bmMuQ29kZSA9IGNvZGU7XHJcbiAgICAgICAgbWFsc3luYy5WZXJpZmllZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuTGlzdC5wdXNoKG1hbHN5bmMpO1xyXG4gICAgICAgIHJlc29sdmUobWFsc3luYyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0aGlzLkFsbC5maW5kKHggPT4geC5EaXNjb3JkSWQgPT09IGRpc2NvcmRJZCkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEFsbCgpIHtcclxuICAgIHJldHVybiB0aGlzLkxpc3Q7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIFZlcmlmeShkaXNjb3JkSWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPE1hbEJpbmQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0geyBkaXNjb3JkX2lkOiBkaXNjb3JkSWQgfTtcclxuICAgICAgY29uc3QgbmV3VmFsdWUgPSB7ICRzZXQ6IHsgdmVyaWZpZWQ6IHRydWUgfSB9O1xyXG4gICAgICBhd2FpdCBNb25nby5VcGRhdGUoVGFibGVzLm1hbGJpbmQsIHF1ZXJ5LCBuZXdWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IG9sZFZhbHVlID0gYXdhaXQgdGhpcy5HZXQoZGlzY29yZElkKTtcclxuICAgICAgQXJyYXlIZWxwZXIucmVtb3ZlKHRoaXMuTGlzdCwgb2xkVmFsdWUsIGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBNb25nby5GaW5kT25lKFRhYmxlcy5tYWxiaW5kLCBxdWVyeSk7XHJcbiAgICAgICAgY29uc3QgbXMgPSBhd2FpdCBKc29uSGVscGVyLkFycmF5Q29udmVydDxNYWxCaW5kPihyZXMsIE1hbEJpbmQpO1xyXG4gICAgICAgIGNvbnN0IG0gPSBtc1swXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgVXBkYXRlIE1BTCBiaW5kOiAke20uQ29kZX1gKTtcclxuICAgICAgICBpZiAobSAhPT0gbnVsbCAmJiBtICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIHRoaXMuTGlzdC5wdXNoKG0pO1xyXG4gICAgICAgICAgcmVzb2x2ZShtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVqZWN0KFxyXG4gICAgICAgICAgICBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgYEpzb25IZWxwZXIuQ29udmVydDxNYWxTeW5jPihyZXMsIE1hbFN5bmMpIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBFeGlzdHMoZGlzY29yZElkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xyXG4gICAgICBjb25zdCBtYWxzeW5jID0gdGhpcy5MaXN0LmZpbmQobSA9PiBtLkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKTtcclxuICAgICAgaWYgKG1hbHN5bmMgPT09IG51bGwgfHwgbWFsc3luYyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIEdldChkaXNjb3JkSWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPE1hbEJpbmQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGxldCBpdGVyYXRpb24gPSAwO1xyXG4gICAgICBpZiAodGhpcy5MaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYExpc3QgaXMgZW1wdHkuYCkpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuTGlzdC5mb3JFYWNoKG0gPT4ge1xyXG4gICAgICAgIGl0ZXJhdGlvbisrO1xyXG4gICAgICAgIGlmIChtLkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKSB7XHJcbiAgICAgICAgICByZXNvbHZlKG0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoaXRlcmF0aW9uID09PSB0aGlzLkxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChcclxuICAgICAgICAgICAgICBuZXcgRXJyb3IoXHJcbiAgICAgICAgICAgICAgICBgdGhpcy5MaXN0LmZpbmQobSA9PiBtLkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKSBpcyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuYFxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIExvZ0FsbCgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5MaXN0ID09PSBudWxsIHx8XHJcbiAgICAgICAgdGhpcy5MaXN0ID09PSB1bmRlZmluZWQgfHxcclxuICAgICAgICB0aGlzLkxpc3QubGVuZ3RoID09PSAwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoYHRoaXMuTGlzdCBpcyAnbnVsbCcgb3IgJ2VtcHR5Jy5gKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5MaXN0KTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBPblJlYWR5KCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLkluaXRpYWxpemluZyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sIDEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==