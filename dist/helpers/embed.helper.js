"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../core/client");
const config_1 = require("../core/config");
class EmbedHelper {
    async WelcomeEmbed(server, member) {
        const client = await client_1.ClientManager.GetClient();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWQuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvZW1iZWQuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsMkNBQStDO0FBQy9DLDJDQUF3QztBQUV4QyxNQUFhLFdBQVc7SUFDZixLQUFLLENBQUMsWUFBWSxDQUFDLE1BQWEsRUFBRSxNQUFtQjtRQUMxRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFhLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDL0MsTUFBTSxLQUFLLEdBQUc7WUFDWixLQUFLLEVBQUU7Z0JBQ0wsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSztnQkFDL0IsU0FBUyxFQUFFO29CQUNULEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVM7aUJBQzNCO2dCQUNELEtBQUssRUFBRSxTQUFTLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxtQkFDbEMsTUFBTSxDQUFDLElBQ1QsWUFBWTtnQkFDWixNQUFNLEVBQUU7b0JBQ047d0JBQ0UsSUFBSSxFQUFFLGVBQWU7d0JBQ3JCLEtBQUssRUFBRSwyRUFBMkU7cUJBQ25GO29CQUNEO3dCQUNFLElBQUksRUFBRSwyQkFBMkI7d0JBQ2pDLEtBQUssRUFBRSxXQUNMLGVBQU0sQ0FBQyxjQUNULDRFQUE0RTtxQkFDN0U7aUJBQ0Y7Z0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUNyQixNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztvQkFDL0IsSUFBSSxFQUFFLEtBQUssZUFBTSxDQUFDLFFBQVEsRUFBRTtpQkFDN0I7YUFDRjtTQUNGLENBQUM7UUFDRixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7Q0FDRjtBQWpDRCxrQ0FpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHdWlsZE1lbWJlciwgR3VpbGQgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xuaW1wb3J0IHsgQ2xpZW50TWFuYWdlciB9IGZyb20gXCIuLi9jb3JlL2NsaWVudFwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvcmUvY29uZmlnXCI7XG5cbmV4cG9ydCBjbGFzcyBFbWJlZEhlbHBlciB7XG4gIHB1YmxpYyBhc3luYyBXZWxjb21lRW1iZWQoc2VydmVyOiBHdWlsZCwgbWVtYmVyOiBHdWlsZE1lbWJlcikge1xuICAgIGNvbnN0IGNsaWVudCA9IGF3YWl0IENsaWVudE1hbmFnZXIuR2V0Q2xpZW50KCk7XG4gICAgY29uc3QgZW1iZWQgPSB7XG4gICAgICBlbWJlZDoge1xuICAgICAgICBjb2xvcjogbWVtYmVyLmhpZ2hlc3RSb2xlLmNvbG9yLFxuICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICB1cmw6IG1lbWJlci51c2VyLmF2YXRhclVSTFxuICAgICAgICB9LFxuICAgICAgICB0aXRsZTogYEhlbGxvICR7bWVtYmVyLnVzZXIudXNlcm5hbWV9ISwgV2VsY29tZSB0byAqKiR7XG4gICAgICAgICAgc2VydmVyLm5hbWVcbiAgICAgICAgfSoqISBTZXJ2ZXJgLFxuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBgKipXaG8gYW0gST8qKmAsXG4gICAgICAgICAgICB2YWx1ZTogYCpJIGFtIGFuIGFuaW1lIHNjaGVkdWxlL2NvdW50ZG93biBib3QsIHBsZWFzZSBtYWtlIHRoZSBtb3N0IG91dCBvZiBtZSEqXFxuYFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogYCoqV2hhdCBhcmUgbXkgY29tbWFuZHM/KipgLFxuICAgICAgICAgICAgdmFsdWU6IGBUeXBlICoqKiR7XG4gICAgICAgICAgICAgIENvbmZpZy5DT01NQU5EX1BSRUZJWFxuICAgICAgICAgICAgfWhlbHAqKiogdG8gc2hvdyBhbGwgY29tbWFuZHNcXG5Ob3RlOiAqWW91IGNhbiBkbyBpdCBoZXJlIG9yIGluIHRoZSBzZXJ2ZXIuKmBcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICB0ZXh0OiBgwqkgJHtDb25maWcuQk9UX05BTUV9YFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gZW1iZWQ7XG4gIH1cbn1cbiJdfQ==