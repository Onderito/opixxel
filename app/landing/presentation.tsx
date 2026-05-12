"use client";

import Image from "next/image";
import { usePresentationScroll } from "@/animation-gsap/use-presentation-scroll";
import { useTextReveal } from "@/animation-gsap/use-text-reveal";

// ─────────────────────────────────────────────────────────────────────────────
// SÉQUENCE — modifie uniquement ce tableau
//
// phrase  → "1" | "2" | "3"     Les phrases s'animent l'une après l'autre
// dir     → "up" | "left"       Direction d'entrée (défaut : "up" = par le bas)
// delay   → secondes            Délai avant démarrage (ex: attendre que l'image s'ouvre)
// ease    → string GSAP         Easing custom sur cet élément (défaut : power4.out)
// kind    → "text"              Mot normal
//           "image"             Photo avec révélation clip-path
//           "design"            Badge orange italic avec clip-path
// ─────────────────────────────────────────────────────────────────────────────
const SEQUENCE = [
  // ── Phrase 1 — introduction ────────────────────────────────────
  { phrase: "1", kind: "text", content: "MOI" },
  { phrase: "1", kind: "text", content: "C'EST" },
  { phrase: "1", kind: "text", content: "ULAS", ease: "back.out(1.4)" },

  {
    phrase: "1",
    kind: "image",
    src: "/images/profil.webp",
    alt: "Ulas",
    rotate: "-rotate-2",
  },

  { phrase: "1", kind: "text", content: "JE", dir: "left", delay: 0.5 },
  { phrase: "1", kind: "text", content: "PENSE", dir: "left", delay: 0.5 },
  { phrase: "1", kind: "text", content: "LE", dir: "left", delay: 0.2 },

  // ── Phrase 2 — proposition de valeur ──────────────────────────
  { phrase: "2", kind: "design", content: "Design" },
  { phrase: "2", kind: "text", content: "CODE", dir: "left" },
  { phrase: "2", kind: "text", content: "LES", dir: "left" },
  { phrase: "2", kind: "text", content: "ANIMATIONS", dir: "left" },

  // ── Phrase 3 — conclusion ──────────────────────────────────────
  { phrase: "3", kind: "text", content: "ET" },
  { phrase: "3", kind: "text", content: "LIVRE" },
  { phrase: "3", kind: "text", content: "LE" },

  {
    phrase: "3",
    kind: "image",
    src: "/images/nomado.webp",
    alt: "Produit",
    rotate: "rotate-1",
  },

  { phrase: "3", kind: "text", content: "PRODUIT", dir: "left", delay: 0.5 },
  {
    phrase: "3",
    kind: "text",
    content: "Final.",
    dir: "left",
    delay: 0.5,
    className: "font-bricolage italic normal-case font-bold",
    ease: "back.out(2.5)",
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Composants internes
// ─────────────────────────────────────────────────────────────────────────────

function RevealWrapper({
  phrase,
  dir = "up",
  delay,
  ease,
  kind,
  slideClassName = "",
  children,
}: {
  phrase: string;
  dir?: "up" | "left";
  delay?: number;
  ease?: string;
  kind: string;
  slideClassName?: string;
  children: React.ReactNode;
}) {
  const buffer =
    kind === "design"
      ? "py-[0.1em] px-[0.3em]"
      : kind === "image"
        ? "p-[0.15em]"
        : "py-[0.01em] px-[0.12em]";

  return (
    <span
      data-phrase={phrase}
      data-dir={dir}
      data-delay={delay || undefined}
      data-ease={ease || undefined}
      className="inline-flex overflow-hidden [clip-path:inset(0)] align-middle"
    >
      <span
        data-slide
        className={`inline-flex will-change-transform ${buffer} ${slideClassName}`}
      >
        {children}
      </span>
    </span>
  );
}

function Photo({
  src,
  alt,
  rotate,
}: {
  src: string;
  alt: string;
  rotate: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0 ${rotate}
      w-[60px]  h-[42px]   sm:w-[88px]  sm:h-[62px]
      md:w-[120px] md:h-[84px] lg:w-[160px] lg:h-[112px] xl:w-[210px] xl:h-[146px]`}
    >
      <span
        data-img-clip
        className="absolute inset-0 rounded-lg overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          width={210}
          height={146}
          className="w-full h-full object-cover"
        />
      </span>
    </span>
  );
}

type Entry = (typeof SEQUENCE)[number];

function renderEntry(entry: Entry, i: number) {
  if (entry.kind === "image") {
    return (
      <RevealWrapper key={i} phrase={entry.phrase} kind="image">
        <Photo src={entry.src} alt={entry.alt} rotate={entry.rotate} />
      </RevealWrapper>
    );
  }

  if (entry.kind === "design") {
    return (
      <RevealWrapper
        key={i}
        phrase={entry.phrase}
        kind="design"
        slideClassName="
          bg-accent text-white font-bricolage italic
          rounded-md md:rounded-lg pt-[0.05em] pb-[0.1em]
          items-center leading-none
        "
      >
        <span data-design-clip className="pr-[0.3em]">
          {entry.content}
        </span>
      </RevealWrapper>
    );
  }

  const e = entry as Extract<Entry, { kind?: "text" }>;
  return (
    <RevealWrapper
      key={i}
      phrase={e.phrase}
      dir={"dir" in e ? e.dir : "up"}
      delay={"delay" in e ? e.delay : undefined}
      ease={"ease" in e ? e.ease : undefined}
      kind="text"
    >
      <span className={"className" in e ? e.className : undefined}>
        {e.content}
      </span>
    </RevealWrapper>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Presentation() {
  const { sectionRef } = usePresentationScroll();
  const { ref: headerRef } = useTextReveal();

  return (
    <section
      ref={sectionRef}
      className="md:min-h-screen md:flex md:flex-col md:justify-center"
    >
      <div
        ref={headerRef}
        className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-6 md:mb-40 xl:items-center"
      >
        <span
          data-eyebrow
          className="text-accent text-xs md:text-sm tracking-wide font-medium"
        >
          // qui se cache derrière
        </span>
        <h2 data-heading className="font-bricolage heading-2 text-title">
          Une seule paire de mains.
        </h2>
      </div>

      <div
        className="
        flex flex-wrap items-center justify-center
        font-sans font-semibold uppercase
        tracking-[-0.07em] leading-[0.95]
        text-[1.75rem]  sm:text-[2.25rem]
        md:text-[3.25rem] lg:text-[4.5rem] xl:text-[5.75rem]
        gap-x-[0.15em]
      "
      >
        {SEQUENCE.map((entry, i) => renderEntry(entry, i))}
      </div>
    </section>
  );
}
