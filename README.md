# pubthis

Publish content from Claude Code and get a temporary, shareable URL.

pubthis takes markdown, HTML, documents, and images — and gives you a link that expires in 7 days. No accounts, no auth, no config. Just content in, URL out.

```
You: "share this report as a link"

Claude: I've published your report.
        https://pubthis.co/a/01JABCDEFG
        Expires in 7 days. Anyone with the link can view it.
```

## Install

### Claude Code plugin (recommended)

```bash
claude plugin install pubthis
```

This gives you the `publish` MCP tool and a `/pub` slash command.

### MCP server only

```bash
claude mcp add pubthis -- npx -y @pubthis/mcp-server
```

Or add it to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "pubthis": {
      "command": "npx",
      "args": ["-y", "@pubthis/mcp-server"]
    }
  }
}
```

### CLAUDE.md (zero-install)

Download [`CLAUDE.md`](./CLAUDE.md) into your project root. Claude Code will read it automatically and use the pub API directly — no MCP server or plugin required.

## Usage

Once installed, just ask naturally:

- "Share this as a link"
- "Publish this report"
- "Give me a URL for this analysis"

You can also use the `/pub` slash command directly. Claude figures out the content type, formats it, publishes it, and hands you the link.

## Supported content types

| Type | MIME | Notes |
|------|------|-------|
| Markdown | `text/markdown` | Default. Reports, docs, specs. |
| HTML | `text/html` | Previews, prototypes. Sandboxed. |
| Plain text | `text/plain` | Logs, raw output. |
| PDF | `application/pdf` | Base64-encoded on publish. |
| PNG | `image/png` | Screenshots, diagrams. Base64-encoded. |
| JPEG | `image/jpeg` | Photos. Base64-encoded. |
| WebP | `image/webp` | Compressed images. Base64-encoded. |

## API

One endpoint. No auth.

### `POST /v1/publish`

```bash
curl -X POST https://pubthis.co/v1/publish \
  -H "Content-Type: application/json" \
  -d '{
    "content": "# Hello\n\nThis is a published artifact.",
    "content_type": "text/markdown",
    "ttl_seconds": 604800
  }'
```

**Request body:**

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `content` | string | yes | — | The content to publish. Base64 for binary types. |
| `content_type` | string | no | `text/plain` | MIME type (see supported types above). |
| `ttl_seconds` | number | no | `604800` | Time-to-live. Max 7 days (604,800 seconds). |

**Response (201):**

```json
{
  "artifact_id": "01JABCDEFG",
  "url": "https://pubthis.co/a/01JABCDEFG",
  "expires_at": "2026-02-06T00:00:00.000Z",
  "content_type": "text/markdown"
}
```

**Errors:**

| Status | Meaning |
|--------|---------|
| `400` | Missing or invalid content |
| `413` | Payload too large (max 10 MB) |
| `415` | Unsupported content type |
| `429` | Rate limited (30 req/min per IP) |
| `507` | Disk full |

### `GET /a/:id`

Returns the rendered artifact. Markdown and HTML get wrapped with OG tags for link previews. Binary types are served raw.

## Architecture

```
┌─────────────────────────────────────────────┐
│  Claude Code                                │
│                                             │
│  Plugin (@pubthis/plugin)                   │
│    ├── `/pub` skill (slash command)         │
│    └── MCP server (@pubthis/mcp-server)     │
│         └── publish tool                    │
└─────────────┬───────────────────────────────┘
              │ POST /v1/publish
              ▼
┌─────────────────────────────────────────────┐
│  API (pubthis.co)                           │
│                                             │
│  Hono + Node.js                             │
│    ├── POST /v1/publish → store artifact    │
│    ├── GET  /a/:id      → serve artifact    │
│    ├── Rate limiting (30 req/min/IP)        │
│    └── Cleanup loop (expired artifacts)     │
│                                             │
│  Storage: local filesystem                  │
│    data/{ULID}/artifact   ← content         │
│    data/{ULID}/meta.json  ← metadata        │
└─────────────────────────────────────────────┘

