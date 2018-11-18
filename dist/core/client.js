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
    static get BotName() {
        return this.Client.user.username;
    }
}
ClientManager.Client = new discord_js_1.Client();
exports.ClientManager = ClientManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTBDO0FBQzFDLHFDQUFrQztBQUNsQywrQkFBK0I7QUFFL0IsTUFBYSxhQUFhO0lBR2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSTtRQUN0Qix5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsc0JBQXNCLEtBQUssQ0FBQyxJQUFJLFNBQVMsS0FBSyxDQUFDLEVBQUUsc0JBQy9DLEtBQUssQ0FBQyxXQUNSLFdBQVcsQ0FDWixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQ1QseUJBQXlCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksY0FDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFDdkIsZ0JBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUNuRCxDQUFDO1lBQ0YscUNBQXFDO1lBQ3JDLHNCQUFzQjtZQUN0Qix1Q0FBdUM7WUFDdkMsZUFBZTtRQUNqQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sTUFBTSxLQUFLLE9BQU87UUFDdkIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQzs7QUE1QmEsb0JBQU0sR0FBRyxJQUFJLG1CQUFNLEVBQUUsQ0FBQztBQUR0QyxzQ0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGllbnQsIFVzZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG4vLyBpbXBvcnQgREJMIGZyb20gXCJkYmxhcGkuanNcIjtcblxuZXhwb3J0IGNsYXNzIENsaWVudE1hbmFnZXIge1xuICBwdWJsaWMgc3RhdGljIENsaWVudCA9IG5ldyBDbGllbnQoKTtcblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIEluaXQoKSB7XG4gICAgLy8gY29uc3QgZGJsID0gbmV3IERCTChDb25maWcuREJMX1RPS0VOKTtcbiAgICB0aGlzLkNsaWVudC5vbihcImd1aWxkQ3JlYXRlXCIsIGd1aWxkID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICBgTmV3IHNlcnZlciBqb2luZWQ6ICR7Z3VpbGQubmFtZX0gKElkOiAke2d1aWxkLmlkfSkuIFRoaXMgc2VydmVyIGhhcyAke1xuICAgICAgICAgIGd1aWxkLm1lbWJlckNvdW50XG4gICAgICAgIH0gbWVtYmVycyFgXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5DbGllbnQub24oXCJyZWFkeVwiLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYEJvdCBoYXMgc3RhcnRlZCwgd2l0aCAke3RoaXMuQ2xpZW50LnVzZXJzLnNpemV9IHVzZXJzLCBpbiAke1xuICAgICAgICAgIHRoaXMuQ2xpZW50LmNoYW5uZWxzLnNpemVcbiAgICAgICAgfSBjaGFubmVscyBvZiAke3RoaXMuQ2xpZW50Lmd1aWxkcy5zaXplfSBzZXJ2ZXJzLmBcbiAgICAgICk7XG4gICAgICAvLyBkYmwucG9zdFN0YXRzKGNsaWVudC5ndWlsZHMuc2l6ZSk7XG4gICAgICAvLyBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAvLyAgIGRibC5wb3N0U3RhdHMoY2xpZW50Lmd1aWxkcy5zaXplKTtcbiAgICAgIC8vIH0sIDE4MDAwMDApO1xuICAgIH0pO1xuICAgIHRoaXMuQ2xpZW50LmxvZ2luKENvbmZpZy5CT1RfVE9LRU4pO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXQgQm90TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5DbGllbnQudXNlci51c2VybmFtZTtcbiAgfVxufVxuIl19