"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_helper_1 = require("../helpers/time.helper");
const config_1 = require("../core/config");
class Cooldown {
    constructor(command, user) {
        this.command = command;
        this.user = user;
        this.lastMessage = null;
        this.lastResponse = null;
        Cooldown.List.push(this);
    }
    static Get(command, user) {
        return new Promise((resolve, reject) => {
            const cooldown = this.List.find(cd => cd.command === command && cd.user === user);
            if (cooldown === undefined || cooldown === null) {
                const newCooldown = new Cooldown(command, user);
                resolve(newCooldown);
            }
            else {
                resolve(cooldown);
            }
        });
    }
    Register(newMessage) {
        return new Promise((resolve, reject) => {
            if (this.lastMessage === null) {
                this.lastMessage = newMessage;
                resolve();
            }
            else {
                const diff = time_helper_1.TimeHelper.DiffSeconds(newMessage.createdAt, this.lastMessage.createdAt);
                if (diff < this.command.Cooldown) {
                    const countdown = this.command.Cooldown - diff;
                    reject(new CooldownResponse(`:alarm_clock: **${this.user.username}** You are on cooldown for **${config_1.Config.COMMAND_PREFIX}${this.command.Name}** - \`${countdown}s\``, countdown * 1000));
                }
                else {
                    this.lastMessage = newMessage;
                    resolve();
                }
            }
        });
    }
    Respond(newResponse) {
        return new Promise((resolve, reject) => {
            if (this.lastResponse !== null && this.lastResponse !== undefined) {
                if (this.lastResponse.deletable) {
                    this.lastResponse
                        .delete()
                        .then(() => {
                        this.lastResponse = newResponse;
                        resolve();
                    })
                        .catch(err => {
                        this.lastResponse = newResponse;
                        resolve();
                    });
                }
                else {
                    this.lastResponse = newResponse;
                    resolve();
                }
            }
            else {
                this.lastResponse = newResponse;
                resolve();
            }
        });
    }
}
Cooldown.List = [];
exports.Cooldown = Cooldown;
class CooldownResponse {
    constructor(content, timeout) {
        this.content = content;
        this.timeout = timeout;
    }
}
exports.CooldownResponse = CooldownResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vbGRvd24ubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2Nvb2xkb3duLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsd0RBQW9EO0FBQ3BELDJDQUF3QztBQUV4QyxNQUFhLFFBQVE7SUFDbkIsWUFBMkIsT0FBbUIsRUFBUyxJQUFVO1FBQXRDLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBS3pELGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQzVCLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBTG5DLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFNTSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQW1CLEVBQUUsSUFBVTtRQUMvQyxPQUFPLElBQUksT0FBTyxDQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQy9DLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUM3QixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssT0FBTyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUNqRCxDQUFDO1lBQ0YsSUFBSSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7Z0JBQy9DLE1BQU0sV0FBVyxHQUFHLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFFBQVEsQ0FBQyxVQUFtQjtRQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxJQUFJLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUM5QixPQUFPLEVBQUUsQ0FBQzthQUNYO2lCQUFNO2dCQUNMLE1BQU0sSUFBSSxHQUFHLHdCQUFVLENBQUMsV0FBVyxDQUNqQyxVQUFVLENBQUMsU0FBUyxFQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FDM0IsQ0FBQztnQkFDRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtvQkFDaEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUMvQyxNQUFNLENBQ0osSUFBSSxnQkFBZ0IsQ0FDbEIsbUJBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUNaLGdDQUFnQyxlQUFNLENBQUMsY0FBYyxHQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQ2YsVUFBVSxTQUFTLEtBQUssRUFDeEIsU0FBUyxHQUFHLElBQUksQ0FDakIsQ0FDRixDQUFDO2lCQUNIO3FCQUFNO29CQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO29CQUM5QixPQUFPLEVBQUUsQ0FBQztpQkFDWDthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sT0FBTyxDQUFDLFdBQW9CO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtnQkFDakUsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRTtvQkFDL0IsSUFBSSxDQUFDLFlBQVk7eUJBQ2QsTUFBTSxFQUFFO3lCQUNSLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1QsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7d0JBQ2hDLE9BQU8sRUFBRSxDQUFDO29CQUNaLENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ1gsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7d0JBQ2hDLE9BQU8sRUFBRSxDQUFDO29CQUNaLENBQUMsQ0FBQyxDQUFDO2lCQUNOO3FCQUFNO29CQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO29CQUNoQyxPQUFPLEVBQUUsQ0FBQztpQkFDWDthQUNGO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO2dCQUNoQyxPQUFPLEVBQUUsQ0FBQzthQUNYO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXhFYyxhQUFJLEdBQWUsRUFBRSxDQUFDO0FBSnZDLDRCQTZFQztBQUVELE1BQWEsZ0JBQWdCO0lBQzNCLFlBQW1CLE9BQWUsRUFBUyxPQUFlO1FBQXZDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFRO0lBQUcsQ0FBQztDQUMvRDtBQUZELDRDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXNlciwgTWVzc2FnZSB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBCb3RDb21tYW5kIH0gZnJvbSBcIi4uL2NvbW1hbmQvYm90LmNvbW1hbmRcIjtcbmltcG9ydCB7IFRpbWVIZWxwZXIgfSBmcm9tIFwiLi4vaGVscGVycy90aW1lLmhlbHBlclwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBDb29sZG93biB7XG4gIHByaXZhdGUgY29uc3RydWN0b3IocHVibGljIGNvbW1hbmQ6IEJvdENvbW1hbmQsIHB1YmxpYyB1c2VyOiBVc2VyKSB7XG4gICAgQ29vbGRvd24uTGlzdC5wdXNoKHRoaXMpO1xuICB9XG4gIHByaXZhdGUgc3RhdGljIExpc3Q6IENvb2xkb3duW10gPSBbXTtcblxuICBwcml2YXRlIGxhc3RNZXNzYWdlOiBNZXNzYWdlID0gbnVsbDtcbiAgcHJpdmF0ZSBsYXN0UmVzcG9uc2U6IE1lc3NhZ2UgPSBudWxsO1xuXG4gIHB1YmxpYyBzdGF0aWMgR2V0KGNvbW1hbmQ6IEJvdENvbW1hbmQsIHVzZXI6IFVzZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Q29vbGRvd24+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNvb2xkb3duID0gdGhpcy5MaXN0LmZpbmQoXG4gICAgICAgIGNkID0+IGNkLmNvbW1hbmQgPT09IGNvbW1hbmQgJiYgY2QudXNlciA9PT0gdXNlclxuICAgICAgKTtcbiAgICAgIGlmIChjb29sZG93biA9PT0gdW5kZWZpbmVkIHx8IGNvb2xkb3duID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG5ld0Nvb2xkb3duID0gbmV3IENvb2xkb3duKGNvbW1hbmQsIHVzZXIpO1xuICAgICAgICByZXNvbHZlKG5ld0Nvb2xkb3duKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoY29vbGRvd24pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIFJlZ2lzdGVyKG5ld01lc3NhZ2U6IE1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKHRoaXMubGFzdE1lc3NhZ2UgPT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5sYXN0TWVzc2FnZSA9IG5ld01lc3NhZ2U7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpZmYgPSBUaW1lSGVscGVyLkRpZmZTZWNvbmRzKFxuICAgICAgICAgIG5ld01lc3NhZ2UuY3JlYXRlZEF0LFxuICAgICAgICAgIHRoaXMubGFzdE1lc3NhZ2UuY3JlYXRlZEF0XG4gICAgICAgICk7XG4gICAgICAgIGlmIChkaWZmIDwgdGhpcy5jb21tYW5kLkNvb2xkb3duKSB7XG4gICAgICAgICAgY29uc3QgY291bnRkb3duID0gdGhpcy5jb21tYW5kLkNvb2xkb3duIC0gZGlmZjtcbiAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICBuZXcgQ29vbGRvd25SZXNwb25zZShcbiAgICAgICAgICAgICAgYDphbGFybV9jbG9jazogKioke1xuICAgICAgICAgICAgICAgIHRoaXMudXNlci51c2VybmFtZVxuICAgICAgICAgICAgICB9KiogWW91IGFyZSBvbiBjb29sZG93biBmb3IgKioke0NvbmZpZy5DT01NQU5EX1BSRUZJWH0ke1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZC5OYW1lXG4gICAgICAgICAgICAgIH0qKiAtIFxcYCR7Y291bnRkb3dufXNcXGBgLFxuICAgICAgICAgICAgICBjb3VudGRvd24gKiAxMDAwXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxhc3RNZXNzYWdlID0gbmV3TWVzc2FnZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBSZXNwb25kKG5ld1Jlc3BvbnNlOiBNZXNzYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmxhc3RSZXNwb25zZSAhPT0gbnVsbCAmJiB0aGlzLmxhc3RSZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RSZXNwb25zZS5kZWxldGFibGUpIHtcbiAgICAgICAgICB0aGlzLmxhc3RSZXNwb25zZVxuICAgICAgICAgICAgLmRlbGV0ZSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubGFzdFJlc3BvbnNlID0gbmV3UmVzcG9uc2U7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sYXN0UmVzcG9uc2UgPSBuZXdSZXNwb25zZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sYXN0UmVzcG9uc2UgPSBuZXdSZXNwb25zZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGFzdFJlc3BvbnNlID0gbmV3UmVzcG9uc2U7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29vbGRvd25SZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZW50OiBzdHJpbmcsIHB1YmxpYyB0aW1lb3V0OiBudW1iZXIpIHt9XG59XG4iXX0=