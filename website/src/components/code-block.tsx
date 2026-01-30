"use client";

import { useEffect, useRef } from "react";

const EXAMPLE_URL = "https://pubthis.co/a/01KG7T2B374YN0CGA588R5GRM8";

export function CodeBlock() {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 pb-20">
      <style>{`
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
        .chat-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) transparent; }
      `}</style>
      <div className="overflow-hidden rounded-lg border border-border bg-[#0A0A0A]">
        {/* Title bar */}
        <div className="flex items-center border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
          </div>
          <span className="ml-4 font-mono text-xs text-white/40">
            claude code
          </span>
        </div>

        {/* Scrollable chat */}
        <div className="chat-scroll h-[420px] overflow-y-auto p-6 font-mono text-sm leading-relaxed">
          {/* User prompt 1 */}
          <div className="mb-6">
            <span className="text-white/40">&gt; </span>
            <span className="text-white">
              What is pub and how do I use it?
            </span>
          </div>

          {/* Claude response 1 */}
          <div className="mb-6 space-y-4 text-white/70">
            <p>
              <span className="text-white/90 font-semibold">/pub</span> is a
              publishing primitive for AI agents. It takes any content —
              markdown, HTML, images, PDFs — and returns a temporary, shareable
              URL.
            </p>
            <p>
              Think of it as{" "}
              <span className="text-white/90">ngrok for AI artifacts.</span>
            </p>
            <p>
              You&apos;re working with an AI coding agent. It generates a
              report, a preview, an analysis. You want to share it — paste it
              into Slack, send it to a colleague, open it on your phone. /pub
              gives you a link in seconds.
            </p>

            <p className="text-white/50 text-xs mt-2 mb-1">How it works:</p>
            <pre className="text-white/50 text-xs leading-snug overflow-x-auto">{`  ┌─────────────┐    POST /v1/publish    ┌─────────────┐
  │ Claude Code  │ ────────────────────▸ │   pub API    │
  │ (or any      │                       │  pubthis.co  │
  │  agent)      │ ◂──────────────────── │              │
  └─────────────┘   { url, expires_at }  └──────┬───────┘
                                                │
                                          GET /a/:id
                                                │
                                         ┌──────▾──────┐
                                         │   Browser    │
                                         │  (anyone)    │
                                         └─────────────┘`}</pre>

            <div className="space-y-1">
              <p>
                <span className="text-white/50">1.</span> Your agent sends
                content to the /pub API
              </p>
              <p>
                <span className="text-white/50">2.</span> The API stores it and
                returns a shareable URL
              </p>
              <p>
                <span className="text-white/50">3.</span> Anyone with the link
                can view the rendered content
              </p>
              <p>
                <span className="text-white/50">4.</span> The link expires
                automatically (default: 7 days)
              </p>
            </div>

            <p>
              No deploy. No hosting. No setup. Just content → URL.
            </p>

            <p className="text-white/50 text-xs mt-2 mb-1">
              Supported formats:
            </p>
            <div className="space-y-0.5 text-xs">
              <p>
                <span className="text-white/60">text/markdown</span>
                <span className="text-white/40">
                  {" "}— reports, docs, specs
                </span>
              </p>
              <p>
                <span className="text-white/60">text/html</span>
                <span className="text-white/40">
                  {" "}— previews, prototypes
                </span>
              </p>
              <p>
                <span className="text-white/60">text/plain</span>
                <span className="text-white/40"> — logs, raw output</span>
              </p>
              <p>
                <span className="text-white/60">image/*</span>
                <span className="text-white/40">
                  {" "}— screenshots, diagrams
                </span>
              </p>
            </div>

            <p>
              To publish from Claude Code, just ask:{" "}
              <span className="text-white/50 italic">
                &quot;Share this report as a link&quot;
              </span>{" "}
              or{" "}
              <span className="text-white/50 italic">
                &quot;Publish this analysis&quot;
              </span>
            </p>

            <p>
              Claude calls the API, publishes your content, and hands you back
              the link. That&apos;s it.
            </p>
          </div>

          {/* User prompt 2 */}
          <div className="mb-6">
            <span className="text-white/40">&gt; </span>
            <span className="text-white">
              Publish that as a shareable link
            </span>
          </div>

          {/* Claude response 2 — the publish result */}
          <div className="space-y-2 text-white/70">
            <p>
              I&apos;ve published your document. Here&apos;s the link:
            </p>
            <p>
              <a
                href={EXAMPLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline underline-offset-2 hover:text-green-300 transition-colors"
              >
                {EXAMPLE_URL}
              </a>
            </p>
            <p>
              It will expire in 7 days. Anyone with the link can view it.
            </p>
          </div>

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}
