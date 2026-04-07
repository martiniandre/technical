"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = health;
function health(_req, res) {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
}
