import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-4xl flex-col px-4 py-8 sm:px-6 sm:py-12 md:flex-row">
      <DocsSidebar />
      <article className="min-w-0 flex-1">{children}</article>
    </div>
  );
}
