import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export default function DocsQuickstart() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-2xl font-bold tracking-tight">
          Quickstart
        </h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          Install the plugin, publish content, get a link.
        </p>
      </div>

      <Separator />

      {/* What is pubthis */}
      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold">What is pubthis?</h2>
        <p className="font-mono text-sm leading-relaxed text-muted-foreground">
          pubthis is a publishing primitive for AI coding agents. You give it
          content — markdown, HTML, images, PDFs, plain text — and it gives you
          back a temporary, shareable URL.
        </p>
        <p className="font-mono text-sm leading-relaxed text-muted-foreground">
          The primary interface is{" "}
          <span className="text-foreground font-medium">
            natural language through your coding agent
          </span>
          . You say{" "}
          <span className="text-foreground font-medium">
            &quot;share this as a link&quot;
          </span>{" "}
          and pub handles the rest. There&apos;s also a direct HTTP API for
          programmatic use.
        </p>
      </section>

      <Separator />

      {/* Setup with Claude Code */}
      <section className="space-y-4">
        <h2 className="font-mono text-lg font-semibold">
          Setup with Claude Code
        </h2>
        <p className="font-mono text-sm text-muted-foreground">
          The fastest way to start using pub is with{" "}
          <a
            href="https://claude.ai/code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tomato hover:underline"
          >
            Claude Code
          </a>
          . There are two ways to set it up:
        </p>

        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Option A — Install the plugin
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            The plugin gives you both the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">
              publish
            </code>{" "}
            MCP tool and the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">
              /pub
            </code>{" "}
            slash command.
          </p>
          <pre className="overflow-x-auto rounded-lg bg-[#0A0A0A] p-3 font-mono text-xs leading-relaxed sm:p-4 sm:text-sm">
            <code>
              <span className="text-green-400">claude</span>
              <span className="text-white">
                {" plugin marketplace add coreyrab/pubthis"}
              </span>
              {"\n"}
              <span className="text-green-400">claude</span>
              <span className="text-white">
                {" plugin install pubthis"}
              </span>
            </code>
          </pre>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Option B — Add the MCP server directly
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            If you prefer to skip the plugin and add the MCP server yourself:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-[#0A0A0A] p-3 font-mono text-xs leading-relaxed sm:p-4 sm:text-sm">
            <code>
              <span className="text-green-400">claude</span>
              <span className="text-white">
                {" mcp add pubthis -- npx -y @pubthis/mcp-server"}
              </span>
            </code>
          </pre>
          <p className="font-mono text-xs text-muted-foreground">
            This gives you the{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">
              publish
            </code>{" "}
            tool but{" "}
            <span className="text-foreground font-medium">
              not the{" "}
              <code className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">
                /pub
              </code>{" "}
              slash command
            </span>
            . The slash command is only available through the plugin install.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Then publish something
          </p>
          <Card className="bg-[#0A0A0A] border-white/10">
            <CardContent className="p-3 pt-3 sm:p-6 sm:pt-4">
              <div className="space-y-4 font-mono text-xs sm:text-sm">
                <div>
                  <span className="text-white/40">{">"}</span>
                  <span className="text-white">
                    {" Generate a summary of this project and share it as a link"}
                  </span>
                </div>
                <div className="border-l-2 border-white/10 pl-4 space-y-2">
                  <p className="text-white/70">
                    I&apos;ve generated a project summary and published it with
                    pub.
                  </p>
                  <p className="text-white/70">Here&apos;s your link:</p>
                  <p className="text-green-400 underline underline-offset-2">
                    https://pubthis.co/a/01JABCDEFG
                  </p>
                  <p className="text-white/50 text-xs">
                    Expires in 7 days. Anyone with the link can view it.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Things you can say
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              "Share this report as a link",
              "Publish this HTML preview",
              "Give me a link to this markdown",
              "Make this viewable for my team",
              "Put this somewhere I can send it",
              "Preview this in the browser",
            ].map((prompt) => (
              <div
                key={prompt}
                className="rounded-md border border-border bg-secondary/50 px-3 py-2 font-mono text-xs text-muted-foreground"
              >
                &quot;{prompt}&quot;
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* Direct API */}
      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold">
          Direct API usage
        </h2>
        <p className="font-mono text-sm text-muted-foreground">
          You can also call the pub API directly from any HTTP client, script,
          or CI pipeline.
        </p>
        <pre className="overflow-x-auto rounded-lg bg-[#0A0A0A] p-3 font-mono text-xs leading-relaxed sm:p-4 sm:text-sm">
          <code>
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
              {'    "content": "# My Report\\n\\nHello, world!",'}
            </span>
            {"\n"}
            <span className="text-green-400">
              {'    "content_type": "text/markdown"'}
            </span>
            {"\n"}
            <span className="text-green-400">{"  }'"}</span>
          </code>
        </pre>
        <p className="font-mono text-sm text-muted-foreground">
          See the{" "}
          <a
            href="/docs/api"
            className="text-tomato hover:underline"
          >
            API Reference
          </a>{" "}
          for the full request/response schema.
        </p>
      </section>

      <Separator />

      {/* Alternative: CLAUDE.md */}
      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold">
          Alternative: CLAUDE.md (zero-install)
        </h2>
        <p className="font-mono text-sm text-muted-foreground">
          If you prefer not to install a plugin, you can drop a{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
            CLAUDE.md
          </code>{" "}
          file into your project root. Claude Code reads it automatically and
          will use the pub API directly — no plugin or MCP server required.
        </p>
        <pre className="overflow-x-auto rounded-lg bg-[#0A0A0A] p-3 font-mono text-xs leading-relaxed sm:p-4 sm:text-sm">
          <code>
            <span className="text-green-400">curl</span>
            <span className="text-white">
              {
                " -o CLAUDE.md https://raw.githubusercontent.com/coreyrab/pubthis/main/CLAUDE.md"
              }
            </span>
          </code>
        </pre>
      </section>

      <Separator />

      {/* Self-hosting */}
      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold">Self-hosting</h2>
        <p className="font-mono text-sm text-muted-foreground">
          pub is open source. To run your own instance:
        </p>
        <pre className="overflow-x-auto rounded-lg bg-[#0A0A0A] p-3 font-mono text-xs leading-relaxed sm:p-4 sm:text-sm">
          <code>
            <span className="text-green-400">git clone</span>
            <span className="text-white">
              {" https://github.com/coreyrab/pubthis.git"}
            </span>
            {"\n"}
            <span className="text-green-400">cd</span>
            <span className="text-white"> pubthis</span>
            {"\n"}
            <span className="text-green-400">npm install</span>
            {"\n"}
            <span className="text-green-400">npm run dev</span>
            {"\n\n"}
            <span className="text-white/50">
              {"# → pub listening on http://localhost:3000"}
            </span>
          </code>
        </pre>
        <p className="font-mono text-xs text-muted-foreground">
          Set{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">
            PUB_BASE_URL
          </code>{" "}
          to your domain. To point the plugin at your instance, set the{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-[10px]">
            PUBTHIS_API_URL
          </code>{" "}
          environment variable in your MCP server config.
        </p>
      </section>

      <Separator />

      {/* Supported content types */}
      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold">
          Supported content types
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "text/plain",
            "text/markdown",
            "text/html",
            "application/pdf",
            "image/png",
            "image/jpeg",
            "image/webp",
          ].map((ct) => (
            <Badge
              key={ct}
              variant="secondary"
              className="font-mono text-xs"
            >
              {ct}
            </Badge>
          ))}
        </div>
        <p className="font-mono text-sm text-muted-foreground">
          Binary types (PDF, images) should be sent as base64-encoded strings in
          the{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
            content
          </code>{" "}
          field.
        </p>
      </section>
    </div>
  );
}
