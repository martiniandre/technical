# Mock API

## Postman


## Running

```bash
# Docker
docker-compose up --build

# Local
npm install && npm run build && npm start
```

Server runs on `http://localhost:3000`.

---

## Endpoints
### `POST /login`

```json
{ "username": "admin", "password": "admin123" }
```

Returns `{ user, token }` on success. Errors: `400` missing fields, `401` wrong credentials.

| username   | password   | role          |
|------------|------------|---------------|
| admin      | admin123   | administrator |
| engineer   | eng456     | engineer      |
| viewer     | view789    | viewer        |

---

### `GET /dashboard` — requires `Authorization: Bearer <token>`

Returns the current dashboard snapshot: `plantInfo`, `equipments`, `reliefDevices`, `sizingCalculationTypes`, `scenarios`.

---

### `GET /health`

Returns `{ status, uptime, timestamp }`.

---

## WebSocket

Connect with a valid token:
```
ws://localhost:3000?token=<JWT>
```

- On connect → `{ event: "initial", data, timestamp }`
- Every 5s → `{ event: "update", data, timestamp }` with small random fluctuations
- No token or invalid token → connection refused (HTTP 401/403)
- Send `{ event: "logout" }` to close the connection server-side
