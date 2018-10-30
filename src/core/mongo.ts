import { Config } from "./config";
import MongoClient from "mongodb";

export class Mongo {
  public static Connect() {
    return new Promise<MongoClient.MongoClient>((resolve, reject) => {
      const url = Config.MONGO_BASE;
      MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, db) {
          if (err) console.log(err);
          else resolve(db);
        }
      );
    });
  }

  public static FindAll(table: string, callback?: (result: any) => void) {
    return new Promise((resolve, reject) => {
      this.Connect().then(client => {
        const db = client.db(Config.MONGO_DATABASE);
        db.collection(table)
          .find({})
          .toArray(function(err, res) {
            if (err) console.log(err);
            else {
              if (callback !== null && callback !== undefined) callback(res);
              resolve(res);
            }
          });
      });
    });
  }

  public static FindOne(
    table: string,
    query: object,
    callback?: (result: any) => void
  ) {
    return new Promise((resolve, reject) => {
      this.Connect().then(client => {
        const db = client.db(Config.MONGO_DATABASE);
        db.collection(table)
          .find(query)
          .toArray(function(err, res) {
            if (err) console.log(err);
            else {
              if (callback !== null && callback !== undefined) callback(res);
              resolve(res);
            }
          });
      });
    });
  }

  public static Insert(
    table: string,
    data: object,
    callback?: (result: any) => void
  ) {
    return new Promise<any>((resolve, reject) => {
      this.Connect().then(client => {
        const db = client.db(Config.MONGO_DATABASE);
        db.collection(table).insertOne(data, function(err, res) {
          if (err) console.log(err);
          else {
            if (callback !== null && callback !== undefined) callback(res);
            resolve(res);
          }
        });
      });
    });
  }

  public static Delete(table: string, query: object, callback?: () => void) {
    return new Promise((resolve, reject) => {
      this.Connect().then(client => {
        const db = client.db(Config.MONGO_DATABASE);
        db.collection(table).deleteOne(query, function(err, obj) {
          if (err) console.log(err);
          else {
            if (callback !== null && callback !== undefined) callback();
            resolve();
          }
        });
      });
    });
  }

  public static Update(
    table: string,
    query: object,
    $set: object,
    callback?: (result: any) => void
  ) {
    return new Promise<any>((resolve, reject) => {
      this.Connect().then(client => {
        const db = client.db(Config.MONGO_DATABASE);
        db.collection(table).updateOne(query, $set, function(err, res) {
          if (err) console.log(err);
          else {
            if (callback !== null && callback !== undefined) callback(res);
            resolve(res);
          }
        });
      });
    });
  }
}
