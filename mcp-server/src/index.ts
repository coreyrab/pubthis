#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_URL = process.env.PUBTHIS_API_URL || "https://pubthis.co";

const server = new McpServer({
  name: "pubthis",
  version: "0.1.0",
});

server.tool(
  "publish",
  "Publish content to pubthis.co and get a temporary, shareable URL. Supports markdown, HTML, plain text, PDFs, and images.",
  {
    content: z.string().describe("The content to publish. For binary types (PDF, images), use base64-encoded string."),
    content_type: z
      .enum([
        "text/markdown",
        "text/html",
        "text/plain",
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/webp",
      ])
      .default("text/markdown")
      .describe("MIME type of the content"),
    ttl_seconds: z
      .number()
      .int()
      .min(1)
      .max(604800)
      .optional()
      .describe("Time to live in seconds (max 604800 = 7 days)"),
  },
  async ({ content, content_type, ttl_seconds }) => {
    try {
      const body: Record<string, unknown> = { content, content_type };
      if (ttl_seconds !== undefined) {
        body.ttl_seconds = ttl_seconds;
      }

      const res = await fetch(`${API_URL}/v1/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error (${res.status}): ${data.error || "Unknown error"}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: [
              `Published successfully!`,
              ``,
              `URL: ${data.url}`,
              `Artifact ID: ${data.artifact_id}`,
              `Content Type: ${data.content_type}`,
              `Expires: ${data.expires_at}`,
            ].join("\n"),
          },
        ],
      };
    } catch (err) {
      return {
        content: [
          {
            type: "text" as const,
            text: `Failed to publish: ${err instanceof Error ? err.message : String(err)}`,
          },
        ],
        isError: true,
      };
    }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
