import { Hono } from "hono";
import { publishRoute } from "./routes/publish.js";
import { serveRoute } from "./routes/serve.js";
import { rateLimiter } from "./middleware/rate-limit.js";
import { getDiskStatus } from "./health.js";

export function createApp(): Hono {
  const app = new Hono();

  app.get("/", async (c) => {
    try {
      const disk = await getDiskStatus();
      return c.json({ status: "ok", disk });
    } catch {
      return c.json({ status: "ok" });
    }
  });

  app.use("/v1/*", rateLimiter());

  app.route("/v1", publishRoute);
  app.route("/a", serveRoute);

  return app;
}
