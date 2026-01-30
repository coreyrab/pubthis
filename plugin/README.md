# pubthis — Claude Code Plugin

Publish artifacts directly from Claude Code. Get a temporary, shareable URL.

## Install

```bash
claude plugin install pubthis
```

Or from the marketplace:

```bash
claude plugin marketplace add coreyrab/pubthis
claude plugin install pubthis
```

## Usage

Just ask naturally:

- "Share this report as a link"
- "Publish this analysis"
- "Give me a URL for this"

Or type `/pub` to publish the last conversation output.

Claude will publish your content to [pubthis.co](https://pubthis.co) and return a shareable link that expires in 7 days.

## Supported content types

- `text/markdown` — reports, docs, specs
- `text/html` — previews, prototypes
- `text/plain` — logs, raw output
- `application/pdf` — documents
- `image/png`, `image/jpeg`, `image/webp` — screenshots, diagrams

## How it works

This plugin bundles:

1. **MCP Server** (`@pubthis/mcp-server`) — gives Claude a structured `publish` tool
2. **Skill** (`/pub`) — optional slash command that orchestrates publishing

The MCP server calls the [pubthis.co API](https://pubthis.co/v1/publish) to store your content and return a URL.

## Links

- [Website](https://www.pubthis.co)
- [Docs](https://www.pubthis.co/docs)
- [API Reference](https://www.pubthis.co/docs/api)
- [GitHub](https://github.com/coreyrab/pubthis)
