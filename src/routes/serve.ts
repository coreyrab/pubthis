import { Hono } from "hono";
import { deleteArtifact, readArtifact, readMetadata } from "../storage.js";
import { wrapHtmlWithBanner, wrapMarkdownWithBanner } from "../banner.js";
import { log } from "../logger.js";

const ULID_RE = /^[0-9A-Z]{26}$/i;

export const serveRoute = new Hono();

serveRoute.get("/:id", async (c) => {
  const id = c.req.param("id");

  // Path traversal protection: strict ULID format
  if (!ULID_RE.test(id)) {
    return c.json({ error: "Invalid artifact ID" }, 400);
  }

  const meta = await readMetadata(id);
  if (!meta) {
    return c.json({ error: "Not found" }, 404);
  }

  // Lazy TTL enforcement
  if (new Date(meta.expires_at).getTime() <= Date.now()) {
    await deleteArtifact(id);
    log.info({ artifact_id: id }, "serve: expired artifact deleted (lazy)");
    return c.json({ error: "Not found" }, 404);
  }

  log.info({ artifact_id: id, content_type: meta.content_type }, "serve: artifact requested");

  const content = await readArtifact(id);
  if (!content) {
    return c.json({ error: "Not found" }, 404);
  }

  // Inject branding banner for renderable content types
  if (meta.content_type === "text/html") {
    const html = wrapHtmlWithBanner(content.toString("utf-8"));
    return c.html(html, 200, {
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    });
  }

  if (meta.content_type === "text/markdown") {
    const html = wrapMarkdownWithBanner(content.toString("utf-8"));
    return c.html(html, 200, {
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    });
  }

  return new Response(new Uint8Array(content), {
    status: 200,
    headers: {
      "Content-Type": meta.content_type,
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
