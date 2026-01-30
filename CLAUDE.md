# CLAUDE.md — pubthis

You are Claude Code working in a project that uses **pubthis** — a tool that publishes content and returns a temporary, shareable URL.

Use it correctly. Don't invent behaviors it doesn't have.

---

## Setup

Install the Claude Code plugin:

```bash
claude plugin marketplace add coreyrab/pubthis
claude plugin install pubthis
```

This gives you the `publish` MCP tool (and a `/pub` slash command). If the plugin is installed, use the `publish` tool directly. Otherwise, use the HTTP API below.

---

## What pubthis does

Takes local content (in memory, in a file, or generated output) and publishes it to a temporary public URL. That's it.

Think of it as **ngrok for AI artifacts**.

Supported content: markdown, HTML, PDFs, images, plain text.

All artifacts are **read-only**, **public**, and **expire after 7 days**.

---

## What pubthis does NOT do

- Host applications
- Run backends or JavaScript
- Store data permanently
- Provide collaboration or editing
- Act as version control

If you need any of those, use something else.

---

## When to use it

Publish when the user says things like:
- "Share this" / "Give me a link" / "Make this viewable"
- "Send this to someone" / "Preview this"

Also default to publishing when:
- Output is long or formatting matters
- The audience is non-technical
- The content will be pasted into Slack or email

## When NOT to use it

- Output is short and conversational
- User wants collaborative editing
- User wants permanent hosting
- Content contains secrets or credentials
- User explicitly wants a file download

---

## Rules (non-negotiable)

1. **Only publish when asked** — or when sharing is clearly implied.
2. **Artifacts are immutable** — to update, publish a new one.
3. **Links expire in 7 days** — never claim permanence.
4. **Artifacts are public** — never publish secrets.
5. **No side effects** — same input, same output shape.

---

## API

**POST** `https://pubthis.co/v1/publish`

Request:
```json
{
  "content": "...",
  "content_type": "text/markdown",
  "ttl_seconds": 604800
}
```

- `ttl_seconds` is optional (max 604800 = 7 days)
- `content_type` options: `text/markdown` (default), `text/html`, `text/plain`, `application/pdf`, `image/png`, `image/jpeg`, `image/webp`
- When in doubt, use `text/plain`

Response:
```json
{
  "artifact_id": "01JABCDEFG",
  "url": "https://pubthis.co/a/01JABCDEFG",
  "expires_at": "2026-02-04T00:00:00Z",
  "content_type": "text/markdown"
}
```

Always return the `url` to the user.

---

## Content guidelines

- Prefer markdown for structured content
- Keep artifacts self-contained (no external dependencies)
- Write clear titles/headers (they affect previews)
- Assume the viewer has zero context
- For HTML: no JavaScript, expect sandboxing, use semantic markup

---

## Error handling

| Status | Action |
|--------|--------|
| 413 Payload Too Large | Ask user to reduce size or split |
| 415 Unsupported Media Type | Fall back to `text/plain` |
| 429 Too Many Requests | Retry with backoff |
| 5xx | Retry once, then report failure |

Never invent URLs on failure.

---

## Security

Never publish API keys, tokens, passwords, or credentials. All artifacts are world-readable.

---

## Naming

- The tool is **pubthis**
- The verb is **publish**
- The domain is `pubthis.co`

Say: "I've published this — here's the link."

Don't say: "deployed", "hosted permanently", or "saved forever."
