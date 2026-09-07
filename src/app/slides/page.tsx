"use client";

import { useRouter } from "next/navigation";
import SlidePresentation from "@/components/SlidePresentation";

export default function SlidesPage() {
  const router = useRouter();

  return <SlidePresentation onClose={() => router.push("/")} />;
}
