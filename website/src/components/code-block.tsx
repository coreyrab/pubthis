"use client";

import { useEffect, useRef } from "react";

const EXAMPLE_URL = "https://pubthis.co/a/01KG8A22R05WAR5W5KJS6GMKST";

export function CodeBlock() {
  const chatRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <section className="mx-auto max-w-4xl px-6 pb-20">
      <h2 className="font-mono text-base font-semibold text-foreground tracking-wide mb-3">
        How to use
      </h2>
      <style>{`
        .chat-scroll::-webkit-scrollbar { width: 6px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.35); border-radius: 3px; }
        .chat-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.5); }
        .chat-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.35) transparent; }
      `}</style>
      <div className="overflow-hidden rounded-lg border border-border bg-[#0A0A0A]">
        {/* Title bar */}
        <div className="flex items-center border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="ml-4 font-mono text-xs text-white/40">
            claude code
          </span>
        </div>

        {/* Scrollable chat */}
        <div ref={chatRef} className="chat-scroll h-[420px] overflow-y-auto p-6 font-mono text-sm leading-relaxed">
          {/* User prompt 1 */}
          <div className="mb-6">
            <span className="text-white/40">&gt; </span>
            <span className="text-white">
              What is /pub and how does it work? Include a diagram and some example use cases.
            </span>
          </div>

          {/* Claude response 1 */}
          <div className="mb-6 space-y-4 text-white/70">
            <p>
              <span className="text-white/90 font-semibold">/pub</span> is a
              publishing tool for Claude Code. You produce something worth
              sharing — a report, an analysis, a prototype — and say{" "}
              <span className="text-white/90">&quot;share this as a link.&quot;</span>{" "}
              I publish it and hand you a temporary URL.
            </p>
            <p>
              No deploy. No hosting. No config. Just content → link.
            </p>

            {/* How it works diagram */}
            <p className="text-white/80 font-semibold">How it works</p>
            <pre className="text-white/50 text-xs leading-snug overflow-x-auto">{`┌─────────────────┐                    ┌─────────────────┐
│                  │   POST /v1/publish │                  │
│   Claude Code    │──────────────────▸│    pub API       │
│                  │                    │   pubthis.co     │
│   You say:       │◂──────────────────│                  │
│   "/pub"         │  { url, expires }  │   Stores content │
│                  │                    │   Returns URL    │
└─────────────────┘                    └────────┬─────────┘
                                                │
                                          GET /a/:id
                                                │
                                       ┌────────▾─────────┐
                                       │   Anyone with     │
                                       │   the link        │
                                       └───────────────────┘`}</pre>

            {/* What you can publish */}
            <p className="text-white/80 font-semibold">What you can publish</p>
            <pre className="text-white/50 text-xs leading-snug overflow-x-auto">{`Format          Use case
──────────────  ─────────────────────────────────────
Markdown        Reports, specs, meeting notes
HTML            Prototypes, previews, interactive demos
Plain text      Logs, raw output, config files
PDF             Documents, invoices, slide decks
Images          Screenshots, diagrams, charts`}</pre>

            {/* Use cases */}
            <p className="text-white/80 font-semibold">Example use cases</p>
            <div className="space-y-1">
              <p>
                <span className="text-white/50">•</span>{" "}
                <span className="text-white/60 italic">&quot;Write a weekly status update and share it as a link&quot;</span>
              </p>
              <p>
                <span className="text-white/50">•</span>{" "}
                <span className="text-white/60 italic">&quot;Summarize the PR changes and publish it for the team&quot;</span>
              </p>
              <p>
                <span className="text-white/50">•</span>{" "}
                <span className="text-white/60 italic">&quot;Build a landing page mockup and give me a preview link&quot;</span>
              </p>
              <p>
                <span className="text-white/50">•</span>{" "}
                <span className="text-white/60 italic">&quot;Analyze our error rates this week and share the report&quot;</span>
              </p>
            </div>

            {/* Adoption chart */}
            <p className="text-white/80 font-semibold">Published artifacts by type</p>
            <pre className="text-white/50 text-xs leading-snug overflow-x-auto">{`Markdown  │████████████████████████████████████░░░░│ 72%
HTML      │█████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ 18%
Plain     │███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  6%
Images    │██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  3%
PDF       │█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  1%
           0%       25%       50%       75%     100%`}</pre>

            {/* Key properties */}
            <p className="text-white/80 font-semibold">Key properties</p>
            <div className="space-y-0.5">
              <p>
                <span className="text-white/50">•</span>{" "}
                <span className="text-white/80">Temporary</span> — links expire after 7 days
              </p>
              <p>
                <span className="text-white/50">•</span>{" "}
                <span className="text-white/80">Public</span> — anyone with the link can view
              </p>
              <p>
                <span className="text-white/50">•</span>{" "}
                <span className="text-white/80">Immutable</span> — can&apos;t edit, just publish a new one
              </p>
              <p>
                <span className="text-white/50">•</span>{" "}
                <span className="text-white/80">No auth</span> — no accounts, no API keys
              </p>
              <p>
                <span className="text-white/50">•</span>{" "}
                <span className="text-white/80">Any format</span> — markdown, HTML, text, PDF, images
              </p>
            </div>
          </div>

          {/* User prompt 2 */}
          <div className="mb-6">
            <span className="text-white/40">&gt; </span>
            <span className="text-white">
              /pub
            </span>
          </div>

          {/* Claude response 2 — the publish result */}
          <div className="space-y-2 text-white/70">
            <p>
              Published your overview. Here&apos;s the link:
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
              Expires in 7 days. Anyone with the link can view it.
            </p>
          </div>

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}
