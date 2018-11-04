"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserPref {
    constructor(discordId, schedType, subsSort, remindInH) {
        this.discordId = discordId;
        this.schedType = schedType;
        this.subsSort = subsSort;
        this.remindInH = remindInH;
        if (remindInH > 24) {
            remindInH = 24;
        }
        if (remindInH < 1) {
            remindInH = 1;
        }
    }
}
exports.UserPref = UserPref;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5wcmVmLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy91c2VyLnByZWYubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLFFBQVE7SUFDbkIsWUFDUyxTQUFpQixFQUNqQixTQUErQixFQUMvQixRQUF3QixFQUN4QixTQUFpQjtRQUhqQixjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQWdCO1FBQ3hCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFFeEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxFQUFFO1lBQ2xCLFNBQVMsR0FBRyxFQUFFLENBQUM7U0FDaEI7UUFDRCxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDakIsU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNmO0lBQ0gsQ0FBQztDQUNGO0FBZEQsNEJBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVXNlclByZWYge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGRpc2NvcmRJZDogc3RyaW5nLFxyXG4gICAgcHVibGljIHNjaGVkVHlwZTogXCJEYXRlXCIgfCBcIkNvdW50ZG93blwiLFxyXG4gICAgcHVibGljIHN1YnNTb3J0OiBcIkFTQ1wiIHwgXCJERVNDXCIsXHJcbiAgICBwdWJsaWMgcmVtaW5kSW5IOiBudW1iZXJcclxuICApIHtcclxuICAgIGlmIChyZW1pbmRJbkggPiAyNCkge1xyXG4gICAgICByZW1pbmRJbkggPSAyNDtcclxuICAgIH1cclxuICAgIGlmIChyZW1pbmRJbkggPCAxKSB7XHJcbiAgICAgIHJlbWluZEluSCA9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==