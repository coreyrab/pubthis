import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeEach, afterEach, describe, it, expect } from "vitest";
import { CONFIG } from "../src/config.js";
import { ensureDataDir, writeArtifact } from "../src/storage.js";
import { createApp } from "../src/app.js";
import type { ArtifactMeta } from "../src/types.js";

let originalDataDir: string;

beforeEach(async () => {
  originalDataDir = CONFIG.DATA_DIR;
  const tmp = await mkdtemp(join(tmpdir(), "pub-test-"));
  (CONFIG as any).DATA_DIR = tmp;
  await ensureDataDir();
});

afterEach(async () => {
  await rm(CONFIG.DATA_DIR, { recursive: true, force: true });
  (CONFIG as any).DATA_DIR = originalDataDir;
});

const VALID_ID = "01ARZ3NDEKTSV4RRFFQ69G5FAV";

describe("GET /", () => {
  it("returns health check", async () => {
    const app = createApp();
    const res = await app.request("/");
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe("ok");
  });
});

describe("GET /a/:id", () => {
  it("serves an existing artifact", async () => {
    const meta: ArtifactMeta = {
      artifact_id: VALID_ID,
      content_type: "text/plain",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 3600_000).toISOString(),
      size_bytes: 5,
    };
    await writeArtifact(VALID_ID, Buffer.from("hello"), meta);

    const app = createApp();
    const res = await app.request(`/a/${VALID_ID}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/plain");
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(await res.text()).toBe("hello");
  });

  it("returns 404 for missing artifact", async () => {
    const app = createApp();
    const res = await app.request(`/a/${VALID_ID}`);
    expect(res.status).toBe(404);
  });

  it("returns 404 for expired artifact", async () => {
    const meta: ArtifactMeta = {
      artifact_id: VALID_ID,
      content_type: "text/plain",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() - 1000).toISOString(), // already expired
      size_bytes: 7,
    };
    await writeArtifact(VALID_ID, Buffer.from("expired"), meta);

    const app = createApp();
    const res = await app.request(`/a/${VALID_ID}`);
    expect(res.status).toBe(404);
  });

  it("rejects invalid artifact ID format", async () => {
    const app = createApp();
    const res = await app.request("/a/NOT-A-VALID-ULID!");
    expect(res.status).toBe(400);
  });

  it("injects branding banner into HTML artifacts", async () => {
    const meta: ArtifactMeta = {
      artifact_id: VALID_ID,
      content_type: "text/html",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 3600_000).toISOString(),
      size_bytes: 28,
    };
    await writeArtifact(VALID_ID, Buffer.from("<html><body>hi</body></html>"), meta);

    const app = createApp();
    const res = await app.request(`/a/${VALID_ID}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/html");
    const body = await res.text();
    expect(body).toContain("pubit.ai");
    expect(body).toContain("hi");
  });

  it("wraps markdown artifacts in HTML with banner", async () => {
    const meta: ArtifactMeta = {
      artifact_id: VALID_ID,
      content_type: "text/markdown",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 3600_000).toISOString(),
      size_bytes: 7,
    };
    await writeArtifact(VALID_ID, Buffer.from("# Hello"), meta);

    const app = createApp();
    const res = await app.request(`/a/${VALID_ID}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/html");
    const body = await res.text();
    expect(body).toContain("pubit.ai");
    expect(body).toContain("<h1>Hello</h1>");
  });

  it("does not inject banner into plain text artifacts", async () => {
    const meta: ArtifactMeta = {
      artifact_id: VALID_ID,
      content_type: "text/plain",
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 3600_000).toISOString(),
      size_bytes: 5,
    };
    await writeArtifact(VALID_ID, Buffer.from("hello"), meta);

    const app = createApp();
    const res = await app.request(`/a/${VALID_ID}`);
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("text/plain");
    expect(await res.text()).toBe("hello");
  });
});
