"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class OpenShiftUptimer {
    static LogMessage(message) {
        if (OpenShiftUptimer.logger_enabled) {
            console.log(message);
        }
    }
    static AutoConfigure() {
        return new Promise((resolve, reject) => {
            OpenShiftUptimer.express_app = express();
            var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
            var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
            OpenShiftUptimer.express_app.listen(port, ipaddress, () => {
                OpenShiftUptimer.LogMessage("[openshift_uptimer Express] Ready! IP=" +
                    ipaddress +
                    ", port=" +
                    port);
            });
            OpenShiftUptimer.SetUptimeRoute("/uptime_route");
            resolve(true);
        });
    }
    static GetExpress() {
        return OpenShiftUptimer.express_app;
    }
    static SetExpress(app) {
        OpenShiftUptimer.express_app = app;
    }
    static SetUptimeRoute(path) {
        OpenShiftUptimer.express_app.get(path, function (req, res) {
            res.send("Uptime OK!");
        });
    }
    static Log(status) {
        OpenShiftUptimer.logger_enabled = status;
    }
}
OpenShiftUptimer.logger_enabled = false;
exports.OpenShiftUptimer = OpenShiftUptimer;
//# sourceMappingURL=openshift.js.map