"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const installSteps = [
  { number: 1, command: "claude plugin marketplace add coreyrab/pubthis" },
  { number: 2, command: "claude plugin install pubthis" },
];

const useSteps = [
  { number: 1, command: "/pub" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="shrink-0 p-1.5 rounded-md text-white/30 hover:text-white/60 transition-colors cursor-pointer"
      aria-label={`Copy: ${text}`}
    >
      {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
    </button>
  );
}

function StepBlock({ steps }: { steps: { number: number; command: string }[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d0d0d] overflow-hidden divide-y divide-white/10">
      {steps.map((step) => (
        <div key={step.number} className="flex items-center gap-4 px-5 py-4">
          <span className="shrink-0 font-mono text-sm text-white/30">
            {step.number}.
          </span>
          <code className="flex-1 font-mono text-sm text-white/80">
            {step.command}
          </code>
          <CopyButton text={step.command} />
        </div>
      ))}
    </div>
  );
}

export function InstallSteps() {
  return (
    <div className="mx-auto max-w-4xl px-6 pb-10 space-y-8">
      <div>
        <h2 className="font-mono text-sm text-white/40 uppercase tracking-wider mb-3">
          How to install
        </h2>
        <StepBlock steps={installSteps} />
      </div>
      <div>
        <h2 className="font-mono text-sm text-white/40 uppercase tracking-wider mb-3">
          How to use
        </h2>
        <StepBlock steps={useSteps} />
      </div>
    </div>
  );
}
