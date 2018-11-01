"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random_helper_1 = require("../helpers/random.helper");
class Awaiter {
    static Send(message, timeout, callback) {
        message.channel
            .send(`**${this.FunActions[random_helper_1.Random.Range(0, this.FunActions.length - 1)]}** , please wait a moment master *${message.author.username}*.`)
            .then((m) => {
            setTimeout(() => {
                callback(m);
            }, timeout);
        })
            .catch(err => {
            console.log(err);
        });
    }
}
Awaiter.FunActions = [
    "SUMMONING UNNECESSARILY DRAMATIC ENCOUNTERS",
    "PROCEDURALLY GENERATING BUTTONS",
    "GENERATING TERRAIN...",
    "READY PLAYER ONE",
    "DID THEY JUST WAKE UP SLOWLY AND LOAD?",
    "SWITCHING SIDES",
    "DISPATCHING CARRIER PIGEONS",
    "IS THIS THING ON..?",
    "WE AT PUMPKIN HILL, YOU READY?",
    "PREPARING FINAL FORM",
    "ACTIVATING WITCH TIME...",
    "INSERTING THE COIN TO CONTINUE",
    "SPINNING TO WIN",
    "ENTERING CHEAT CODES",
    "RUSHING B",
    "PRESSING RANDOM BUTTONS",
    "RESETTING RUN",
    "REMOVING PEN FROM PINEAPPLE",
    "RESURRECTING DEAD MEMES",
    "CLICKING CIRCLES (TO THE BEAT!)",
    "BUILDING LORE",
    "WE DON'T NEED A HEALER FOR THIS, RIGHT?",
    "WUBBA LUBBA DUB DUB",
    "SCALING BANANAS",
    "LOADING AESTHETICS",
    "PREPARING FOR A TEAM FIGHT",
    "RELOADING THE R8",
    "TOP DECKING LETHAL",
    "READYING THE FELINES",
    "LEEEEEROY JENKINS!",
    "CONSTRUCTING ADDITIONAL PYLONS",
    "UNBENCHING THE KENCH",
    "RECRUITING ROBOT HAMSTERS",
    "BUFFING BEFORE THE RAID",
    "GETTING DUNKED",
    "ENSURING DANKEST MEMES"
];
exports.Awaiter = Awaiter;
//# sourceMappingURL=awaiter.js.map