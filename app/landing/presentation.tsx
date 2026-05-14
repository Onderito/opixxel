"use client";

import Image from "next/image";
import { usePresentationScroll } from "@/animation-gsap/use-presentation-scroll";
import { useTextReveal } from "@/animation-gsap/use-text-reveal";

const SEQUENCE = [
  // ── Phrase 1 — introduction ────────────────────────────────────
  { phrase: "1", kind: "text", content: "Moi" },
  { phrase: "1", kind: "text", content: "c'est" },

  {
    phrase: "1",
    kind: "image",
    src: "/images/profil.webp",
    alt: "Ulas",
  },

  { phrase: "1", kind: "text", content: "Ulas", ease: "back.out(1.4)" },
  { phrase: "1", kind: "text", content: "je", dir: "left", delay: 0.5 },
  { phrase: "1", kind: "text", content: "pense", dir: "left", delay: 0.5 },
  { phrase: "1", kind: "text", content: "le", dir: "left", delay: 0.2 },

  // ── Phrase 2 — proposition de valeur ──────────────────────────
  { phrase: "2", kind: "design", content: "Design" },
  { phrase: "2", kind: "text", content: "code", dir: "left" },
  { phrase: "2", kind: "deco" },
  { phrase: "2", kind: "text", content: "les", dir: "left" },
  { phrase: "2", kind: "text", content: "animations", dir: "left" },

  // ── Phrase 3 — conclusion ──────────────────────────────────────
  { phrase: "3", kind: "text", content: "et" },
  { phrase: "3", kind: "text", content: "livre" },
  { phrase: "3", kind: "text", content: "le" },
  { phrase: "3", kind: "text", content: "produit", dir: "left", delay: 0.5 },

  {
    phrase: "3",
    kind: "image",
    src: "/images/nomado.webp",
    alt: "Produit",
  },
  {
    phrase: "3",
    kind: "text",
    content: "Final.",
    dir: "left",
    delay: 0.5,
    className: "font-bricolage italic font-black",
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
  outerClassName = "",
  children,
}: {
  phrase: string;
  dir?: "up" | "left";
  delay?: number;
  ease?: string;
  kind: string;
  slideClassName?: string;
  outerClassName?: string;
  children: React.ReactNode;
}) {
  const isClipped = kind !== "text";
  return (
    <span
      data-phrase={phrase}
      data-dir={dir}
      data-delay={delay || undefined}
      data-ease={ease || undefined}
      className={`inline-flex align-middle${isClipped ? " overflow-hidden [clip-path:inset(0)]" : ""}${outerClassName ? ` ${outerClassName}` : ""}`}
    >
      <span
        data-slide
        className={`inline-flex will-change-transform  ${slideClassName}`}
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
  rotate?: string;
}) {
  return (
    <span
      className={`relative inline-block shrink-0
      w-[4.2rem] h-[1.4rem]
      sm:w-[5.4rem] sm:h-[1.85rem]
      md:w-[7.8rem] md:h-[2.7rem]
      lg:w-[10.8rem] lg:h-[3.7rem]
      xl:w-[13.8rem] xl:h-[7.2rem] ${rotate ? ` ${rotate}` : ""}`}
    >
      <span
        data-img-clip
        className="absolute inset-0 rounded-md overflow-hidden"
      >
        <Image
          src={src}
          alt={alt}
          width={320}
          height={110}
          className="w-full h-full object-cover"
        />
      </span>
    </span>
  );
}

// Small lightning-bolt / spark deco between CODE and ANIMATIONS
function Deco() {
  return (
    <span className="inline-flex items-center self-center mx-[0.05em]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[0.4em] h-[0.4em] text-accent"
        aria-hidden="true"
      >
        <path
          d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

type Entry = (typeof SEQUENCE)[number];

function renderEntry(entry: Entry, i: number) {
  if (entry.kind === "image") {
    return (
      <RevealWrapper key={i} phrase={entry.phrase} kind="image" outerClassName="mr-[-0.07em]">
        <Photo src={entry.src} alt={entry.alt} />
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
          bg-accent text-white font-bricolage font-black italic
          rounded-md md:rounded-lg pt-[0.05em] pb-[0.1em]
          items-center leading-none text-title
        "
      >
        <span data-design-clip className="pr-[0.3em]">
          {entry.content}
        </span>
      </RevealWrapper>
    );
  }

  if (entry.kind === "deco") {
    return <Deco key={i} />;
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
        flex flex-col items-center
        font-sans font-black text-title
        tracking-[-0.07em] leading-none
        text-[1.75rem]  sm:text-[2.25rem]
        md:text-[3.25rem] lg:text-[4.5rem] xl:text-[7rem]
        gap-y-[0.06em]
      "
      >
        {Array.from({ length: Math.ceil(SEQUENCE.length / 4) }, (_, row) => (
          <div
            key={row}
            className="flex flex-wrap items-center justify-center gap-x-[0.15em]"
          >
            {(
              SEQUENCE.slice(
                row * 4,
                row * 4 + 4,
              ) as (typeof SEQUENCE)[number][]
            ).map((entry, i) => renderEntry(entry, row * 4 + i))}
          </div>
        ))}
      </div>
    </section>
  );
}
