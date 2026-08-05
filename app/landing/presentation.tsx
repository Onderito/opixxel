"use client";

import Image from "next/image";
import { usePresentationScroll } from "@/animation-gsap/use-presentation-scroll";
import { useTextReveal } from "@/animation-gsap/use-text-reveal";
import { useLanguage, type Language } from "@/app/ui/language-context";

function getSequence(language: Language) {
  return language === "fr" ? [
  // ── Phrase 1 — introduction ────────────────────────────────────
  { phrase: "1", kind: "text", content: "Moi" },
  { phrase: "1", kind: "text", content: "c'est" },
  { phrase: "1", kind: "image", src: "/images/profil.webp", alt: "Ulas" },
  { phrase: "1", kind: "text", content: "Ulas," },

  { phrase: "1", kind: "text", content: "je" },
  { phrase: "1", kind: "text", content: "pense" },

  // ── Phrase 2 — Design entre "pense" et "code" ─────────────────
  { phrase: "2", kind: "design", content: "Design" },
  { phrase: "2", kind: "text", content: "code" },

  // Rangée 2 : ⚡  "les"  "animations"  "et"
  { phrase: "2", kind: "deco" },
  { phrase: "2", kind: "text", content: "les" },
  { phrase: "2", kind: "text", content: "animations" },
  { phrase: "2", kind: "text", content: "et" },

  // Rangée 3 : "livre"  "le"  [NOMADO]  "produit"
  { phrase: "3", kind: "text", content: "livre" },
  { phrase: "3", kind: "text", content: "le" },
  { phrase: "3", kind: "image", src: "/images/nomado.webp", alt: "Produit" },
  { phrase: "3", kind: "text", content: "produit" },

  // Rangée 4 : "Final."
  {
    phrase: "3",
    kind: "text",
    content: "Final.",
    className: "font-bricolage italic font-black",
  },
] as const : [
  { phrase: "1", kind: "text", content: "I'm" },
  { phrase: "1", kind: "image", src: "/images/profil.webp", alt: "Ulas" },
  { phrase: "1", kind: "text", content: "Ulas," },
  { phrase: "1", kind: "text", content: "I" },
  { phrase: "1", kind: "text", content: "think" },
  { phrase: "2", kind: "design", content: "Design" },
  { phrase: "2", kind: "text", content: "code" },
  { phrase: "2", kind: "deco" },
  { phrase: "2", kind: "text", content: "animations" },
  { phrase: "2", kind: "text", content: "and" },
  { phrase: "3", kind: "text", content: "deliver" },
  { phrase: "3", kind: "text", content: "the" },
  { phrase: "3", kind: "image", src: "/images/nomado.webp", alt: "Product" },
  { phrase: "3", kind: "text", content: "final" },
  {
    phrase: "3",
    kind: "text",
    content: "product.",
    className: "font-bricolage italic font-black",
  },
] as const;
}

type Entry = ReturnType<typeof getSequence>[number];

// ─────────────────────────────────────────────────────────────────────────────
// Conteneur clip — animé par usePresentationScroll via data-clip / data-clip-inner
// ─────────────────────────────────────────────────────────────────────────────

function Clip({
  className = "",
  innerClassName = "",
  children,
}: {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      data-clip
      className={`relative inline-flex align-middle overflow-hidden rounded-md md:rounded-lg ${className}`}
    >
      <span
        data-clip-inner
        className={`inline-flex will-change-transform ${innerClassName}`}
      >
        {children}
      </span>
    </span>
  );
}

// ── Image ─────────────────────────────────────────────────────────────────────

function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      className="relative inline-block shrink-0
      w-[4.2rem] h-[1.4rem]
      sm:w-[5.4rem] sm:h-[1.85rem]
      md:w-[7.8rem] md:h-[2.7rem]
      lg:w-[10.8rem] lg:h-[3.7rem]
      xl:w-[13.8rem] xl:h-[7.2rem]"
    >
      <Image
        src={src}
        alt={alt}
        width={320}
        height={110}
        className="absolute inset-0 w-full h-full object-cover rounded-md"
      />
    </span>
  );
}

// ── Petit éclair entre CODE et ANIMATIONS ─────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────

function renderEntry(entry: Entry, i: number) {
  if (entry.kind === "image") {
    return (
      <Clip key={i} className="mr-[-0.07em]">
        <Photo src={entry.src} alt={entry.alt} />
      </Clip>
    );
  }

  if (entry.kind === "design") {
    return (
      <Clip
        key={i}
        innerClassName="
          bg-accent text-white font-bricolage font-black italic
          rounded-md md:rounded-lg pt-[0.05em] pb-[0.1em]
          items-center leading-none text-title
        "
      >
        <span className="pl-[0.22em] pr-[0.38em]">{entry.content}</span>
      </Clip>
    );
  }

  if (entry.kind === "deco") {
    return <Deco key={i} />;
  }

  const e = entry as Extract<Entry, { kind: "text" }>;

  return (
    <span key={i} className="inline-flex align-middle">
      <span className={"className" in e ? e.className : undefined}>
        {e.content}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function Presentation() {
  const { language } = useLanguage();
  const sequence = getSequence(language);
  const rowSizes = language === "fr" ? [4, 4, 4, 4, 1] : [4, 4, 3, 4];
  let sequenceOffset = 0;
  const rows = rowSizes.map((size) => {
    const row = sequence.slice(sequenceOffset, sequenceOffset + size) as Entry[];
    sequenceOffset += size;
    return row;
  });
  const { sectionRef } = usePresentationScroll(language);
  const { ref: headerRef } = useTextReveal({ simpleOnMobile: true });

  return (
    <section
      ref={sectionRef}
      className="md:min-h-screen md:flex md:flex-col md:justify-center"
    >
      <div
        ref={headerRef}
        className={`flex gap-x-3 gap-y-1 mb-6 md:mb-40 ${
          language === "en"
            ? "flex-col items-start"
            : "flex-wrap items-baseline xl:items-center"
        }`}
      >
        <span
          data-eyebrow
          className="text-accent text-xs md:text-sm tracking-wide font-medium"
        >
          {language === "fr" ? "// qui se cache derrière" : "// behind the work"}
        </span>
        <h2 data-heading className="font-bricolage heading-2 text-title">
          {language === "fr" ? "Une seule paire de mains." : "One pair of hands."}
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
        {rows.map((row, rowIndex) => (
          <div
            key={`${language}-${rowIndex}`}
            className="flex flex-wrap items-center justify-center gap-x-[0.15em]"
          >
            {row.map((entry, entryIndex) =>
              renderEntry(entry, rowIndex * 10 + entryIndex),
            )}
          </div>
        ))}

        <div className="mt-5 flex w-full justify-center md:mt-8">
          <span
            data-presentation-cta
            className="relative inline-flex shrink-0 overflow-hidden rounded-full align-middle"
          >
            <a
              data-presentation-cta-inner
              href="https://calendly.com/ulas-onder/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-3 whitespace-nowrap rounded-full bg-title px-5 py-3 font-manrope text-xs font-semibold leading-none tracking-normal text-canvas shadow-[0_8px_24px_rgba(17,17,16,0.14)] transition-[background-color,color,transform,box-shadow] duration-200 hover:bg-accent hover:shadow-[0_12px_30px_rgba(255,77,46,0.2)] active:scale-[0.96] md:min-h-12 md:px-7 md:text-base"
            >
              {language === "fr" ? "Démarrer un projet" : "Start a project"}
              <span
                aria-hidden="true"
                className="text-accent transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-white"
              >
                →
              </span>
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
