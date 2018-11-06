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
let MySqlResult = class MySqlResult {
    constructor() {
        this.FieldCount = undefined;
        this.AffectedRows = undefined;
        this.InsertId = undefined;
        this.ServerStatus = undefined;
        this.WarningCount = undefined;
        this.message = undefined;
        this.Protocol41 = undefined;
        this.ChangedRows = undefined;
    }
};
__decorate([
    json2typescript_1.JsonProperty("fieldCount", Number),
    __metadata("design:type", Number)
], MySqlResult.prototype, "FieldCount", void 0);
__decorate([
    json2typescript_1.JsonProperty("affectedRows", Number),
    __metadata("design:type", Number)
], MySqlResult.prototype, "AffectedRows", void 0);
__decorate([
    json2typescript_1.JsonProperty("insertId", Number),
    __metadata("design:type", Number)
], MySqlResult.prototype, "InsertId", void 0);
__decorate([
    json2typescript_1.JsonProperty("serverStatus", Number),
    __metadata("design:type", Number)
], MySqlResult.prototype, "ServerStatus", void 0);
__decorate([
    json2typescript_1.JsonProperty("warningCount", Number),
    __metadata("design:type", Number)
], MySqlResult.prototype, "WarningCount", void 0);
__decorate([
    json2typescript_1.JsonProperty("message", String),
    __metadata("design:type", String)
], MySqlResult.prototype, "message", void 0);
__decorate([
    json2typescript_1.JsonProperty("protocol41", Boolean),
    __metadata("design:type", Boolean)
], MySqlResult.prototype, "Protocol41", void 0);
__decorate([
    json2typescript_1.JsonProperty("changedRows", Number),
    __metadata("design:type", Number)
], MySqlResult.prototype, "ChangedRows", void 0);
MySqlResult = __decorate([
    json2typescript_1.JsonObject("")
], MySqlResult);
exports.MySqlResult = MySqlResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0Lm15c3FsLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9yZXN1bHQubXlzcWwubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxREFBMkQ7QUFHM0QsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUR4QjtRQUdTLGVBQVUsR0FBVyxTQUFTLENBQUM7UUFFL0IsaUJBQVksR0FBVyxTQUFTLENBQUM7UUFFakMsYUFBUSxHQUFXLFNBQVMsQ0FBQztRQUU3QixpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUVqQyxpQkFBWSxHQUFXLFNBQVMsQ0FBQztRQUVqQyxZQUFPLEdBQVcsU0FBUyxDQUFDO1FBRTVCLGVBQVUsR0FBWSxTQUFTLENBQUM7UUFFaEMsZ0JBQVcsR0FBVyxTQUFTLENBQUM7SUFDekMsQ0FBQztDQUFBLENBQUE7QUFmQztJQURDLDhCQUFZLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQzs7K0NBQ0c7QUFFdEM7SUFEQyw4QkFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7O2lEQUNHO0FBRXhDO0lBREMsOEJBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDOzs2Q0FDRztBQUVwQztJQURDLDhCQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzs7aURBQ0c7QUFFeEM7SUFEQyw4QkFBWSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUM7O2lEQUNHO0FBRXhDO0lBREMsOEJBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDOzs0Q0FDRztBQUVuQztJQURDLDhCQUFZLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQzs7K0NBQ0c7QUFFdkM7SUFEQyw4QkFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUM7O2dEQUNHO0FBaEI1QixXQUFXO0lBRHZCLDRCQUFVLENBQUMsRUFBRSxDQUFDO0dBQ0YsV0FBVyxDQWlCdkI7QUFqQlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uUHJvcGVydHkgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XG5cbkBKc29uT2JqZWN0KFwiXCIpXG5leHBvcnQgY2xhc3MgTXlTcWxSZXN1bHQge1xuICBASnNvblByb3BlcnR5KFwiZmllbGRDb3VudFwiLCBOdW1iZXIpXG4gIHB1YmxpYyBGaWVsZENvdW50OiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJhZmZlY3RlZFJvd3NcIiwgTnVtYmVyKVxuICBwdWJsaWMgQWZmZWN0ZWRSb3dzOiBudW1iZXIgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJpbnNlcnRJZFwiLCBOdW1iZXIpXG4gIHB1YmxpYyBJbnNlcnRJZDogbnVtYmVyID0gdW5kZWZpbmVkO1xuICBASnNvblByb3BlcnR5KFwic2VydmVyU3RhdHVzXCIsIE51bWJlcilcbiAgcHVibGljIFNlcnZlclN0YXR1czogbnVtYmVyID0gdW5kZWZpbmVkO1xuICBASnNvblByb3BlcnR5KFwid2FybmluZ0NvdW50XCIsIE51bWJlcilcbiAgcHVibGljIFdhcm5pbmdDb3VudDogbnVtYmVyID0gdW5kZWZpbmVkO1xuICBASnNvblByb3BlcnR5KFwibWVzc2FnZVwiLCBTdHJpbmcpXG4gIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgPSB1bmRlZmluZWQ7XG4gIEBKc29uUHJvcGVydHkoXCJwcm90b2NvbDQxXCIsIEJvb2xlYW4pXG4gIHB1YmxpYyBQcm90b2NvbDQxOiBib29sZWFuID0gdW5kZWZpbmVkO1xuICBASnNvblByb3BlcnR5KFwiY2hhbmdlZFJvd3NcIiwgTnVtYmVyKVxuICBwdWJsaWMgQ2hhbmdlZFJvd3M6IG51bWJlciA9IHVuZGVmaW5lZDtcbn1cbiJdfQ==