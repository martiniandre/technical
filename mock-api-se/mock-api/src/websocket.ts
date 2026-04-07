import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import jwt from 'jsonwebtoken';
import { config } from './config';
import { getLiveData, getDashboard, setLiveData } from './store';
import { JwtPayload, WsMessage } from './types';

function randomVariation(value: number, maxDelta = 3): number {
  const delta = Math.floor(Math.random() * (maxDelta * 2 + 1)) - maxDelta;
  return Math.max(0, value + delta);
}

function applyRandomUpdate(): void {
  const current = getLiveData();

  setLiveData({
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

function send(ws: WebSocket, msg: WsMessage): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
}

export function createWebSocketServer(server: http.Server): WebSocketServer {
  const wss = new WebSocketServer({
    server,
    verifyClient: (_info, done) => done(true),
  });

  server.on('upgrade', (_req, socket) => {
    socket.on('error', () => {});
    const originalWrite = (socket as any).write.bind(socket);
    (socket as any).write = (data: string) => {
      if (typeof data === 'string' && data.startsWith('HTTP/1.1 101')) {
        data = data.replace(
          '\r\n\r\n',
          '\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Headers: *\r\n\r\n'
        );
      }
      return originalWrite(data);
    };
  });

  wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress ?? 'unknown';

    const url = new URL(req.url ?? '/', `http://localhost:${config.port}`);
    const token = url.searchParams.get('token');

    if (!token) {
      send(ws, {
        event: 'error',
        message: `No token provided. Connect with: ws://localhost:${config.port}?token=<JWT>`,
        timestamp: new Date().toISOString(),
      });
      ws.close(1008, 'Unauthorized');
      console.log(`[WS] Rejected unauthenticated connection from ${clientIp}`);
      return;
    }

    let user: JwtPayload;
    try {
      user = jwt.verify(token, config.jwtSecret) as JwtPayload;
    } catch {
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
      data: getDashboard(),
      timestamp: new Date().toISOString(),
    });

    const intervalId = setInterval(() => {
      applyRandomUpdate();
      send(ws, {
        event: 'update',
        data: getDashboard(),
        timestamp: new Date().toISOString(),
      });
    }, config.wsUpdateIntervalMs);

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
