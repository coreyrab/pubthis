import { marked } from "marked";

export interface OgTags {
  og_title?: string;
  og_description?: string;
  og_url?: string;
}

function buildOgMetaTags(og: OgTags): string {
  const tags: string[] = [];
  const title = og.og_title || "Shared via /pub";
  const desc = og.og_description || "A shared document on pubthis.co";

  // Open Graph
  tags.push(`<meta property="og:title" content="${escapeAttr(title)}">`);
  tags.push(`<meta property="og:description" content="${escapeAttr(desc)}">`);
  tags.push(`<meta property="og:type" content="article">`);
  tags.push(`<meta property="og:site_name" content="/pub">`);
  if (og.og_url) {
    tags.push(`<meta property="og:url" content="${escapeAttr(og.og_url)}">`);
  }

  // Twitter Card
  tags.push(`<meta name="twitter:card" content="summary">`);
  tags.push(`<meta name="twitter:title" content="${escapeAttr(title)}">`);
  tags.push(`<meta name="twitter:description" content="${escapeAttr(desc)}">`);

  return tags.join("");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const BANNER_STYLES = `
  position:fixed;top:0;left:0;right:0;height:32px;
  background:#000;color:#fff;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;
  font-size:12px;display:flex;align-items:center;justify-content:center;
  gap:4px;z-index:2147483647;letter-spacing:0.02em;
`.replace(/\n/g, "");

const BANNER_HTML = `<div style="${BANNER_STYLES}">published with <a href="https://pubthis.co" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;text-underline-offset:2px;">/pub</a></div>`;

const SHARE_BTN_STYLES = `
  background:none;border:1px solid rgba(255,255,255,0.3);color:#fff;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;
  padding:2px 10px;border-radius:4px;cursor:pointer;letter-spacing:0.02em;
  transition:border-color 0.15s;
`.replace(/\n/g, "");

export interface LocalBannerOpts {
  contentType: string;
  publishUrl: string;
  rawContent: string;
}

const LINK_STYLES = `
  color:#fff;text-decoration:underline;text-underline-offset:2px;
  font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;
  letter-spacing:0.02em;cursor:pointer;background:none;border:none;padding:0;
`.replace(/\n/g, "");

function buildLocalBannerHtml(opts: LocalBannerOpts): string {
  // Embed the raw content as base64 in a data attribute to avoid escaping issues
  const encodedContent = Buffer.from(opts.rawContent, "utf-8").toString("base64");

  // Share button centered. After publish: transforms into the actual URL link.
  // Click the link → copies to clipboard, flashes "Copied!"
  const script = `<script>(function(){var btn=document.getElementById('pub-share-btn');var link=document.getElementById('pub-link');var prefix=document.getElementById('pub-brand-prefix');var state='ready';btn.addEventListener('click',function(){if(state!=='ready')return;state='sharing';btn.textContent='Sharing...';btn.style.opacity='0.6';btn.style.cursor='wait';var raw=atob(document.getElementById('pub-raw-content').dataset.content);fetch('${opts.publishUrl}',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({content:raw,content_type:'${opts.contentType}'})}).then(function(r){return r.json()}).then(function(data){state='shared';btn.style.display='none';link.style.display='inline';link.textContent=data.url;link.dataset.url=data.url;link.href=data.url;prefix.textContent='published with ';navigator.clipboard.writeText(data.url)}).catch(function(){state='ready';btn.textContent='Share \\u2197';btn.style.opacity='1';btn.style.cursor='pointer'})});link.addEventListener('click',function(e){e.preventDefault();navigator.clipboard.writeText(link.dataset.url).then(function(){var u=link.dataset.url;link.textContent='Copied!';setTimeout(function(){link.textContent=u},1500)})})})()</script>`;

  const hiddenData = `<div id="pub-raw-content" data-content="${encodedContent}" style="display:none"></div>`;

  const LOCAL_BANNER_STYLES = BANNER_STYLES.replace("justify-content:center", "justify-content:space-between;padding:0 12px");
  const brandLink = `<a href="https://pubthis.co" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline;text-underline-offset:2px;">/pub</a>`;
  const pubLabel = `<span id="pub-brand"><span id="pub-brand-prefix"></span>${brandLink}</span>`;

  return `<div style="${LOCAL_BANNER_STYLES}"><span><button id="pub-share-btn" style="${SHARE_BTN_STYLES}">Share &#8599;</button><a id="pub-link" href="#" style="${LINK_STYLES}display:none;"></a></span>${pubLabel}</div>${hiddenData}${script}`;
}

const BODY_PADDING = `<style>body{padding-top:40px}</style>`;

/**
 * Inject the pub banner and OG meta tags into an existing HTML document.
 * Inserts OG tags before </head>, banner before </body>.
 */
export function wrapHtmlWithBanner(html: string, og?: OgTags): string {
  let result = html;

  // Inject OG meta tags into <head>
  if (og) {
    const ogTags = buildOgMetaTags(og);
    const headIdx = result.toLowerCase().indexOf("</head>");
    if (headIdx !== -1) {
      result = result.slice(0, headIdx) + ogTags + result.slice(headIdx);
    }
  }

  // Inject banner before </body>
  const payload = BODY_PADDING + BANNER_HTML;
  const bodyIdx = result.toLowerCase().indexOf("</body>");
  if (bodyIdx !== -1) {
    return result.slice(0, bodyIdx) + payload + result.slice(bodyIdx);
  }
  return result + payload;
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
 * Render markdown to a fully styled HTML page with the pub banner and OG meta tags.
 */
export function wrapMarkdownWithBanner(markdown: string, og?: OgTags): string {
  const rendered = marked.parse(markdown, { async: false }) as string;
  const ogTags = og ? buildOgMetaTags(og) : "";

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${ogTags}<style>${MARKDOWN_STYLES}</style></head><body>${rendered}${BANNER_HTML}</body></html>`;
}

// ---------------------------------------------------------------------------
// Local preview mode — includes Share button with inline JS
// ---------------------------------------------------------------------------

/**
 * Inject the local-mode banner (with Share button) into an existing HTML document.
 */
export function wrapHtmlWithLocalBanner(html: string, opts: LocalBannerOpts): string {
  const payload = BODY_PADDING + buildLocalBannerHtml(opts);
  const idx = html.toLowerCase().indexOf("</body>");
  if (idx !== -1) {
    return html.slice(0, idx) + payload + html.slice(idx);
  }
  return html + payload;
}

/**
 * Render markdown to a fully styled HTML page with the local-mode Share banner.
 */
export function wrapMarkdownWithLocalBanner(markdown: string, opts: LocalBannerOpts): string {
  const rendered = marked.parse(markdown, { async: false }) as string;

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${MARKDOWN_STYLES}</style></head><body>${rendered}${buildLocalBannerHtml(opts)}${BODY_PADDING}</body></html>`;
}
