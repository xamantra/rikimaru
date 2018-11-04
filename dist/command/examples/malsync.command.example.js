"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("../../helpers/random.helper");
class MalSyncExample {
    constructor(count) {
        this.Count = count;
        this.Usernames = ["thisisausername", "anotherusername", "malusername"];
    }
    Get(command, count) {
        let result = ``;
        const picked = [];
        for (let i = 0; i < this.Usernames.length; i++) {
            const item = this.Usernames[random_helper_1.Random.Range(0, this.Usernames.length - 1)];
            if (!picked.includes(item) && picked.length < count) {
                result += `\n-*${command.Name}* ${item}`;
                picked.push(item);
            }
            if (picked.length === count) {
                return result;
            }
        }
        return result;
    }
}
exports.MalSyncExample = MalSyncExample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmV4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9leGFtcGxlcy9tYWxzeW5jLmNvbW1hbmQuZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLCtEQUFxRDtBQUVyRCxNQUFhLGNBQWM7SUFJekIsWUFBWSxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRUQsR0FBRyxDQUFDLE9BQWlCLEVBQUUsS0FBYTtRQUNsQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUM5QyxNQUFNLElBQUksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUNqQyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQzNDLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtnQkFDbkQsTUFBTSxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtZQUNELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQTFCRCx3Q0EwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEV4YW1wbGUgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmV4YW1wbGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IElDb21tYW5kIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvY29tbWFuZC5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgUmFuZG9tIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvcmFuZG9tLmhlbHBlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hbFN5bmNFeGFtcGxlIGltcGxlbWVudHMgSUNvbW1hbmRFeGFtcGxlIHtcclxuICBDb3VudDogbnVtYmVyO1xyXG4gIFVzZXJuYW1lczogc3RyaW5nW107XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvdW50OiBudW1iZXIpIHtcclxuICAgIHRoaXMuQ291bnQgPSBjb3VudDtcclxuICAgIHRoaXMuVXNlcm5hbWVzID0gW1widGhpc2lzYXVzZXJuYW1lXCIsIFwiYW5vdGhlcnVzZXJuYW1lXCIsIFwibWFsdXNlcm5hbWVcIl07XHJcbiAgfVxyXG5cclxuICBHZXQoY29tbWFuZDogSUNvbW1hbmQsIGNvdW50OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJlc3VsdCA9IGBgO1xyXG4gICAgY29uc3QgcGlja2VkOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlVzZXJuYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBpdGVtOiBzdHJpbmcgPSB0aGlzLlVzZXJuYW1lc1tcclxuICAgICAgICBSYW5kb20uUmFuZ2UoMCwgdGhpcy5Vc2VybmFtZXMubGVuZ3RoIC0gMSlcclxuICAgICAgXTtcclxuICAgICAgaWYgKCFwaWNrZWQuaW5jbHVkZXMoaXRlbSkgJiYgcGlja2VkLmxlbmd0aCA8IGNvdW50KSB7XHJcbiAgICAgICAgcmVzdWx0ICs9IGBcXG4tKiR7Y29tbWFuZC5OYW1lfSogJHtpdGVtfWA7XHJcbiAgICAgICAgcGlja2VkLnB1c2goaXRlbSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHBpY2tlZC5sZW5ndGggPT09IGNvdW50KSB7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbn1cclxuIl19