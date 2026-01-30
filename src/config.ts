export const CONFIG = {
  PORT: parseInt(process.env.PUB_PORT || "3000", 10),
  DATA_DIR: process.env.PUB_DATA_DIR || "./data",
  BASE_URL: process.env.PUB_BASE_URL || "https://pubthis.co",
  REMOTE_URL: process.env.PUB_REMOTE_URL || "https://pubthis.co", // where Share button publishes to

  MAX_PAYLOAD_BYTES: 10 * 1024 * 1024, // 10 MB
  DEFAULT_TTL_SECONDS: 604_800, // 7 days
  MAX_TTL_SECONDS: 604_800, // 7 days

  ALLOWED_CONTENT_TYPES: new Set([
    "text/plain",
    "text/markdown",
    "text/html",
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/webp",
  ]),

  BINARY_CONTENT_TYPES: new Set([
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/webp",
  ]),

  RATE_LIMIT_WINDOW_MS: 60_000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 30, // 30 req/min per IP

  CLEANUP_INTERVAL_MS: 60_000, // sweep every 60s

  DISK_USAGE_THRESHOLD: 0.9, // reject publishes above 90% disk usage
  SHUTDOWN_DRAIN_MS: 10_000, // wait up to 10s for in-flight requests
} as const;
