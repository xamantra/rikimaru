"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Scheduler {
    static LoopJob(seconds = null, minutes = null, hours = null, callback) {
        let totalInterval = 0;
        if (seconds !== null)
            totalInterval += seconds * 1000;
        if (minutes !== null)
            totalInterval += minutes * 1000 * 60;
        if (hours !== null)
            totalInterval += hours * 1000 * 60 * 60;
        setInterval(callback, totalInterval);
    }
}
exports.Scheduler = Scheduler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvc2NoZWR1bGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxTQUFTO0lBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FDbkIsVUFBa0IsSUFBSSxFQUN0QixVQUFrQixJQUFJLEVBQ3RCLFFBQWdCLElBQUksRUFDcEIsUUFBb0I7UUFFcEIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksT0FBTyxLQUFLLElBQUk7WUFBRSxhQUFhLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztRQUN0RCxJQUFJLE9BQU8sS0FBSyxJQUFJO1lBQUUsYUFBYSxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzNELElBQUksS0FBSyxLQUFLLElBQUk7WUFBRSxhQUFhLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzVELFdBQVcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGO0FBYkQsOEJBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2NoZWR1bGVyIHtcclxuICBwdWJsaWMgc3RhdGljIExvb3BKb2IoXHJcbiAgICBzZWNvbmRzOiBudW1iZXIgPSBudWxsLFxyXG4gICAgbWludXRlczogbnVtYmVyID0gbnVsbCxcclxuICAgIGhvdXJzOiBudW1iZXIgPSBudWxsLFxyXG4gICAgY2FsbGJhY2s6ICgpID0+IHZvaWRcclxuICApIHtcclxuICAgIGxldCB0b3RhbEludGVydmFsID0gMDtcclxuICAgIGlmIChzZWNvbmRzICE9PSBudWxsKSB0b3RhbEludGVydmFsICs9IHNlY29uZHMgKiAxMDAwO1xyXG4gICAgaWYgKG1pbnV0ZXMgIT09IG51bGwpIHRvdGFsSW50ZXJ2YWwgKz0gbWludXRlcyAqIDEwMDAgKiA2MDtcclxuICAgIGlmIChob3VycyAhPT0gbnVsbCkgdG90YWxJbnRlcnZhbCArPSBob3VycyAqIDEwMDAgKiA2MCAqIDYwO1xyXG4gICAgc2V0SW50ZXJ2YWwoY2FsbGJhY2ssIHRvdGFsSW50ZXJ2YWwpO1xyXG4gIH1cclxufVxyXG4iXX0=