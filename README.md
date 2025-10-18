# Profile API with Fastify & TypeScript

A RESTful GET endpoint at `/me` returns user profile data, dynamic UTC timestamp, and a random cat fact from [Cat Facts API](https://catfact.ninja/fact). Handles timeouts, fallbacks. Built for resilience—Proverbs 24:3: "By wisdom a house is built."

## Features
- **Dynamic Data**: Fresh timestamp & cat fact per request.
- **Error Handling**: Fallback fact on API failure; 5s timeout.
- **Tech Stack**: Node.js, Fastify, TypeScript.
- **Deployment**: Railway (URL: https://profile-api-fastify-ts-grok.up.railway.app/me).

## Prerequisites
- Node.js ≥18.
- pnpm (install: `npm install -g pnpm`).

## Setup
1. Clone repo: `git clone https://github.com/kingsleydaprime/hng-stage-0.git`.
2. Navigate: `cd hng-stage-0`.
3. Install deps: `pnpm install`.

## Local Run
1. Build: `pnpm run build` (or `npx tsc`).
2. Start: `pnpm start` (or `node dist/index.js`).
3. Env: `export PORT=3000` (optional; defaults to 3000).

Server logs at `http://localhost:$PORT`.

## Testing
- Hit endpoint: `visit http://localhost:3000/me`.
- Expected JSON:
  ```json
  {
    "status": "success",
    "user": {
      "email": "kingsleydaprime@gmail.com",
      "name": "Kingsley Ihemelandu",
      "stack": "Node.js/Fastify"
    },
    "timestamp": "2025-10-18T12:34:56.789Z",
    "fact": "A random cat fact here."
  }
  ```
- Verify: 200 OK, Content-Type `application/json`, dynamic fields.

## Dependencies
<!--- **Runtime**: `fastify@^4`, `node-fetch@^2`.-->
<!--- **Dev**: `@types/node@^20`, `typescript@^5`.-->
- fastify
- typescript

Install: `pnpm add fastify node-fetch` & `pnpm add -D @types/node typescript`.



## Deployment Notes
- Railway: Push to GitHub; auto-deploys.
- No env vars required.

## API Docs
- **GET /me**: Profile + fact. No auth.
