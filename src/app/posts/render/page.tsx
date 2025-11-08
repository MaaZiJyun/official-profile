"use client";

import { useEffect, useState } from "react";
import ViewerClient from "../ViewerClient";

export default function RenderQueryPage() {
  const [tex, setTex] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const f = sp.get("file");
    if (!f) {
      setError("No file specified.");
      return;
    }
    setFile(f);
    fetch(`/posts/${encodeURIComponent(f)}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((t) => setTex(t))
      .catch((e) => setError(String(e)));
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!tex) return <div className="text-zinc-600">Loading...</div>;

  return <ViewerClient tex={tex} filename={file ?? undefined} />;
}
