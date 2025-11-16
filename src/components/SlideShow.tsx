"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

type Section = {
  image: string;
  subtitle?: string;
  description?: string;
};

export default function SlideShow({
  sections,
  link,
}: {
  sections: Section[];
  link: string;
}) {
  const [index, setIndex] = useState(0);
  const duration = 8000; // ms per slide
  const [progress, setProgress] = useState(0); // 0..1
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    // animation loop driving progress
    function step(ts: number) {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - (startRef.current || 0);
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      if (p >= 1) {
        setIndex((i) => (i + 1) % sections.length);
        startRef.current = ts;
        setProgress(0);
      }
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      startRef.current = null;
    };
  }, [sections.length]);

  if (!sections || sections.length === 0) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + sections.length) % sections.length);
  const next = () => setIndex((i) => (i + 1) % sections.length);

  // reset progress when user manually navigates
  const manualSetIndex = (i: number) => {
    setIndex(i);
    setProgress(0);
    startRef.current = null;
  };

  return (
    <div className="relative w-full">
      <div className="mb-2 flex justify-center gap-2 w-full">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => manualSetIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-2 w-full rounded-full overflow-hidden hover:cursor-pointer bg-zinc-300"
          >
            {/* already-seen slides are filled */}
            {i < index && <div className="absolute inset-0 bg-zinc-800" />}
            {/* active slide shows progress fill */}
            {i === index && (
              <div
                className="absolute left-0 top-0 bottom-0 bg-red-500"
                style={{ width: `${Math.round(progress * 100)}%`, transition: "width 120ms linear" }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl">
        <div className="relative h-[540px] bg-zinc-100">
          <Image
            src={sections[index].image}
            alt={sections[index].subtitle ?? ""}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open project website"
              className="absolute right-5 top-4 z-20 inline-flex items-center gap-2 rounded-full bg-red-600/50 p-3 text-white hover:bg-red-600/80"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </a>
          )}
          <div className="absolute left-4 bottom-4 right-4 text-white">
            <div className="text-xl font-semibold">
              {sections[index].subtitle}
            </div>
            <div className="mt-2 max-w-2xl">{sections[index].description}</div>
          </div>
        </div>
      </div>

      <button
        aria-label="Previous"
        onClick={() => {
          prev();
          setProgress(0);
          startRef.current = null;
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:cursor-pointer p-2"
      >
        ◀
      </button>
      <button
        aria-label="Next"
        onClick={() => {
          next();
          setProgress(0);
          startRef.current = null;
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:cursor-pointer p-2"
      >
        ▶
      </button>
    </div>
  );
}
