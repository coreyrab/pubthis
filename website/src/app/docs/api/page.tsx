import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Endpoint({
  method,
  path,
  description,
  children,
}: {
  method: string;
  path: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge
          className={
            method === "POST"
              ? "bg-tomato text-white font-mono text-xs"
              : "bg-[#0A0A0A] text-white font-mono text-xs"
          }
        >
          {method}
        </Badge>
        <code className="font-mono text-sm font-semibold">{path}</code>
      </div>
      <p className="font-mono text-sm text-muted-foreground">{description}</p>
      {children}
    </section>
  );
}

function Field({
  name,
  type,
  required,
  children,
}: {
  name: string;
  type: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <div className="flex items-center gap-2">
        <code className="font-mono text-sm font-medium">{name}</code>
        <Badge variant="outline" className="font-mono text-[10px]">
          {type}
        </Badge>
        {required && (
          <span className="font-mono text-[10px] text-tomato font-medium">
            required
          </span>
        )}
      </div>
      <p className="font-mono text-xs text-muted-foreground leading-relaxed">
        {children}
      </p>
    </div>
  );
}

export default function DocsApi() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-2xl font-bold tracking-tight">
          API Reference
        </h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          Two endpoints. That&apos;s the whole API.
        </p>
      </div>

      <Separator />

      {/* POST /v1/publish */}
      <Endpoint
        method="POST"
        path="/v1/publish"
        description="Publish an artifact and receive a shareable URL."
      >
        <Tabs defaultValue="request" className="w-full">
          <TabsList className="font-mono">
            <TabsTrigger value="request" className="font-mono text-xs">
              Request
            </TabsTrigger>
            <TabsTrigger value="response" className="font-mono text-xs">
              Response
            </TabsTrigger>
          </TabsList>
          <TabsContent value="request">
            <Card>
              <CardContent className="pt-4">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Request Body (JSON)
                </p>
                <div className="divide-y divide-border">
                  <Field name="content" type="string" required>
                    The artifact content. For text types, send as a UTF-8
                    string. For binary types (PDF, images), send as a
                    base64-encoded string.
                  </Field>
                  <Field name="content_type" type="string">
                    MIME type. Defaults to{" "}
                    <code className="rounded bg-secondary px-1 text-[10px]">
                      text/plain
                    </code>
                    . Supported:{" "}
                    <code className="text-[10px]">
                      text/plain, text/markdown, text/html, application/pdf,
                      image/png, image/jpeg, image/webp
                    </code>
                    .
                  </Field>
                  <Field name="ttl_seconds" type="integer">
                    Time-to-live in seconds. Min: 1, Max: 604800 (7 days).
                    Defaults to 604800.
                  </Field>
                </div>
              </CardContent>
            </Card>

            <pre className="mt-4 overflow-x-auto rounded-lg bg-[#0A0A0A] p-3 font-mono text-xs leading-relaxed sm:p-4 sm:text-sm">
              <code className="text-white/70">
                {"{\n"}
                {'  "content": "# Hello\\nWorld",\n'}
                {'  "content_type": "text/markdown",\n'}
                {'  "ttl_seconds": 86400\n'}
                {"}"}
              </code>
            </pre>
          </TabsContent>

          <TabsContent value="response">
            <Card>
              <CardContent className="pt-4">
                <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Response Body (201 Created)
                </p>
                <div className="divide-y divide-border">
                  <Field name="artifact_id" type="string">
                    Unique ULID identifier for the artifact.
                  </Field>
                  <Field name="url" type="string">
                    The shareable URL. Send this to anyone.
                  </Field>
                  <Field name="expires_at" type="string">
                    ISO 8601 timestamp when the artifact will be deleted.
                  </Field>
                  <Field name="content_type" type="string">
                    The resolved content type.
                  </Field>
                </div>
              </CardContent>
            </Card>

            <pre className="mt-4 overflow-x-auto rounded-lg bg-[#0A0A0A] p-3 font-mono text-xs leading-relaxed sm:p-4 sm:text-sm">
              <code className="text-white/70">
                {"{\n"}
                {'  "artifact_id": "01JABCDEFG",\n'}
                {'  "url": "'}
                <span className="text-green-400">
                  https://pubthis.co/a/01JABCDEFG
                </span>
                {'",\n'}
                {'  "expires_at": "2026-02-05T00:00:00Z",\n'}
                {'  "content_type": "text/markdown"\n'}
                {"}"}
              </code>
            </pre>
          </TabsContent>
        </Tabs>
      </Endpoint>

      <Separator />

      {/* GET /a/:id */}
      <Endpoint
        method="GET"
        path="/a/:id"
        description="Retrieve a published artifact by its ID."
      >
        <Card>
          <CardContent className="pt-4">
            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Path Parameters
            </p>
            <Field name="id" type="ULID" required>
              The 26-character artifact ID returned from the publish endpoint.
            </Field>

            <Separator className="my-4" />

            <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Response Headers
            </p>
            <div className="divide-y divide-border">
              <Field name="Content-Type" type="header">
                Matches the content type set during publish.
              </Field>
              <Field name="X-Content-Type-Options" type="header">
                Always{" "}
                <code className="rounded bg-secondary px-1 text-[10px]">
                  nosniff
                </code>
                .
              </Field>
              <Field name="Cache-Control" type="header">
                <code className="rounded bg-secondary px-1 text-[10px]">
                  public, max-age=3600
                </code>
              </Field>
            </div>
          </CardContent>
        </Card>

        <p className="font-mono text-sm text-muted-foreground">
          Returns the raw artifact content with the correct{" "}
          <code className="rounded bg-secondary px-1 text-xs">
            Content-Type
          </code>{" "}
          header. If the artifact has expired or doesn&apos;t exist, returns{" "}
          <Badge variant="outline" className="font-mono text-[10px]">
            404
          </Badge>
          .
        </p>
      </Endpoint>

      <Separator />

      {/* Error codes */}
      <section className="space-y-4">
        <h2 className="font-mono text-lg font-semibold">Error Codes</h2>
        <Card>
          <CardContent className="pt-4">
            <div className="divide-y divide-border">
              {[
                {
                  code: "400",
                  reason: "Invalid request body, missing content, or malformed artifact ID.",
                },
                {
                  code: "404",
                  reason: "Artifact not found or expired.",
                },
                {
                  code: "413",
                  reason: "Payload exceeds 10 MB limit.",
                },
                {
                  code: "415",
                  reason: "Content type not in the supported list.",
                },
                {
                  code: "429",
                  reason:
                    "Rate limited. 30 requests per minute per IP. Check the Retry-After header.",
                },
              ].map((err) => (
                <div key={err.code} className="flex gap-4 py-2">
                  <Badge
                    variant="outline"
                    className="shrink-0 font-mono text-xs"
                  >
                    {err.code}
                  </Badge>
                  <p className="font-mono text-xs text-muted-foreground">
                    {err.reason}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Rate limits */}
      <section className="space-y-3">
        <h2 className="font-mono text-lg font-semibold">Rate Limits</h2>
        <p className="font-mono text-sm text-muted-foreground leading-relaxed">
          The API enforces a sliding window rate limit of{" "}
          <span className="font-medium text-foreground">
            30 requests per minute
          </span>{" "}
          per IP address. When exceeded, the server returns{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
            429 Too Many Requests
          </code>{" "}
          with a{" "}
          <code className="rounded bg-secondary px-1.5 py-0.5 text-xs">
            Retry-After
          </code>{" "}
          header indicating how many seconds to wait.
        </p>
      </section>
    </div>
  );
}
