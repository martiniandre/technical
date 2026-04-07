"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = dashboard;
const store_1 = require("../store");
function dashboard(_req, res) {
    res.status(200).json((0, store_1.getDashboard)());
}
