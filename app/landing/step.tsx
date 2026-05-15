"use client";

import { ClipboardIllustration } from "@/components/illustrations/clipboard";
import { WireframeIllustration } from "@/components/illustrations/wireframe";
import { RocketIllustration } from "@/components/illustrations/rocket";
import { useStepScroll } from "@/animation-gsap/use-step-scroll";

// ── Sous-composants ────────────────────────────────────────────────────────────

function CornerMarks() {
  return (
    <>
      <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-stroke" />
      <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-stroke" />
      <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-stroke" />
      <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-stroke" />
    </>
  );
}

function PlusAccent() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="-16 -16 32 32"
      fill="none"
      className="absolute top-6 right-6 opacity-20 pointer-events-none"
      aria-hidden
    >
      <line
        x1="-16"
        y1="0"
        x2="16"
        y2="0"
        stroke="var(--accent)"
        strokeWidth="1"
      />
      <line
        x1="0"
        y1="-16"
        x2="0"
        y2="16"
        stroke="var(--accent)"
        strokeWidth="1"
      />
    </svg>
  );
}

function StepCard({
  number,
  title,
  description,
  chip,
}: {
  number: string;
  title: string;
  description: React.ReactNode;
  chip: string;
}) {
  return (
    <div
      data-step-card
      className="relative flex flex-col items-center justify-center gap-4 bg-canvas border border-stroke rounded-sm px-8 py-12 text-center w-full min-h-[360px] xl:w-[413px] xl:h-[539px] xl:min-h-0"
    >
      <CornerMarks />
      <PlusAccent />

      <div className="flex flex-col items-center gap-[10px]">
        <p className="font-manrope font-light text-accent text-xl tracking-tight">
          {number}
        </p>
        <div className="flex flex-col items-center gap-[4px]">
          <h3 className="font-manrope font-normal text-title heading-3 tracking-tight leading-none">
            {title}
          </h3>
          <p className="font-manrope font-light text-body tracking-[-0.02em] max-w-[30ch]">
            {description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center border border-stroke bg-white rounded-sm px-3 h-[30px]">
        <span className="font-manrope font-normal text-label text-sm tracking-tight whitespace-nowrap">
          {chip}
        </span>
      </div>
    </div>
  );
}
function Arrow({ direction }: { direction: "right" | "left" }) {
  const line =
    direction === "right" ? "M 15 15 L 165 105" : "M 165 15 L 15 105";
  const head =
    direction === "right"
      ? "M 151 100 L 165 105 L 158 91"
      : "M 29 100 L 15 105 L 22 91";

  return (
    <svg
      data-step-arrow
      width="180"
      height="120"
      viewBox="0 0 180 120"
      fill="none"
      className="overflow-visible"
      aria-hidden
    >
      <path
        data-arrow-line
        d={line}
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        data-arrow-head
        d={head}
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "On cadre",
    description:
      "Un appel de 30 min. Tu m'expliques ton projet, tes contraintes, ce que tu veux ressentir en scrollant.",
    chip: "30 min",
  },
  {
    number: "02",
    title: "Je design et je code",
    description:
      "Maquette Figma d'abord. Tu valides. Ensuite je code, j'anime, je peaufine chaque détail.",
    chip: "1 à 3 semaines",
  },
  {
    number: "03",
    title: "Tu lances",
    description: (
      <>
        Je te livre un site propre, performant, prêt à être mis en ligne.{" "}
        <span className="hidden xl:inline">
          <br />
        </span>
        Tu repars avec les clés.
      </>
    ),
    chip: "livraison",
  },
];

// ── Section ────────────────────────────────────────────────────────────────────

export default function Step() {
  const { sectionRef } = useStepScroll();

  return (
    <div ref={sectionRef}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-accent text-xs md:text-sm tracking-wide font-medium">
          // de ton idée à ton site
        </span>
        <h2 className="font-bricolage heading-2 text-title">
          Rien de compliqué.
        </h2>
      </div>

      {/* Mobile + md ─ grille simple */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:hidden gap-6 mt-10">
        {steps.map((step) => (
          <StepCard key={step.number} {...step} />
        ))}
      </div>

      {/* xl ─ layout alterné avec illustration + flèches */}
      <div data-step-xl className="hidden xl:flex xl:flex-col mt-10">
        {/* Étape 01 + Venn côte à côte */}
        <div className="flex items-center justify-between">
          <StepCard {...steps[0]} />
          <ClipboardIllustration />
        </div>

        <div className="flex justify-center py-6">
          <Arrow direction="right" />
        </div>

        {/* Étape 02 + Wireframe côte à côte */}
        <div className="flex items-center justify-between">
          <WireframeIllustration />
          <StepCard {...steps[1]} />
        </div>

        <div className="flex justify-center py-6">
          <Arrow direction="left" />
        </div>

        {/* Étape 03 + Rocket côte à côte */}
        <div className="flex items-center  justify-between">
          <StepCard {...steps[2]} />
          <RocketIllustration />
        </div>

        <div data-step-cta className="flex justify-center mt-20 opacity-0">
          <a
            href="https://calendly.com/ulas-onder/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="relative font-bricolage italic text-title text-4xl md:text-5xl hover:text-accent transition-colors duration-300 flex flex-col items-center gap-3"
          >
            → On démarre ?
            <span
              className="block w-full h-[2px] bg-accent origin-left scale-x-0"
              data-cta-underline
            />
          </a>
        </div>
      </div>
    </div>
  );
}
