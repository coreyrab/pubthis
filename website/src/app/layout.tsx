import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { OpenPanelComponent } from "@openpanel/nextjs";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pubthis.co"),
  title: "/pub — publish Claude Code chats",
  description:
    "Publish chats, markdown files, prototypes, and documents directly from Claude Code. Get a temporary, shareable link for easy sharing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OpenPanelComponent
          clientId="dca1a161-2da1-42a3-ae91-965da5b71670"
          trackScreenViews={true}
          trackAttributes={true}
          trackOutgoingLinks={true}
        />
        <Nav />
        {children}
      </body>
    </html>
  );
}
