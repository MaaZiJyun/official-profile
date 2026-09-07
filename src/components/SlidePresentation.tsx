"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";

// ── Slide data ──────────────────────────────────────────────────────
interface Slide {
  id: string;
  content: React.ReactNode;
}

// You can edit the slides below with your own content.
const slides: Slide[] = [
  {
    id: "welcome",
    content: (
      <div className="flex flex-col items-center justify-center min-h-full text-center px-6">
        {/* decorative accent */}
        <div className="mb-10 w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          MA Zhiyuan
        </h1>
        <p className="mt-3 text-3xl md:text-4xl tracking-widest text-white">
          馬致遠
        </p>
        <p className="mt-6 text-lg md:text-xl text-white/50 max-w-xl">
          Blockchain · Software Engineering · IoT & Edge Computing
        </p>
        <div className="mt-10 w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
        <p className="mt-6 text-sm text-white/50">press ↓ or click to begin</p>
      </div>
    ),
  },
  {
    id: "about",
    content: (
      <div className="flex flex-col items-center justify-center min-h-full px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          About Me
        </h2>
        <div className="space-y-4 text-base md:text-lg text-zinc-200 leading-relaxed text-justify">
          <p>
            I received my Master&rsquo;s degree in{" "}
            <span className="font-semibold text-white">Blockchain Technology</span> at
            The Hong Kong Polytechnic University (PolyU) in March 2026, and my
            Bachelor&rsquo;s degree in{" "}
            <span className="font-semibold text-white">Software Engineering</span> from
            Universiti Putra Malaysia (UPM) in September 2024.
          </p>
          <p>
            I am passionate about applying technology to solve real-world
            problems in science, education, and healthcare.
          </p>
          <p>
            I am an ENTJ/INTJ personality type. My hobbies include reading,
            hiking, composing music, and playing violin. My native language is
            Chinese Mandarin, and I am fluent in English with an IELTS score of
            7.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "skills",
    content: (
      <div className="flex flex-col items-center justify-center min-h-full px-6 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">
          Skills &amp; Technologies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {[
            {
              cat: "Languages",
              items: "TypeScript, Python, Java, Solidity",
            },
            {
              cat: "Frontend",
              items: "React, Next.js, Tailwind CSS, HTML/CSS",
            },
            {
              cat: "Backend & DB",
              items: "FastAPI, PostgreSQL, MySQL",
            },
            {
              cat: "Blockchain",
              items: "Ethereum, Solidity, Hardhat, Web3.js",
            },
            {
              cat: "DevOps & Tools",
              items: "Docker, Github, Linux, Figma",
            },
            {
              cat: "AI & ML",
              items: "Reinforcement Learning",
            },
          ].map((g) => (
            <div
              key={g.cat}
              className="rounded-lg border border-white/15 bg-white/5 p-4"
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-white">
                {g.cat}
              </p>
              <p className="mt-2 text-zinc-200">{g.items}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "experience",
    content: (
      <div className="flex flex-col items-center justify-center min-h-full px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">
          Projects &amp; Experience
        </h2>
        <div className="space-y-6 w-full">
          {[
            {
              title: "S.C.O.P.E.",
              desc: "Satellite simulation platform combining IoT, edge computing, and reinforcement learning for resource optimisation.",
            },
            {
              title: "Smart Cradle",
              desc: "IoT-enabled baby monitoring system with real-time sensor data, alerts, and a mobile dashboard.",
            },
            {
              title: "Momcare",
              desc: "Pregnancy health application providing tracking, reminders, and educational resources for expectant mothers.",
            },
            {
              title: "EOS Credit",
              desc: "Decentralised credit evaluation and loan platform built on blockchain technology.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="border-l-4 border-white/50 pl-4 py-1"
            >
              <p className="text-lg font-semibold text-white">{p.title}</p>
              <p className="text-zinc-300 text-sm mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "research",
    content: (
      <div className="flex flex-col items-center justify-center min-h-full px-6 py-16 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
          Research Interests
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Software Engineering",
            "Reinforcement Learning",
            "Internet of Things (IoT)",
            "Edge Computing",
            "Blockchain & DLT",
            "Mobile & Web App Development",
            "Resource Optimisation",
          ].map((topic) => (
            <span
              key={topic}
              className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm md:text-base text-white/80"
            >
              {topic}
            </span>
          ))}
        </div>
        <p className="mt-10 text-zinc-300 text-sm max-w-xl text-center">
          Particularly interested in the intersection of these fields to create
          impactful, real-world solutions in science, education, and healthcare.
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    content: (
      <div className="flex flex-col items-center justify-center min-h-full text-center px-6">
        <div className="mb-10 w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Thank You</h2>
        <div className="space-y-3 text-base md:text-lg text-zinc-200">
          <p>
            <span className="text-white">Email</span>{" "}
            <a
              href="mailto:maazijyun@gmail.com"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              maazijyun@gmail.com
            </a>
          </p>
          <p>
            <span className="text-white">LinkedIn</span>{" "}
            <a
              href="https://linkedin.com/in/maazijyun"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              linkedin.com/in/maazijyun
            </a>
          </p>
          <p>
            <span className="text-white">GitHub</span>{" "}
            <a
              href="https://github.com/maazijyun"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              github.com/maazijyun
            </a>
          </p>
        </div>
        <div className="mt-10 w-24 h-1 rounded-full bg-gradient-to-r from-transparent via-white to-transparent" />
        <p className="mt-6 text-sm text-white/50">
          press Esc to exit
        </p>
      </div>
    ),
  },
];

// ── SlidePresentation component ─────────────────────────────────────
interface Props {
  onClose: () => void;
}

export default function SlidePresentation({ onClose }: Props) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = slides.length;

  const goTo = useCallback(
    (idx: number, dir: "next" | "prev") => {
      if (animating) return;
      if (idx < 0 || idx >= total) return;
      setDirection(dir);
      setAnimating(true);
      setCurrent(idx);
    },
    [animating, total]
  );

  const next = useCallback(() => goTo(current + 1, "next"), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1, "prev"), [goTo, current]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, onClose]);

  // Click / tap navigation
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (animating) return;
      // Ignore clicks on buttons/links
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      if (x < rect.width / 3) {
        prev();
      } else {
        next();
      }
    },
    [animating, next, prev]
  );

  // Reset animation flag after transition
  useEffect(() => {
    if (!animating) return;
    const id = setTimeout(() => setAnimating(false), 500);
    return () => clearTimeout(id);
  }, [current, animating]);

  // Slide-in animation class
  const slideClass =
    direction === "next" ? "animate-slide-in-right" : "animate-slide-in-left";

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="fixed inset-0 z-50 flex flex-col bg-[#6b1a1a] text-white overflow-hidden select-none"
    >
      {/* Top bar — slide number + close */}
      <div className="relative z-10 flex items-center justify-between px-5 py-3">
        <span className="text-sm text-white/50">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Close presentation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Slide content */}
      <div className="relative flex-1 overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex items-center justify-center p-4 ${
              idx === current ? slideClass : "hidden"
            }`}
          >
            {slide.content}
          </div>
        ))}
      </div>

      {/* Bottom progress bar */}
      <div className="flex items-center justify-center gap-2 px-5 py-4">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              goTo(idx, idx > current ? "next" : "prev");
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-8 bg-white"
                : "w-2 bg-white/20 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
