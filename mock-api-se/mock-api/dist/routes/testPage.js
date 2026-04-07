"use strict";
// =============================================================================
// GET /test — built-in browser test page
// =============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPage = testPage;
const html = /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mock API — Test Page</title>
  <style>
    body { font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 20px; }
    h2   { color: #4ec9b0; }
    button { background: #0e639c; color: white; border: none; padding: 8px 16px;
             cursor: pointer; margin: 4px; border-radius: 4px; }
    button:hover { background: #1177bb; }
    #log { background: #252526; padding: 12px; margin-top: 12px; height: 400px;
           overflow-y: auto; border: 1px solid #3c3c3c; border-radius: 4px; }
    .ok   { color: #4ec9b0; }
    .err  { color: #f44747; }
    .info { color: #dcdcaa; }
  </style>
</head>
<body>
  <h2>🏭 Mock API — Test Page</h2>
  <button onclick="testLogin()">✅ Login (admin)</button>
  <button onclick="testLoginFail()">❌ Login (wrong password)</button>
  <button onclick="connectWS()">🔌 Connect WebSocket</button>
  <button onclick="disconnectWS()">🔴 Disconnect WebSocket</button>
  <button onclick="clearLog()">🗑 Clear</button>
  <div id="log"></div>

  <script>
    let token = null;
    let ws    = null;

    function log(msg, cls = '') {
      const div  = document.getElementById('log');
      const line = document.createElement('div');
      line.className  = cls;
      line.textContent = '[' + new Date().toLocaleTimeString() + '] ' + msg;
      div.appendChild(line);
      div.scrollTop = div.scrollHeight;
    }

    function clearLog() { document.getElementById('log').innerHTML = ''; }

    async function testLogin() {
      const res  = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'admin123' }),
      });
      const data = await res.json();
      if (res.ok) {
        token = data.token;
        log('Login OK — ' + JSON.stringify(data.user) + ' | Token saved.', 'ok');
      } else {
        log('Login failed — ' + JSON.stringify(data), 'err');
      }
    }

    async function testLoginFail() {
      const res  = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'wrong' }),
      });
      const data = await res.json();
      log('Expected 401 — ' + JSON.stringify(data), res.status === 401 ? 'ok' : 'err');
    }

    function connectWS() {
      if (ws) ws.close();
      ws = new WebSocket('ws://' + location.host + '?token=' + token);
      ws.onopen    = ()  => log('WebSocket connected!', 'ok');
      ws.onmessage = (e) => {
        const d = JSON.parse(e.data);
        log('[' + d.event + '] ' + JSON.stringify(d.data).substring(0, 120) + '...', 'info');
      };
      ws.onerror = ()  => log('WebSocket error!', 'err');
      ws.onclose = ()  => log('WebSocket disconnected.', 'err');
    }

    function disconnectWS() { if (ws) { ws.close(); ws = null; } }
  </script>
</body>
</html>`;
/**
 * Serves the built-in browser test page at GET /test.
 * Useful for quickly verifying the API without external tools.
 */
function testPage(_req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
}
