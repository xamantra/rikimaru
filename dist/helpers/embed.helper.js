"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../core/client");
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
                        value: `Type ***-help*** to show all commands\nNote: *You can do it here or in the server.*`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Rikimaru"
                }
            }
        };
        return embed;
    }
}
exports.EmbedHelper = EmbedHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWQuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvZW1iZWQuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMkNBQStDO0FBRS9DLE1BQWEsV0FBVztJQUNmLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBYSxFQUFFLE1BQW1CO1FBQzFELE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEtBQUssR0FBRztZQUNaLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2dCQUMvQixTQUFTLEVBQUU7b0JBQ1QsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztpQkFDM0I7Z0JBQ0QsS0FBSyxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLG1CQUNsQyxNQUFNLENBQUMsSUFDVCxZQUFZO2dCQUNaLE1BQU0sRUFBRTtvQkFDTjt3QkFDRSxJQUFJLEVBQUUsZUFBZTt3QkFDckIsS0FBSyxFQUFFLDJFQUEyRTtxQkFDbkY7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLDJCQUEyQjt3QkFDakMsS0FBSyxFQUFFLHFGQUFxRjtxQkFDN0Y7aUJBQ0Y7Z0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUNyQixNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztvQkFDL0IsSUFBSSxFQUFFLFlBQVk7aUJBQ25CO2FBQ0Y7U0FDRixDQUFDO1FBQ0YsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0Y7QUEvQkQsa0NBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi8uLi9jb3JlL2NvbG9yc1wiO1xuaW1wb3J0IHsgR3VpbGRNZW1iZXIsIEd1aWxkIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcbmltcG9ydCB7IENsaWVudE1hbmFnZXIgfSBmcm9tIFwiLi4vY29yZS9jbGllbnRcIjtcblxuZXhwb3J0IGNsYXNzIEVtYmVkSGVscGVyIHtcbiAgcHVibGljIGFzeW5jIFdlbGNvbWVFbWJlZChzZXJ2ZXI6IEd1aWxkLCBtZW1iZXI6IEd1aWxkTWVtYmVyKSB7XG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcbiAgICBjb25zdCBlbWJlZCA9IHtcbiAgICAgIGVtYmVkOiB7XG4gICAgICAgIGNvbG9yOiBtZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXG4gICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgIHVybDogbWVtYmVyLnVzZXIuYXZhdGFyVVJMXG4gICAgICAgIH0sXG4gICAgICAgIHRpdGxlOiBgSGVsbG8gJHttZW1iZXIudXNlci51c2VybmFtZX0hLCBXZWxjb21lIHRvICoqJHtcbiAgICAgICAgICBzZXJ2ZXIubmFtZVxuICAgICAgICB9KiohIFNlcnZlcmAsXG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IGAqKldobyBhbSBJPyoqYCxcbiAgICAgICAgICAgIHZhbHVlOiBgKkkgYW0gYW4gYW5pbWUgc2NoZWR1bGUvY291bnRkb3duIGJvdCwgcGxlYXNlIG1ha2UgdGhlIG1vc3Qgb3V0IG9mIG1lISpcXG5gXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBgKipXaGF0IGFyZSBteSBjb21tYW5kcz8qKmAsXG4gICAgICAgICAgICB2YWx1ZTogYFR5cGUgKioqLWhlbHAqKiogdG8gc2hvdyBhbGwgY29tbWFuZHNcXG5Ob3RlOiAqWW91IGNhbiBkbyBpdCBoZXJlIG9yIGluIHRoZSBzZXJ2ZXIuKmBcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKSxcbiAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgaWNvbl91cmw6IGNsaWVudC51c2VyLmF2YXRhclVSTCxcbiAgICAgICAgICB0ZXh0OiBcIsKpIFJpa2ltYXJ1XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGVtYmVkO1xuICB9XG59XG4iXX0=