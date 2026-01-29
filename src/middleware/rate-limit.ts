import type { MiddlewareHandler } from "hono";
import { CONFIG } from "../config.js";
import { log } from "../logger.js";

interface WindowEntry {
  count: number;
  windowStart: number;
}

const clients = new Map<string, WindowEntry>();

export function rateLimiter(): MiddlewareHandler {
  return async (c, next) => {
    const ip =
      c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const now = Date.now();
    const entry = clients.get(ip);

    if (!entry || now - entry.windowStart >= CONFIG.RATE_LIMIT_WINDOW_MS) {
      clients.set(ip, { count: 1, windowStart: now });
      await next();
      return;
    }

    entry.count++;
    if (entry.count > CONFIG.RATE_LIMIT_MAX_REQUESTS) {
      const retryAfter = Math.ceil(
        (CONFIG.RATE_LIMIT_WINDOW_MS - (now - entry.windowStart)) / 1000,
      );
      c.header("Retry-After", String(retryAfter));
      log.warn({ ip, count: entry.count }, "rate-limit: request rejected");
      return c.json({ error: "Too many requests" }, 429);
    }

    await next();
  };
}

/** Prune stale entries — call from cleanup loop */
export function pruneRateLimitEntries(): void {
  const now = Date.now();
  for (const [ip, entry] of clients) {
    if (now - entry.windowStart >= CONFIG.RATE_LIMIT_WINDOW_MS) {
      clients.delete(ip);
    }
  }
}
