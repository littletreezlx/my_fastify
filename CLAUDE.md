# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Simple Fastify + TypeScript server for feature testing and personal use. Uses in-memory storage (data lost on restart).

## Development Commands

```bash
# Development (hot reload with tsx watch)
pnpm run dev
./start-dev.sh

# Production build and run
pnpm run build    # Compiles TypeScript to dist/
pnpm start        # Runs compiled code from dist/
./start.sh        # Build + start in one command

# Cleanup
pnpm run clean    # Remove dist/ directory
```

## Architecture

### Application Bootstrap Flow

1. **src/server.ts** - Entry point
   - Loads `.env` via dotenv
   - Calls `buildApp()` factory
   - Starts HTTP server on `PORT` and `HOST`

2. **src/app.ts** - Application factory
   - Creates Fastify instance with logger config
   - Registers CORS plugin (allows all origins in dev)
   - Registers all route modules via `app.register()`

3. **Route Registration Pattern**
   - Each route file exports: `async function(app: FastifyInstance)`
   - Routes auto-registered in `app.ts`
   - Current routes: `healthRoutes`, `exampleRoutes`

### Adding New Routes

1. Create `src/routes/my-feature.ts`:
```typescript
import { FastifyInstance } from 'fastify';

export default async function myFeatureRoutes(app: FastifyInstance) {
  app.get('/my-endpoint', async () => {
    return { data: 'value' };
  });
}
```

2. Register in `src/app.ts`:
```typescript
import myFeatureRoutes from './routes/my-feature';
// ...
app.register(myFeatureRoutes);
```

## Environment Variables

- `PORT` (default: 3000) - Server port
- `HOST` (default: 0.0.0.0) - Server host
- `LOG_LEVEL` (default: info) - Fastify logger level
- `NODE_ENV` - If `production`, enables minimal logging

## Testing Endpoints

```bash
# Health check
curl localhost:3000/health

# Example CRUD (in-memory storage)
curl localhost:3000/api/items
curl -X POST localhost:3000/api/items -H 'Content-Type: application/json' -d '{"name":"test"}'
curl -X PUT localhost:3000/api/items/1 -H 'Content-Type: application/json' -d '{"name":"updated"}'
curl -X DELETE localhost:3000/api/items/1
```

## Design Principles

- **Minimal dependencies** - Only Fastify core + CORS
- **No over-engineering** - Simple patterns for feature validation
- **In-memory storage** - No database, data resets on restart
- **TypeScript strict mode** - Full type safety enabled
