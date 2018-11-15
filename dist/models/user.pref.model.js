"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserPref {
    constructor(discordId, schedType, subsSort, dmDelayMS) {
        this.discordId = discordId;
        this.schedType = schedType;
        this.subsSort = subsSort;
        this.dmDelayMS = dmDelayMS;
        if (dmDelayMS > 24) {
            dmDelayMS = 24;
        }
        if (dmDelayMS < 1) {
            dmDelayMS = 1;
        }
    }
}
exports.UserPref = UserPref;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5wcmVmLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy91c2VyLnByZWYubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLFFBQVE7SUFDbkIsWUFDUyxTQUFpQixFQUNqQixTQUErQixFQUMvQixRQUF3QixFQUN4QixTQUFpQjtRQUhqQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFFeEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLFNBQVMsR0FBRyxFQUFFLENBQUM7U0FDaEI7UUFDRCxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDakIsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQztDQUNGO0FBZEQsNEJBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXNlclByZWYge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZGlzY29yZElkOiBzdHJpbmcsXG4gICAgcHVibGljIHNjaGVkVHlwZTogXCJEYXRlXCIgfCBcIkNvdW50ZG93blwiLFxuICAgIHB1YmxpYyBzdWJzU29ydDogXCJBU0NcIiB8IFwiREVTQ1wiLFxuICAgIHB1YmxpYyBkbURlbGF5TVM6IG51bWJlclxuICApIHtcbiAgICBpZiAoZG1EZWxheU1TID4gMjQpIHtcbiAgICAgIGRtRGVsYXlNUyA9IDI0O1xuICAgIH1cbiAgICBpZiAoZG1EZWxheU1TIDwgMSkge1xuICAgICAgZG1EZWxheU1TID0gMTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==