"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayHelper {
    static remove(array, element, callback) {
        const index = array.indexOf(element);
        let called = false;
        if (index !== -1) {
            array.splice(index, 1);
            if (!called && callback !== null) {
                called = true;
                callback();
            }
        }
    }
}
exports.ArrayHelper = ArrayHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvYXJyYXkuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFZLEVBQUUsT0FBWSxFQUFFLFFBQXFCO1FBQ3BFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDaEMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDZCxRQUFRLEVBQUUsQ0FBQzthQUNaO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7QUFaRCxrQ0FZQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcnJheUhlbHBlciB7XHJcbiAgcHVibGljIHN0YXRpYyByZW1vdmUoYXJyYXk6IGFueVtdLCBlbGVtZW50OiBhbnksIGNhbGxiYWNrPzogKCkgPT4gdm9pZCkge1xyXG4gICAgY29uc3QgaW5kZXggPSBhcnJheS5pbmRleE9mKGVsZW1lbnQpO1xyXG4gICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xyXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICBpZiAoIWNhbGxlZCAmJiBjYWxsYmFjayAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNhbGxlZCA9IHRydWU7XHJcbiAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=