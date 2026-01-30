import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 pb-16">
      <Badge
        variant="outline"
        className="mb-6 font-mono text-xs border-tomato/30 text-tomato"
      >
        v0.1.0 — beta
      </Badge>
      <h1 className="font-mono text-4xl font-bold tracking-tight sm:text-5xl">
        publish directly
        <br />
        from Claude Code<span className="text-tomato">.</span>
      </h1>
      <p className="mt-4 max-w-lg font-mono text-base text-muted-foreground leading-relaxed">
        Publish chats, markdown files, prototypes, and documents straight from
        Claude Code to a temporary, shareable link.
      </p>
    </section>
  );
}
