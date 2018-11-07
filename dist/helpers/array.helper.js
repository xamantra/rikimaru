"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayHelper {
    static remove(array, element, callback) {
        const index = array.indexOf(element);
        let called = false;
        if (index > -1) {
            array.splice(index, 1);
            if (!called && callback !== null) {
                called = true;
                callback();
            }
        }
    }
}
exports.ArrayHelper = ArrayHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXkuaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvYXJyYXkuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBYSxXQUFXO0lBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFZLEVBQUUsT0FBWSxFQUFFLFFBQXFCO1FBQ3BFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO2dCQUNoQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2dCQUNkLFFBQVEsRUFBRSxDQUFDO2FBQ1o7U0FDRjtJQUNILENBQUM7Q0FDRjtBQVpELGtDQVlDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIEFycmF5SGVscGVyIHtcbiAgcHVibGljIHN0YXRpYyByZW1vdmUoYXJyYXk6IGFueVtdLCBlbGVtZW50OiBhbnksIGNhbGxiYWNrPzogKCkgPT4gdm9pZCkge1xuICAgIGNvbnN0IGluZGV4ID0gYXJyYXkuaW5kZXhPZihlbGVtZW50KTtcbiAgICBsZXQgY2FsbGVkID0gZmFsc2U7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG4gICAgICBpZiAoIWNhbGxlZCAmJiBjYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl19