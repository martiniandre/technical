import http from 'http';
import express from 'express';
import { config } from './config';
import { openCors } from './middleware/cors';
import { authenticateToken } from './middleware/auth';
import { login } from './routes/auth';
import { dashboard } from './routes/dashboard';
import { health } from './routes/health';
import { createWebSocketServer } from './websocket';

const app = express();

app.use(openCors);
app.options('*', (_req, res) => res.sendStatus(204));
app.use(express.json());

app.post('/login', login);
app.get('/health', health);

app.get('/dashboard', authenticateToken, dashboard);

const server = http.createServer(app);

createWebSocketServer(server);

server.listen(config.port, () => {
  const sep = '='.repeat(60);
  console.log(sep);
  console.log('Mock API Server');
  console.log(sep);
  console.log(`  REST API :   http://localhost:${config.port}`);
  console.log(`  WebSocket:   ws://localhost:${config.port}`);
  console.log(`  Health   :   http://localhost:${config.port}/health`);
  console.log(sep);
  console.log('  Login credentials:');
  console.log('    admin    / admin123  (role: administrator)');
  console.log('    engineer / eng456    (role: engineer)');
  console.log('    viewer   / view789   (role: viewer)');
  console.log(sep);
  console.log(`  WS auth  :   ws://localhost:${config.port}?token=<JWT>`);
  console.log(`  WS update:   every ${config.wsUpdateIntervalMs / 1000}s`);
  console.log(sep);
});
