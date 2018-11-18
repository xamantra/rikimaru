"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../core/config");
const json2typescript_1 = require("json2typescript");
let AniBind = class AniBind {
    constructor() {
        this.Id = undefined;
        this.AniListId = undefined;
        this.DiscordId = undefined;
        this.AniListUsername = undefined;
        this.Code = undefined;
        this.Verified = undefined;
    }
    static CodeFormat(code) {
        return `[${config_1.Config.BOT_NAME}: ${code}]`;
    }
};
__decorate([
    json2typescript_1.JsonProperty("_id", String),
    __metadata("design:type", String)
], AniBind.prototype, "Id", void 0);
__decorate([
    json2typescript_1.JsonProperty("anilist_id", Number),
    __metadata("design:type", Number)
], AniBind.prototype, "AniListId", void 0);
__decorate([
    json2typescript_1.JsonProperty("discord_id", String),
    __metadata("design:type", String)
], AniBind.prototype, "DiscordId", void 0);
__decorate([
    json2typescript_1.JsonProperty("anilist_username", String),
    __metadata("design:type", String)
], AniBind.prototype, "AniListUsername", void 0);
__decorate([
    json2typescript_1.JsonProperty("code", String),
    __metadata("design:type", String)
], AniBind.prototype, "Code", void 0);
__decorate([
    json2typescript_1.JsonProperty("verified", Boolean),
    __metadata("design:type", Boolean)
], AniBind.prototype, "Verified", void 0);
AniBind = __decorate([
    json2typescript_1.JsonObject("")
], AniBind);
exports.AniBind = AniBind;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pLmJpbmQubW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2FuaS5iaW5kLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQXdDO0FBQ3hDLHFEQUEyRDtBQUczRCxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBRHBCO1FBR1MsT0FBRSxHQUFXLFNBQVMsQ0FBQztRQUV2QixjQUFTLEdBQVcsU0FBUyxDQUFDO1FBRTlCLGNBQVMsR0FBVyxTQUFTLENBQUM7UUFFOUIsb0JBQWUsR0FBVyxTQUFTLENBQUM7UUFFcEMsU0FBSSxHQUFXLFNBQVMsQ0FBQztRQUV6QixhQUFRLEdBQVksU0FBUyxDQUFDO0lBS3ZDLENBQUM7SUFIUSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQVk7UUFDbkMsT0FBTyxJQUFJLGVBQU0sQ0FBQyxRQUFRLEtBQUssSUFBSSxHQUFHLENBQUM7SUFDekMsQ0FBQztDQUNGLENBQUE7QUFmQztJQURDLDhCQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQzs7bUNBQ0U7QUFFOUI7SUFEQyw4QkFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUM7OzBDQUNFO0FBRXJDO0lBREMsOEJBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDOzswQ0FDRTtBQUVyQztJQURDLDhCQUFZLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDOztnREFDRTtBQUUzQztJQURDLDhCQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQzs7cUNBQ0c7QUFFaEM7SUFEQyw4QkFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUM7O3lDQUNHO0FBWjFCLE9BQU87SUFEbkIsNEJBQVUsQ0FBQyxFQUFFLENBQUM7R0FDRixPQUFPLENBaUJuQjtBQWpCWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi9jb3JlL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XHJcblxyXG5ASnNvbk9iamVjdChcIlwiKVxyXG5leHBvcnQgY2xhc3MgQW5pQmluZCB7XHJcbiAgQEpzb25Qcm9wZXJ0eShcIl9pZFwiLCBTdHJpbmcpXHJcbiAgcHVibGljIElkOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImFuaWxpc3RfaWRcIiwgTnVtYmVyKVxyXG4gIHB1YmxpYyBBbmlMaXN0SWQ6IG51bWJlciA9IHVuZGVmaW5lZDtcclxuICBASnNvblByb3BlcnR5KFwiZGlzY29yZF9pZFwiLCBTdHJpbmcpXHJcbiAgcHVibGljIERpc2NvcmRJZDogc3RyaW5nID0gdW5kZWZpbmVkO1xyXG4gIEBKc29uUHJvcGVydHkoXCJhbmlsaXN0X3VzZXJuYW1lXCIsIFN0cmluZylcclxuICBwdWJsaWMgQW5pTGlzdFVzZXJuYW1lOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcImNvZGVcIiwgU3RyaW5nKVxyXG4gIHB1YmxpYyBDb2RlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XHJcbiAgQEpzb25Qcm9wZXJ0eShcInZlcmlmaWVkXCIsIEJvb2xlYW4pXHJcbiAgcHVibGljIFZlcmlmaWVkOiBib29sZWFuID0gdW5kZWZpbmVkO1xyXG5cclxuICBwdWJsaWMgc3RhdGljIENvZGVGb3JtYXQoY29kZTogc3RyaW5nKSB7XHJcbiAgICByZXR1cm4gYFske0NvbmZpZy5CT1RfTkFNRX06ICR7Y29kZX1dYDtcclxuICB9XHJcbn1cclxuIl19