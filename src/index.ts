import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { startCleanupLoop, stopCleanupLoop } from "./cleanup.js";
import { CONFIG } from "./config.js";
import { log } from "./logger.js";
import { ensureDataDir } from "./storage.js";

const app = createApp();

await ensureDataDir();
startCleanupLoop();

const server = serve({ fetch: app.fetch, port: CONFIG.PORT }, (info) => {
  log.info({ port: info.port }, "pub listening");
});

// Graceful shutdown: stop accepting new connections, drain in-flight requests
let shuttingDown = false;
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    if (shuttingDown) return; // prevent double-shutdown
    shuttingDown = true;
    log.info({ signal }, "shutdown: signal received, draining connections");

    stopCleanupLoop();

    server.close(() => {
      log.info("shutdown: all connections drained, exiting");
      process.exit(0);
    });

    // Force exit if drain takes too long
    setTimeout(() => {
      log.warn("shutdown: drain timeout exceeded, forcing exit");
      process.exit(1);
    }, CONFIG.SHUTDOWN_DRAIN_MS).unref();
  });
}
