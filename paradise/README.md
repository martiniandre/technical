# Paradise

## Overview
A modern, modular React 18 application It relies on a concurrent REST/WebSocket mock API server to provide real-time infrastructure metrics, equipment mapping, and authentication logic.

## Resources
- **Mock API Companion**: Run the API server simultaneously via `npm start` in the mock repository to prevent network refusal errors.

## Running

Clone this application and ensure your `.env` assigns port pointers appropriately to the Mock Server (`VITE_API_URL`).

```bash
# Local environment setup
npm install

# Start Vite Development Server
npm run dev

# Generate Production Build
npm run build

# Preview Production Build (dist)
npm start
```

App runs locally on `http://localhost:5173`.

---

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Bootstraps local Vite hot-reload server |
| `npm run build` | Compiles raw TypeScript logic and compresses the Rollup bundle for Production |
| `npm start` | Locally audits the production build inside the `dist/` directory |
| `npm run test` | Asserts UI consistency and store security via Vitest + Testing Library |
| `npm run lint` | Inspects code pattern violations globally using ESLint |

---

## Testing

Run isolated headless operations safely via the terminal:
```bash
npm test
```
