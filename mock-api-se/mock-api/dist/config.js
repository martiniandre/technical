"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    port: Number(process.env.PORT) || 3000,
    jwtSecret: 'supersecretkey',
    jwtExpiresIn: '24h',
    wsUpdateIntervalMs: 5000,
};
