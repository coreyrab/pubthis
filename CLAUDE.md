# CLAUDE.md — pub (pubthis.co)

You are Claude Code operating in a project that uses **pub**, a minimal publishing primitive.

Your job is to use pub correctly, predictably, and without inventing new behaviors.

---

## Setup

The recommended way to use pub is via the **Claude Code plugin**, which gives you the `/pub` slash command and a structured `publish` MCP tool:

```bash
claude plugin marketplace add coreyrab/pubthis
claude plugin install pubthis
```

If the plugin is installed, use the `publish` MCP tool directly. If not, fall back to the HTTP API documented below.

---

## Core Primitive

**pub** publishes an artifact and returns a **temporary, shareable URL**.

Mental model:
> pub is "ngrok for AI artifacts."

You take something that exists locally (in memory, in a file, or in generated output) and expose it as a public URL.

---

## What pub IS

- A one-way publisher: artifact → URL
- Optimized for sharing with humans (Slack, Teams, email)
- Intended for:
  - markdown
  - HTML
  - PDFs
  - images
  - plain text
- Read-only snapshots
- Time-limited (free tier)

---

## What pub is NOT

Do NOT treat pub as:

- Application hosting
- Backend execution
- A database
- A collaborative editor
- Permanent storage
- Version control
- A place to run JavaScript logic

If a task requires any of the above, pub is the wrong tool.

---

## Invariants (MUST ALWAYS HOLD)

These rules are non-negotiable:

1. **Publishing is explicit**
   - Only publish when the user asks to share, view, or expose output
   - Or when sharing is clearly implied

2. **Artifacts are immutable**
   - Once published, you do not modify them
   - To change content, publish a new artifact

3. **Links expire**
   - Default TTL: **7 days**
   - Hard expiration
   - Do not claim permanence

4. **Artifacts are public**
   - Assume anyone with the link can view it
   - Never publish secrets

5. **Deterministic behavior**
   - Same input shape → same output shape
   - No hidden side effects

---

## When You SHOULD Use pub

Use pub when the user asks to:

- "Share this"
- "Give me a link"
- "Make this viewable"
- "Let me send this to someone"
- "Put this somewhere I can open"
- "Preview this HTML"
- "Show this report"

Default to pub when:
- The output is long
- Formatting matters
- The result is intended for a non-technical audience
- The result would be pasted into Slack or email

---

## When You SHOULD NOT Use pub

Do NOT use pub when:

- The output is short and conversational
- The user wants to edit collaboratively
- The user wants permanent hosting
- The artifact contains credentials or sensitive data
- The user explicitly wants a file download instead of a link

---

## Supported Content Types

Preferred MIME types:

- `text/markdown` (default for reports, specs, docs)
- `text/html` (for previews; sandboxed)
- `text/plain`
- `application/pdf`
- `image/png`
- `image/jpeg`
- `image/webp`

If uncertain, use `text/plain`.

---

## Primary API Contract

### Endpoint
POST https://pubthis.co/v1/publish

### Request (JSON)
```json
{
  "content": "...",
  "content_type": "text/markdown",
  "ttl_seconds": 604800
}
```

Notes:
- `ttl_seconds` is optional
- Maximum allowed TTL is 604800 seconds (7 days)

### Response
```json
{
  "artifact_id": "01JABCDEFG",
  "url": "https://pubthis.co/a/01JABCDEFG",
  "expires_at": "2026-02-04T00:00:00Z",
  "content_type": "text/markdown"
}
```

You MUST return the `url` to the user.

---

## Publishing Guidelines

Follow these rules when preparing artifacts:

- Prefer Markdown for structured content
- Keep artifacts self-contained
- Avoid external assets or dependencies
- Write titles and headers clearly (they affect previews)
- Assume the viewer has no context beyond the artifact

For HTML:
- Do not rely on JavaScript
- Expect sandbox restrictions
- Use semantic HTML

---

## Error Handling

Common responses and how to react:

- **413 Payload Too Large** — Ask the user to reduce size or split content
- **415 Unsupported Media Type** — Fall back to `text/plain`
- **429 Too Many Requests** — Retry with backoff or pause publishing
- **5xx** — Retry once, then report failure

Do NOT invent URLs on failure.

---

## Security Rules

Never publish:
- API keys
- Access tokens
- Passwords
- Private credentials
- Proprietary secrets unless user explicitly approves

Assume all published artifacts are world-readable.

---

## Naming Rules

- The primitive is **pub**
- The verb is **publish**
- The domain may be `pubthis.co`
- Do NOT invent alternate verbs or APIs

Say: "I've published this and here's the link"

Do NOT say:
- "I deployed this"
- "I hosted this permanently"
- "This is saved forever"

---

## One-Sentence Truth (Invariant)

> pub publishes an artifact and returns a temporary, shareable URL.

If any action would violate this sentence, do not use pub.
