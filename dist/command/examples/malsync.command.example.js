"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("../../helpers/random.helper");
const config_1 = require("../../core/config");
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
exports.MalSyncExample = MalSyncExample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsc3luYy5jb21tYW5kLmV4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZC9leGFtcGxlcy9tYWxzeW5jLmNvbW1hbmQuZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLCtEQUFxRDtBQUNyRCw4Q0FBMkM7QUFFM0MsTUFBYSxjQUFjO0lBSXpCLFlBQVksS0FBYTtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELEdBQUcsQ0FBQyxPQUFpQixFQUFFLEtBQWE7UUFDbEMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FDakMsc0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUMzQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUU7Z0JBQ25ELE1BQU0sSUFBSSxLQUFLLGVBQU0sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtZQUNELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQTFCRCx3Q0EwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEV4YW1wbGUgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmV4YW1wbGUuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9jb25maWdcIjtcblxuZXhwb3J0IGNsYXNzIE1hbFN5bmNFeGFtcGxlIGltcGxlbWVudHMgSUNvbW1hbmRFeGFtcGxlIHtcbiAgQ291bnQ6IG51bWJlcjtcbiAgVXNlcm5hbWVzOiBzdHJpbmdbXTtcblxuICBjb25zdHJ1Y3Rvcihjb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5Db3VudCA9IGNvdW50O1xuICAgIHRoaXMuVXNlcm5hbWVzID0gW1widGhpc2lzYXVzZXJuYW1lXCIsIFwiYW5vdGhlcnVzZXJuYW1lXCIsIFwibWFsdXNlcm5hbWVcIl07XG4gIH1cblxuICBHZXQoY29tbWFuZDogSUNvbW1hbmQsIGNvdW50OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSBgYDtcbiAgICBjb25zdCBwaWNrZWQ6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLlVzZXJuYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXRlbTogc3RyaW5nID0gdGhpcy5Vc2VybmFtZXNbXG4gICAgICAgIFJhbmRvbS5SYW5nZSgwLCB0aGlzLlVzZXJuYW1lcy5sZW5ndGggLSAxKVxuICAgICAgXTtcbiAgICAgIGlmICghcGlja2VkLmluY2x1ZGVzKGl0ZW0pICYmIHBpY2tlZC5sZW5ndGggPCBjb3VudCkge1xuICAgICAgICByZXN1bHQgKz0gYFxcbiR7Q29uZmlnLkNPTU1BTkRfUFJFRklYfSoke2NvbW1hbmQuTmFtZX0qICR7aXRlbX1gO1xuICAgICAgICBwaWNrZWQucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICAgIGlmIChwaWNrZWQubGVuZ3RoID09PSBjb3VudCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=