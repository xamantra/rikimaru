"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("../../helpers/random.helper");
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
exports.MediaExample = MediaExample;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuY29tbWFuZC5leGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZXhhbXBsZXMvbWVkaWEuY29tbWFuZC5leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQXFEO0FBSXJELE1BQWEsWUFBWTtJQUl2QixZQUFZLEtBQWE7UUFGakIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUczQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsV0FBVztZQUNYLFFBQVE7WUFDUixTQUFTO1lBQ1QsZUFBZTtZQUNmLE1BQU07WUFDTixXQUFXO1lBQ1gsU0FBUztZQUNULG9CQUFvQjtZQUNwQixVQUFVO1lBQ1YsY0FBYztZQUNkLE1BQU07WUFDTixlQUFlO1lBQ2YsZUFBZTtZQUNmLFVBQVU7WUFDVixtQkFBbUI7WUFDbkIsWUFBWTtZQUNaLGlCQUFpQjtZQUNqQixlQUFlO1lBQ2YsY0FBYztZQUNkLFNBQVM7WUFDVCxpQkFBaUI7WUFDakIsVUFBVTtZQUNWLGVBQWU7WUFDZixVQUFVO1lBQ1Ysa0JBQWtCO1lBQ2xCLFNBQVM7WUFDVCxhQUFhO1lBQ2IsbUJBQW1CO1lBQ25CLFdBQVc7WUFDWCxRQUFRO1lBQ1IsVUFBVTtZQUNWLHVCQUF1QjtZQUN2QixXQUFXO1lBQ1gsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixhQUFhO1lBQ2IsU0FBUztZQUNULFVBQVU7WUFDVixhQUFhO1lBQ2IsWUFBWTtZQUNaLFdBQVc7WUFDWCx5QkFBeUI7WUFDekIsbUJBQW1CO1lBQ25CLFlBQVk7WUFDWixLQUFLO1lBQ0wsVUFBVTtZQUNWLFNBQVM7WUFDVCxRQUFRO1lBQ1IsaUJBQWlCO1lBQ2pCLHVCQUF1QjtZQUN2QixtQkFBbUI7WUFDbkIsZUFBZTtZQUNmLGVBQWU7WUFDZixRQUFRO1lBQ1IsYUFBYTtZQUNiLFNBQVM7WUFDVCxhQUFhO1lBQ2IsUUFBUTtZQUNSLGVBQWU7WUFDZixlQUFlO1lBQ2YsZUFBZTtTQUNoQixDQUFDO0lBQ0osQ0FBQztJQUVNLEdBQUcsQ0FBQyxPQUFpQixFQUFFLEtBQWE7UUFDekMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtnQkFDbkQsTUFBTSxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtZQUNELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQXRGRCxvQ0FzRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XG5pbXBvcnQgeyBJQ29tbWFuZEV4YW1wbGUgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmV4YW1wbGUuaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBJQ29tbWFuZCB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuaW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBNZWRpYUV4YW1wbGUgaW1wbGVtZW50cyBJQ29tbWFuZEV4YW1wbGUge1xuICBwdWJsaWMgQ291bnQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBtZWRpYTogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihjb3VudDogbnVtYmVyKSB7XG4gICAgdGhpcy5Db3VudCA9IGNvdW50O1xuICAgIHRoaXMubWVkaWEgPSBbXG4gICAgICBcImJsb29kIGxhZFwiLFxuICAgICAgXCJjYW5hYW5cIixcbiAgICAgIFwiYW5vdGhlclwiLFxuICAgICAgXCJjZWxscyBhdCB3b3JrXCIsXG4gICAgICBcImdhdGVcIixcbiAgICAgIFwiZ29kIGVhdGVyXCIsXG4gICAgICBcImdyaW1nYXJcIixcbiAgICAgIFwid2l0aCBteSBzbWFydHBob25lXCIsXG4gICAgICBcImthYmFuZXJpXCIsXG4gICAgICBcImthbmF0YWdhdGFyaVwiLFxuICAgICAgXCJraWJhXCIsXG4gICAgICBcIm1hZGUgaW4gYWJ5c3NcIixcbiAgICAgIFwia2luZydzIGF2YXRhclwiLFxuICAgICAgXCJrb25vc3ViYVwiLFxuICAgICAgXCJreW91a2FpIG5vIGthbmF0YVwiLFxuICAgICAgXCJtb2IgcHN5Y2hvXCIsXG4gICAgICBcIm1vbmRhaWppLXRhaWNoaVwiLFxuICAgICAgXCJoZXJvIGFjYWRlbWlhXCIsXG4gICAgICBcImJva3Ugbm8gaGVyb1wiLFxuICAgICAgXCJuYW5hdHN1XCIsXG4gICAgICBcIm5vIGdhbWUgbm8gbGlmZVwiLFxuICAgICAgXCJub3JhZ2FtaVwiLFxuICAgICAgXCJvbmUgcHVuY2ggbWFuXCIsXG4gICAgICBcIm9yZWdhaXJ1XCIsXG4gICAgICBcInBsYXN0aWMgbWVtb3JpZXNcIixcbiAgICAgIFwicm9rdWFrYVwiLFxuICAgICAgXCJzY3VtJ3Mgd2lzaFwiLFxuICAgICAgXCJzZXJhcGggb2YgdGhlIGVuZFwiLFxuICAgICAgXCJzaHV1bWF0c3VcIixcbiAgICAgIFwic2lyaXVzXCIsXG4gICAgICBcInplc3RpcmlhXCIsXG4gICAgICBcImRldmlsIGlzIGEgcGFydC10aW1lclwiLFxuICAgICAgXCJ5b3VyIG5hbWVcIixcbiAgICAgIFwic2hhcGUgb2Ygdm9pY2VcIixcbiAgICAgIFwid2l0Y2ggY3JhZnRcIixcbiAgICAgIFwidG9reW8gZ2hvdWxcIixcbiAgICAgIFwicmFkaWFudFwiLFxuICAgICAgXCJrYXJha3VyaVwiLFxuICAgICAgXCJ5b3VqbyBzZW5raVwiLFxuICAgICAgXCJ6b21iaWVsYW5kXCIsXG4gICAgICBcIm9uZSBwaWVjZVwiLFxuICAgICAgXCJjbGFzc3Jvb20gb2YgdGhlIGVsaXRlc1wiLFxuICAgICAgXCJ5b3VyIGxpZSBpbiBhcHJpbFwiLFxuICAgICAgXCJjb2RlIGdlYXNzXCIsXG4gICAgICBcInNhb1wiLFxuICAgICAgXCJkYW5tYWNoaVwiLFxuICAgICAgXCJyZSB6ZXJvXCIsXG4gICAgICBcImRvcm9yb1wiLFxuICAgICAgXCJib2FyZGluZyBqdWxpZXRcIixcbiAgICAgIFwicmVpbmNhcm5hdGVkIGFzIHNsaW1lXCIsXG4gICAgICBcImJ1bm55IGdpcmwgc2VucGFpXCIsXG4gICAgICBcImlyb3p1a3Ugc2VrYWlcIixcbiAgICAgIFwia2Vra2FpIHNlbnNlblwiLFxuICAgICAgXCJib3J1dG9cIixcbiAgICAgIFwibWVyYyBzdG9yaWFcIixcbiAgICAgIFwiZ3JpZG1hblwiLFxuICAgICAgXCJ0b2t5byBnaG91bFwiLFxuICAgICAgXCJmcmFueHhcIixcbiAgICAgIFwiYWthbWUgZ2Ega2lsbFwiLFxuICAgICAgXCJhc29iaSBhc29iYXNlXCIsXG4gICAgICBcImdvYmxpbiBzbGF5ZXJcIlxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgR2V0KGNvbW1hbmQ6IElDb21tYW5kLCBjb3VudDogbnVtYmVyKSB7XG4gICAgbGV0IHJlc3VsdCA9IGBgO1xuICAgIGNvbnN0IHBpY2tlZDogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWVkaWEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGl0ZW06IHN0cmluZyA9IHRoaXMubWVkaWFbUmFuZG9tLlJhbmdlKDAsIHRoaXMubWVkaWEubGVuZ3RoIC0gMSldO1xuICAgICAgaWYgKCFwaWNrZWQuaW5jbHVkZXMoaXRlbSkgJiYgcGlja2VkLmxlbmd0aCA8IGNvdW50KSB7XG4gICAgICAgIHJlc3VsdCArPSBgXFxuLSoke2NvbW1hbmQuTmFtZX0qICR7aXRlbX1gO1xuICAgICAgICBwaWNrZWQucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICAgIGlmIChwaWNrZWQubGVuZ3RoID09PSBjb3VudCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=