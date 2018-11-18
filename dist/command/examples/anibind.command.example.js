"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("../../helpers/random.helper");
const config_1 = require("../../core/config");
class AniBindExample {
    constructor(count) {
        this.Count = count;
        this.Usernames = ["thisisausername", "anotherusername", "anilistusername"];
    }
    Get(command, count) {
        let result = ``;
        const picked = [];
        for (let i = 0; i < this.Usernames.length; i++) {
            const item = this.Usernames[random_helper_1.Random.Range(0, this.Usernames.length - 1)];
            if (!picked.includes(item) && picked.length < count) {
                result += `\n${config_1.Config.COMMAND_PREFIX}*${command.Name}* ${item}`;
                picked.push(item);
            }
            if (picked.length === count) {
                return result;
            }
        }
        return result;
    }
}
exports.AniBindExample = AniBindExample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pYmluZC5jb21tYW5kLmV4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9leGFtcGxlcy9hbmliaW5kLmNvbW1hbmQuZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLCtEQUFxRDtBQUNyRCw4Q0FBMkM7QUFFM0MsTUFBYSxjQUFjO0lBSXpCLFlBQVksS0FBYTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsR0FBRyxDQUFDLE9BQWlCLEVBQUUsS0FBYTtRQUNsQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxNQUFNLElBQUksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUNqQyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQzNDLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtnQkFDbkQsTUFBTSxJQUFJLEtBQUssZUFBTSxDQUFDLGNBQWMsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUNoRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ25CO1lBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtnQkFDM0IsT0FBTyxNQUFNLENBQUM7YUFDZjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBMUJELHdDQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElDb21tYW5kRXhhbXBsZSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZXhhbXBsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9jb3JlL2NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuaUJpbmRFeGFtcGxlIGltcGxlbWVudHMgSUNvbW1hbmRFeGFtcGxlIHtcclxuICBDb3VudDogbnVtYmVyO1xyXG4gIFVzZXJuYW1lczogc3RyaW5nW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvdW50OiBudW1iZXIpIHtcclxuICAgIHRoaXMuQ291bnQgPSBjb3VudDtcclxuICAgIHRoaXMuVXNlcm5hbWVzID0gW1widGhpc2lzYXVzZXJuYW1lXCIsIFwiYW5vdGhlcnVzZXJuYW1lXCIsIFwiYW5pbGlzdHVzZXJuYW1lXCJdO1xyXG4gIH1cclxuXHJcbiAgR2V0KGNvbW1hbmQ6IElDb21tYW5kLCBjb3VudDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCByZXN1bHQgPSBgYDtcclxuICAgIGNvbnN0IHBpY2tlZDogc3RyaW5nW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5Vc2VybmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgaXRlbTogc3RyaW5nID0gdGhpcy5Vc2VybmFtZXNbXHJcbiAgICAgICAgUmFuZG9tLlJhbmdlKDAsIHRoaXMuVXNlcm5hbWVzLmxlbmd0aCAtIDEpXHJcbiAgICAgIF07XHJcbiAgICAgIGlmICghcGlja2VkLmluY2x1ZGVzKGl0ZW0pICYmIHBpY2tlZC5sZW5ndGggPCBjb3VudCkge1xyXG4gICAgICAgIHJlc3VsdCArPSBgXFxuJHtDb25maWcuQ09NTUFORF9QUkVGSVh9KiR7Y29tbWFuZC5OYW1lfSogJHtpdGVtfWA7XHJcbiAgICAgICAgcGlja2VkLnB1c2goaXRlbSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBpY2tlZC5sZW5ndGggPT09IGNvdW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuIl19