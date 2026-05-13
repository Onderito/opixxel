"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTextReveal } from "@/animation-gsap/use-text-reveal";

const projects = [
  {
    title: "Viplimonice",
    description: "Un site premium pour une clientèle premium",
    date: "2026",
    url: "https://viplimonice.com",
  },
  {
    title: "Ondermotion",
    description: "Le portfolio qui m'a repositionné",
    date: "2025",
    url: "https://ondermotion.dev",
  },
  {
    title: "Clarity",
    description: "Focus sur l'essentiel, zéro distraction",
    date: "2025",
    url: "https://clarity-d63997.webflow.io/",
  },
  {
    title: "Calmly",
    description: "Le minimalisme au service du bien-être",
    date: "2025",
    url: "https://calmly-app-zeta.vercel.app/",
  },
];

export default function Projects() {
  const { ref: headerRef } = useTextReveal();
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [labelText, setLabelText] = useState(projects[0].title);

  const cursorRef = useRef<HTMLDivElement>(null);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const cursorXTo = useRef<gsap.QuickToFunc | null>(null);
  const cursorYTo = useRef<gsap.QuickToFunc | null>(null);
  const labelReady = useRef(false);

  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, scale: 0.88, rotation: -8 });
    xTo.current = gsap.quickTo(el, "x", { duration: 0.55, ease: "power3.out" });
    yTo.current = gsap.quickTo(el, "y", { duration: 0.55, ease: "power3.out" });

    const cursor = cursorRef.current;
    if (!cursor) return;
    gsap.set(cursor, { opacity: 0 });
    cursorXTo.current = gsap.quickTo(cursor, "x", {
      duration: 0.1,
      ease: "power2.out",
    });
    cursorYTo.current = gsap.quickTo(cursor, "y", {
      duration: 0.1,
      ease: "power2.out",
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const label = labelRef.current;
    if (!rect || !label) return;

    const lx = e.clientX - rect.left + 24;
    const ly = e.clientY - rect.top + 16;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;

    if (!labelReady.current) {
      gsap.set(label, { x: lx, y: ly });
      gsap.set(cursorRef.current, { x: cx, y: cy });
      labelReady.current = true;
    }

    xTo.current?.(lx);
    yTo.current?.(ly);
    cursorXTo.current?.(cx);
    cursorYTo.current?.(cy);
  };

  const handleEnter = (index: number) => {
    setLabelText(projects[index].title);
    setActiveIndex(index);
    labelReady.current = false;
    gsap.to(labelRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(cursorRef.current, {
      opacity: 1,
      duration: 0.2,
      overwrite: "auto",
    });
  };

  const handleLeave = () => {
    setActiveIndex(null);
    gsap.to(labelRef.current, {
      opacity: 0,
      scale: 0.88,
      duration: 0.2,
      ease: "power2.in",
      overwrite: "auto",
    });
    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.2,
      overwrite: "auto",
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div
        ref={headerRef}
        className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 md:mb-40 xl:items-center"
      >
        <span
          data-eyebrow
          className="text-accent text-xs md:text-sm tracking-wide font-medium"
        >
          {"// ce que je construis"}
        </span>
        <h2 data-heading className="font-fraunces heading-2 text-title">
          Plutôt que de l&apos;expliquer.
        </h2>
      </div>

      {/* Liste */}
      <div
        ref={containerRef}
        className="relative flex flex-col divide-y divide-[#E3E1DC] border-y border-[#E3E1DC] md:cursor-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
      >
        {projects.map((p, index) => (
          <a
            className="cursor-none"
            key={index}
            href={p.url}
            target="_blank"
            rel="noreferrer"
          >
            <div
              className="flex items-start justify-between gap-4 py-6 font-dm-sans md:items-center transition-opacity duration-300"
              style={{
                opacity:
                  activeIndex !== null && activeIndex !== index ? 0.3 : 1,
              }}
              onMouseEnter={() => handleEnter(index)}
              onMouseLeave={handleLeave}
            >
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3
                  className={`heading-3 font-normal transition-colors duration-200 ${
                    activeIndex === index ? "text-accent" : "text-title"
                  }`}
                >
                  {p.title}
                </h3>
                <p className="text-[12px] font-extralight md:text-[16px] xl:text-[20px]">
                  {p.description}
                </p>
              </div>
              <span className="text-[10px] font-light text-label md:text-[20px]">
                {p.date}
              </span>
            </div>
          </a>
        ))}

        {/* Curseur pointer personnalisé — blanc, suit la souris précisément */}
        <div
          ref={cursorRef}
          className="pointer-events-none absolute top-0 left-0 z-50 no-underline"
          style={{ willChange: "transform" }}
        >
          <svg
            width="20"
            height="26"
            viewBox="0 0 20 26"
            fill="white"
            stroke="black"
            strokeWidth="1"
            strokeLinejoin="round"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6.5 1C5.67 1 5 1.67 5 2.5V13.26C4.51 12.94 3.91 12.77 3.28 12.84C1.97 13 1 14.12 1 15.43V18C1 22.42 4.58 26 9 26H10C14.42 26 18 22.42 18 18V12.5C18 11.12 16.88 10 15.5 10C15.03 10 14.59 10.14 14.23 10.38C13.82 9.56 12.97 9 12 9C11.53 9 11.09 9.14 10.73 9.38C10.32 8.56 9.47 8 8.5 8C8.33 8 8.16 8.02 8 8.05V2.5C8 1.67 7.33 1 6.5 1Z" />
          </svg>
        </div>

        {/* Label flottant — suit la souris avec lag, -8deg, fond accent */}
        <div
          ref={labelRef}
          className="pointer-events-none absolute top-0 left-0 bg-accent px-2 py-2 rounded-[10px]"
          style={{ willChange: "transform" }}
        >
          <span className="font- font-bold text-white text-4xl whitespace-nowrap">
            {labelText}
          </span>
        </div>
      </div>
    </div>
  );
}
