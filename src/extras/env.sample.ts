import { IFirebaseConfig } from "../interfaces/firebase.config.interface";
// tslint:disable-next-line:class-name
export class env {
  public static BOT_TOKEN =
    "ThisisAbotToken.bareWithme.IhackedDiscord.aWhileagoLikeaBoss";
  public static COMMAND_PREFIX = "-";
  public static MONGO_BASE = "mongodb://localhost:27017/";
  public static MONGO_DATABASE = "rikimaru";
  public static MAL_PROFILE_BASE = "https://myanimelist.net/profile/";
  public static MAL_CW_BASE = "https://myanimelist.net/animelist";
  public static FirebaseConfig: IFirebaseConfig = {
    apiKey: "thisisafirebaseapikey",
    authDomain: "app-name-here.firebaseapp.com",
    databaseURL: "https://app-name-here.firebaseio.com",
    projectId: "app-name-here",
    storageBucket: "app-name-here.appspot.com",
    messagingSenderId: "9999999999999"
  };
}
