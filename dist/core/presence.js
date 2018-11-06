"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const title_helper_1 = require("../helpers/title.helper");
const client_1 = require("./client");
const random_helper_1 = require("../helpers/random.helper");
const anime_cache_1 = require("./anime.cache");
class BotPresence {
    static Init() {
        return new Promise(async (resolve, reject) => {
            const media = await anime_cache_1.AnimeCache.GetRandom();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUFzRDtBQUN0RCxxQ0FBeUM7QUFFekMsNERBQWtEO0FBQ2xELCtDQUEyQztBQUUzQyxNQUFhLFdBQVc7SUFHZixNQUFNLENBQUMsSUFBSTtRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzNDLE1BQU0sS0FBSyxHQUFHLDBCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxNQUFNLE1BQU0sR0FBRyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDaEIsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUk7aUJBQ1IsV0FBVyxDQUFDLEdBQUcsU0FBUyxJQUFJLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFyQmMscUJBQVMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFEbkUsa0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcclxuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBEaXNjb3JkQVBJRXJyb3IgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XHJcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi9hbmltZS5jYWNoZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvdFByZXNlbmNlIHtcclxuICBwcml2YXRlIHN0YXRpYyBNdXNpY1R5cGUgPSBbXCJFbmRpbmcgU29uZyBvZlwiLCBcIk9wZW5pbmcgU29uZyBvZlwiXTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBJbml0KCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgbWVkaWEgPSBhd2FpdCBBbmltZUNhY2hlLkdldFJhbmRvbSgpO1xyXG4gICAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XHJcbiAgICAgIGNvbnN0IGFjdGlvbiA9IFJhbmRvbS5SYW5nZSgyLCAzKTtcclxuICAgICAgbGV0IG11c2ljVHlwZSA9IFwiXCI7XHJcbiAgICAgIGlmIChhY3Rpb24gPT09IDIpIHtcclxuICAgICAgICBtdXNpY1R5cGUgPSB0aGlzLk11c2ljVHlwZVtSYW5kb20uUmFuZ2UoMCwgMSldO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XHJcbiAgICAgIGNsaWVudC51c2VyXHJcbiAgICAgICAgLnNldEFjdGl2aXR5KGAke211c2ljVHlwZX0gJHt0aXRsZX1gLCB7IHR5cGU6IGFjdGlvbiB9KVxyXG4gICAgICAgIC50aGVuKHByZXNlbmNlID0+IHtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyOiBEaXNjb3JkQVBJRXJyb3IpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5uYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=