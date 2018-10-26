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
//# sourceMappingURL=result.mysql.model.js.map