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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZS9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUErQztBQUMvQywwREFBc0Q7QUFDdEQscUNBQXlDO0FBRXpDLDREQUFrRDtBQUNsRCxNQUFhLFdBQVc7SUFHZixNQUFNLENBQUMsSUFBSTtRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxzQkFBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzFDLE1BQU0sS0FBSyxHQUFHLDBCQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQyxNQUFNLE1BQU0sR0FBRyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ25CLElBQUksTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDaEIsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEQ7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDL0MsTUFBTSxDQUFDLElBQUk7aUJBQ1IsV0FBVyxDQUFDLEdBQUcsU0FBUyxJQUFJLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDO2lCQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ2YsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBb0IsRUFBRSxFQUFFO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUFyQmMscUJBQVMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFEbkUsa0NBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVkaWFEYXRhIH0gZnJvbSBcIi4uL2RhdGEvbWVkaWEuZGF0YVwiO1xyXG5pbXBvcnQgeyBUaXRsZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpdGxlLmhlbHBlclwiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4vY2xpZW50XCI7XHJcbmltcG9ydCB7IEdhbWUsIERpc2NvcmRBUElFcnJvciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcbmltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi9oZWxwZXJzL3JhbmRvbS5oZWxwZXJcIjtcclxuZXhwb3J0IGNsYXNzIEJvdFByZXNlbmNlIHtcclxuICBwcml2YXRlIHN0YXRpYyBNdXNpY1R5cGUgPSBbXCJFbmRpbmcgU29uZyBvZlwiLCBcIk9wZW5pbmcgU29uZyBvZlwiXTtcclxuXHJcbiAgcHVibGljIHN0YXRpYyBJbml0KCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgbWVkaWEgPSBhd2FpdCBNZWRpYURhdGEuR2V0UmFuZG9tKCk7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gVGl0bGVIZWxwZXIuR2V0KG1lZGlhLnRpdGxlKTtcclxuICAgICAgY29uc3QgYWN0aW9uID0gUmFuZG9tLlJhbmdlKDIsIDMpO1xyXG4gICAgICBsZXQgbXVzaWNUeXBlID0gXCJcIjtcclxuICAgICAgaWYgKGFjdGlvbiA9PT0gMikge1xyXG4gICAgICAgIG11c2ljVHlwZSA9IHRoaXMuTXVzaWNUeXBlW1JhbmRvbS5SYW5nZSgwLCAxKV07XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcclxuICAgICAgY2xpZW50LnVzZXJcclxuICAgICAgICAuc2V0QWN0aXZpdHkoYCR7bXVzaWNUeXBlfSAke3RpdGxlfWAsIHsgdHlwZTogYWN0aW9uIH0pXHJcbiAgICAgICAgLnRoZW4ocHJlc2VuY2UgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnI6IERpc2NvcmRBUElFcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyLm5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==