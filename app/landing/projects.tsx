"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal } from "@/animation-gsap/use-text-reveal";

gsap.registerPlugin(ScrollTrigger);

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
  const cursorRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [labelText, setLabelText] = useState(projects[0].title);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const cursorXTo = useRef<gsap.QuickToFunc | null>(null);
  const cursorYTo = useRef<gsap.QuickToFunc | null>(null);

  const listRef = useRef<HTMLDivElement>(null);

  // ── Animation rows au scroll ──────────────────────────────────
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>("a", list);

      rows.forEach((row, i) => {
        gsap.set(row, { opacity: 0, y: 40, x: i % 2 === 0 ? -30 : 30 });
        gsap.to(row, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: list, start: "top 82%", once: true },
        });
      });
    }, list);

    return () => ctx.revert();
  }, []);

  // true dès que le label est visible à l'écran
  const isVisible = useRef(false);
  // dernière position connue du curseur (viewport)
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const label = labelRef.current;
    const cursor = cursorRef.current;
    if (!label || !cursor) return;

    gsap.set(label, { opacity: 0, scale: 0.88, rotation: -8 });
    gsap.set(cursor, { opacity: 0 });

    xTo.current = gsap.quickTo(label, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(label, "y", {
      duration: 0.55,
      ease: "power3.out",
    });
    cursorXTo.current = gsap.quickTo(cursor, "x", {
      duration: 0.1,
      ease: "power2.out",
    });
    cursorYTo.current = gsap.quickTo(cursor, "y", {
      duration: 0.1,
      ease: "power2.out",
    });
  }, []);

  // Positionne le label (snap ou smooth) à partir de coords viewport
  const moveTo = (clientX: number, clientY: number, snap = false) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const lx = clientX - rect.left + 24;
    const ly = clientY - rect.top + 16;
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;

    if (snap) {
      gsap.set(labelRef.current, { x: lx, y: ly });
      gsap.set(cursorRef.current, { x: cx, y: cy });
    }

    xTo.current?.(lx);
    yTo.current?.(ly);
    cursorXTo.current?.(cx);
    cursorYTo.current?.(cy);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    lastPointer.current = { x: e.clientX, y: e.clientY };
    // Snap uniquement au premier mouvement (label pas encore visible)
    moveTo(e.clientX, e.clientY, !isVisible.current);
  };

  const handleEnter = (index: number, e: React.MouseEvent) => {
    if (window.matchMedia("(max-width: 767px)").matches) return;

    // On prend la position de l'event directement — fiable même sans mousemove préalable
    const pos = { x: e.clientX, y: e.clientY };
    lastPointer.current = pos;

    setLabelText(projects[index].title);
    setActiveIndex(index);

    if (!isVisible.current) {
      moveTo(pos.x, pos.y, true);
      isVisible.current = true;
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
    }
  };

  const handleLeave = () => {
    isVisible.current = false;
    lastPointer.current = null;
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
        ref={(el) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
          (listRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
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
              className="flex items-center justify-between gap-4 py-6 font-dm-sans transition-opacity duration-300"
              style={{
                opacity: activeIndex !== null && activeIndex !== index ? 0.3 : 1,
              }}
              onMouseEnter={(e) => handleEnter(index, e)}
            >
              {/* Mobile : flex-col titre + desc / Desktop : row */}
              <div className="flex flex-col gap-0.5 md:flex-row md:flex-wrap md:items-baseline md:gap-x-2 md:gap-y-1">
                <h3
                  className={`heading-3 font-regular transition-colors duration-200 ${
                    activeIndex === index ? "text-accent" : "text-title"
                  }`}
                >
                  {p.title}
                </h3>
                <p className="text-[14px] font-extralight text-body md:text-[16px] xl:text-[20px]">
                  {p.description}
                </p>
              </div>
              <span className="text-[10px] font-light text-label shrink-0 md:text-[20px]">
                {p.date}
              </span>
            </div>
          </a>
        ))}

        {/* Curseur pointer personnalisé */}
        <div
          ref={cursorRef}
          className="pointer-events-none absolute top-0 left-0 z-50"
          style={{ willChange: "transform", opacity: 0 }}
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

        {/* Label flottant */}
        <div
          ref={labelRef}
          className="pointer-events-none absolute top-0 left-0 bg-accent px-2 py-2 rounded-[10px]"
          style={{ willChange: "transform", opacity: 0 }}
        >
          <span className="font-bold text-white text-4xl whitespace-nowrap">
            {labelText}
          </span>
        </div>
      </div>
    </div>
  );
}
