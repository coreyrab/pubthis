import { CONFIG } from "./config.js";
import { log } from "./logger.js";
import { pruneRateLimitEntries } from "./middleware/rate-limit.js";
import { deleteArtifact, listArtifactIds, readMetadata } from "./storage.js";

let intervalId: ReturnType<typeof setInterval> | null = null;

export function startCleanupLoop(): void {
  intervalId = setInterval(async () => {
    const start = Date.now();
    let checked = 0;
    let deleted = 0;
    try {
      const ids = await listArtifactIds();
      const now = Date.now();
      checked = ids.length;
      for (const id of ids) {
        try {
          const meta = await readMetadata(id);
          if (meta && new Date(meta.expires_at).getTime() <= now) {
            await deleteArtifact(id);
            deleted++;
          }
        } catch (err) {
          log.warn({ artifact_id: id, err }, "cleanup: error processing artifact");
        }
      }
    } catch (err) {
      log.error({ err }, "cleanup: sweep failed");
    }
    pruneRateLimitEntries();
    log.info(
      { checked, deleted, duration_ms: Date.now() - start },
      "cleanup: sweep complete",
    );
  }, CONFIG.CLEANUP_INTERVAL_MS);
}

export function stopCleanupLoop(): void {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}
