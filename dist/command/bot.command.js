"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./../core/enums");
class BotCommand {
    constructor(Name, Description, ParameterRequired, CanHaveMention, ResponseType, Cooldown, Function, Example, DevOnly = false) {
        this.Name = Name;
        this.Description = Description;
        this.ParameterRequired = ParameterRequired;
        this.CanHaveMention = CanHaveMention;
        this.ResponseType = ResponseType;
        this.Cooldown = Cooldown;
        this.Function = Function;
        this.Example = Example;
        this.DevOnly = DevOnly;
        this.DirectMessage = false;
        switch (this.ResponseType) {
            case enums_1.Response.ChannelReply:
                this.DirectMessage = false;
                break;
            case enums_1.Response.DirectMessage:
                this.DirectMessage = true;
                break;
            default:
                break;
        }
        if (this.DirectMessage) {
            this.Description += "\nIt DMs you with the response.";
        }
        if (!this.ParameterRequired) {
            this.Description += "\nNo Parameters.";
        }
        else {
            this.Description += "\nParameter is required.";
        }
        this.Description += "\n.";
    }
}
exports.BotCommand = BotCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZC9ib3QuY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDJDQUEyQztBQUUzQyxNQUFhLFVBQVU7SUFHckIsWUFDUyxJQUFZLEVBQ1osV0FBbUIsRUFDbkIsaUJBQTBCLEVBQzFCLGNBQXVCLEVBQ3RCLFlBQXNCLEVBQ3ZCLFFBQWdCLEVBQ2hCLFFBQTBCLEVBQzFCLE9BQXlCLEVBQ3pCLFVBQW1CLEtBQUs7UUFSeEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBUztRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUN2QixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBWDFCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBYTNCLFFBQVEsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN6QixLQUFLLGdCQUFRLENBQUMsWUFBWTtnQkFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLGdCQUFRLENBQUMsYUFBYTtnQkFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsSUFBSSxpQ0FBaUMsQ0FBQztTQUN2RDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsQ0FBQztTQUN4QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsSUFBSSwwQkFBMEIsQ0FBQztTQUNoRDtRQUNELElBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQW5DRCxnQ0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcbmltcG9ydCB7IElDb21tYW5kRXhhbXBsZSB9IGZyb20gXCIuLy4uL2ludGVyZmFjZXMvY29tbWFuZC5leGFtcGxlLmludGVyZmFjZVwiO1xuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiLi8uLi9jb3JlL2VudW1zXCI7XG5cbmV4cG9ydCBjbGFzcyBCb3RDb21tYW5kIHtcbiAgcHVibGljIERpcmVjdE1lc3NhZ2UgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgTmFtZTogc3RyaW5nLFxuICAgIHB1YmxpYyBEZXNjcmlwdGlvbjogc3RyaW5nLFxuICAgIHB1YmxpYyBQYXJhbWV0ZXJSZXF1aXJlZDogYm9vbGVhbixcbiAgICBwdWJsaWMgQ2FuSGF2ZU1lbnRpb246IGJvb2xlYW4sXG4gICAgcHJpdmF0ZSBSZXNwb25zZVR5cGU6IFJlc3BvbnNlLFxuICAgIHB1YmxpYyBDb29sZG93bjogbnVtYmVyLFxuICAgIHB1YmxpYyBGdW5jdGlvbjogSUNvbW1hbmRGdW5jdGlvbixcbiAgICBwdWJsaWMgRXhhbXBsZT86IElDb21tYW5kRXhhbXBsZSxcbiAgICBwdWJsaWMgRGV2T25seTogYm9vbGVhbiA9IGZhbHNlXG4gICkge1xuICAgIHN3aXRjaCAodGhpcy5SZXNwb25zZVR5cGUpIHtcbiAgICAgIGNhc2UgUmVzcG9uc2UuQ2hhbm5lbFJlcGx5OlxuICAgICAgICB0aGlzLkRpcmVjdE1lc3NhZ2UgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFJlc3BvbnNlLkRpcmVjdE1lc3NhZ2U6XG4gICAgICAgIHRoaXMuRGlyZWN0TWVzc2FnZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuRGlyZWN0TWVzc2FnZSkge1xuICAgICAgdGhpcy5EZXNjcmlwdGlvbiArPSBcIlxcbkl0IERNcyB5b3Ugd2l0aCB0aGUgcmVzcG9uc2UuXCI7XG4gICAgfVxuICAgIGlmICghdGhpcy5QYXJhbWV0ZXJSZXF1aXJlZCkge1xuICAgICAgdGhpcy5EZXNjcmlwdGlvbiArPSBcIlxcbk5vIFBhcmFtZXRlcnMuXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuRGVzY3JpcHRpb24gKz0gXCJcXG5QYXJhbWV0ZXIgaXMgcmVxdWlyZWQuXCI7XG4gICAgfVxuICAgIHRoaXMuRGVzY3JpcHRpb24gKz0gXCJcXG4uXCI7XG4gIH1cbn1cbiJdfQ==