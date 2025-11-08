"use client";

import { useEffect, useState } from "react";

export default function TexViewerPage() {
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // load latex.js from CDN
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/latex.js@0.11.1/dist/latex.min.js";
    script.onload = async () => {
      try {
        const res = await fetch('/posts/sample.tex');
        const tex = await res.text();
        // @ts-ignore
        const latex = (window as any).latex;
        if (!latex) {
          setError('latex.js not available');
          return;
        }
        // latexjs: new latexjs.HtmlGenerator({ hyphenate: false })
        // @ts-ignore
        const generator = new latex.HtmlGenerator({ hyphenate: false });
        // @ts-ignore
        const document_ = latex.parse(tex, { generator: generator }).htmlDocument();
        setHtml(document_.documentElement.innerHTML);
      } catch (e: any) {
        setError(String(e));
      }
    };
    script.onerror = () => setError('Failed to load latex.js');
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!html) return <div>Loading preview...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">TeX Preview (sample.tex)</h1>
      <div className="mt-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
