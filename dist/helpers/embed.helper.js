"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../core/client");
const config_1 = require("../core/config");
class EmbedHelper {
    async WelcomeEmbed(server, member) {
        const client = await client_1.ClientManager.Client;
        const embed = {
            embed: {
                color: member.highestRole.color,
                thumbnail: {
                    url: member.user.avatarURL
                },
                title: `Hello ${member.user.username}!, Welcome to **${server.name}**! Server`,
                fields: [
                    {
                        name: `**Who am I?**`,
                        value: `*I am an anime schedule/countdown bot, please make the most out of me!*\n`
                    },
                    {
                        name: `**What are my commands?**`,
                        value: `Type ***${config_1.Config.COMMAND_PREFIX}help*** to show all commands\nNote: *You can do it here or in the server.*`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: `© ${config_1.Config.BOT_NAME}`
                }
            }
        };
        return embed;
    }
}
exports.EmbedHelper = EmbedHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWQuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvZW1iZWQuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQStDO0FBQy9DLDJDQUF3QztBQUV4QyxNQUFhLFdBQVc7SUFDZixLQUFLLENBQUMsWUFBWSxDQUFDLE1BQWEsRUFBRSxNQUFtQjtRQUMxRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsTUFBTSxDQUFDO1FBQzFDLE1BQU0sS0FBSyxHQUFHO1lBQ1osS0FBSyxFQUFFO2dCQUNMLEtBQUssRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUs7Z0JBQy9CLFNBQVMsRUFBRTtvQkFDVCxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTO2lCQUMzQjtnQkFDRCxLQUFLLEVBQUUsU0FBUyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsbUJBQ2xDLE1BQU0sQ0FBQyxJQUNULFlBQVk7Z0JBQ1osTUFBTSxFQUFFO29CQUNOO3dCQUNFLElBQUksRUFBRSxlQUFlO3dCQUNyQixLQUFLLEVBQUUsMkVBQTJFO3FCQUNuRjtvQkFDRDt3QkFDRSxJQUFJLEVBQUUsMkJBQTJCO3dCQUNqQyxLQUFLLEVBQUUsV0FDTCxlQUFNLENBQUMsY0FDVCw0RUFBNEU7cUJBQzdFO2lCQUNGO2dCQUNELFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRTtnQkFDckIsTUFBTSxFQUFFO29CQUNOLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7b0JBQy9CLElBQUksRUFBRSxLQUFLLGVBQU0sQ0FBQyxRQUFRLEVBQUU7aUJBQzdCO2FBQ0Y7U0FDRixDQUFDO1FBQ0YsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0Y7QUFqQ0Qsa0NBaUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3VpbGRNZW1iZXIsIEd1aWxkIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vY29yZS9jbGllbnRcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb3JlL2NvbmZpZ1wiO1xuXG5leHBvcnQgY2xhc3MgRW1iZWRIZWxwZXIge1xuICBwdWJsaWMgYXN5bmMgV2VsY29tZUVtYmVkKHNlcnZlcjogR3VpbGQsIG1lbWJlcjogR3VpbGRNZW1iZXIpIHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCBDbGllbnRNYW5hZ2VyLkNsaWVudDtcbiAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgIGVtYmVkOiB7XG4gICAgICAgIGNvbG9yOiBtZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgIHVybDogbWVtYmVyLnVzZXIuYXZhdGFyVVJMXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlOiBgSGVsbG8gJHttZW1iZXIudXNlci51c2VybmFtZX0hLCBXZWxjb21lIHRvICoqJHtcbiAgICAgICAgICBzZXJ2ZXIubmFtZVxuICAgICAgICB9KiohIFNlcnZlcmAsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IGAqKldobyBhbSBJPyoqYCxcbiAgICAgICAgICAgIHZhbHVlOiBgKkkgYW0gYW4gYW5pbWUgc2NoZWR1bGUvY291bnRkb3duIGJvdCwgcGxlYXNlIG1ha2UgdGhlIG1vc3Qgb3V0IG9mIG1lISpcXG5gXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBgKipXaGF0IGFyZSBteSBjb21tYW5kcz8qKmAsXG4gICAgICAgICAgICB2YWx1ZTogYFR5cGUgKioqJHtcbiAgICAgICAgICAgICAgQ29uZmlnLkNPTU1BTkRfUFJFRklYXG4gICAgICAgICAgICB9aGVscCoqKiB0byBzaG93IGFsbCBjb21tYW5kc1xcbk5vdGU6ICpZb3UgY2FuIGRvIGl0IGhlcmUgb3IgaW4gdGhlIHNlcnZlci4qYFxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLFxuICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxuICAgICAgICAgIHRleHQ6IGDCqSAke0NvbmZpZy5CT1RfTkFNRX1gXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBlbWJlZDtcbiAgfVxufVxuIl19