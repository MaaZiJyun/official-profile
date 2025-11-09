"use client";

import { useEffect, useState } from "react";

export default function ViewerClient({ tex, filename }: { tex: string; filename?: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

        // @ts-ignore
        const latex = (window as any).latex || (window as any).latexjs;
        if (!latex) throw new Error("latex.js not available on window");

        // Create generator and parse
        // @ts-ignore
        const generator = new latex.HtmlGenerator({ hyphenate: false });
        // @ts-ignore
        const doc = latex.parse(tex, { generator }).htmlDocument();
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
      {filename ? <h1 className="text-2xl font-bold">{filename}</h1> : null}
      <div className="mt-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
