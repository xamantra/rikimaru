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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZC9ib3QuY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDJDQUEyQztBQUUzQyxNQUFhLFVBQVU7SUFHckIsWUFDUyxJQUFZLEVBQ1osV0FBbUIsRUFDbkIsaUJBQTBCLEVBQzFCLGNBQXVCLEVBQ3RCLFlBQXNCLEVBQ3ZCLFFBQWdCLEVBQ2hCLFFBQTBCLEVBQzFCLE9BQXlCLEVBQ3pCLFVBQW1CLEtBQUs7UUFSeEIsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUztRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBUztRQUN0QixpQkFBWSxHQUFaLFlBQVksQ0FBVTtRQUN2QixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzFCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBWDFCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBYTNCLFFBQVEsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN6QixLQUFLLGdCQUFRLENBQUMsWUFBWTtnQkFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQzNCLE1BQU07WUFDUixLQUFLLGdCQUFRLENBQUMsYUFBYTtnQkFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLFdBQVcsSUFBSSxpQ0FBaUMsQ0FBQztTQUN2RDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLFdBQVcsSUFBSSxrQkFBa0IsQ0FBQztTQUN4QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFdBQVcsSUFBSSwwQkFBMEIsQ0FBQztTQUNoRDtRQUNELElBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO0lBQzVCLENBQUM7Q0FDRjtBQW5DRCxnQ0FtQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQ29tbWFuZEZ1bmN0aW9uIH0gZnJvbSBcIi4uL2ludGVyZmFjZXMvY29tbWFuZC5mdW5jdGlvbi5pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHsgSUNvbW1hbmRFeGFtcGxlIH0gZnJvbSBcIi4vLi4vaW50ZXJmYWNlcy9jb21tYW5kLmV4YW1wbGUuaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7IFJlc3BvbnNlIH0gZnJvbSBcIi4vLi4vY29yZS9lbnVtc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJvdENvbW1hbmQge1xyXG4gIHB1YmxpYyBEaXJlY3RNZXNzYWdlID0gZmFsc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIE5hbWU6IHN0cmluZyxcclxuICAgIHB1YmxpYyBEZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgcHVibGljIFBhcmFtZXRlclJlcXVpcmVkOiBib29sZWFuLFxyXG4gICAgcHVibGljIENhbkhhdmVNZW50aW9uOiBib29sZWFuLFxyXG4gICAgcHJpdmF0ZSBSZXNwb25zZVR5cGU6IFJlc3BvbnNlLFxyXG4gICAgcHVibGljIENvb2xkb3duOiBudW1iZXIsXHJcbiAgICBwdWJsaWMgRnVuY3Rpb246IElDb21tYW5kRnVuY3Rpb24sXHJcbiAgICBwdWJsaWMgRXhhbXBsZT86IElDb21tYW5kRXhhbXBsZSxcclxuICAgIHB1YmxpYyBEZXZPbmx5OiBib29sZWFuID0gZmFsc2VcclxuICApIHtcclxuICAgIHN3aXRjaCAodGhpcy5SZXNwb25zZVR5cGUpIHtcclxuICAgICAgY2FzZSBSZXNwb25zZS5DaGFubmVsUmVwbHk6XHJcbiAgICAgICAgdGhpcy5EaXJlY3RNZXNzYWdlID0gZmFsc2U7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgUmVzcG9uc2UuRGlyZWN0TWVzc2FnZTpcclxuICAgICAgICB0aGlzLkRpcmVjdE1lc3NhZ2UgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLkRpcmVjdE1lc3NhZ2UpIHtcclxuICAgICAgdGhpcy5EZXNjcmlwdGlvbiArPSBcIlxcbkl0IERNcyB5b3Ugd2l0aCB0aGUgcmVzcG9uc2UuXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuUGFyYW1ldGVyUmVxdWlyZWQpIHtcclxuICAgICAgdGhpcy5EZXNjcmlwdGlvbiArPSBcIlxcbk5vIFBhcmFtZXRlcnMuXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLkRlc2NyaXB0aW9uICs9IFwiXFxuUGFyYW1ldGVyIGlzIHJlcXVpcmVkLlwiO1xyXG4gICAgfVxyXG4gICAgdGhpcy5EZXNjcmlwdGlvbiArPSBcIlxcbi5cIjtcclxuICB9XHJcbn1cclxuIl19