"use client";

import { useEffect, useState } from "react";

export default function ViewerClient({
  tex,
  filename,
}: {
  tex: string;
  filename?: string;
}) {
  // Fallback: simple tabular -> HTML renderer for cases where latex.js fails
  const renderTabularToHtml = (raw: string, colSpec?: string) => {
    const letters = (colSpec || "").replace(/[^a-zA-Z]/g, "");
    const colCount = Math.max(1, letters.length || (raw.split('\\\\')[0] || '').split('&').length);
    const rows = raw
      .trim()
      .split(/\\\\\s*\n?/)
      .map((r: string) => r.trim())
      .filter((r: string) => r.length > 0);
    const esc = (s: string) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const latexGlobal = typeof window !== 'undefined' ? (window as any).latex || (window as any).latexjs : null;

    const htmlRows = rows
      .map((row: string) => {
        if (/^\\hline\s*$/.test(row)) {
          return `<tr class="hline"><td colspan="${colCount}" style="border-top:1px solid #e5e7eb;padding:0"></td></tr>`;
        }
        const rawCells = row
          .split(/&/g)
          .map((c: string) => c.replace(/\\hline/g, '').trim())
          .map((c: string) => c.replace(/^}+/, ''));

        // Pre-clean and macro-replace common text macros like \textbf, \emph
        const cleanAndReplace = (s: string) => {
          let t = s.trim();
          // simple replacements for common text macros
          t = t.replace(/\\textbf\{([^}]+)\}/g, '<strong>$1</strong>');
          t = t.replace(/\\textit\{([^}]+)\}/g, '<em>$1</em>');
          t = t.replace(/\\emph\{([^}]+)\}/g, '<em>$1</em>');
          // replace simple \% and escaped braces
          t = t.replace(/\\%/g, '%').replace(/\\\{/g, '{').replace(/\\\}/g, '}');
          return t;
        };

        // If latex.js is available, try to parse each cell so TeX (math/macros) is converted to HTML
        const cells = rawCells.map((c: string) => {
          const pre = cleanAndReplace(c);
          if (latexGlobal) {
            try {
              // @ts-ignore - use latex.js from window
              const gen = new latexGlobal.HtmlGenerator({ hyphenate: false });
              const wrapped = `\\documentclass{article}\n\\begin{document}\n${pre}\n\\end{document}`;
              // @ts-ignore
              const doc = latexGlobal.parse(wrapped, { generator: gen }).htmlDocument();
              let inner = doc.documentElement.innerHTML || '';
              // try to extract only the rendered body content
              const bodyMatch = inner.match(/<div class="body">([\s\S]*?)<\/div>/i);
              const bodyTagMatch = inner.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
              let bodyHtml = bodyMatch ? bodyMatch[1] : bodyTagMatch ? bodyTagMatch[1] : inner;
              // If latex.js escaped HTML like &lt;strong&gt; ... &lt;/strong&gt;, decode entities to restore tags
              if (/&lt;[a-zA-Z]/.test(bodyHtml) && typeof document !== 'undefined') {
                const dec = document.createElement('div');
                dec.innerHTML = bodyHtml;
                bodyHtml = dec.textContent || dec.innerHTML || bodyHtml;
                // after decoding entities, if we got literal tags like <strong>, allow them
                if (dec.textContent && /<strong>/.test(dec.textContent)) {
                  bodyHtml = dec.textContent;
                }
              }
              return bodyHtml;
            } catch (e) {
              // fall back to our macro-replaced HTML (do not escape tags so <strong> renders)
              return pre;
            }
          }
          return esc(pre);
        });

        while (cells.length < colCount) cells.push('');
        // If this row appears to be a header (all cells contain <strong> or are empty), render <th>
        const isHeader = cells.length > 0 && cells.every((c: string) => /<strong>|^\s*$/.test(c));
        if (isHeader) {
          return `<tr>${cells.map((c: string) => `<th>${c}</th>`).join('')}</tr>`;
        }
        return `<tr>${cells.map((c: string) => `<td>${c}</td>`).join('')}</tr>`;
      })
      .join('');
    return `<div class="latex-table"><table>${htmlRows}</table></div>`;
  };

  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Normalize some LaTeX environments that latex.js may not support directly.
  // Convert common display environments to \[ ... \] so the parser sees standard display math.
  const normalizeTex = (
    input: string,
    createToken?: (type: string, payload: any) => string
  ) => {
    if (!input) return input;

    let out = input;

    // ----------------------------------------------------
    // 0. Remove document-level commands
    // ----------------------------------------------------
    // Capture title/author/date if present so we can re-insert them as HTML later.
    let capturedTitle = "";
    let capturedAuthor = "";
    let capturedDate = "";
    const tMatch = out.match(/\\title\{([\s\S]*?)\}/);
    if (tMatch) capturedTitle = tMatch[1].trim();
    const aMatch = out.match(/\\author\{([\s\S]*?)\}/);
    if (aMatch) capturedAuthor = aMatch[1].trim();
    const dMatch = out.match(/\\date\{([\s\S]*?)\}/);
    if (dMatch) capturedDate = dMatch[1].trim();

    // Remove common document-level commands (but preserve title/author/date values captured above)
    const docLevelCommands = [
      /\\documentclass\{[\s\S]*?}/g,
      // keep usepackage lines so latex.js can see package-defined environments/macros
      /\\begin\{document\}/g,
      /\\end\{document\}/g,
      /\\tableofcontents/g,
      /\\bibliographystyle\{[\s\S]*?}/g,
      /\\bibliography\{[\s\S]*?}/g,
    ];
    for (const pattern of docLevelCommands) {
      out = out.replace(pattern, "");
    }

    // Replace \maketitle with a token so we can render title/author/date in HTML
    out = out.replace(/\\maketitle/g, () => {
      if (createToken) {
        return createToken("maketitle", {
          title: capturedTitle,
          author: capturedAuthor,
          date: capturedDate,
        });
      }
      return "";
    });

    // Clean out any leftover explicit title/author/date declarations
    out = out.replace(/\\title\{[\s\S]*?}/g, "");
    out = out.replace(/\\author\{[\s\S]*?}/g, "");
    out = out.replace(/\\date\{[\s\S]*?}/g, "");

    // ----------------------------------------------------
    // 0.5 Clean invalid unicode (critical!)
    // ----------------------------------------------------
    out = out
      // Replace all fancy hyphens with ASCII -
      .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015]/g, "-")
      // Remove soft hyphens (invisible troublemaker)
      .replace(/\u00AD/g, "");

    // Remove explicit \centering commands which latex.js often converts to
    // <p class="centering"> wrappers; we handle centering via CSS/DOM instead.
    out = out.replace(/\\centering/g, "");

    // ----------------------------------------------------
    // 1. Replace includegraphics (tokenize so latex.js won't escape HTML)
    // ----------------------------------------------------
    out = out.replace(
      /\\includegraphics(?:\[(.*?)\])?\{(.*?)\}/g,
      (_m, opts, path) => {
        if (createToken) {
          return createToken("img", {
            path,
            opts: (opts || "").replace(/\s+/g, " "),
          });
        }
        const encoded = encodeURIComponent(path);
        const safeOpts = (opts || "").replace(/\s+/g, " ");
        return `__IMG__${encoded}__OPT__${safeOpts}__END__`;
      }
    );

    // ----------------------------------------------------
    // 2. Replace figure floats (support [ht])
    // ----------------------------------------------------
    out = out.replace(
      /\\begin\{figure\*?\}(?:\[[^\]]*])?([\s\S]*?)\\end\{figure\*?\}/g,
      (_full, content) => {
        let inner = content;

        // Extract caption
        let captionText = "";
        inner = inner.replace(/\\caption\{([\s\S]*?)\}/, (_m: any, cap: string) => {
          captionText = cap.trim();
          return "";
        });

        // Remove \label
        inner = inner.replace(/\\label\{.*?\}/g, "");

        // If createToken is available, emit a caption token and return inner content so
        // latex.js can still parse the inner (which may include \includegraphics tokens).
        if (createToken) {
          const capToken = captionText ? createToken("cap", captionText) : "";
          return `${inner.trim()}\n\n${capToken}`;
        }

        const encCap = encodeURIComponent(captionText || "");
        return `__FIG__${inner.trim()}__CAP__${encCap}__END__`;
      }
    );

    // ----------------------------------------------------
    // 2.5 Replace table floats (extract inner tabular and caption)
    // ----------------------------------------------------
    out = out.replace(
      /\\begin\{table\*?\}(?:\[[^\]]*])?([\s\S]*?)\\end\{table\*?\}/g,
      (_full, content) => {
        let inner = content;

        // Extract caption
        let captionText = "";
        inner = inner.replace(/\\caption\{([\s\S]*?)\}/, (_m: any, cap: string) => {
          captionText = cap.trim();
          return "";
        });

        // Remove \label
        inner = inner.replace(/\\label\{.*?\}/g, "");

        if (createToken) {
          const capToken = captionText ? createToken("cap", captionText) : "";
          return `${inner.trim()}\n\n${capToken}`;
        }

        const encCap = encodeURIComponent(captionText || "");
        return `__FIG__${inner.trim()}__CAP__${encCap}__END__`;
      }
    );

    // ----------------------------------------------------
    // 2.75 Convert tabular environments to HTML tokens so latex.js won't error
    // ----------------------------------------------------
    out = out.replace(
      /\\begin\{tabular(?:\*?)\}\{([^}]*)\}([\s\S]*?)\\end\{tabular(?:\*?)\}/g,
      (_full, colSpec, innerContent) => {
        // crude column count: count letters in colSpec (l, c, r, p, m, b, X, etc.)
        const letters = (colSpec || "").replace(/[^a-zA-Z]/g, "");
        const colCount = Math.max(1, letters.length || (innerContent.split('\\\\')[0] || '').split('&').length);

        const rows = innerContent
          .trim()
          .split(/\\\\\s*\n?/)
          .map((r: string) => r.trim())
          .filter((r: string) => r.length > 0);

        const esc = (s: string) =>
          String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        const htmlRows = rows
          .map((row: string) => {
            if (/^\\hline\s*$/.test(row)) {
              // represent hline as a separator row
              return `<tr class="hline"><td colspan="${colCount}" style="border-top:1px solid #e5e7eb;padding:0"></td></tr>`;
            }
            const cells = row.split(/&/g).map((c: string) => esc(c.replace(/\\hline/g, '').trim()));
            // pad cells if fewer than colCount
            while (cells.length < colCount) cells.push('');
            return `<tr>${cells.map((c: string) => `<td>${c}</td>`).join('')}</tr>`;
          })
          .join('');

        const tableHtml = `<div class="latex-table"><table>${htmlRows}</table></div>`;

        if (createToken) {
          // store raw inner content and column spec so we can render cell TeX later
          return createToken('table', { raw: innerContent, colSpec });
        }
        return tableHtml;
      }
    );

    // ----------------------------------------------------
    // 3. Normalize math environments
    // ----------------------------------------------------
    out = out.replace(
      /\\begin\{(?:equation\*?|align\*?|equations)\}([\s\S]*?)\\end\{(?:equation\*?|align\*?|equations)\}/g,
      (_m, inner) => `\\[${inner.trim()}\\]`
    );

    // ----------------------------------------------------
    // 4. Remove unsupported environments
    // ----------------------------------------------------
    out = out.replace(
      /\\begin\{([a-zA-Z*]+)\}[\s\S]*?\\end\{\1\}/g,
      (full, env) => {
        // Keep table/tabular and common environments; remove only truly unsupported ones.
        const allowed = [
          "align",
          "align*",
          "equation",
          "equation*",
          "cases",
          // tables
          "table",
          "table*",
          "tabular",
          "tabular*",
          "tabularx",
          "longtable",
          // layout
          "center",
        ];
        if (allowed.includes(env)) return full;
        return "";
      }
    );

    // ----------------------------------------------------
    // 5. Escape underscores in non-math text
    // ----------------------------------------------------
    // Preserve underscores inside math: split by full math blocks ($...$, \[...\], \(...\))
    const mathSplit = /(\$[\s\S]*?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
    const tokens: string[] = [];
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = mathSplit.exec(out))) {
      if (m.index > lastIndex) tokens.push(out.slice(lastIndex, m.index));
      tokens.push(m[0]);
      lastIndex = m.index + m[0].length;
    }
    if (lastIndex < out.length) tokens.push(out.slice(lastIndex));

    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t.startsWith("$") || t.startsWith("\\[") || t.startsWith("\\(")) {
        // math block - leave unchanged
        continue;
      }
      tokens[i] = t.replace(/_/g, "\\_");
    }
    out = tokens.join("");

    // ----------------------------------------------------
    // 6. Cleanup blank lines
    // ----------------------------------------------------
    out = out.replace(/\n{3,}/g, "\n\n");

    return out;
  };

  useEffect(() => {
    let cancelled = false;

    async function ensureAndRender() {
      try {
        if (!(window as any).latex) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src =
              "https://cdn.jsdelivr.net/npm/latex.js@0.11.1/dist/latex.min.js";
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load latex.js"));
            document.head.appendChild(s);
          });
        }

        // Ensure the latex.js stylesheet is present so fallback/plaintext
        // representations are styled/hidden and the rendered math displays correctly.
        if (!document.querySelector("link[data-latexjs-stylesheet]")) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href =
            "https://cdn.jsdelivr.net/npm/latex.js@0.11.1/dist/css/latex.css";
          link.setAttribute("data-latexjs-stylesheet", "1");
          document.head.appendChild(link);
        }

        // Inject a small fix to hide KaTeX plaintext fallback elements
        // (class `katex-html`) which otherwise can show duplicate text like "tmax".
        if (!document.querySelector("style[data-latexjs-fix]")) {
          const st = document.createElement("style");
          st.setAttribute("data-latexjs-fix", "1");
          st.textContent = `
            /* Hide KaTeX plaintext fallback; keep MathML for accessibility */
            .katex-html { display: none !important; }
          `;
          document.head.appendChild(st);
        }

        // Inject scoped styling for rendered LaTeX content so headings, paragraphs,
        // and other elements have reasonable typography. Scoped to .latex-rendered.
        if (!document.querySelector("style[data-latexjs-theme]")) {
          const theme = document.createElement("style");
          theme.setAttribute("data-latexjs-theme", "1");
          theme.textContent = `
            /* Scoped LaTeX rendering styles */
            .latex-rendered { font-family: var(--site-font, Times New Roman), serif; color: #111827; line-height: 1.6; }
            .latex-rendered h1 { font-size: 1.5rem; font-weight: 700; margin-top: 0.75rem; margin-bottom: 0.5rem; }
            .latex-rendered h2 { font-size: 1.25rem; font-weight: 600; margin-top: 0.65rem; margin-bottom: 0.45rem; }
            .latex-rendered h3 { font-size: 1.15rem; font-weight: 600; margin-top: 0.5rem; margin-bottom: 0.35rem; }
            .latex-rendered p { margin: 0.5rem 0; text-align: justify;}
            .latex-rendered p.centering img { display:block; margin:0.6rem auto; }
            .latex-rendered div.latex-figure.centering img { display:block; margin:0.6rem auto; }
            .latex-rendered p > img { display:block; margin:0.6rem auto; }
            .latex-rendered img { max-width:100%; height:auto; }
            .latex-rendered em { font-style: italic; }
            .latex-rendered .bf { font-weight: 600; }
            .latex-rendered table { border-collapse: collapse; width: 100%; margin: 0.75rem 0; }
            .latex-rendered th, .latex-rendered td { border: 1px solid #e5e7eb; padding: 0.4rem 0.6rem; }
            .latex-rendered code { background: #f3f4f6; padding: 0.12rem 0.3rem; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Helvetica Neue', monospace; }
            .latex-rendered .katex-display  { font-size: 1.20rem; padding: 0.12rem 0.3rem; text-align: center; display: block; margin: 0.6rem 0; }
            .latex-rendered .katex-display > .katex { display: inline-block; }
            .latex-rendered .title { font-size: 1.75rem; font-weight: 700; text-align: center; margin-bottom: 1rem; }
            .latex-rendered .author { font-size: 1rem; text-align: center; }
            .latex-rendered .date { font-size: 1rem; text-align: center; }
          `;
          document.head.appendChild(theme);
        }

        // @ts-ignore
        const latex = (window as any).latex || (window as any).latexjs;
        if (!latex) throw new Error("latex.js not available on window");

        // Create generator and parse
        // Preprocess tex to normalize unsupported environments and capture tokens
        const tokenMap = new Map<string, any>();
        let tokenCounter = 0;
        const createToken = (type: string, payload: any) => {
          tokenCounter += 1;
          const t = `__TOKEN_${type.toUpperCase()}_${tokenCounter}__`;
          tokenMap.set(t, { type: type.toLowerCase(), payload });
          return t;
        };

  // @ts-ignore
  const normalized = normalizeTex(tex, createToken);

        // @ts-ignore
        const generator = new latex.HtmlGenerator({ hyphenate: false });
        // Ensure we pass a full LaTeX document to latex.parse
        const wrapIfNeeded = (s: string) => {
          if (/\\begin\{document\}/.test(s)) return s;
          // extract any \usepackage lines and remove them from body so they appear only in preamble
          const pkgsArr = s.match(/\\usepackage\{[^}]+\}/g) || [];
          const pkgs = pkgsArr.join("\n");
          const body = s.replace(/\\usepackage\{[^}]+\}\s*/g, "");
          return `\\documentclass{article}\n${pkgs}\n\\begin{document}\n${body}\n\\end{document}`;
        };

        const wrapped = wrapIfNeeded(normalized);
        // @ts-ignore
        const doc = latex.parse(wrapped, { generator }).htmlDocument();
        if (cancelled) return;

        let outHtml = doc.documentElement.innerHTML;

        // Post-process token placeholders using tokenMap
        // Work with a DOM to safely transform centering paragraphs to figure containers
        const temp = document.createElement("div");
        temp.innerHTML = outHtml;

        // Convert only <p class="centering"> that contain an <img> into
        // <div class="latex-figure centering">...</div> so we don't accidentally
        // convert later paragraphs when the HTML structure is unusual.
        temp.querySelectorAll("p.centering").forEach((p) => {
          // only transform if there's at least one image inside
          if (!p.querySelector("img")) return;
          const div = document.createElement("div");
          div.className = "latex-figure centering";
          // move children
          while (p.firstChild) div.appendChild(p.firstChild);
          p.parentNode?.replaceChild(div, p);
        });

        let processedHtml = temp.innerHTML;

        // Replace tokens with corresponding HTML for the new tokenMap format
        processedHtml = processedHtml.replace(
          /__TOKEN_([A-Z]+)_(\d+)__/g,
          (m: string) => {
            const entry = tokenMap.get(m);
            if (!entry) return "";
            const { type, payload } = entry;
            if (type === "maketitle") {
              const t = String(payload.title || "").trim();
              const a = String(payload.author || "").trim();
              const d = String(payload.date || "").trim();
              return `<div class=\"post-maketitle\" style=\"text-align:center; margin-bottom:1rem;\">${
                t
                  ? `<div class=\"title\" style=\"font-size:1.5rem; font-weight:700;\">${t}</div>`
                  : ""
              }${
                a
                  ? `<div class=\"author\" style=\"margin-top:0.25rem;\">${a}</div>`
                  : ""
              }${
                d
                  ? `<div class=\"date\" style=\"margin-top:0.15rem; color:#6b7280;\">${d}</div>`
                  : ""
              }</div>`;
            }
            if (type === "img") {
              // Build a safe image tag
              const src = payload.path || "";
              let style = "";
              if (payload.opts) {
                const wMatch = (payload.opts || "").match(
                  /width\s*=\s*([^,\]]+)/
                );
                if (wMatch) {
                  const w = wMatch[1].trim();
                  if (w.includes("textwidth")) {
                    const num = parseFloat(w);
                    if (!isNaN(num)) style = `max-width:${num * 100}%`;
                  } else {
                    style = `width:${w}`;
                  }
                }
              }
              const escapedSrc = String(src).replace(/"/g, "%22");
              return `<img src="${escapedSrc}" alt="" style="${style}" />`;
            }
            if (type === "cap") {
              const cap = String(payload || "");
              const esc = cap.replace(
                /[&<>"]/g,
                (c) =>
                  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[
                    c
                  ] || c)
              );
              return `<div style="font-weight:600; margin-top:0.5rem; text-align:center;">${esc}</div>`;
            }
            if (type === "table") {
              try {
                const rawInner = String(payload.raw || "");
                const colSpec = String(payload.colSpec || "");
                // Build a minimal tabular wrapper to let latex.js parse inner cells
                const fake = `\\begin{tabular}{${colSpec}}${rawInner}\\end{tabular}`;
                // @ts-ignore
                const gen = new latex.HtmlGenerator({ hyphenate: false });
                const fakeWrapped = wrapIfNeeded(fake);
                // @ts-ignore
                const doc2 = latex.parse(fakeWrapped, { generator: gen }).htmlDocument();
                const innerHtml = doc2.documentElement.innerHTML;
                // If latex.js didn't produce a table, fall back to simple renderer
                if (!innerHtml || innerHtml.indexOf("<table") === -1) {
                  return renderTabularToHtml(rawInner, colSpec);
                }
                return innerHtml;
              } catch (e) {
                // fallback to simple tabular->HTML renderer
                return renderTabularToHtml(String(payload.raw || ""), String(payload.colSpec || ""));
              }
            }
            return "";
          }
        );

        // Legacy fallback: handle older token formats left over in some posts
        // Replace __IMG__encoded__OPT__opts__END__
        processedHtml = processedHtml.replace(
          /__IMG__([^_]+?)__OPT__([^_]*?)__END__/g,
          (_m: string, encPath: string, opts: string) => {
            try {
              const p = decodeURIComponent(encPath);
              let style = "";
              const wMatch = (opts || "").match(/width\s*=\s*([^,\]]+)/);
              if (wMatch) {
                const w = wMatch[1].trim();
                if (w.includes("textwidth")) {
                  const num = parseFloat(w);
                  if (!isNaN(num)) style = `max-width:${num * 100}%`;
                } else {
                  style = `width:${w}`;
                }
              }
              return `<img src="${p}" alt="" style="${style}" />`;
            } catch (e) {
              return "";
            }
          }
        );

        // Legacy figure tokens: __FIG__inner__CAP__encodedCaption__END__
        processedHtml = processedHtml.replace(
          /__FIG__([\s\S]*?)__CAP__([^_]*?)__END__/g,
          (_m: string, inner: string, encCap: string) => {
            const cap = decodeURIComponent(encCap || "");
            return `<div style="text-align:center; margin:1rem 0;">${inner}${
              cap
                ? `<div style=\"font-weight:600; margin-top:0.5rem;\">${cap}</div>`
                : ""
            }</div>`;
          }
        );

        // For debugging: expose normalized text and token map via window if requested
        try {
          const qp = new URLSearchParams(window.location.search || "");
          if (qp.get("debug") === "latex") {
            (window as any).__latex_debug = { normalized, tokenMap: Array.from(tokenMap.entries()) };
          }
        } catch (e) {}

        setHtml(processedHtml);
      } catch (e: any) {
        if (!cancelled) setError(String(e));
      }
    }

    ensureAndRender();
    return () => {
      cancelled = true;
    };
  }, [tex]);

  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!html) return <div>Rendering...</div>;

  // If debug mode was enabled, show normalized/text/tokenMap from window.__latex_debug
  const qp = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const debugOn = qp?.get("debug") === "latex";
  const dbg: any = typeof window !== "undefined" ? (window as any).__latex_debug : null;

  return (
    <div>
      {debugOn && dbg && (
        <details className="mb-4 p-3 bg-gray-50 border rounded">
          <summary className="font-semibold">LaTeX debug (normalized & tokens)</summary>
          <div style={{ maxHeight: 300, overflow: "auto", whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
            <h4>normalized:</h4>
            <pre>{String(dbg.normalized || "")}</pre>
            <h4>tokens (table payloads):</h4>
            <pre>{JSON.stringify(dbg.tokenMap?.filter((t: any) => String(t[1].type) === "table") || [], null, 2)}</pre>
          </div>
        </details>
      )}

      <div
        className="latex-rendered mt-4 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
