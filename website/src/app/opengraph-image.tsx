import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "/pub — publish directly from Claude Code";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0A0A0A",
          color: "white",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.4)",
            marginBottom: 24,
          }}
        >
          pubthis.co
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          publish directly
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          from Claude Code
          <span style={{ color: "#FF6347" }}>.</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.5)",
            marginTop: 32,
            lineHeight: 1.4,
          }}
        >
          Get a temporary, shareable link for chats, markdown, HTML, and more.
        </div>
      </div>
    ),
    { ...size }
  );
}
