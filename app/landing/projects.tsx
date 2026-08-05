"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTextReveal } from "@/animation-gsap/use-text-reveal";
import { useLanguage } from "@/app/ui/language-context";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    title: "Maison des Muses",
    description: {
      fr: "Un écrin digital sensible pour un institut de beauté.",
      en: "A refined digital home for a beauty institute.",
    },
    date: "2026",
    url: "https://maison-des-muses.vercel.app/",
    image: "/images/maison-des-muses.png",
  },
  {
    title: "Kokolimo",
    description: {
      fr: "Un site premium pour une clientèle premium.",
      en: "A premium website for a premium clientele.",
    },
    date: "2026",
    url: "https://kokolimo.com",
    image: "/images/viplimonice.webp",
  },
  {
    title: "Ondermotion",
    description: {
      fr: "Le portfolio qui m'a repositionné.",
      en: "The portfolio that repositioned my work.",
    },
    date: "2025",
    url: "https://ondermotion.dev",
    image: "/images/ondermotion.webp",
  },
  // {
  //   title: "Clarity",
  //   description: "Focus sur l'essentiel, zéro distraction.",
  //   date: "2025",
  //   url: "https://clarity-d63997.webflow.io/",
  //   image: "/images/clarity.webp",
  // },
  // {
  //   title: "Calmly",
  //   description: "Le minimalisme au service du bien-être.",
  //   date: "2025",
  //   url: "https://calmly-app-zeta.vercel.app/",
  //   image: "/images/calmly.webp",
  // },
];

const explorationData = [
  {
    title: "SBcare",
    description: {
      fr: "Une expérience skincare repensée de fond en comble.",
      en: "A skincare experience redesigned from the ground up.",
    },
    date: "2026",
    url: "/projets/sbcare",
    image: "/images/case-studies/sbcare-after.png",
    internal: true,
  },
];

