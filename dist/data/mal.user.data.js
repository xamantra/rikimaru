"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mal_1 = require("../core/mal");
const mal_bind_data_1 = require("./mal.bind.data");
class MalUserData {
    static GetUser(message) {
        return new Promise((resolve, reject) => {
            mal_bind_data_1.MalBindData.Get(message.author.id)
                .then(malBind => {
                mal_1.MAL.GetCWList(malBind.MalUsername)
                    .then(list => {
                    resolve(list);
                })
                    .catch(err => {
                    reject(err);
                });
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    static Exists(message, sub) {
        return new Promise((resolve, reject) => {
            this.GetUser(message)
                .then(list => {
                const malAnime = list.find(ma => ma.anime_id === sub.MediaId);
                if (malAnime === null || malAnime === undefined) {
                    resolve(false);
                }
                else {
                    resolve(true);
                }
            })
                .catch(err => {
                reject(err);
            });
        });
    }
}
exports.MalUserData = MalUserData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLnVzZXIuZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kYXRhL21hbC51c2VyLmRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxQ0FBa0M7QUFFbEMsbURBQThDO0FBSTlDLE1BQWEsV0FBVztJQUNmLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBZ0I7UUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNqRCwyQkFBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztpQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNkLFNBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztxQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNYLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDWCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFnQixFQUFFLEdBQWlCO1FBQ3RELE9BQU8sSUFBSSxPQUFPLENBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7aUJBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDWCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzlELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO29CQUMvQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hCO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDZjtZQUNILENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5DRCxrQ0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNQUwgfSBmcm9tIFwiLi4vY29yZS9tYWxcIjtcbmltcG9ydCB7IE1hbEFuaW1lIH0gZnJvbSBcIi4uL21vZGVscy9tYWwuYW5pbWUubW9kZWxcIjtcbmltcG9ydCB7IE1hbEJpbmREYXRhIH0gZnJvbSBcIi4vbWFsLmJpbmQuZGF0YVwiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwiLi4vbW9kZWxzL3N1YnNjcmlwdGlvbi5tb2RlbFwiO1xuXG5leHBvcnQgY2xhc3MgTWFsVXNlckRhdGEge1xuICBwdWJsaWMgc3RhdGljIEdldFVzZXIobWVzc2FnZTogTWVzc2FnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxNYWxBbmltZVtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBNYWxCaW5kRGF0YS5HZXQobWVzc2FnZS5hdXRob3IuaWQpXG4gICAgICAgIC50aGVuKG1hbEJpbmQgPT4ge1xuICAgICAgICAgIE1BTC5HZXRDV0xpc3QobWFsQmluZC5NYWxVc2VybmFtZSlcbiAgICAgICAgICAgIC50aGVuKGxpc3QgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKGxpc3QpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEV4aXN0cyhtZXNzYWdlOiBNZXNzYWdlLCBzdWI6IFN1YnNjcmlwdGlvbikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxib29sZWFuPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLkdldFVzZXIobWVzc2FnZSlcbiAgICAgICAgLnRoZW4obGlzdCA9PiB7XG4gICAgICAgICAgY29uc3QgbWFsQW5pbWUgPSBsaXN0LmZpbmQobWEgPT4gbWEuYW5pbWVfaWQgPT09IHN1Yi5NZWRpYUlkKTtcbiAgICAgICAgICBpZiAobWFsQW5pbWUgPT09IG51bGwgfHwgbWFsQW5pbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==