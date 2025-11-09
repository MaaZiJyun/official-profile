"use client";

import { useEffect, useState } from "react";

export default function ViewerClient({ tex, filename }: { tex: string; filename?: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Normalize some LaTeX environments that latex.js may not support directly.
  // Convert common display environments to \[ ... \] so the parser sees standard display math.
  const normalizeTex = (input: string) => {
    if (!input) return input;
    // Replace \begin{equation}, \begin{equations}, \begin{equation*}, \begin{align}, \begin{align*}
    // with \[ ... \]
    return input.replace(/\\begin\{(?:equation\*?|equations|align\*?)\}([\s\S]*?)\\end\{(?:equation\*?|equations|align\*?)\}/g, (_m, inner) => {
      return `\\[${inner.trim()}\\]`;
    });
  };

  useEffect(() => {
    let cancelled = false;

    async function ensureAndRender() {
      try {
        if (!(window as any).latex) {
          await new Promise<void>((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://cdn.jsdelivr.net/npm/latex.js@0.11.1/dist/latex.min.js";
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load latex.js"));
            document.head.appendChild(s);
          });
        }

        // Ensure the latex.js stylesheet is present so fallback/plaintext
        // representations are styled/hidden and the rendered math displays correctly.
        if (!document.querySelector('link[data-latexjs-stylesheet]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.jsdelivr.net/npm/latex.js@0.11.1/dist/css/latex.css';
          link.setAttribute('data-latexjs-stylesheet', '1');
          document.head.appendChild(link);
        }

        // Inject a small fix to hide KaTeX plaintext fallback elements
        // (class `katex-html`) which otherwise can show duplicate text like "tmax".
        if (!document.querySelector('style[data-latexjs-fix]')) {
          const st = document.createElement('style');
          st.setAttribute('data-latexjs-fix', '1');
          st.textContent = `
            /* Hide KaTeX plaintext fallback; keep MathML for accessibility */
            .katex-html { display: none !important; }
          `;
          document.head.appendChild(st);
        }

        // Inject scoped styling for rendered LaTeX content so headings, paragraphs,
        // and other elements have reasonable typography. Scoped to .latex-rendered.
        if (!document.querySelector('style[data-latexjs-theme]')) {
          const theme = document.createElement('style');
          theme.setAttribute('data-latexjs-theme', '1');
          theme.textContent = `
            /* Scoped LaTeX rendering styles */
            .latex-rendered { font-family: var(--site-font, Times New Roman), serif; color: #111827; line-height: 1.6; }
            .latex-rendered h1 { font-size: 1.5rem; font-weight: 700; margin-top: 0.75rem; margin-bottom: 0.5rem; }
            .latex-rendered h2 { font-size: 1.25rem; font-weight: 600; margin-top: 0.65rem; margin-bottom: 0.45rem; }
            .latex-rendered h3 { font-size: 1.15rem; font-weight: 600; margin-top: 0.5rem; margin-bottom: 0.35rem; }
            .latex-rendered p { margin: 0.5rem 0; text-align: justify;}
            .latex-rendered em { font-style: italic; }
            .latex-rendered strong { font-weight: 600; }
            .latex-rendered table { border-collapse: collapse; width: 100%; margin: 0.75rem 0; }
            .latex-rendered th, .latex-rendered td { border: 1px solid #e5e7eb; padding: 0.4rem 0.6rem; }
            .latex-rendered code { background: #f3f4f6; padding: 0.12rem 0.3rem; border-radius: 4px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Helvetica Neue', monospace; }
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
  // Preprocess tex to normalize unsupported environments
  const normalized = normalizeTex(tex);

  // @ts-ignore
  const generator = new latex.HtmlGenerator({ hyphenate: false });
  // @ts-ignore
  const doc = latex.parse(normalized, { generator }).htmlDocument();
        if (cancelled) return;
        setHtml(doc.documentElement.innerHTML);
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

  return (
    <div>
      <div className="latex-rendered mt-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
