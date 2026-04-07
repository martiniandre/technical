"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebSocketServer = createWebSocketServer;
const ws_1 = require("ws");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const store_1 = require("./store");
function randomVariation(value, maxDelta = 3) {
    const delta = Math.floor(Math.random() * (maxDelta * 2 + 1)) - maxDelta;
    return Math.max(0, value + delta);
}
function applyRandomUpdate() {
    const current = (0, store_1.getLiveData)();
    (0, store_1.setLiveData)({
        ...current,
        equipments: current.equipments.map((item) => ({
            ...item,
            count: randomVariation(item.count, 1),
        })),
        reliefDevices: current.reliefDevices.map((item) => ({
            ...item,
            count: randomVariation(item.count, 2),
        })),
        sizingCalculationTypes: current.sizingCalculationTypes.map((item) => ({
            ...item,
            value: randomVariation(item.value, 3),
        })),
        scenarios: current.scenarios.map((item) => ({
            ...item,
            count: randomVariation(item.count, 5),
        })),
    });
}
function send(ws, msg) {
    if (ws.readyState === ws_1.WebSocket.OPEN) {
        ws.send(JSON.stringify(msg));
    }
}
function createWebSocketServer(server) {
    const wss = new ws_1.WebSocketServer({
        server,
        verifyClient: (_info, done) => done(true),
    });
    server.on('upgrade', (_req, socket) => {
        socket.on('error', () => { });
        const originalWrite = socket.write.bind(socket);
        socket.write = (data) => {
            if (typeof data === 'string' && data.startsWith('HTTP/1.1 101')) {
                data = data.replace('\r\n\r\n', '\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Headers: *\r\n\r\n');
            }
            return originalWrite(data);
        };
    });
    wss.on('connection', (ws, req) => {
        const clientIp = req.socket.remoteAddress ?? 'unknown';
        const url = new URL(req.url ?? '/', `http://localhost:${config_1.config.port}`);
        const token = url.searchParams.get('token');
        if (!token) {
            send(ws, {
                event: 'error',
                message: `No token provided. Connect with: ws://localhost:${config_1.config.port}?token=<JWT>`,
                timestamp: new Date().toISOString(),
            });
            ws.close(1008, 'Unauthorized');
            console.log(`[WS] Rejected unauthenticated connection from ${clientIp}`);
            return;
        }
        let user;
        try {
            user = jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        }
        catch {
            send(ws, {
                event: 'error',
                message: 'Invalid or expired token. Please login again.',
                timestamp: new Date().toISOString(),
            });
            ws.close(1008, 'Forbidden');
            console.log(`[WS] Rejected invalid token from ${clientIp}`);
            return;
        }
        console.log(`[WS] Connected: ${user.name} (${user.role}) from ${clientIp}`);
        send(ws, {
            event: 'initial',
            data: (0, store_1.getDashboard)(),
            timestamp: new Date().toISOString(),
        });
        const intervalId = setInterval(() => {
            applyRandomUpdate();
            send(ws, {
                event: 'update',
                data: (0, store_1.getDashboard)(),
                timestamp: new Date().toISOString(),
            });
        }, config_1.config.wsUpdateIntervalMs);
        ws.on('close', () => {
            console.log(`[WS] Disconnected: ${user.name} (${clientIp})`);
            clearInterval(intervalId);
        });
        ws.on('error', (err) => {
            console.error(`[WS] Error from ${clientIp}:`, err.message);
            clearInterval(intervalId);
        });
    });
    return wss;
}
