"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % sections.length),
      8000
    );
    return () => clearInterval(t);
  }, [sections.length]);

  if (!sections || sections.length === 0) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + sections.length) % sections.length);
  const next = () => setIndex((i) => (i + 1) % sections.length);

  return (
    <div className="relative w-full">
      <div className="mb-2 flex justify-center gap-2">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-full rounded-full hover:cursor-pointer ${
              i === index ? "bg-zinc-800" : "bg-zinc-300"
            }`}
          />
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
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:cursor-pointer p-2"
      >
        ◀
      </button>
      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:cursor-pointer p-2"
      >
        ▶
      </button>
    </div>
  );
}
