"use client";

import { useTextReveal } from "@/animation-gsap/use-text-reveal";
import { usePricingScroll } from "@/animation-gsap/use-pricing-scroll";

// ── Double tick icon ───────────────────────────────────────────────────────────

function DoubleTick() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
      aria-hidden
    >
      <path
        d="M2 13L7.5 18.5L16.5 8"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13L13.5 18.5L22.5 8"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── CTA underline wavy ────────────────────────────────────────────────────────

function CtaUnderline({ width = 144 }: { width?: number }) {
  const m = width * 0.25;
  const h = width * 0.5;
  const t = width * 0.75;
  return (
    <svg
      width={width}
      height="5"
      viewBox={`0 0 ${width} 5`}
      fill="none"
      aria-hidden
    >
      <path
        d={`M0 2.5 Q${m} 0.5 ${h} 2.5 Q${t} 4.5 ${width} 2.5`}
        stroke="var(--accent)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Blob déco coin bas gauche (cards claires uniquement) ──────────────────────

function CornerBlob() {
  return (
    <svg width="159" height="115" viewBox="0 0 159 115" fill="none" aria-hidden>
      <defs>
        <filter id="blob-noise" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="4"
            seed="9"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      {/* Ellipse externe */}
      <path
        d="M8 78 C5 40 32 4 80 2 C128 0 158 32 155 73 C152 114 118 126 76 122 C34 118 11 106 8 78 Z"
        stroke="#111110"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
        filter="url(#blob-noise)"
        opacity="0.45"
      />
      {/* Ellipse interne */}
      <path
        d="M18 72 C14 38 38 8 80 6 C122 4 150 34 147 70 C144 106 112 118 76 115 C40 112 22 96 18 72 Z"
        stroke="#111110"
        strokeWidth="1.3"
        fill="none"
        strokeLinecap="round"
        filter="url(#blob-noise)"
      />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const plans = [
  {
    id: "landing",
    title: "Landing page",
    description:
      "Une page qui capte, convainc et convertit. Je m'occupe de tout, du premier pixel au dernier keyframe.",
    price: "1.500€",
    features: [
      "Design sur mesure",
      "Animations GSAP intentionnelles",
      "Responsive & optimisé mobile",
      "Livraison en 2 semaines",
      "2 Révisions incluses jusqu'à validation",
    ],
    cta: "Réserver un appel →",
    ctaWidth: 144,
    dark: false,
    titleBordered: false,
  },
  {
    id: "complet",
    title: "Site complet",
    description:
      "Ton identité digitale complète. Un site qui raconte une histoire à chaque scroll et donne envie de rester.",
    price: "3.500€",
    features: [
      "Jusqu'à 6 pages",
      "Maquettes Figma livrées",
      "Scroll storytelling",
      "Transitions de page fluides",
      "Livraison en 2-3 semaines",
    ],
    cta: "Réserver un appel →",
    ctaWidth: 144,
    dark: true,
    titleBordered: true,
  },
  {
    id: "mesure",
    title: "Mission sur mesure",
    description:
      "T'as un projet complexe, une stack existante, ou une agence derrière toi. On définit ensemble ce dont t'as besoin.",
    price: "Sur devis",
    features: [
      "Composants GSAP isolés",
      "Intégration stack existante",
      "Sous-traitance agence",
      "TJM disponible sur demande",
    ],
    cta: "Discutons en →",
    ctaWidth: 113,
    dark: false,
    titleBordered: false,
  },
] as const;

// ── Card ──────────────────────────────────────────────────────────────────────

function PricingCard({ plan }: { plan: (typeof plans)[number] }) {
  const {
    title,
    description,
    price,
    features,
    cta,
    ctaWidth,
    dark,
    titleBordered,
  } = plan;

  return (
    <article
      data-pricing-card
      className={`
        relative flex flex-col rounded-[2px] p-5 overflow-hidden min-h-[590px]
        ${dark ? "bg-[#2b2b2b]" : "bg-canvas"}
      `}
    >
      {/* ── Contenu principal ── */}
      <div className="flex flex-col gap-[52px] grow">
        {/* Titre + description + prix */}
        <div className="flex flex-col gap-[52px]">
          {/* Titre + description */}
          <div className="flex flex-col gap-2">
            {titleBordered ? (
              <div
                data-pc-title
                className="w-fit border border-dashed border-accent p-1"
              >
                <h3 className="font-manrope font-medium text-[28px] text-white tracking-[-0.02em] leading-none">
                  {title}
                </h3>
              </div>
            ) : (
              <h3
                data-pc-title
                className={`font-manrope font-medium text-[28px] tracking-[-0.02em] leading-none ${
                  dark ? "text-white" : "text-title"
                }`}
              >
                {title}
              </h3>
            )}

            <p
              data-pc-desc
              className={`font-manrope font-light text-base leading-[1.35] ${
                dark ? "text-[#a4a4a4]" : "text-body"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Prix */}
          <p
            data-pricing-price
            data-value={price}
            className={`font-bricolage font-semibold text-[40px] tracking-[-0.02em] leading-none ${
              dark ? "text-white" : "text-title"
            }`}
          >
            {price}
          </p>
        </div>

        {/* Features */}
        <ul data-pc-features className="flex flex-col gap-1.5">
          {features.map((f) => (
            <li data-pc-feature key={f} className="flex items-center gap-2.5">
              <DoubleTick />
              <span
                className={`font-manrope font-light text-base tracking-[-0.02em] ${
                  dark ? "text-[#a4a4a4]" : "text-title"
                }`}
              >
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── CTA bas droite ── */}
      <div data-pc-cta className="mt-auto pt-8 flex flex-col items-end gap-0.5">
        <a
          href="https://calendly.com/ulas-onder/30min"
          target="_blank"
          rel="noopener noreferrer"
          className={`font-manrope text-base tracking-[-0.02em] hover:text-accent transition-colors duration-200 ${
            dark ? "text-white" : "text-title"
          }`}
        >
          {cta}
        </a>
        <CtaUnderline width={ctaWidth} />
      </div>

      {/* ── Blob déco coin bas gauche (cards claires uniquement) ── */}
      {!dark && (
        <div className="absolute -bottom-3 -left-2 pointer-events-none select-none">
          <CornerBlob />
        </div>
      )}
    </article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Pricing() {
  const { ref: headerRef } = useTextReveal();
  const { sectionRef } = usePricingScroll();

  return (
    <div ref={sectionRef}>
      <div
        ref={headerRef}
        className="flex flex-wrap items-center gap-x-8 gap-y-2"
      >
        <span
          data-eyebrow
          className="font-manrope font-light text-accent text-base"
        >
          // parlons budget
        </span>
        <h2
          data-heading
          className="font-bricolage font-normal text-white heading-2"
        >
          Les cartes sur table.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[45px] mt-8 md:mt-[166px]">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}
