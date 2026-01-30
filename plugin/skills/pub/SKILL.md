---
name: pub
description: >-
  Publish content from the current conversation to pubthis.co and get a
  temporary shareable URL. Use when the user asks to share, publish, expose,
  preview, or create a link to any content — reports, chats, markdown,
  HTML, prototypes, documents, or images.
---

# `/pub` — Publish to a shareable URL

When the user invokes `/pub` or asks to share/publish content, follow these steps:

## 1. Identify the content

- If the user said **"publish this"** or **"share this"** — use the last substantial output from the conversation (report, analysis, code explanation, etc.)
- If the user specified a **file** — read the file first
- If the user described **what to create** — generate the content first, then publish

## 2. Prepare the content

Format the content as clean, self-contained markdown. Strip conversational fluff (e.g., "Here's what I found...") and keep the substance.

- Conversational output, reports, analyses → `text/markdown`
- HTML files or prototypes → `text/html`
- Plain text, logs → `text/plain`
- Images → base64-encode the file, use `image/png`, `image/jpeg`, or `image/webp`
- PDFs → base64-encode the file, use `application/pdf`

## 3. Publish

Call the `publish` tool from the `pubthis` MCP server with:
- `content`: The prepared content
- `content_type`: The MIME type determined above
- `ttl_seconds`: Optional (default is 7 days / 604800 seconds)

## 4. Return the result

Tell the user:
- What was published (brief description)
- The shareable URL
- When it expires

Example response:

> I've published your project analysis. Here's the link:
>
> https://pubthis.co/a/01JABCDEFG
>
> It will expire in 7 days. Anyone with the link can view it.

## Important rules

- **Never publish secrets** — API keys, passwords, tokens, credentials
- **Artifacts are public** — anyone with the link can view them
- **Artifacts are immutable** — to change content, publish a new one
- **Links expire** — default 7 days, max 7 days. Do not claim permanence.
