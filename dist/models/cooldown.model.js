"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_helper_1 = require("../helpers/time.helper");
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
                    reject(new CooldownResponse(`:alarm_clock: **${this.user.username}** You are on cooldown for **-${this.command.Name}** - \`${countdown}s\``, countdown * 1000));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vbGRvd24ubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2Nvb2xkb3duLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsd0RBQW9EO0FBRXBELE1BQWEsUUFBUTtJQUNuQixZQUEyQixPQUFtQixFQUFTLElBQVU7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFLekQsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFMbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQU1NLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBbUIsRUFBRSxJQUFVO1FBQy9DLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQzdCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxPQUFPLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQ2pELENBQUM7WUFDRixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDL0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sUUFBUSxDQUFDLFVBQW1CO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEdBQUcsd0JBQVUsQ0FBQyxXQUFXLENBQ2pDLFVBQVUsQ0FBQyxTQUFTLEVBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUMzQixDQUFDO2dCQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUNoQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQy9DLE1BQU0sQ0FDSixJQUFJLGdCQUFnQixDQUNsQixtQkFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQ1osaUNBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUNmLFVBQVUsU0FBUyxLQUFLLEVBQ3hCLFNBQVMsR0FBRyxJQUFJLENBQ2pCLENBQ0YsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztvQkFDOUIsT0FBTyxFQUFFLENBQUM7aUJBQ1g7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE9BQU8sQ0FBQyxXQUFvQjtRQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQ2pFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxZQUFZO3lCQUNkLE1BQU0sRUFBRTt5QkFDUixJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO3dCQUNoQyxPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO3dCQUNoQyxPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztvQkFDaEMsT0FBTyxFQUFFLENBQUM7aUJBQ1g7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUM7YUFDWDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUF4RWMsYUFBSSxHQUFlLEVBQUUsQ0FBQztBQUp2Qyw0QkE2RUM7QUFFRCxNQUFhLGdCQUFnQjtJQUMzQixZQUFtQixPQUFlLEVBQVMsT0FBZTtRQUF2QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUFHLENBQUM7Q0FDL0Q7QUFGRCw0Q0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIsIE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBCb3RDb21tYW5kIH0gZnJvbSBcIi4uL2NvbW1hbmQvYm90LmNvbW1hbmRcIjtcclxuaW1wb3J0IHsgVGltZUhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL3RpbWUuaGVscGVyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29vbGRvd24ge1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IocHVibGljIGNvbW1hbmQ6IEJvdENvbW1hbmQsIHB1YmxpYyB1c2VyOiBVc2VyKSB7XHJcbiAgICBDb29sZG93bi5MaXN0LnB1c2godGhpcyk7XHJcbiAgfVxyXG4gIHByaXZhdGUgc3RhdGljIExpc3Q6IENvb2xkb3duW10gPSBbXTtcclxuXHJcbiAgcHJpdmF0ZSBsYXN0TWVzc2FnZTogTWVzc2FnZSA9IG51bGw7XHJcbiAgcHJpdmF0ZSBsYXN0UmVzcG9uc2U6IE1lc3NhZ2UgPSBudWxsO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIEdldChjb21tYW5kOiBCb3RDb21tYW5kLCB1c2VyOiBVc2VyKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8Q29vbGRvd24+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgY29uc3QgY29vbGRvd24gPSB0aGlzLkxpc3QuZmluZChcclxuICAgICAgICBjZCA9PiBjZC5jb21tYW5kID09PSBjb21tYW5kICYmIGNkLnVzZXIgPT09IHVzZXJcclxuICAgICAgKTtcclxuICAgICAgaWYgKGNvb2xkb3duID09PSB1bmRlZmluZWQgfHwgY29vbGRvd24gPT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCBuZXdDb29sZG93biA9IG5ldyBDb29sZG93bihjb21tYW5kLCB1c2VyKTtcclxuICAgICAgICByZXNvbHZlKG5ld0Nvb2xkb3duKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKGNvb2xkb3duKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgUmVnaXN0ZXIobmV3TWVzc2FnZTogTWVzc2FnZSkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaWYgKHRoaXMubGFzdE1lc3NhZ2UgPT09IG51bGwpIHtcclxuICAgICAgICB0aGlzLmxhc3RNZXNzYWdlID0gbmV3TWVzc2FnZTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGlmZiA9IFRpbWVIZWxwZXIuRGlmZlNlY29uZHMoXHJcbiAgICAgICAgICBuZXdNZXNzYWdlLmNyZWF0ZWRBdCxcclxuICAgICAgICAgIHRoaXMubGFzdE1lc3NhZ2UuY3JlYXRlZEF0XHJcbiAgICAgICAgKTtcclxuICAgICAgICBpZiAoZGlmZiA8IHRoaXMuY29tbWFuZC5Db29sZG93bikge1xyXG4gICAgICAgICAgY29uc3QgY291bnRkb3duID0gdGhpcy5jb21tYW5kLkNvb2xkb3duIC0gZGlmZjtcclxuICAgICAgICAgIHJlamVjdChcclxuICAgICAgICAgICAgbmV3IENvb2xkb3duUmVzcG9uc2UoXHJcbiAgICAgICAgICAgICAgYDphbGFybV9jbG9jazogKioke1xyXG4gICAgICAgICAgICAgICAgdGhpcy51c2VyLnVzZXJuYW1lXHJcbiAgICAgICAgICAgICAgfSoqIFlvdSBhcmUgb24gY29vbGRvd24gZm9yICoqLSR7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmQuTmFtZVxyXG4gICAgICAgICAgICAgIH0qKiAtIFxcYCR7Y291bnRkb3dufXNcXGBgLFxyXG4gICAgICAgICAgICAgIGNvdW50ZG93biAqIDEwMDBcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5sYXN0TWVzc2FnZSA9IG5ld01lc3NhZ2U7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBSZXNwb25kKG5ld1Jlc3BvbnNlOiBNZXNzYWdlKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5sYXN0UmVzcG9uc2UgIT09IG51bGwgJiYgdGhpcy5sYXN0UmVzcG9uc2UgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0aGlzLmxhc3RSZXNwb25zZS5kZWxldGFibGUpIHtcclxuICAgICAgICAgIHRoaXMubGFzdFJlc3BvbnNlXHJcbiAgICAgICAgICAgIC5kZWxldGUoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sYXN0UmVzcG9uc2UgPSBuZXdSZXNwb25zZTtcclxuICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMubGFzdFJlc3BvbnNlID0gbmV3UmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5sYXN0UmVzcG9uc2UgPSBuZXdSZXNwb25zZTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sYXN0UmVzcG9uc2UgPSBuZXdSZXNwb25zZTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENvb2xkb3duUmVzcG9uc2Uge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZW50OiBzdHJpbmcsIHB1YmxpYyB0aW1lb3V0OiBudW1iZXIpIHt9XHJcbn1cclxuIl19