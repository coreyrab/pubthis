"use client";

import { useEffect, useRef } from "react";

const EXAMPLE_URL = "https://pubthis.co/a/01KG8967ZW2756FSB6FKY0XTBJ";

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
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
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
              Write a project status update for the team. Include what we shipped, what&apos;s in progress, blockers, an architecture diagram, and deploy velocity for the month.
            </span>
          </div>

          {/* Claude response 1 */}
          <div className="mb-6 space-y-4 text-white/70">
            <p className="text-white/90 font-semibold">
              # Weekly Status — Jan 27–31
            </p>

            {/* Shipped */}
            <div>
              <p className="text-white/80 font-semibold">Shipped</p>
              <div className="space-y-0.5 mt-1">
                <p>
                  <span className="text-white/50">•</span> User auth flow
                  redesign — login, signup, and password reset all use the new
                  layout. 40% faster load time on mobile.
                </p>
                <p>
                  <span className="text-white/50">•</span> Webhook retry logic
                  — failed deliveries now retry 3x with exponential backoff.
                  Cut dropped events from ~12% to &lt;0.5%.
                </p>
                <p>
                  <span className="text-white/50">•</span> Dashboard CSV export
                  — users can export filtered data from any dashboard view.
                </p>
              </div>
            </div>

            {/* In Progress */}
            <div>
              <p className="text-white/80 font-semibold">In Progress</p>
              <div className="space-y-0.5 mt-1">
                <p>
                  <span className="text-white/50">•</span> API rate limiting
                  (v2) — new sliding window implementation. On track for
                  Wednesday.
                </p>
                <p>
                  <span className="text-white/50">•</span> Billing migration
                  — Stripe integration tests passing, need QA on edge cases
                  (prorations, plan downgrades).
                </p>
              </div>
            </div>

            {/* Blockers */}
            <div>
              <p className="text-white/80 font-semibold">Blockers</p>
              <div className="space-y-0.5 mt-1">
                <p>
                  <span className="text-white/50">•</span> Waiting on
                  design sign-off for the settings page rework. Pinged Sarah —
                  should have mocks by Monday.
                </p>
              </div>
            </div>

            {/* Architecture diagram */}
            <div>
              <p className="text-white/80 font-semibold">Architecture</p>
              <pre className="text-white/50 text-xs leading-snug mt-2 overflow-x-auto">{`┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Next.js    │────▸│   API        │────▸│   Postgres   │
│   Frontend   │     │   (Hono)     │     │              │
└──────┬───────┘     └──────┬───────┘     └──────────────┘
       │                    │
       │              ┌─────▾──────┐
       │              │   Redis    │
       │              │   Cache    │
       │              └─────┬──────┘
       │                    │
       ▼                    ▼
┌──────────────┐     ┌──────────────┐
│   Vercel     │     │   Railway    │
│   (CDN)      │     │   (Compute)  │
└──────────────┘     └──────────────┘`}</pre>
            </div>

            {/* Deploy velocity chart */}
            <div>
              <p className="text-white/80 font-semibold">Deploy Velocity</p>
              <pre className="text-white/50 text-xs leading-snug mt-2 overflow-x-auto">{`Week        Deploys    Rollbacks
─────────── ────────── ──────────
Jan 6–10        8          1
Jan 13–17      12          0
Jan 20–24      15          2
Jan 27–31      19          0  ◀ this week

Deploys per week:

Jan 6  │████████░░░░░░░░░░░░│  8
Jan 13 │████████████░░░░░░░░│ 12
Jan 20 │███████████████░░░░░│ 15
Jan 27 │███████████████████░│ 19  ★
        0    5    10   15   20`}</pre>
            </div>

            {/* Next week */}
            <div>
              <p className="text-white/80 font-semibold">Next Week</p>
              <div className="space-y-0.5 mt-1">
                <p>
                  <span className="text-white/50">1.</span> Ship rate limiting v2
                </p>
                <p>
                  <span className="text-white/50">2.</span> Complete billing migration QA
                </p>
                <p>
                  <span className="text-white/50">3.</span> Begin settings page implementation (pending design)
                </p>
                <p>
                  <span className="text-white/50">4.</span> Plan Q1 retrospective
                </p>
              </div>
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
              Published your status update. Here&apos;s the link:
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
