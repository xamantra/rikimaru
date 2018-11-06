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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29vbGRvd24ubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2Nvb2xkb3duLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsd0RBQW9EO0FBRXBELE1BQWEsUUFBUTtJQUNuQixZQUEyQixPQUFtQixFQUFTLElBQVU7UUFBdEMsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUFTLFNBQUksR0FBSixJQUFJLENBQU07UUFLekQsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFMbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQU1NLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBbUIsRUFBRSxJQUFVO1FBQy9DLE9BQU8sSUFBSSxPQUFPLENBQVcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDL0MsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQzdCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sS0FBSyxPQUFPLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQ2pELENBQUM7WUFDRixJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDL0MsTUFBTSxXQUFXLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sUUFBUSxDQUFDLFVBQW1CO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxDQUFDO2FBQ1g7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLEdBQUcsd0JBQVUsQ0FBQyxXQUFXLENBQ2pDLFVBQVUsQ0FBQyxTQUFTLEVBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUMzQixDQUFDO2dCQUNGLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUNoQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQy9DLE1BQU0sQ0FDSixJQUFJLGdCQUFnQixDQUNsQixtQkFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQ1osaUNBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUNmLFVBQVUsU0FBUyxLQUFLLEVBQ3hCLFNBQVMsR0FBRyxJQUFJLENBQ2pCLENBQ0YsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztvQkFDOUIsT0FBTyxFQUFFLENBQUM7aUJBQ1g7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLE9BQU8sQ0FBQyxXQUFvQjtRQUNqQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQ2pFLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUU7b0JBQy9CLElBQUksQ0FBQyxZQUFZO3lCQUNkLE1BQU0sRUFBRTt5QkFDUixJQUFJLENBQUMsR0FBRyxFQUFFO3dCQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO3dCQUNoQyxPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO3dCQUNoQyxPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDLENBQUMsQ0FBQztpQkFDTjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztvQkFDaEMsT0FBTyxFQUFFLENBQUM7aUJBQ1g7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUM7YUFDWDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7QUF4RWMsYUFBSSxHQUFlLEVBQUUsQ0FBQztBQUp2Qyw0QkE2RUM7QUFFRCxNQUFhLGdCQUFnQjtJQUMzQixZQUFtQixPQUFlLEVBQVMsT0FBZTtRQUF2QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUFHLENBQUM7Q0FDL0Q7QUFGRCw0Q0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVzZXIsIE1lc3NhZ2UgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgQm90Q29tbWFuZCB9IGZyb20gXCIuLi9jb21tYW5kL2JvdC5jb21tYW5kXCI7XG5pbXBvcnQgeyBUaW1lSGVscGVyIH0gZnJvbSBcIi4uL2hlbHBlcnMvdGltZS5oZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIENvb2xkb3duIHtcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihwdWJsaWMgY29tbWFuZDogQm90Q29tbWFuZCwgcHVibGljIHVzZXI6IFVzZXIpIHtcbiAgICBDb29sZG93bi5MaXN0LnB1c2godGhpcyk7XG4gIH1cbiAgcHJpdmF0ZSBzdGF0aWMgTGlzdDogQ29vbGRvd25bXSA9IFtdO1xuXG4gIHByaXZhdGUgbGFzdE1lc3NhZ2U6IE1lc3NhZ2UgPSBudWxsO1xuICBwcml2YXRlIGxhc3RSZXNwb25zZTogTWVzc2FnZSA9IG51bGw7XG5cbiAgcHVibGljIHN0YXRpYyBHZXQoY29tbWFuZDogQm90Q29tbWFuZCwgdXNlcjogVXNlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxDb29sZG93bj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY29vbGRvd24gPSB0aGlzLkxpc3QuZmluZChcbiAgICAgICAgY2QgPT4gY2QuY29tbWFuZCA9PT0gY29tbWFuZCAmJiBjZC51c2VyID09PSB1c2VyXG4gICAgICApO1xuICAgICAgaWYgKGNvb2xkb3duID09PSB1bmRlZmluZWQgfHwgY29vbGRvd24gPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgbmV3Q29vbGRvd24gPSBuZXcgQ29vbGRvd24oY29tbWFuZCwgdXNlcik7XG4gICAgICAgIHJlc29sdmUobmV3Q29vbGRvd24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShjb29sZG93bik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgUmVnaXN0ZXIobmV3TWVzc2FnZTogTWVzc2FnZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAodGhpcy5sYXN0TWVzc2FnZSA9PT0gbnVsbCkge1xuICAgICAgICB0aGlzLmxhc3RNZXNzYWdlID0gbmV3TWVzc2FnZTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlmZiA9IFRpbWVIZWxwZXIuRGlmZlNlY29uZHMoXG4gICAgICAgICAgbmV3TWVzc2FnZS5jcmVhdGVkQXQsXG4gICAgICAgICAgdGhpcy5sYXN0TWVzc2FnZS5jcmVhdGVkQXRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGRpZmYgPCB0aGlzLmNvbW1hbmQuQ29vbGRvd24pIHtcbiAgICAgICAgICBjb25zdCBjb3VudGRvd24gPSB0aGlzLmNvbW1hbmQuQ29vbGRvd24gLSBkaWZmO1xuICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgIG5ldyBDb29sZG93blJlc3BvbnNlKFxuICAgICAgICAgICAgICBgOmFsYXJtX2Nsb2NrOiAqKiR7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VyLnVzZXJuYW1lXG4gICAgICAgICAgICAgIH0qKiBZb3UgYXJlIG9uIGNvb2xkb3duIGZvciAqKi0ke1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZC5OYW1lXG4gICAgICAgICAgICAgIH0qKiAtIFxcYCR7Y291bnRkb3dufXNcXGBgLFxuICAgICAgICAgICAgICBjb3VudGRvd24gKiAxMDAwXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxhc3RNZXNzYWdlID0gbmV3TWVzc2FnZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBSZXNwb25kKG5ld1Jlc3BvbnNlOiBNZXNzYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmxhc3RSZXNwb25zZSAhPT0gbnVsbCAmJiB0aGlzLmxhc3RSZXNwb25zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RSZXNwb25zZS5kZWxldGFibGUpIHtcbiAgICAgICAgICB0aGlzLmxhc3RSZXNwb25zZVxuICAgICAgICAgICAgLmRlbGV0ZSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubGFzdFJlc3BvbnNlID0gbmV3UmVzcG9uc2U7XG4gICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sYXN0UmVzcG9uc2UgPSBuZXdSZXNwb25zZTtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5sYXN0UmVzcG9uc2UgPSBuZXdSZXNwb25zZTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGFzdFJlc3BvbnNlID0gbmV3UmVzcG9uc2U7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ29vbGRvd25SZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZW50OiBzdHJpbmcsIHB1YmxpYyB0aW1lb3V0OiBudW1iZXIpIHt9XG59XG4iXX0=