"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("../../helpers/random.helper");
const config_1 = require("../../core/config");
class MediaExample {
    constructor(count) {
        this.media = [];
        this.Count = count;
        this.media = [
            "blood lad",
            "canaan",
            "another",
            "cells at work",
            "gate",
            "god eater",
            "grimgar",
            "with my smartphone",
            "kabaneri",
            "kanatagatari",
            "kiba",
            "made in abyss",
            "king's avatar",
            "konosuba",
            "kyoukai no kanata",
            "mob psycho",
            "mondaiji-taichi",
            "hero academia",
            "boku no hero",
            "nanatsu",
            "no game no life",
            "noragami",
            "one punch man",
            "oregairu",
            "plastic memories",
            "rokuaka",
            "scum's wish",
            "seraph of the end",
            "shuumatsu",
            "sirius",
            "zestiria",
            "devil is a part-timer",
            "your name",
            "shape of voice",
            "witch craft",
            "tokyo ghoul",
            "radiant",
            "karakuri",
            "youjo senki",
            "zombieland",
            "one piece",
            "classroom of the elites",
            "your lie in april",
            "code geass",
            "sao",
            "danmachi",
            "re zero",
            "dororo",
            "boarding juliet",
            "reincarnated as slime",
            "bunny girl senpai",
            "irozuku sekai",
            "kekkai sensen",
            "boruto",
            "merc storia",
            "gridman",
            "tokyo ghoul",
            "franxx",
            "akame ga kill",
            "asobi asobase",
            "goblin slayer"
        ];
    }
    Get(command, count) {
        let result = ``;
        const picked = [];
        for (let i = 0; i < this.media.length; i++) {
            const item = this.media[random_helper_1.Random.Range(0, this.media.length - 1)];
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
exports.MediaExample = MediaExample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuY29tbWFuZC5leGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZXhhbXBsZXMvbWVkaWEuY29tbWFuZC5leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQXFEO0FBR3JELDhDQUEyQztBQUUzQyxNQUFhLFlBQVk7SUFJdkIsWUFBWSxLQUFhO1FBRmpCLFVBQUssR0FBYSxFQUFFLENBQUM7UUFHM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNYLFdBQVc7WUFDWCxRQUFRO1lBQ1IsU0FBUztZQUNULGVBQWU7WUFDZixNQUFNO1lBQ04sV0FBVztZQUNYLFNBQVM7WUFDVCxvQkFBb0I7WUFDcEIsVUFBVTtZQUNWLGNBQWM7WUFDZCxNQUFNO1lBQ04sZUFBZTtZQUNmLGVBQWU7WUFDZixVQUFVO1lBQ1YsbUJBQW1CO1lBQ25CLFlBQVk7WUFDWixpQkFBaUI7WUFDakIsZUFBZTtZQUNmLGNBQWM7WUFDZCxTQUFTO1lBQ1QsaUJBQWlCO1lBQ2pCLFVBQVU7WUFDVixlQUFlO1lBQ2YsVUFBVTtZQUNWLGtCQUFrQjtZQUNsQixTQUFTO1lBQ1QsYUFBYTtZQUNiLG1CQUFtQjtZQUNuQixXQUFXO1lBQ1gsUUFBUTtZQUNSLFVBQVU7WUFDVix1QkFBdUI7WUFDdkIsV0FBVztZQUNYLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2IsYUFBYTtZQUNiLFNBQVM7WUFDVCxVQUFVO1lBQ1YsYUFBYTtZQUNiLFlBQVk7WUFDWixXQUFXO1lBQ1gseUJBQXlCO1lBQ3pCLG1CQUFtQjtZQUNuQixZQUFZO1lBQ1osS0FBSztZQUNMLFVBQVU7WUFDVixTQUFTO1lBQ1QsUUFBUTtZQUNSLGlCQUFpQjtZQUNqQix1QkFBdUI7WUFDdkIsbUJBQW1CO1lBQ25CLGVBQWU7WUFDZixlQUFlO1lBQ2YsUUFBUTtZQUNSLGFBQWE7WUFDYixTQUFTO1lBQ1QsYUFBYTtZQUNiLFFBQVE7WUFDUixlQUFlO1lBQ2YsZUFBZTtZQUNmLGVBQWU7U0FDaEIsQ0FBQztJQUNKLENBQUM7SUFFTSxHQUFHLENBQUMsT0FBaUIsRUFBRSxLQUFhO1FBQ3pDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLE1BQU0sSUFBSSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLEVBQUU7Z0JBQ25ELE1BQU0sSUFBSSxLQUFLLGVBQU0sQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtZQUNELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQXRGRCxvQ0FzRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XG5pbXBvcnQgeyBJQ29tbWFuZEV4YW1wbGUgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmV4YW1wbGUuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi4vLi4vY29yZS9jb25maWdcIjtcblxuZXhwb3J0IGNsYXNzIE1lZGlhRXhhbXBsZSBpbXBsZW1lbnRzIElDb21tYW5kRXhhbXBsZSB7XG4gIHB1YmxpYyBDb3VudDogbnVtYmVyO1xuICBwcml2YXRlIG1lZGlhOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGNvdW50OiBudW1iZXIpIHtcbiAgICB0aGlzLkNvdW50ID0gY291bnQ7XG4gICAgdGhpcy5tZWRpYSA9IFtcbiAgICAgIFwiYmxvb2QgbGFkXCIsXG4gICAgICBcImNhbmFhblwiLFxuICAgICAgXCJhbm90aGVyXCIsXG4gICAgICBcImNlbGxzIGF0IHdvcmtcIixcbiAgICAgIFwiZ2F0ZVwiLFxuICAgICAgXCJnb2QgZWF0ZXJcIixcbiAgICAgIFwiZ3JpbWdhclwiLFxuICAgICAgXCJ3aXRoIG15IHNtYXJ0cGhvbmVcIixcbiAgICAgIFwia2FiYW5lcmlcIixcbiAgICAgIFwia2FuYXRhZ2F0YXJpXCIsXG4gICAgICBcImtpYmFcIixcbiAgICAgIFwibWFkZSBpbiBhYnlzc1wiLFxuICAgICAgXCJraW5nJ3MgYXZhdGFyXCIsXG4gICAgICBcImtvbm9zdWJhXCIsXG4gICAgICBcImt5b3VrYWkgbm8ga2FuYXRhXCIsXG4gICAgICBcIm1vYiBwc3ljaG9cIixcbiAgICAgIFwibW9uZGFpamktdGFpY2hpXCIsXG4gICAgICBcImhlcm8gYWNhZGVtaWFcIixcbiAgICAgIFwiYm9rdSBubyBoZXJvXCIsXG4gICAgICBcIm5hbmF0c3VcIixcbiAgICAgIFwibm8gZ2FtZSBubyBsaWZlXCIsXG4gICAgICBcIm5vcmFnYW1pXCIsXG4gICAgICBcIm9uZSBwdW5jaCBtYW5cIixcbiAgICAgIFwib3JlZ2FpcnVcIixcbiAgICAgIFwicGxhc3RpYyBtZW1vcmllc1wiLFxuICAgICAgXCJyb2t1YWthXCIsXG4gICAgICBcInNjdW0ncyB3aXNoXCIsXG4gICAgICBcInNlcmFwaCBvZiB0aGUgZW5kXCIsXG4gICAgICBcInNodXVtYXRzdVwiLFxuICAgICAgXCJzaXJpdXNcIixcbiAgICAgIFwiemVzdGlyaWFcIixcbiAgICAgIFwiZGV2aWwgaXMgYSBwYXJ0LXRpbWVyXCIsXG4gICAgICBcInlvdXIgbmFtZVwiLFxuICAgICAgXCJzaGFwZSBvZiB2b2ljZVwiLFxuICAgICAgXCJ3aXRjaCBjcmFmdFwiLFxuICAgICAgXCJ0b2t5byBnaG91bFwiLFxuICAgICAgXCJyYWRpYW50XCIsXG4gICAgICBcImthcmFrdXJpXCIsXG4gICAgICBcInlvdWpvIHNlbmtpXCIsXG4gICAgICBcInpvbWJpZWxhbmRcIixcbiAgICAgIFwib25lIHBpZWNlXCIsXG4gICAgICBcImNsYXNzcm9vbSBvZiB0aGUgZWxpdGVzXCIsXG4gICAgICBcInlvdXIgbGllIGluIGFwcmlsXCIsXG4gICAgICBcImNvZGUgZ2Vhc3NcIixcbiAgICAgIFwic2FvXCIsXG4gICAgICBcImRhbm1hY2hpXCIsXG4gICAgICBcInJlIHplcm9cIixcbiAgICAgIFwiZG9yb3JvXCIsXG4gICAgICBcImJvYXJkaW5nIGp1bGlldFwiLFxuICAgICAgXCJyZWluY2FybmF0ZWQgYXMgc2xpbWVcIixcbiAgICAgIFwiYnVubnkgZ2lybCBzZW5wYWlcIixcbiAgICAgIFwiaXJvenVrdSBzZWthaVwiLFxuICAgICAgXCJrZWtrYWkgc2Vuc2VuXCIsXG4gICAgICBcImJvcnV0b1wiLFxuICAgICAgXCJtZXJjIHN0b3JpYVwiLFxuICAgICAgXCJncmlkbWFuXCIsXG4gICAgICBcInRva3lvIGdob3VsXCIsXG4gICAgICBcImZyYW54eFwiLFxuICAgICAgXCJha2FtZSBnYSBraWxsXCIsXG4gICAgICBcImFzb2JpIGFzb2Jhc2VcIixcbiAgICAgIFwiZ29ibGluIHNsYXllclwiXG4gICAgXTtcbiAgfVxuXG4gIHB1YmxpYyBHZXQoY29tbWFuZDogSUNvbW1hbmQsIGNvdW50OiBudW1iZXIpIHtcbiAgICBsZXQgcmVzdWx0ID0gYGA7XG4gICAgY29uc3QgcGlja2VkOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tZWRpYS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgaXRlbTogc3RyaW5nID0gdGhpcy5tZWRpYVtSYW5kb20uUmFuZ2UoMCwgdGhpcy5tZWRpYS5sZW5ndGggLSAxKV07XG4gICAgICBpZiAoIXBpY2tlZC5pbmNsdWRlcyhpdGVtKSAmJiBwaWNrZWQubGVuZ3RoIDwgY291bnQpIHtcbiAgICAgICAgcmVzdWx0ICs9IGBcXG4ke0NvbmZpZy5DT01NQU5EX1BSRUZJWH0qJHtjb21tYW5kLk5hbWV9KiAke2l0ZW19YDtcbiAgICAgICAgcGlja2VkLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgICBpZiAocGlja2VkLmxlbmd0aCA9PT0gY291bnQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19