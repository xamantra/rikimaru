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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvYXJyYXkuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFZLEVBQUUsT0FBWSxFQUFFLFFBQXFCO1FBQ3BFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtnQkFDaEMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDZCxRQUFRLEVBQUUsQ0FBQzthQUNaO1NBQ0Y7SUFDSCxDQUFDO0NBQ0Y7QUFaRCxrQ0FZQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcnJheUhlbHBlciB7XG4gIHB1YmxpYyBzdGF0aWMgcmVtb3ZlKGFycmF5OiBhbnlbXSwgZWxlbWVudDogYW55LCBjYWxsYmFjaz86ICgpID0+IHZvaWQpIHtcbiAgICBjb25zdCBpbmRleCA9IGFycmF5LmluZGV4T2YoZWxlbWVudCk7XG4gICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICBpZiAoIWNhbGxlZCAmJiBjYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19