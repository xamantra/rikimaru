"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("../core/mongo");
const table_1 = require("../core/table");
const json_helper_1 = require("../helpers/json.helper");
const array_helper_1 = require("../helpers/array.helper");
const ani_bind_model_1 = require("../models/ani.bind.model");
class AniBindData {
    static Init() {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            this.Initializing = true;
            const results = await mongo_1.Mongo.FindAll(table_1.Table.aniBind);
            const list = await json_helper_1.JsonHelper.ArrayConvert(results, ani_bind_model_1.AniBind);
            if (list === undefined || list === null) {
                this.Initializing = false;
                console.log(`JsonHelper.ArrayConvert<AniBind>(results, AniBind) is 'null' or 'undefined'.`);
                resolve();
            }
            else {
                if (list.length === 0) {
                    this.Initializing = false;
                    console.log(`AniBind List Length: ${this.List.length}`);
                    resolve();
                }
                else {
                    this.List = list;
                    this.Initializing = false;
                    console.log(`AniBind List Length: ${this.List.length}`);
                    resolve();
                }
            }
        });
    }
    static Insert(discordId, anilistId, anilistUsername, code) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const exists = await this.Exists(discordId);
            if (exists === false) {
                const data = {
                    anilist_id: anilistId,
                    discord_id: discordId,
                    anilist_username: anilistUsername,
                    code: code,
                    verified: false
                };
                const result = await mongo_1.Mongo.Insert(table_1.Table.aniBind, data);
                console.log(result.insertedId);
                const aniBind = new ani_bind_model_1.AniBind();
                aniBind.Id = result.insertedId;
                aniBind.AnilistId = anilistId;
                aniBind.DiscordId = discordId;
                aniBind.AnilistUsername = anilistUsername;
                aniBind.Code = code;
                aniBind.Verified = false;
                this.List.push(aniBind);
                resolve(aniBind);
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
            await mongo_1.Mongo.Update(table_1.Table.aniBind, query, newValue);
            const oldValue = await this.Get(discordId);
            array_helper_1.ArrayHelper.remove(this.List, oldValue, async () => {
                const res = await mongo_1.Mongo.FindOne(table_1.Table.aniBind, query);
                const ms = await json_helper_1.JsonHelper.ArrayConvert(res, ani_bind_model_1.AniBind);
                const m = ms[0];
                console.log(`Update Anilist bind: ${m.Code}`);
                if (m !== null && m !== undefined) {
                    this.List.push(m);
                    resolve(m);
                }
                else {
                    console.log(`JsonHelper.ArrayConvert<AniBind>(res, AniBind) is 'null' or 'undefined'.`);
                    resolve(null);
                }
            });
        });
    }
    static Exists(discordId) {
        return new Promise(async (resolve, reject) => {
            await this.OnReady();
            const aniBind = this.List.find(m => m.DiscordId === discordId);
            if (aniBind === null || aniBind === undefined) {
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
            if (this.List.length === 0) {
                console.log(`List is empty.`);
                resolve(null);
            }
            for (let i = 0; i < this.List.length; i++) {
                const m = this.List[i];
                if (m.DiscordId === discordId) {
                    resolve(m);
                    return;
                }
                else {
                    if (i === this.List.length - 1) {
                        console.log(`this.List.find(m => m.DiscordId === discordId) is 'null' or 'undefined'.`);
                        resolve(null);
                    }
                }
            }
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
AniBindData.List = [];
AniBindData.Initializing = false;
exports.AniBindData = AniBindData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pLmJpbmQuZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL2FuaS5iaW5kLmRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBc0M7QUFDdEMseUNBQXNDO0FBQ3RDLHdEQUFvRDtBQUNwRCwwREFBc0Q7QUFDdEQsNkRBQW1EO0FBRW5ELE1BQWEsV0FBVztJQUlmLE1BQU0sQ0FBQyxJQUFJO1FBQ2hCLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUMzQyxNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFNLE9BQU8sR0FBRyxNQUFNLGFBQUssQ0FBQyxPQUFPLENBQUMsYUFBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELE1BQU0sSUFBSSxHQUFHLE1BQU0sd0JBQVUsQ0FBQyxZQUFZLENBQVUsT0FBTyxFQUFFLHdCQUFPLENBQUMsQ0FBQztZQUN0RSxJQUFJLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDdkMsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsOEVBQThFLENBQy9FLENBQUM7Z0JBQ0YsT0FBTyxFQUFFLENBQUM7YUFDWDtpQkFBTTtnQkFDTCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO29CQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztvQkFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO29CQUN4RCxPQUFPLEVBQUUsQ0FBQztpQkFDWDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDakIsSUFB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QU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDLENBQUM7YUFDdEQ7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsT0FBTztRQUNuQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssRUFBRTtvQkFDL0IsT0FBTyxFQUFFLENBQUM7aUJBQ1g7WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBekphLGdCQUFJLEdBQWMsRUFBRSxDQUFDO0FBQ3JCLHdCQUFZLEdBQUcsS0FBSyxDQUFDO0FBRnJDLGtDQTJKQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSBcIi4uL2NvcmUvbW9uZ29cIjtcclxuaW1wb3J0IHsgVGFibGUgfSBmcm9tIFwiLi4vY29yZS90YWJsZVwiO1xyXG5pbXBvcnQgeyBKc29uSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvanNvbi5oZWxwZXJcIjtcclxuaW1wb3J0IHsgQXJyYXlIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy9hcnJheS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgQW5pQmluZCB9IGZyb20gXCIuLi9tb2RlbHMvYW5pLmJpbmQubW9kZWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbmlCaW5kRGF0YSB7XHJcbiAgcHVibGljIHN0YXRpYyBMaXN0OiBBbmlCaW5kW10gPSBbXTtcclxuICBwdWJsaWMgc3RhdGljIEluaXRpYWxpemluZyA9IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIEluaXQoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgdGhpcy5Jbml0aWFsaXppbmcgPSB0cnVlO1xyXG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgTW9uZ28uRmluZEFsbChUYWJsZS5hbmlCaW5kKTtcclxuICAgICAgY29uc3QgbGlzdCA9IGF3YWl0IEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PEFuaUJpbmQ+KHJlc3VsdHMsIEFuaUJpbmQpO1xyXG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkIHx8IGxpc3QgPT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgICAgYEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PEFuaUJpbmQ+KHJlc3VsdHMsIEFuaUJpbmQpIGlzICdudWxsJyBvciAndW5kZWZpbmVkJy5gXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLkluaXRpYWxpemluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coYEFuaUJpbmQgTGlzdCBMZW5ndGg6ICR7dGhpcy5MaXN0Lmxlbmd0aH1gKTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5MaXN0ID0gbGlzdDtcclxuICAgICAgICAgIHRoaXMuSW5pdGlhbGl6aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhgQW5pQmluZCBMaXN0IExlbmd0aDogJHt0aGlzLkxpc3QubGVuZ3RofWApO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIEluc2VydChcclxuICAgIGRpc2NvcmRJZDogc3RyaW5nLFxyXG4gICAgYW5pbGlzdElkOiBudW1iZXIsXHJcbiAgICBhbmlsaXN0VXNlcm5hbWU6IHN0cmluZyxcclxuICAgIGNvZGU6IHN0cmluZ1xyXG4gICkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEFuaUJpbmQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IGV4aXN0cyA9IGF3YWl0IHRoaXMuRXhpc3RzKGRpc2NvcmRJZCk7XHJcbiAgICAgIGlmIChleGlzdHMgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHtcclxuICAgICAgICAgIGFuaWxpc3RfaWQ6IGFuaWxpc3RJZCxcclxuICAgICAgICAgIGRpc2NvcmRfaWQ6IGRpc2NvcmRJZCxcclxuICAgICAgICAgIGFuaWxpc3RfdXNlcm5hbWU6IGFuaWxpc3RVc2VybmFtZSxcclxuICAgICAgICAgIGNvZGU6IGNvZGUsXHJcbiAgICAgICAgICB2ZXJpZmllZDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IE1vbmdvLkluc2VydChUYWJsZS5hbmlCaW5kLCBkYXRhKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQuaW5zZXJ0ZWRJZCk7XHJcbiAgICAgICAgY29uc3QgYW5pQmluZCA9IG5ldyBBbmlCaW5kKCk7XHJcbiAgICAgICAgYW5pQmluZC5JZCA9IHJlc3VsdC5pbnNlcnRlZElkO1xyXG4gICAgICAgIGFuaUJpbmQuQW5pbGlzdElkID0gYW5pbGlzdElkO1xyXG4gICAgICAgIGFuaUJpbmQuRGlzY29yZElkID0gZGlzY29yZElkO1xyXG4gICAgICAgIGFuaUJpbmQuQW5pbGlzdFVzZXJuYW1lID0gYW5pbGlzdFVzZXJuYW1lO1xyXG4gICAgICAgIGFuaUJpbmQuQ29kZSA9IGNvZGU7XHJcbiAgICAgICAgYW5pQmluZC5WZXJpZmllZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuTGlzdC5wdXNoKGFuaUJpbmQpO1xyXG4gICAgICAgIHJlc29sdmUoYW5pQmluZCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZSh0aGlzLkFsbC5maW5kKHggPT4geC5EaXNjb3JkSWQgPT09IGRpc2NvcmRJZCkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IEFsbCgpIHtcclxuICAgIHJldHVybiB0aGlzLkxpc3Q7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIFZlcmlmeShkaXNjb3JkSWQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEFuaUJpbmQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgYXdhaXQgdGhpcy5PblJlYWR5KCk7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0geyBkaXNjb3JkX2lkOiBkaXNjb3JkSWQgfTtcclxuICAgICAgY29uc3QgbmV3VmFsdWUgPSB7ICRzZXQ6IHsgdmVyaWZpZWQ6IHRydWUgfSB9O1xyXG4gICAgICBhd2FpdCBNb25nby5VcGRhdGUoVGFibGUuYW5pQmluZCwgcXVlcnksIG5ld1ZhbHVlKTtcclxuICAgICAgY29uc3Qgb2xkVmFsdWUgPSBhd2FpdCB0aGlzLkdldChkaXNjb3JkSWQpO1xyXG4gICAgICBBcnJheUhlbHBlci5yZW1vdmUodGhpcy5MaXN0LCBvbGRWYWx1ZSwgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IE1vbmdvLkZpbmRPbmUoVGFibGUuYW5pQmluZCwgcXVlcnkpO1xyXG4gICAgICAgIGNvbnN0IG1zID0gYXdhaXQgSnNvbkhlbHBlci5BcnJheUNvbnZlcnQ8QW5pQmluZD4ocmVzLCBBbmlCaW5kKTtcclxuICAgICAgICBjb25zdCBtID0gbXNbMF07XHJcbiAgICAgICAgY29uc29sZS5sb2coYFVwZGF0ZSBBbmlsaXN0IGJpbmQ6ICR7bS5Db2RlfWApO1xyXG4gICAgICAgIGlmIChtICE9PSBudWxsICYmIG0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgdGhpcy5MaXN0LnB1c2gobSk7XHJcbiAgICAgICAgICByZXNvbHZlKG0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgYEpzb25IZWxwZXIuQXJyYXlDb252ZXJ0PEFuaUJpbmQ+KHJlcywgQW5pQmluZCkgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgRXhpc3RzKGRpc2NvcmRJZDogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Ym9vbGVhbj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgY29uc3QgYW5pQmluZCA9IHRoaXMuTGlzdC5maW5kKG0gPT4gbS5EaXNjb3JkSWQgPT09IGRpc2NvcmRJZCk7XHJcbiAgICAgIGlmIChhbmlCaW5kID09PSBudWxsIHx8IGFuaUJpbmQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBHZXQoZGlzY29yZElkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxBbmlCaW5kPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGF3YWl0IHRoaXMuT25SZWFkeSgpO1xyXG4gICAgICBpZiAodGhpcy5MaXN0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBMaXN0IGlzIGVtcHR5LmApO1xyXG4gICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgIH1cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb25zdCBtID0gdGhpcy5MaXN0W2ldO1xyXG4gICAgICAgIGlmIChtLkRpc2NvcmRJZCA9PT0gZGlzY29yZElkKSB7XHJcbiAgICAgICAgICByZXNvbHZlKG0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5MaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgICAgYHRoaXMuTGlzdC5maW5kKG0gPT4gbS5EaXNjb3JkSWQgPT09IGRpc2NvcmRJZCkgaXMgJ251bGwnIG9yICd1bmRlZmluZWQnLmBcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmVzb2x2ZShudWxsKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBMb2dBbGwoKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBhd2FpdCB0aGlzLk9uUmVhZHkoKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuTGlzdCA9PT0gbnVsbCB8fFxyXG4gICAgICAgIHRoaXMuTGlzdCA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgdGhpcy5MaXN0Lmxlbmd0aCA9PT0gMFxyXG4gICAgICApIHtcclxuICAgICAgICByZWplY3QobmV3IEVycm9yKGB0aGlzLkxpc3QgaXMgJ251bGwnIG9yICdlbXB0eScuYCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTGlzdCk7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgT25SZWFkeSgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5Jbml0aWFsaXppbmcgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCAxKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=