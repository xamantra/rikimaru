"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_1 = require("./config");
// import DBL from "dblapi.js";
class ClientManager {
    static async Init() {
        // const dbl = new DBL(Config.DBL_TOKEN);
        this.Client.on("guildCreate", guild => {
            console.log(`New server joined: ${guild.name} (Id: ${guild.id}). This server has ${guild.memberCount} members!`);
        });
        this.Client.on("ready", () => {
            console.log(`Bot has started, with ${this.Client.users.size} users, in ${this.Client.channels.size} channels of ${this.Client.guilds.size} servers.`);
            // dbl.postStats(client.guilds.size);
            // setInterval(() => {
            //   dbl.postStats(client.guilds.size);
            // }, 1800000);
        });
        this.Client.login(config_1.Config.BOT_TOKEN);
    }
}
ClientManager.Client = new discord_js_1.Client();
exports.ClientManager = ClientManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTBDO0FBQzFDLHFDQUFrQztBQUNsQywrQkFBK0I7QUFFL0IsTUFBYSxhQUFhO0lBR2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUN0Qix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsc0JBQXNCLEtBQUssQ0FBQyxJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQUUsc0JBQy9DLEtBQUssQ0FBQyxXQUNSLFdBQVcsQ0FDWixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQ1QseUJBQXlCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksY0FDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFDdkIsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUNuRCxDQUFDO1lBQ0YscUNBQXFDO1lBQ3JDLHNCQUFzQjtZQUN0Qix1Q0FBdUM7WUFDdkMsZUFBZTtRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDOztBQXhCYSxvQkFBTSxHQUFHLElBQUksbUJBQU0sRUFBRSxDQUFDO0FBRHRDLHNDQTBCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsaWVudCwgVXNlciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi9jb25maWdcIjtcbi8vIGltcG9ydCBEQkwgZnJvbSBcImRibGFwaS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgQ2xpZW50TWFuYWdlciB7XG4gIHB1YmxpYyBzdGF0aWMgQ2xpZW50ID0gbmV3IENsaWVudCgpO1xuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgSW5pdCgpIHtcbiAgICAvLyBjb25zdCBkYmwgPSBuZXcgREJMKENvbmZpZy5EQkxfVE9LRU4pO1xuICAgIHRoaXMuQ2xpZW50Lm9uKFwiZ3VpbGRDcmVhdGVcIiwgZ3VpbGQgPT4ge1xuICAgICAgY29uc29sZS5sb2coXG4gICAgICAgIGBOZXcgc2VydmVyIGpvaW5lZDogJHtndWlsZC5uYW1lfSAoSWQ6ICR7Z3VpbGQuaWR9KS4gVGhpcyBzZXJ2ZXIgaGFzICR7XG4gICAgICAgICAgZ3VpbGQubWVtYmVyQ291bnRcbiAgICAgICAgfSBtZW1iZXJzIWBcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICB0aGlzLkNsaWVudC5vbihcInJlYWR5XCIsICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgQm90IGhhcyBzdGFydGVkLCB3aXRoICR7dGhpcy5DbGllbnQudXNlcnMuc2l6ZX0gdXNlcnMsIGluICR7XG4gICAgICAgICAgdGhpcy5DbGllbnQuY2hhbm5lbHMuc2l6ZVxuICAgICAgICB9IGNoYW5uZWxzIG9mICR7dGhpcy5DbGllbnQuZ3VpbGRzLnNpemV9IHNlcnZlcnMuYFxuICAgICAgKTtcbiAgICAgIC8vIGRibC5wb3N0U3RhdHMoY2xpZW50Lmd1aWxkcy5zaXplKTtcbiAgICAgIC8vIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIC8vICAgZGJsLnBvc3RTdGF0cyhjbGllbnQuZ3VpbGRzLnNpemUpO1xuICAgICAgLy8gfSwgMTgwMDAwMCk7XG4gICAgfSk7XG4gICAgdGhpcy5DbGllbnQubG9naW4oQ29uZmlnLkJPVF9UT0tFTik7XG4gIH1cbn1cbiJdfQ==