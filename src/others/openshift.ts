import { Express } from "express";
import express = require("express");

export class OpenShiftUptimer {
  private static express_app: Express;
  private static logger_enabled: boolean = false;

  private static LogMessage(message: string): void {
    if (OpenShiftUptimer.logger_enabled) {
      console.log(message);
    }
  }

  public static AutoConfigure(): Promise<{}> {
    return new Promise((resolve, reject) => {
      OpenShiftUptimer.express_app = express();
      var ipaddress: string = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
      var port: any = process.env.OPENSHIFT_NODEJS_PORT || 8080;
      OpenShiftUptimer.express_app.listen(port, ipaddress, () => {
        OpenShiftUptimer.LogMessage(
          "[openshift_uptimer Express] Ready! IP=" +
            ipaddress +
            ", port=" +
            port
        );
      });
      OpenShiftUptimer.SetUptimeRoute("/uptime_route");
      resolve(true);
    });
  }

  private static GetExpress(): any {
    return OpenShiftUptimer.express_app;
  }

  private static SetExpress(app: any): void {
    OpenShiftUptimer.express_app = app;
  }

  private static SetUptimeRoute(path: string): void {
    OpenShiftUptimer.express_app.get(path, function(req: any, res: any): void {
      res.send("Uptime OK!");
    });
  }

  public static Log(status: boolean): void {
    OpenShiftUptimer.logger_enabled = status;
  }
}
