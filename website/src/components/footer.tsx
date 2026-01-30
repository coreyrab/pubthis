import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mx-auto max-w-4xl px-6 pb-12">
      <Separator className="mb-8" />
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>
          <span className="text-tomato">/</span>pub — simple publishing from Claude Code
        </span>
        <div className="flex gap-4">
          <a
            href="/docs"
            className="transition-colors hover:text-foreground"
          >
            docs
          </a>
          <a
            href="https://github.com/coreyrab/pubthis"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            github
          </a>
        </div>
      </div>
    </footer>
  );
}
