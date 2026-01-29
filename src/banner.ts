import { marked } from "marked";

const BANNER_STYLES = `
  position:fixed;bottom:0;left:0;right:0;height:32px;
  background:#000;color:#fff;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;
  font-size:12px;display:flex;align-items:center;justify-content:center;
  gap:4px;z-index:2147483647;letter-spacing:0.02em;
`.replace(/\n/g, "");

const BANNER_HTML = `<div style="${BANNER_STYLES}">published with <a href="https://pubit.ai" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;text-underline-offset:2px;">pubit.ai</a></div>`;

const BODY_PADDING = `<style>body{padding-bottom:40px}</style>`;

/**
 * Inject the pub banner into an existing HTML document.
 * Inserts before </body> if present, otherwise appends.
 */
export function wrapHtmlWithBanner(html: string): string {
  const payload = BODY_PADDING + BANNER_HTML;
  const idx = html.toLowerCase().indexOf("</body>");
  if (idx !== -1) {
    return html.slice(0, idx) + payload + html.slice(idx);
  }
  return html + payload;
}

const MARKDOWN_STYLES = `
  :root { --creme: #FFFEFC; --fg: #1a1a1a; --muted: #6b6b6b; --tomato: #E54D2E; --border: #e8e8e6; --code-bg: #0A0A0A; --inline-code-bg: #f4f4f2; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    max-width: 720px; margin: 0 auto; padding: 3rem 1.5rem 4rem;
    color: var(--fg); background: var(--creme);
    line-height: 1.75; font-size: 16px;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h5, h6 { line-height: 1.3; font-weight: 600; color: var(--fg); }
  h1 { font-size: 2rem; margin: 2.5rem 0 1rem; letter-spacing: -0.02em; }
  h2 { font-size: 1.5rem; margin: 2rem 0 0.75rem; letter-spacing: -0.01em; }
  h3 { font-size: 1.17rem; margin: 1.5rem 0 0.5rem; }
  h4, h5, h6 { font-size: 1rem; margin: 1.25rem 0 0.5rem; }
  h1:first-child { margin-top: 0; }
  p { margin: 0 0 1rem; }
  a { color: var(--tomato); text-decoration: underline; text-underline-offset: 2px; }
  a:hover { opacity: 0.8; }
  strong { font-weight: 600; }
  em { font-style: italic; }

  ul, ol { margin: 0 0 1rem; padding-left: 1.5rem; }
  li { margin: 0.25rem 0; }
  li > ul, li > ol { margin: 0.25rem 0 0; }

  blockquote {
    border-left: 3px solid var(--tomato); margin: 1.5rem 0; padding: 0.5rem 0 0.5rem 1.25rem;
    color: var(--muted); font-style: italic;
  }
  blockquote p { margin: 0; }

  pre {
    background: var(--code-bg); color: #e0e0e0; border-radius: 8px;
    padding: 1.25rem; margin: 1.5rem 0; overflow-x: auto;
    font-family: ui-monospace, SFMono-Regular, Menlo, "Cascadia Code", monospace;
    font-size: 0.875rem; line-height: 1.6;
  }
  pre code { background: none; padding: 0; border-radius: 0; font-size: inherit; color: inherit; }

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, "Cascadia Code", monospace;
    background: var(--inline-code-bg); padding: 0.15rem 0.4rem; border-radius: 4px;
    font-size: 0.875em;
  }

  hr { border: none; border-top: 1px solid var(--border); margin: 2rem 0; }

  table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.925rem; }
  th, td { padding: 0.6rem 0.75rem; text-align: left; border-bottom: 1px solid var(--border); }
  th { font-weight: 600; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--muted); }
  tr:last-child td { border-bottom: none; }

  img { max-width: 100%; height: auto; border-radius: 8px; margin: 1rem 0; }
`.replace(/\n/g, "");

/**
 * Render markdown to a fully styled HTML page with the pub banner.
 */
export function wrapMarkdownWithBanner(markdown: string): string {
  const rendered = marked.parse(markdown, { async: false }) as string;

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${MARKDOWN_STYLES}</style></head><body>${rendered}${BANNER_HTML}</body></html>`;
}
