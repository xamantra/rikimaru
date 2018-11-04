"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const json2typescript_1 = require("json2typescript");
class JsonHelper {
    static get Converter() {
        const jsonConvert = new json2typescript_1.JsonConvert();
        jsonConvert.ignorePrimitiveChecks = false;
        jsonConvert.valueCheckingMode = json2typescript_1.ValueCheckingMode.ALLOW_NULL;
        return jsonConvert;
    }
    static Convert(json, t) {
        return new Promise((resolve, reject) => {
            const jsonString = JSON.stringify(json);
            const result = this.Converter.deserialize(JSON.parse(jsonString), t);
            if (result === null || result === undefined) {
                reject(new Error(`"Convert<T>(json: any, t: any)" : Cannot deserialize the result.`));
            }
            else {
                resolve(result);
            }
        });
    }
    static ArrayConvert(json, t) {
        return new Promise((resolve, reject) => {
            const jsonString = JSON.stringify(json);
            const result = this.Converter.deserialize(JSON.parse(jsonString), t);
            if (result === null || result === undefined) {
                reject(new Error(`"Convert<T>(json: any, t: any)" : Cannot deserialize the result.`));
            }
            else {
                resolve(result);
            }
        });
    }
}
exports.JsonHelper = JsonHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9qc29uLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUFpRTtBQUVqRSxNQUFhLFVBQVU7SUFDZCxNQUFNLEtBQUssU0FBUztRQUN6QixNQUFNLFdBQVcsR0FBRyxJQUFJLDZCQUFXLEVBQUUsQ0FBQztRQUN0QyxXQUFXLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxtQ0FBaUIsQ0FBQyxVQUFVLENBQUM7UUFDN0QsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQUksSUFBUyxFQUFFLENBQU07UUFDeEMsT0FBTyxJQUFJLE9BQU8sQ0FBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQzNDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDLENBQUM7YUFDdkY7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLE1BQVcsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLFlBQVksQ0FBSSxJQUFTLEVBQUUsQ0FBTTtRQUM3QyxPQUFPLElBQUksT0FBTyxDQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzFDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDM0MsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUMsQ0FBQzthQUN2RjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsTUFBYSxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQS9CRCxnQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uQ29udmVydCwgVmFsdWVDaGVja2luZ01vZGUgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbkhlbHBlciB7XHJcbiAgcHVibGljIHN0YXRpYyBnZXQgQ29udmVydGVyKCkge1xyXG4gICAgY29uc3QganNvbkNvbnZlcnQgPSBuZXcgSnNvbkNvbnZlcnQoKTtcclxuICAgIGpzb25Db252ZXJ0Lmlnbm9yZVByaW1pdGl2ZUNoZWNrcyA9IGZhbHNlO1xyXG4gICAganNvbkNvbnZlcnQudmFsdWVDaGVja2luZ01vZGUgPSBWYWx1ZUNoZWNraW5nTW9kZS5BTExPV19OVUxMO1xyXG4gICAgcmV0dXJuIGpzb25Db252ZXJ0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBDb252ZXJ0PFQ+KGpzb246IGFueSwgdDogYW55KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuQ29udmVydGVyLmRlc2VyaWFsaXplKEpTT04ucGFyc2UoanNvblN0cmluZyksIHQpO1xyXG4gICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgXCJDb252ZXJ0PFQ+KGpzb246IGFueSwgdDogYW55KVwiIDogQ2Fubm90IGRlc2VyaWFsaXplIHRoZSByZXN1bHQuYCkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUocmVzdWx0IGFzIFQpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgQXJyYXlDb252ZXJ0PFQ+KGpzb246IGFueSwgdDogYW55KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VFtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcclxuICAgICAgY29uc3QgcmVzdWx0ID0gdGhpcy5Db252ZXJ0ZXIuZGVzZXJpYWxpemUoSlNPTi5wYXJzZShqc29uU3RyaW5nKSwgdCk7XHJcbiAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZWplY3QobmV3IEVycm9yKGBcIkNvbnZlcnQ8VD4oanNvbjogYW55LCB0OiBhbnkpXCIgOiBDYW5ub3QgZGVzZXJpYWxpemUgdGhlIHJlc3VsdC5gKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQgYXMgVFtdKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==