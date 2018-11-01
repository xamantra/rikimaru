"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseMessage {
    constructor($Id, $Color, $Thumbnail, $Title, $Type, $Status, $TotalEps = null, $Current, $Countdown = null, $UpdatedAt, $StartDate, $EndDate) {
        this.TotalEps = null;
        this.Countdown = null;
        this.Id = $Id;
        this.Color = $Color;
        this.Thumbnail = $Thumbnail;
        this.Title = $Title;
        this.Type = $Type;
        this.Status = $Status;
        this.TotalEps = $TotalEps;
        this.Current = $Current;
        this.Countdown = $Countdown;
        this.UpdatedAt = $UpdatedAt;
        this.StartDate = $StartDate;
        this.EndDate = $EndDate;
    }
}
exports.ResponseMessage = ResponseMessage;
//# sourceMappingURL=response.message.model.js.map