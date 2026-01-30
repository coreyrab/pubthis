const faqs = [
  {
    question: "What is pubthis?",
    answer:
      "pubthis is a publishing tool for Claude Code. It takes local content — markdown, HTML, PDFs, images, plain text — and publishes it to a temporary, shareable URL. Think of it as ngrok for AI artifacts.",
  },
  {
    question: "How long do links last?",
    answer:
      "All published artifacts expire after 7 days by default. You can set a shorter TTL, but the maximum is 7 days. There is no permanent hosting.",
  },
  {
    question: "Is published content public?",
    answer:
      "Yes. All artifacts are world-readable. Anyone with the link can view the content. Never publish secrets, API keys, or credentials.",
  },
  {
    question: "Can I update a published artifact?",
    answer:
      "No. Artifacts are immutable. To update content, publish a new artifact and share the new link.",
  },
  {
    question: "What content types are supported?",
    answer:
      "Markdown, HTML, plain text, PDF, PNG, JPEG, and WebP. Markdown is rendered with styling, HTML is served in a sandbox, and everything else is served as-is.",
  },
  {
    question: "Do I need an API key?",
    answer:
      "No. pubthis has no authentication. Install the Claude Code plugin and start publishing.",
  },
  {
    question: "Can I self-host pubthis?",
    answer:
      "Yes. Clone the repo, configure storage, and run the server. See the docs for details.",
  },
];

export function FAQ() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24">
      <h2 className="font-mono text-lg font-semibold mb-8">
        faq<span className="text-tomato">.</span>
      </h2>
      <dl className="space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question}>
            <dt className="font-mono text-sm font-semibold">{faq.question}</dt>
            <dd className="mt-1 font-mono text-xs text-muted-foreground leading-relaxed">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
