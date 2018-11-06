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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi5oZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9qc29uLmhlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUFpRTtBQUVqRSxNQUFhLFVBQVU7SUFDZCxNQUFNLEtBQUssU0FBUztRQUN6QixNQUFNLFdBQVcsR0FBRyxJQUFJLDZCQUFXLEVBQUUsQ0FBQztRQUN0QyxXQUFXLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1FBQzFDLFdBQVcsQ0FBQyxpQkFBaUIsR0FBRyxtQ0FBaUIsQ0FBQyxVQUFVLENBQUM7UUFDN0QsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVNLE1BQU0sQ0FBQyxPQUFPLENBQUksSUFBUyxFQUFFLENBQU07UUFDeEMsT0FBTyxJQUFJLE9BQU8sQ0FBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQzNDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDLENBQUM7YUFDdkY7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLE1BQVcsQ0FBQyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLFlBQVksQ0FBSSxJQUFTLEVBQUUsQ0FBTTtRQUM3QyxPQUFPLElBQUksT0FBTyxDQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzFDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDM0MsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUMsQ0FBQzthQUN2RjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsTUFBYSxDQUFDLENBQUM7YUFDeEI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQS9CRCxnQ0ErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBKc29uQ29udmVydCwgVmFsdWVDaGVja2luZ01vZGUgfSBmcm9tIFwianNvbjJ0eXBlc2NyaXB0XCI7XG5cbmV4cG9ydCBjbGFzcyBKc29uSGVscGVyIHtcbiAgcHVibGljIHN0YXRpYyBnZXQgQ29udmVydGVyKCkge1xuICAgIGNvbnN0IGpzb25Db252ZXJ0ID0gbmV3IEpzb25Db252ZXJ0KCk7XG4gICAganNvbkNvbnZlcnQuaWdub3JlUHJpbWl0aXZlQ2hlY2tzID0gZmFsc2U7XG4gICAganNvbkNvbnZlcnQudmFsdWVDaGVja2luZ01vZGUgPSBWYWx1ZUNoZWNraW5nTW9kZS5BTExPV19OVUxMO1xuICAgIHJldHVybiBqc29uQ29udmVydDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgQ29udmVydDxUPihqc29uOiBhbnksIHQ6IGFueSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoanNvbik7XG4gICAgICBjb25zdCByZXN1bHQgPSB0aGlzLkNvbnZlcnRlci5kZXNlcmlhbGl6ZShKU09OLnBhcnNlKGpzb25TdHJpbmcpLCB0KTtcbiAgICAgIGlmIChyZXN1bHQgPT09IG51bGwgfHwgcmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihgXCJDb252ZXJ0PFQ+KGpzb246IGFueSwgdDogYW55KVwiIDogQ2Fubm90IGRlc2VyaWFsaXplIHRoZSByZXN1bHQuYCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQgYXMgVCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIEFycmF5Q29udmVydDxUPihqc29uOiBhbnksIHQ6IGFueSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuQ29udmVydGVyLmRlc2VyaWFsaXplKEpTT04ucGFyc2UoanNvblN0cmluZyksIHQpO1xuICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCB8fCByZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZWplY3QobmV3IEVycm9yKGBcIkNvbnZlcnQ8VD4oanNvbjogYW55LCB0OiBhbnkpXCIgOiBDYW5ub3QgZGVzZXJpYWxpemUgdGhlIHJlc3VsdC5gKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBUW10pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=