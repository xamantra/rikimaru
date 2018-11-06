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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZWR1bGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmUvc2NoZWR1bGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxTQUFTO0lBQ2IsTUFBTSxDQUFDLE9BQU8sQ0FDbkIsVUFBa0IsSUFBSSxFQUN0QixVQUFrQixJQUFJLEVBQ3RCLFFBQWdCLElBQUksRUFDcEIsUUFBb0I7UUFFcEIsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksT0FBTyxLQUFLLElBQUk7WUFBRSxhQUFhLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztRQUN0RCxJQUFJLE9BQU8sS0FBSyxJQUFJO1lBQUUsYUFBYSxJQUFJLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzNELElBQUksS0FBSyxLQUFLLElBQUk7WUFBRSxhQUFhLElBQUksS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzVELFdBQVcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdkMsQ0FBQztDQUNGO0FBYkQsOEJBYUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2NoZWR1bGVyIHtcbiAgcHVibGljIHN0YXRpYyBMb29wSm9iKFxuICAgIHNlY29uZHM6IG51bWJlciA9IG51bGwsXG4gICAgbWludXRlczogbnVtYmVyID0gbnVsbCxcbiAgICBob3VyczogbnVtYmVyID0gbnVsbCxcbiAgICBjYWxsYmFjazogKCkgPT4gdm9pZFxuICApIHtcbiAgICBsZXQgdG90YWxJbnRlcnZhbCA9IDA7XG4gICAgaWYgKHNlY29uZHMgIT09IG51bGwpIHRvdGFsSW50ZXJ2YWwgKz0gc2Vjb25kcyAqIDEwMDA7XG4gICAgaWYgKG1pbnV0ZXMgIT09IG51bGwpIHRvdGFsSW50ZXJ2YWwgKz0gbWludXRlcyAqIDEwMDAgKiA2MDtcbiAgICBpZiAoaG91cnMgIT09IG51bGwpIHRvdGFsSW50ZXJ2YWwgKz0gaG91cnMgKiAxMDAwICogNjAgKiA2MDtcbiAgICBzZXRJbnRlcnZhbChjYWxsYmFjaywgdG90YWxJbnRlcnZhbCk7XG4gIH1cbn1cbiJdfQ==