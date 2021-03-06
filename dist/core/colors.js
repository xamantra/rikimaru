"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("../helpers/random.helper");
class Color {
    static get Random() {
        const list = this.List;
        return list[random_helper_1.Random.Range(0, list.length - 1)];
    }
}
Color.List = [
    3556083,
    6430440,
    11478939,
    11942502,
    11817022,
    15897889,
    15968259,
    13875968,
    8885504,
    5221963,
    4833930,
    3791820,
    3926782,
    508158,
    38910,
    2250494
];
exports.Color = Color;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvY29sb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNERBQWtEO0FBRWxELE1BQWEsS0FBSztJQW9CVCxNQUFNLEtBQUssTUFBTTtRQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLHNCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQzs7QUF0QmMsVUFBSSxHQUFhO0lBQzlCLE9BQU87SUFDUCxPQUFPO0lBQ1AsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsUUFBUTtJQUNSLFFBQVE7SUFDUixRQUFRO0lBQ1IsT0FBTztJQUNQLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLE9BQU87SUFDUCxNQUFNO0lBQ04sS0FBSztJQUNMLE9BQU87Q0FDUixDQUFDO0FBbEJKLHNCQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJhbmRvbSB9IGZyb20gXCIuLi9oZWxwZXJzL3JhbmRvbS5oZWxwZXJcIjtcblxuZXhwb3J0IGNsYXNzIENvbG9yIHtcbiAgcHJpdmF0ZSBzdGF0aWMgTGlzdDogbnVtYmVyW10gPSBbXG4gICAgMzU1NjA4MyxcbiAgICA2NDMwNDQwLFxuICAgIDExNDc4OTM5LFxuICAgIDExOTQyNTAyLFxuICAgIDExODE3MDIyLFxuICAgIDE1ODk3ODg5LFxuICAgIDE1OTY4MjU5LFxuICAgIDEzODc1OTY4LFxuICAgIDg4ODU1MDQsXG4gICAgNTIyMTk2MyxcbiAgICA0ODMzOTMwLFxuICAgIDM3OTE4MjAsXG4gICAgMzkyNjc4MixcbiAgICA1MDgxNTgsXG4gICAgMzg5MTAsXG4gICAgMjI1MDQ5NFxuICBdO1xuXG4gIHB1YmxpYyBzdGF0aWMgZ2V0IFJhbmRvbSgpIHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5MaXN0O1xuICAgIHJldHVybiBsaXN0W1JhbmRvbS5SYW5nZSgwLCBsaXN0Lmxlbmd0aCAtIDEpXTtcbiAgfVxufVxuIl19