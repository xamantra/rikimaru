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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUFzRDtBQUN0RCxxQ0FBeUM7QUFFekMsNERBQWtEO0FBQ2xELCtDQUEyQztBQUMzQyxNQUFhLFdBQVc7SUFHZixNQUFNLENBQUMsSUFBSTtRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzNDLE1BQU0sS0FBSyxHQUFHLDBCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxNQUFNLE1BQU0sR0FBRyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDaEIsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUk7aUJBQ1IsV0FBVyxDQUFDLEdBQUcsU0FBUyxJQUFJLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFyQmMscUJBQVMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFEbkUsa0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVGl0bGVIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy90aXRsZS5oZWxwZXJcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi9jbGllbnRcIjtcbmltcG9ydCB7IERpc2NvcmRBUElFcnJvciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XG5pbXBvcnQgeyBBbmltZUNhY2hlIH0gZnJvbSBcIi4vYW5pbWUuY2FjaGVcIjtcbmV4cG9ydCBjbGFzcyBCb3RQcmVzZW5jZSB7XG4gIHByaXZhdGUgc3RhdGljIE11c2ljVHlwZSA9IFtcIkVuZGluZyBTb25nIG9mXCIsIFwiT3BlbmluZyBTb25nIG9mXCJdO1xuXG4gIHB1YmxpYyBzdGF0aWMgSW5pdCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbWVkaWEgPSBhd2FpdCBBbmltZUNhY2hlLkdldFJhbmRvbSgpO1xuICAgICAgY29uc3QgdGl0bGUgPSBUaXRsZUhlbHBlci5HZXQobWVkaWEudGl0bGUpO1xuICAgICAgY29uc3QgYWN0aW9uID0gUmFuZG9tLlJhbmdlKDIsIDMpO1xuICAgICAgbGV0IG11c2ljVHlwZSA9IFwiXCI7XG4gICAgICBpZiAoYWN0aW9uID09PSAyKSB7XG4gICAgICAgIG11c2ljVHlwZSA9IHRoaXMuTXVzaWNUeXBlW1JhbmRvbS5SYW5nZSgwLCAxKV07XG4gICAgICB9XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkdldENsaWVudCgpO1xuICAgICAgY2xpZW50LnVzZXJcbiAgICAgICAgLnNldEFjdGl2aXR5KGAke211c2ljVHlwZX0gJHt0aXRsZX1gLCB7IHR5cGU6IGFjdGlvbiB9KVxuICAgICAgICAudGhlbihwcmVzZW5jZSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycjogRGlzY29yZEFQSUVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19