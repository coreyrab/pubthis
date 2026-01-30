"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "agent" | "api";

export function CodeBlock() {
  const [active, setActive] = useState<Tab>("agent");

  return (
    <section className="mx-auto max-w-4xl px-6 pb-20">
      <div className="overflow-hidden rounded-lg border border-border bg-[#0A0A0A]">
        {/* Tab bar */}
        <div className="flex items-center border-b border-white/10">
          <div className="flex items-center gap-2 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
            <span className="h-3 w-3 rounded-full bg-white/20" />
          </div>
          <div className="flex">
            <button
              onClick={() => setActive("agent")}
              className={cn(
                "px-4 py-3 font-mono text-xs transition-colors",
                active === "agent"
                  ? "text-white border-b border-tomato"
                  : "text-white/40 hover:text-white/60"
              )}
            >
              claude code
            </button>
            <button
              onClick={() => setActive("api")}
              className={cn(
                "px-4 py-3 font-mono text-xs transition-colors",
                active === "api"
                  ? "text-white border-b border-tomato"
                  : "text-white/40 hover:text-white/60"
              )}
            >
              curl
            </button>
          </div>
        </div>

        {/* Content */}
        <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed">
          {active === "agent" ? <AgentExample /> : <ApiExample />}
        </pre>
      </div>
    </section>
  );
}

function AgentExample() {
  return (
    <code>
      <span className="text-white/50">
        {"# you type this in Claude Code"}
      </span>
      {"\n\n"}
      <span className="text-white/40">{">"}</span>
      <span className="text-white">
        {" Publish this report as a shareable link"}
      </span>
      {"\n\n"}
      <span className="text-white/50">
        {"# Claude publishes via pub and returns:"}
      </span>
      {"\n\n"}
      <span className="text-white/70">{"I've published your report. "}</span>
      <span className="text-white/70">{"Here's the link:"}</span>
      {"\n"}
      <span className="text-green-400 underline underline-offset-2">{"https://pubthis.co/a/01JABCDEFG"}</span>
      {"\n\n"}
      <span className="text-white/70">
        {"It will expire in 7 days. Anyone with the link can view it."}
      </span>
    </code>
  );
}

function ApiExample() {
  return (
    <code>
      <span className="text-white/50">
        {"# or call the API directly"}
      </span>
      {"\n"}
      <span className="text-white">
        {"curl -X POST https://pubthis.co/v1/publish \\"}
      </span>
      {"\n"}
      <span className="text-white">{"  -H "}</span>
      <span className="text-green-400">
        {'"Content-Type: application/json"'}
      </span>
      <span className="text-white">{" \\"}</span>
      {"\n"}
      <span className="text-white">{"  -d "}</span>
      <span className="text-green-400">{"'{"}</span>
      {"\n"}
      <span className="text-green-400">
        {'    "content": "# Report\\nYour content here.",'}
      </span>
      {"\n"}
      <span className="text-green-400">
        {'    "content_type": "text/markdown"'}
      </span>
      {"\n"}
      <span className="text-green-400">{"  }'"}</span>
      {"\n\n"}
      <span className="text-white/50">{"# response"}</span>
      {"\n"}
      <span className="text-white/70">{"{"}</span>
      {"\n"}
      <span className="text-white/70">
        {'  "artifact_id": "01JABCDEFG",'}
      </span>
      {"\n"}
      <span className="text-white/70">{'  "url": "'}</span>
      <span className="text-green-400">{"https://pubthis.co/a/01JABCDEFG"}</span>
      <span className="text-white/70">{'",'}
      </span>
      {"\n"}
      <span className="text-white/70">
        {'  "expires_at": "2026-02-05T00:00:00Z"'}
      </span>
      {"\n"}
      <span className="text-white/70">{"}"}</span>
    </code>
  );
}
