"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the heavy client viewer inside a client component (no ssr issues)
const ViewerClient = dynamic(() => import("./ViewerClient"), { ssr: false });

export default function RenderClient({ tex, filename }: { tex: string; filename?: string }) {
  // Render the dynamic client viewer
  return <ViewerClient tex={tex} filename={filename} />;
}
