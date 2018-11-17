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
            const client = client_1.ClientManager.Client;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUFzRDtBQUN0RCxxQ0FBeUM7QUFFekMsNERBQWtEO0FBQ2xELCtDQUEyQztBQUMzQyxNQUFhLFdBQVc7SUFHZixNQUFNLENBQUMsSUFBSTtRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSx3QkFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzNDLE1BQU0sS0FBSyxHQUFHLDBCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxNQUFNLE1BQU0sR0FBRyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDaEIsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7WUFDRCxNQUFNLE1BQU0sR0FBRyxzQkFBYSxDQUFDLE1BQU0sQ0FBQztZQUNwQyxNQUFNLENBQUMsSUFBSTtpQkFDUixXQUFXLENBQUMsR0FBRyxTQUFTLElBQUksS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7aUJBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDZixPQUFPLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFvQixFQUFFLEVBQUU7Z0JBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXJCYyxxQkFBUyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQURuRSxrQ0F1QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuL2NsaWVudFwiO1xuaW1wb3J0IHsgRGlzY29yZEFQSUVycm9yIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi9oZWxwZXJzL3JhbmRvbS5oZWxwZXJcIjtcbmltcG9ydCB7IEFuaW1lQ2FjaGUgfSBmcm9tIFwiLi9hbmltZS5jYWNoZVwiO1xuZXhwb3J0IGNsYXNzIEJvdFByZXNlbmNlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgTXVzaWNUeXBlID0gW1wiRW5kaW5nIFNvbmcgb2ZcIiwgXCJPcGVuaW5nIFNvbmcgb2ZcIl07XG5cbiAgcHVibGljIHN0YXRpYyBJbml0KCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBtZWRpYSA9IGF3YWl0IEFuaW1lQ2FjaGUuR2V0UmFuZG9tKCk7XG4gICAgICBjb25zdCB0aXRsZSA9IFRpdGxlSGVscGVyLkdldChtZWRpYS50aXRsZSk7XG4gICAgICBjb25zdCBhY3Rpb24gPSBSYW5kb20uUmFuZ2UoMiwgMyk7XG4gICAgICBsZXQgbXVzaWNUeXBlID0gXCJcIjtcbiAgICAgIGlmIChhY3Rpb24gPT09IDIpIHtcbiAgICAgICAgbXVzaWNUeXBlID0gdGhpcy5NdXNpY1R5cGVbUmFuZG9tLlJhbmdlKDAsIDEpXTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNsaWVudCA9IENsaWVudE1hbmFnZXIuQ2xpZW50O1xuICAgICAgY2xpZW50LnVzZXJcbiAgICAgICAgLnNldEFjdGl2aXR5KGAke211c2ljVHlwZX0gJHt0aXRsZX1gLCB7IHR5cGU6IGFjdGlvbiB9KVxuICAgICAgICAudGhlbihwcmVzZW5jZSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycjogRGlzY29yZEFQSUVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19