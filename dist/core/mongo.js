"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const mongodb_1 = __importDefault(require("mongodb"));
class Mongo {
    static Connect() {
        return new Promise((resolve, reject) => {
            const url = config_1.Config.MONGO_BASE;
            mongodb_1.default.connect(url, { useNewUrlParser: true }, function (err, db) {
                if (err)
                    console.log(err);
                else
                    resolve(db);
            });
        });
    }
    static FindAll(table, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table)
                    .find({})
                    .toArray(function (err, res) {
                    if (err)
                        console.log(err);
                    else {
                        if (callback !== null && callback !== undefined)
                            callback(res);
                        resolve(res);
                    }
                });
            });
        });
    }
    static FindOne(table, query, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table)
                    .find(query)
                    .toArray(function (err, res) {
                    if (err)
                        console.log(err);
                    else {
                        if (callback !== null && callback !== undefined)
                            callback(res);
                        resolve(res);
                    }
                });
            });
        });
    }
    static Insert(table, data, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table).insertOne(data, function (err, res) {
                    if (err)
                        console.log(err);
                    else {
                        if (callback !== null && callback !== undefined)
                            callback(res);
                        resolve(res);
                    }
                });
            });
        });
    }
    static Delete(table, query, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table).deleteOne(query, function (err, obj) {
                    if (err)
                        console.log(err);
                    else {
                        if (callback !== null && callback !== undefined)
                            callback();
                        resolve();
                    }
                });
            });
        });
    }
    static Update(table, query, $set, callback) {
        return new Promise((resolve, reject) => {
            this.Connect().then(client => {
                const db = client.db(config_1.Config.MONGO_DATABASE);
                db.collection(table).updateOne(query, $set, function (err, res) {
                    if (err)
                        console.log(err);
                    else {
                        if (callback !== null && callback !== undefined)
                            callback(res);
                        resolve(res);
                    }
                });
            });
        });
    }
}
exports.Mongo = Mongo;
//# sourceMappingURL=mongo.js.map