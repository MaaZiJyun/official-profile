"use client";

import { useState } from "react";

export default function CopyEmailButton({
  email,
  display,
}: {
  email: string;
  display?: string;
}) {
  const [copied, setCopied] = useState(false);

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1700);
    } catch (e) {
      // ignore - clipboard may be unavailable in some contexts
      console.error("copy failed", e);
    }
  };

  return (
    <button
      type="button"
      onClick={doCopy}
      aria-label={`Copy email ${email}`}
      className="mt-1 text-zinc-600 bg-transparent border-0 p-0 cursor-pointer"
    >
      <span className="select-none">{copied ? "Email has been copied ~" : display ?? email}</span>
    </button>
  );
}
