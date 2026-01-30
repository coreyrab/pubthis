"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/docs", label: "Quickstart" },
  { href: "/docs/api", label: "API Reference" },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="mb-6 shrink-0 md:mb-0 md:w-48 md:pr-8">
      <nav className="flex flex-row flex-wrap gap-1 md:sticky md:top-8 md:flex-col">
        <span className="mb-1 w-full font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground md:mb-2">
          Documentation
        </span>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md px-3 py-1.5 font-mono text-sm transition-colors",
              pathname === link.href
                ? "bg-secondary text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