export default function Projects() {
  const { language } = useLanguage();
  const projects = [...projectData, ...explorationData].map((project) => ({
    ...project,
    description: project.description[language],
  }));
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
  // Colonne d'images de la preview flottante (défilement vertical)
  const reelRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: { trigger: row, start: "top 84%", once: true },
        });
      });

      const explorationIntro = list.querySelector<HTMLElement>(
        "[data-exploration-intro]",
      );
      if (explorationIntro) {
        gsap.from(explorationIntro.children, {
          opacity: 0,
          y: 45,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: explorationIntro,
            start: "top 84%",
            once: true,
          },
        });
      }
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

    // Carte décalée à droite du curseur, centrée verticalement sur lui
    const lx = clientX - rect.left + 28;
    const ly = clientY - rect.top - 112;
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
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

    // Fait défiler la colonne d'images vers la capture du projet survolé
    // (la colonne contient N images → un cran = 100/N % de sa hauteur).
    gsap.to(reelRef.current, {
      yPercent: -index * (100 / projects.length),
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });

    if (!isVisible.current) {
      moveTo(pos.x, pos.y, true);
      isVisible.current = true;
      gsap.to(labelRef.current, {
        opacity: 1,
        scale: 1,
        rotation: -3,
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
      rotation: -8,
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

  const renderProject = (
    project: (typeof projects)[number],
    index: number,
    dark = false,
  ) => (
    <Link
      className="cursor-none"
      key={project.title}
      href={project.url}
      scroll={"internal" in project && project.internal ? true : undefined}
      target={
        project.url && !("internal" in project && project.internal)
          ? "_blank"
          : undefined
      }
      rel={
        project.url && !("internal" in project && project.internal)
          ? "noreferrer"
          : undefined
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      onClick={() => {
        if ("internal" in project && project.internal) {
          window.scrollTo(0, 0);
        }
      }}
    >
      <div
        className="flex items-center justify-between gap-4 py-6 font-manrope transition-opacity duration-300"
        style={{
          opacity: activeIndex !== null && activeIndex !== index ? 0.3 : 1,
        }}
        onMouseEnter={(event) => handleEnter(index, event)}
      >
        <div className="flex flex-col gap-0.5 md:flex-row md:flex-wrap md:items-baseline md:gap-x-2 md:gap-y-1">
          <h3
            className={`heading-3 font-regular transition-colors duration-200 ${
              activeIndex === index
                ? "text-accent"
                : dark
                  ? "text-white"
                  : "text-title"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`text-[14px] font-extralight md:text-[16px] xl:text-[20px] ${
              dark ? "text-white/55" : "text-body"
            }`}
          >
            {language === "en" && project.title === "SBcare" ? (
              <>
                A skincare experience redesigned from{" "}
                <br className="md:hidden" />
                the ground up.
              </>
            ) : (
              project.description
            )}
          </p>
        </div>
        <span
          className={`shrink-0 text-[10px] font-light md:text-[20px] ${
            dark ? "text-white/40" : "text-label"
          }`}
        >
          {project.date}
        </span>
      </div>
    </Link>
  );

  return (
    <div className="relative w-full">
      <div
        ref={(el) => {
          (
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = el;
          (listRef as React.MutableRefObject<HTMLDivElement | null>).current =
            el;
        }}
        className="relative w-full"
        onMouseLeave={handleLeave}
      >
        <div className="container flex min-h-screen flex-col justify-center py-16 xl:py-24">
          <div
            ref={headerRef}
            className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 md:mb-40 xl:items-center"
          >
            <span
              data-eyebrow
              className="text-accent text-xs font-medium tracking-wide md:text-sm"
            >
              {language === "fr" ? "// ce que je construis" : "// selected work"}
            </span>
            <h2 data-heading className="heading-2 font-bricolage text-title">
              {language === "fr"
                ? "Plutôt que de l’expliquer."
                : "Better shown than told."}
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-stroke border-y border-stroke md:cursor-none">
            {projects
              .slice(0, projectData.length)
              .map((project, index) => renderProject(project, index))}
          </div>
        </div>

        <section className="flex min-h-screen flex-col justify-center bg-dark text-white">
          <div className="container py-16 xl:py-24">
            <div data-exploration-intro className="mb-16 md:mb-28">
              <span className="mb-3 block text-xs font-medium tracking-wide text-accent md:text-sm">
                {language === "fr" ? "// terrains d’essai" : "// testing grounds"}
              </span>
              <h3 className="text-balance font-bricolage text-4xl font-medium leading-none tracking-[-0.04em] text-white md:text-5xl xl:text-6xl">
                {language === "fr"
                  ? "Reprendre. Repenser."
                  : "Revisit. Rethink."}
              </h3>
            </div>
            <div className="flex flex-col divide-y divide-white/15 border-y border-white/15 md:cursor-none">
              {projects
                .slice(projectData.length)
                .map((project, explorationIndex) =>
                  renderProject(
                    project,
                    projectData.length + explorationIndex,
                    true,
                  ),
                )}
            </div>
          </div>
        </section>

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

        {/* Preview flottante : capture du site + bandeau titre.
            Les captures sont empilées dans une colonne qui défile
            verticalement (effet reel) au changement de projet. */}
        <div
          ref={labelRef}
          className="pointer-events-none absolute top-0 left-0 z-40 hidden md:block w-[270px] overflow-hidden rounded-[2px] border border-stroke bg-canvas shadow-[0_24px_60px_rgba(17,17,16,0.12)]"
          style={{ willChange: "transform", opacity: 0 }}
        >
          <div className="relative h-[175px] overflow-hidden">
            <div ref={reelRef} className="flex flex-col will-change-transform">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="relative h-[175px] w-full shrink-0"
                >
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="270px"
                    className="object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between bg-accent px-3 py-2">
            <span className="font-bricolage font-bold italic text-white text-lg whitespace-nowrap">
              {labelText}
            </span>
            <span className="text-white text-lg" aria-hidden>
              →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
