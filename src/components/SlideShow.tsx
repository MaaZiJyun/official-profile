"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useLanguage } from "@/components/LanguageProvider";

type Section = {
  image: string;
  subtitle?: string;
  description?: string;
};

const isVideoSource = (source: string) =>
  /\.(webm|mp4|ogg|mov)(?:[?#]|$)/i.test(source);

export default function SlideShow({
  sections,
  link,
}: {
  sections: Section[];
  link: string;
}) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const duration = 8000; // ms per slide
  const [progress, setProgress] = useState(0); // 0..1
  const [isLoading, setIsLoading] = useState(true);
  const [mediaError, setMediaError] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const currentSource = sections[index]?.image ?? "";
  const currentIsVideo = isVideoSource(currentSource);

  useEffect(() => {
    if (sections.length <= 1 || isLoading || currentIsVideo) return;

    // animation loop driving progress
    function step(ts: number) {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - (startRef.current || 0);
      const p = Math.min(1, elapsed / duration);
      setProgress(p);
      if (p >= 1) {
        setIsLoading(true);
        setMediaError(false);
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
  }, [currentIsVideo, isLoading, sections.length]);

  if (!sections || sections.length === 0) return null;

  const goTo = (newIndex: number) => {
    if (newIndex === index) return;
    setIsLoading(true);
    setMediaError(false);
    setIndex(newIndex);
    setProgress(0);
    startRef.current = null;
  };

  const prev = () => goTo((index - 1 + sections.length) % sections.length);
  const next = () => goTo((index + 1) % sections.length);

  const handleMediaReady = () => {
    setIsLoading(false);
    setMediaError(false);
    startRef.current = null;
  };

  const handleMediaError = () => {
    setIsLoading(false);
    setMediaError(true);
  };

  return (
    <div className="relative w-full">
      <div className="mb-2 flex justify-center gap-2 w-full">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`${t("goToSlide")} ${i + 1}`}
            className="relative h-2 w-full rounded-full overflow-hidden hover:cursor-pointer bg-zinc-300"
          >
            {/* already-seen slides are filled */}
            {i < index && <div className="absolute inset-0 bg-zinc-800" />}
            {/* active slide shows progress fill */}
            {i === index && (
              <div
                className="absolute left-0 top-0 bottom-0 bg-red-500"
                style={{
                  width: `${Math.round(progress * 100)}%`,
                  transition: "width 120ms linear",
                }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl">
        <div
          className="relative h-[540px] bg-zinc-900"
          aria-busy={isLoading}
        >
          {currentIsVideo ? (
            <video
              key={currentSource}
              src={currentSource}
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
              aria-label={sections[index].subtitle ?? t("projectVideo")}
              onLoadedData={handleMediaReady}
              onError={handleMediaError}
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                if (Number.isFinite(video.duration) && video.duration > 0) {
                  setProgress(video.currentTime / video.duration);
                }
              }}
              onEnded={() => {
                if (sections.length > 1) next();
              }}
              className={`h-full w-full object-contain transition-opacity duration-200 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          ) : (
            <Image
              key={currentSource}
              src={currentSource}
              alt={sections[index].subtitle ?? ""}
              fill
              sizes="(max-width: 768px) 100vw, 960px"
              onLoad={handleMediaReady}
              onError={handleMediaError}
              className={`object-cover transition-opacity duration-200 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
            />
          )}

          {isLoading && (
            <div
              role="status"
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-zinc-900 text-sm text-white"
            >
              <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
              <span>{t("loadingMedia")}</span>
            </div>
          )}

          {mediaError && (
            <div
              role="alert"
              className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900 px-6 text-center text-white"
            >
              {t("mediaError")}
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("openProjectWebsite")}
              className="absolute right-5 top-4 z-20 inline-flex items-center gap-2 rounded-full bg-red-600/50 p-3 text-white hover:bg-red-600/80"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </a>
          )}
          <div className="pointer-events-none absolute bottom-4 left-4 right-4 text-white">
            <div className="text-xl font-semibold">
              {sections[index].subtitle}
            </div>
            <div className="mt-2 max-w-2xl">{sections[index].description}</div>
          </div>
        </div>
      </div>

      <button
        aria-label={t("previous")}
        onClick={prev}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:cursor-pointer hover:bg-black/50"
      >
        ◀
      </button>
      <button
        aria-label={t("next")}
        onClick={next}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:cursor-pointer hover:bg-black/50"
      >
        ▶
      </button>
    </div>
  );
}