Website (www.pubthis.co) → Next.js on Vercel
API     (pubthis.co)     → Hono on Railway
```

The MCP server is a thin bridge — it translates Claude's tool calls into HTTP requests to the API. The API does all the heavy lifting: validation, storage, rendering, cleanup.

## Self-hosting

pubthis is a single Node.js process with zero external dependencies. No database, no Redis, no S3 — just the filesystem.

### Quick start

```bash
git clone https://github.com/coreyrab/pubthis.git
cd pubthis
npm install
npm run dev
```

The server starts on `http://localhost:3000`.

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `PUB_DATA_DIR` | `./data` | Where artifacts are stored |
| `PUB_BASE_URL` | `https://pubthis.co` | Public URL for generated links |
| `PUB_REMOTE_URL` | `https://pubthis.co` | Where the local Share button publishes to |
| `LOG_LEVEL` | `info` | Pino log level |

### Production

```bash
npm run start
```

For Railway, Docker, or any Node.js host — just set `PORT`, `PUB_DATA_DIR` (pointed at a persistent volume), and `PUB_BASE_URL`.

### Point Claude Code at your instance

Override the API URL when adding the MCP server:

```bash
claude mcp add pubthis -e PUBTHIS_API_URL=http://localhost:3000 -- npx -y @pubthis/mcp-server
```

Or set it in `.mcp.json`:

```json
{
  "mcpServers": {
    "pubthis": {
      "command": "npx",
      "args": ["-y", "@pubthis/mcp-server"],
      "env": {
        "PUBTHIS_API_URL": "http://localhost:3000"
      }
    }
  }
}
```

## Project structure

```
├── src/                  # API server (Hono)
│   ├── index.ts          # Entry point, graceful shutdown
│   ├── app.ts            # Routes, middleware, redirects
│   ├── config.ts         # All configuration constants
│   ├── storage.ts        # Filesystem read/write
│   ├── cleanup.ts        # TTL expiration loop
│   ├── routes/
│   │   ├── publish.ts    # POST /v1/publish
│   │   └── serve.ts      # GET /a/:id
│   └── middleware/
│       └── rate-limit.ts # Sliding window rate limiter
│
├── mcp-server/           # MCP server (npm: @pubthis/mcp-server)
│   └── src/index.ts      # StdioServerTransport + publish tool
│
├── plugin/               # Claude Code plugin
│   ├── .claude-plugin/
│   │   └── plugin.json   # Plugin manifest
│   ├── .mcp.json         # MCP server config
│   └── skills/
│       └── pub/
│           └── SKILL.md  # `/pub` slash command
│
├── website/              # Marketing site (Next.js)
│   └── src/app/          # Pages: home, docs, API reference
│
├── test/                 # Vitest test suite
├── CLAUDE.md             # Claude Code integration guide
└── data/                 # Artifact storage (gitignored)
```

## Running tests

```bash
npm test
```

Tests cover the publish endpoint, artifact serving, storage layer, and cleanup loop. Uses Vitest.

## How artifacts work

1. You publish content → API generates a [ULID](https://github.com/ulid/spec), writes the content and metadata to disk
2. Someone visits the URL → API reads the artifact, renders it (markdown → HTML with OG tags), and serves it
3. A background loop runs every 60 seconds, deleting anything past its expiration
4. If an expired artifact is accessed before cleanup catches it, it gets lazily deleted on read

No database. No queue. Artifacts are just files on disk with a `meta.json` sidecar.

## Limits

| Limit | Value |
|-------|-------|
| Max payload | 10 MB |
| Max TTL | 7 days |
| Rate limit | 30 requests/min per IP |
| Disk threshold | Rejects at 90% usage |

## Security

- **Artifacts are public.** Anyone with the link can view them.
- **Artifacts are immutable.** No edits — publish a new one.
- **Never publish secrets.** No API keys, tokens, passwords, or credentials.
- **Links expire.** Default and max TTL is 7 days. Don't claim permanence.

## Links

- [Website](https://www.pubthis.co)
- [Docs](https://www.pubthis.co/docs)
- [API Reference](https://www.pubthis.co/docs/api)
- [MCP Server on npm](https://www.npmjs.com/package/@pubthis/mcp-server)

## License

MIT
