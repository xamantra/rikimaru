"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseMessage {
    constructor($Id, $Color, $Thumbnail, $Title, $Type, $Status, $Current, $Countdown = null, $UpdatedAt, $StartDate, $EndDate) {
        this.Countdown = null;
        this.Id = $Id;
        this.Color = $Color;
        this.Thumbnail = $Thumbnail;
        this.Title = $Title;
        this.Type = $Type;
        this.Status = $Status;
        this.Current = $Current;
        this.Countdown = $Countdown;
        this.UpdatedAt = $UpdatedAt;
        this.StartDate = $StartDate;
        this.EndDate = $EndDate;
    }
}
exports.ResponseMessage = ResponseMessage;
//# sourceMappingURL=response.message.model.js.map