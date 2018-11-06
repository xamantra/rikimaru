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
const json2typescript_1 = require("json2typescript");
const data_model_1 = require("./data.model");
let RootPage = class RootPage {
    constructor() {
        this.DataPage = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("data", data_model_1.DataPage),
    __metadata("design:type", Object)
], RootPage.prototype, "DataPage", void 0);
RootPage = __decorate([
    json2typescript_1.JsonObject("root")
], RootPage);
exports.RootPage = RootPage;
let RootMedia = class RootMedia {
    constructor() {
        this.DataMedia = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("data", data_model_1.DataMedia),
    __metadata("design:type", Object)
], RootMedia.prototype, "DataMedia", void 0);
RootMedia = __decorate([
    json2typescript_1.JsonObject("root")
], RootMedia);
exports.RootMedia = RootMedia;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvcm9vdC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFEQUEyRDtBQUMzRCw2Q0FBbUQ7QUFJbkQsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQURyQjtRQUdTLGFBQVEsR0FBYyxTQUFTLENBQUM7SUFDekMsQ0FBQztDQUFBLENBQUE7QUFEQztJQURDLDhCQUFZLENBQUMsTUFBTSxFQUFFLHFCQUFRLENBQUM7OzBDQUNRO0FBRjVCLFFBQVE7SUFEcEIsNEJBQVUsQ0FBQyxNQUFNLENBQUM7R0FDTixRQUFRLENBR3BCO0FBSFksNEJBQVE7QUFNckIsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUR0QjtRQUdTLGNBQVMsR0FBZSxTQUFTLENBQUM7SUFDM0MsQ0FBQztDQUFBLENBQUE7QUFEQztJQURDLDhCQUFZLENBQUMsTUFBTSxFQUFFLHNCQUFTLENBQUM7OzRDQUNTO0FBRjlCLFNBQVM7SUFEckIsNEJBQVUsQ0FBQyxNQUFNLENBQUM7R0FDTixTQUFTLENBR3JCO0FBSFksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XG5pbXBvcnQgeyBEYXRhUGFnZSwgRGF0YU1lZGlhIH0gZnJvbSBcIi4vZGF0YS5tb2RlbFwiO1xuaW1wb3J0IHsgSURhdGFQYWdlLCBJRGF0YU1lZGlhIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvZGF0YS5pbnRlcmZhY2VcIjtcblxuQEpzb25PYmplY3QoXCJyb290XCIpXG5leHBvcnQgY2xhc3MgUm9vdFBhZ2Uge1xuICBASnNvblByb3BlcnR5KFwiZGF0YVwiLCBEYXRhUGFnZSlcbiAgcHVibGljIERhdGFQYWdlOiBJRGF0YVBhZ2UgPSB1bmRlZmluZWQ7XG59XG5cbkBKc29uT2JqZWN0KFwicm9vdFwiKVxuZXhwb3J0IGNsYXNzIFJvb3RNZWRpYSB7XG4gIEBKc29uUHJvcGVydHkoXCJkYXRhXCIsIERhdGFNZWRpYSlcbiAgcHVibGljIERhdGFNZWRpYTogSURhdGFNZWRpYSA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==