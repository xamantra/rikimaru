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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuY29tbWFuZC5leGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmQvZXhhbXBsZXMvbWVkaWEuY29tbWFuZC5leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0RBQXFEO0FBSXJELE1BQWEsWUFBWTtJQUl2QixZQUFZLEtBQWE7UUFGakIsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUczQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsV0FBVztZQUNYLFFBQVE7WUFDUixTQUFTO1lBQ1QsZUFBZTtZQUNmLE1BQU07WUFDTixXQUFXO1lBQ1gsU0FBUztZQUNULG9CQUFvQjtZQUNwQixVQUFVO1lBQ1YsY0FBYztZQUNkLE1BQU07WUFDTixlQUFlO1lBQ2YsZUFBZTtZQUNmLFVBQVU7WUFDVixtQkFBbUI7WUFDbkIsWUFBWTtZQUNaLGlCQUFpQjtZQUNqQixlQUFlO1lBQ2YsY0FBYztZQUNkLFNBQVM7WUFDVCxpQkFBaUI7WUFDakIsVUFBVTtZQUNWLGVBQWU7WUFDZixVQUFVO1lBQ1Ysa0JBQWtCO1lBQ2xCLFNBQVM7WUFDVCxhQUFhO1lBQ2IsbUJBQW1CO1lBQ25CLFdBQVc7WUFDWCxRQUFRO1lBQ1IsVUFBVTtZQUNWLHVCQUF1QjtZQUN2QixXQUFXO1lBQ1gsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixhQUFhO1lBQ2IsU0FBUztZQUNULFVBQVU7WUFDVixhQUFhO1lBQ2IsWUFBWTtZQUNaLFdBQVc7WUFDWCx5QkFBeUI7WUFDekIsbUJBQW1CO1lBQ25CLFlBQVk7WUFDWixLQUFLO1lBQ0wsVUFBVTtZQUNWLFNBQVM7WUFDVCxRQUFRO1lBQ1IsaUJBQWlCO1lBQ2pCLHVCQUF1QjtZQUN2QixtQkFBbUI7WUFDbkIsZUFBZTtZQUNmLGVBQWU7WUFDZixRQUFRO1lBQ1IsYUFBYTtZQUNiLFNBQVM7WUFDVCxhQUFhO1lBQ2IsUUFBUTtZQUNSLGVBQWU7WUFDZixlQUFlO1lBQ2YsZUFBZTtTQUNoQixDQUFDO0lBQ0osQ0FBQztJQUVNLEdBQUcsQ0FBQyxPQUFpQixFQUFFLEtBQWE7UUFDekMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztRQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDMUMsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRTtnQkFDbkQsTUFBTSxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQjtZQUNELElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7Z0JBQzNCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7U0FDRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQXRGRCxvQ0FzRkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSYW5kb20gfSBmcm9tIFwiLi4vLi4vaGVscGVycy9yYW5kb20uaGVscGVyXCI7XHJcbmltcG9ydCB7IElDb21tYW5kRXhhbXBsZSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2NvbW1hbmQuZXhhbXBsZS5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmQgfSBmcm9tIFwiLi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1lZGlhRXhhbXBsZSBpbXBsZW1lbnRzIElDb21tYW5kRXhhbXBsZSB7XHJcbiAgcHVibGljIENvdW50OiBudW1iZXI7XHJcbiAgcHJpdmF0ZSBtZWRpYTogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoY291bnQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5Db3VudCA9IGNvdW50O1xyXG4gICAgdGhpcy5tZWRpYSA9IFtcclxuICAgICAgXCJibG9vZCBsYWRcIixcclxuICAgICAgXCJjYW5hYW5cIixcclxuICAgICAgXCJhbm90aGVyXCIsXHJcbiAgICAgIFwiY2VsbHMgYXQgd29ya1wiLFxyXG4gICAgICBcImdhdGVcIixcclxuICAgICAgXCJnb2QgZWF0ZXJcIixcclxuICAgICAgXCJncmltZ2FyXCIsXHJcbiAgICAgIFwid2l0aCBteSBzbWFydHBob25lXCIsXHJcbiAgICAgIFwia2FiYW5lcmlcIixcclxuICAgICAgXCJrYW5hdGFnYXRhcmlcIixcclxuICAgICAgXCJraWJhXCIsXHJcbiAgICAgIFwibWFkZSBpbiBhYnlzc1wiLFxyXG4gICAgICBcImtpbmcncyBhdmF0YXJcIixcclxuICAgICAgXCJrb25vc3ViYVwiLFxyXG4gICAgICBcImt5b3VrYWkgbm8ga2FuYXRhXCIsXHJcbiAgICAgIFwibW9iIHBzeWNob1wiLFxyXG4gICAgICBcIm1vbmRhaWppLXRhaWNoaVwiLFxyXG4gICAgICBcImhlcm8gYWNhZGVtaWFcIixcclxuICAgICAgXCJib2t1IG5vIGhlcm9cIixcclxuICAgICAgXCJuYW5hdHN1XCIsXHJcbiAgICAgIFwibm8gZ2FtZSBubyBsaWZlXCIsXHJcbiAgICAgIFwibm9yYWdhbWlcIixcclxuICAgICAgXCJvbmUgcHVuY2ggbWFuXCIsXHJcbiAgICAgIFwib3JlZ2FpcnVcIixcclxuICAgICAgXCJwbGFzdGljIG1lbW9yaWVzXCIsXHJcbiAgICAgIFwicm9rdWFrYVwiLFxyXG4gICAgICBcInNjdW0ncyB3aXNoXCIsXHJcbiAgICAgIFwic2VyYXBoIG9mIHRoZSBlbmRcIixcclxuICAgICAgXCJzaHV1bWF0c3VcIixcclxuICAgICAgXCJzaXJpdXNcIixcclxuICAgICAgXCJ6ZXN0aXJpYVwiLFxyXG4gICAgICBcImRldmlsIGlzIGEgcGFydC10aW1lclwiLFxyXG4gICAgICBcInlvdXIgbmFtZVwiLFxyXG4gICAgICBcInNoYXBlIG9mIHZvaWNlXCIsXHJcbiAgICAgIFwid2l0Y2ggY3JhZnRcIixcclxuICAgICAgXCJ0b2t5byBnaG91bFwiLFxyXG4gICAgICBcInJhZGlhbnRcIixcclxuICAgICAgXCJrYXJha3VyaVwiLFxyXG4gICAgICBcInlvdWpvIHNlbmtpXCIsXHJcbiAgICAgIFwiem9tYmllbGFuZFwiLFxyXG4gICAgICBcIm9uZSBwaWVjZVwiLFxyXG4gICAgICBcImNsYXNzcm9vbSBvZiB0aGUgZWxpdGVzXCIsXHJcbiAgICAgIFwieW91ciBsaWUgaW4gYXByaWxcIixcclxuICAgICAgXCJjb2RlIGdlYXNzXCIsXHJcbiAgICAgIFwic2FvXCIsXHJcbiAgICAgIFwiZGFubWFjaGlcIixcclxuICAgICAgXCJyZSB6ZXJvXCIsXHJcbiAgICAgIFwiZG9yb3JvXCIsXHJcbiAgICAgIFwiYm9hcmRpbmcganVsaWV0XCIsXHJcbiAgICAgIFwicmVpbmNhcm5hdGVkIGFzIHNsaW1lXCIsXHJcbiAgICAgIFwiYnVubnkgZ2lybCBzZW5wYWlcIixcclxuICAgICAgXCJpcm96dWt1IHNla2FpXCIsXHJcbiAgICAgIFwia2Vra2FpIHNlbnNlblwiLFxyXG4gICAgICBcImJvcnV0b1wiLFxyXG4gICAgICBcIm1lcmMgc3RvcmlhXCIsXHJcbiAgICAgIFwiZ3JpZG1hblwiLFxyXG4gICAgICBcInRva3lvIGdob3VsXCIsXHJcbiAgICAgIFwiZnJhbnh4XCIsXHJcbiAgICAgIFwiYWthbWUgZ2Ega2lsbFwiLFxyXG4gICAgICBcImFzb2JpIGFzb2Jhc2VcIixcclxuICAgICAgXCJnb2JsaW4gc2xheWVyXCJcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgR2V0KGNvbW1hbmQ6IElDb21tYW5kLCBjb3VudDogbnVtYmVyKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYGA7XHJcbiAgICBjb25zdCBwaWNrZWQ6IHN0cmluZ1tdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubWVkaWEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgaXRlbTogc3RyaW5nID0gdGhpcy5tZWRpYVtSYW5kb20uUmFuZ2UoMCwgdGhpcy5tZWRpYS5sZW5ndGggLSAxKV07XHJcbiAgICAgIGlmICghcGlja2VkLmluY2x1ZGVzKGl0ZW0pICYmIHBpY2tlZC5sZW5ndGggPCBjb3VudCkge1xyXG4gICAgICAgIHJlc3VsdCArPSBgXFxuLSoke2NvbW1hbmQuTmFtZX0qICR7aXRlbX1gO1xyXG4gICAgICAgIHBpY2tlZC5wdXNoKGl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChwaWNrZWQubGVuZ3RoID09PSBjb3VudCkge1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==