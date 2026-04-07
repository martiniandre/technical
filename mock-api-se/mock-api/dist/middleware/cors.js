"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openCors = openCors;
function openCors(_req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
}
