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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWQuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvZW1iZWQuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsMkNBQStDO0FBRS9DLE1BQWEsV0FBVztJQUNmLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBYSxFQUFFLE1BQW1CO1FBQzFELE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQyxNQUFNLEtBQUssR0FBRztZQUNaLEtBQUssRUFBRTtnQkFDTCxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLO2dCQUMvQixTQUFTLEVBQUU7b0JBQ1QsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztpQkFDM0I7Z0JBQ0QsS0FBSyxFQUFFLFNBQVMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLG1CQUNsQyxNQUFNLENBQUMsSUFDVCxZQUFZO2dCQUNaLE1BQU0sRUFBRTtvQkFDTjt3QkFDRSxJQUFJLEVBQUUsZUFBZTt3QkFDckIsS0FBSyxFQUFFLDJFQUEyRTtxQkFDbkY7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLDJCQUEyQjt3QkFDakMsS0FBSyxFQUFFLHFGQUFxRjtxQkFDN0Y7aUJBQ0Y7Z0JBQ0QsU0FBUyxFQUFFLElBQUksSUFBSSxFQUFFO2dCQUNyQixNQUFNLEVBQUU7b0JBQ04sUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUztvQkFDL0IsSUFBSSxFQUFFLFlBQVk7aUJBQ25CO2FBQ0Y7U0FDRixDQUFDO1FBQ0YsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0Y7QUEvQkQsa0NBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwiLi8uLi9jb3JlL2NvbG9yc1wiO1xyXG5pbXBvcnQgeyBHdWlsZE1lbWJlciwgR3VpbGQgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBDbGllbnRNYW5hZ2VyIH0gZnJvbSBcIi4uL2NvcmUvY2xpZW50XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRW1iZWRIZWxwZXIge1xyXG4gIHB1YmxpYyBhc3luYyBXZWxjb21lRW1iZWQoc2VydmVyOiBHdWlsZCwgbWVtYmVyOiBHdWlsZE1lbWJlcikge1xyXG4gICAgY29uc3QgY2xpZW50ID0gYXdhaXQgQ2xpZW50TWFuYWdlci5HZXRDbGllbnQoKTtcclxuICAgIGNvbnN0IGVtYmVkID0ge1xyXG4gICAgICBlbWJlZDoge1xyXG4gICAgICAgIGNvbG9yOiBtZW1iZXIuaGlnaGVzdFJvbGUuY29sb3IsXHJcbiAgICAgICAgdGh1bWJuYWlsOiB7XHJcbiAgICAgICAgICB1cmw6IG1lbWJlci51c2VyLmF2YXRhclVSTFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGl0bGU6IGBIZWxsbyAke21lbWJlci51c2VyLnVzZXJuYW1lfSEsIFdlbGNvbWUgdG8gKioke1xyXG4gICAgICAgICAgc2VydmVyLm5hbWVcclxuICAgICAgICB9KiohIFNlcnZlcmAsXHJcbiAgICAgICAgZmllbGRzOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IGAqKldobyBhbSBJPyoqYCxcclxuICAgICAgICAgICAgdmFsdWU6IGAqSSBhbSBhbiBhbmltZSBzY2hlZHVsZS9jb3VudGRvd24gYm90LCBwbGVhc2UgbWFrZSB0aGUgbW9zdCBvdXQgb2YgbWUhKlxcbmBcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IGAqKldoYXQgYXJlIG15IGNvbW1hbmRzPyoqYCxcclxuICAgICAgICAgICAgdmFsdWU6IGBUeXBlICoqKi1oZWxwKioqIHRvIHNob3cgYWxsIGNvbW1hbmRzXFxuTm90ZTogKllvdSBjYW4gZG8gaXQgaGVyZSBvciBpbiB0aGUgc2VydmVyLipgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCksXHJcbiAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICBpY29uX3VybDogY2xpZW50LnVzZXIuYXZhdGFyVVJMLFxyXG4gICAgICAgICAgdGV4dDogXCLCqSBSaWtpbWFydVwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGVtYmVkO1xyXG4gIH1cclxufVxyXG4iXX0=