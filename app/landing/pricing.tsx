"use client";

import { useTextReveal } from "@/animation-gsap/use-text-reveal";
import { usePricingScroll } from "@/animation-gsap/use-pricing-scroll";
import { useLanguage } from "@/app/ui/language-context";

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
        d="M4 13L9 18L20 7"
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

const plansByLanguage = {
  fr: [
    {
      id: "refonte",
      title: "Refonte Shopify",
      description:
        "Ta boutique fonctionne. Il est temps qu'elle reflète vraiment ta marque. Je repense son design et son expérience d'achat pour créer un univers sur mesure, à la hauteur de tes produits.",
      pricePrefix: "À partir de",
      price: "3 500 €",
      features: [
        "Design sur mesure, adapté à ta marque",
        "Refonte des pages clés de ta boutique",
        "Navigation et expérience mobile repensées",
        "Catalogue et configuration existants conservés",
        "2 séries de retours incluses",
      ],
      cta: "Réserver un appel →",
      ctaWidth: 144,
      dark: false,
      titleBordered: false,
    },
    {
      id: "creation",
      title: "Création Shopify",
      description:
        "Ta marque mérite une boutique à son image. Je crée ton univers sur mesure et configure ta boutique Shopify pour accueillir tes premières commandes.",
      pricePrefix: "",
      price: "Tarif à définir",
      features: [
        "Design sur mesure, adapté à ta marque",
        "Création des pages clés de ta boutique",
        "Configuration des paiements et livraisons",
        "Intégration du catalogue de départ",
        "Prise en main pour gérer ta boutique",
      ],
      cta: "Réserver un appel →",
      ctaWidth: 144,
      dark: true,
      titleBordered: true,
    },
  ],
  en: [
    {
      id: "refonte",
      title: "Shopify redesign",
      description:
        "Your store is up and running. Now let it truly reflect your brand. I rethink its design and shopping experience to create a bespoke store worthy of your products.",
      pricePrefix: "Starting at",
      price: "€3,500",
      features: [
        "Bespoke design tailored to your brand",
        "Redesign of your store’s key pages",
        "Rethought navigation and mobile experience",
        "Existing catalog and configuration preserved",
        "2 revision rounds included",
      ],
      cta: "Book a call →",
      ctaWidth: 108,
      dark: false,
      titleBordered: false,
    },
    {
      id: "creation",
      title: "Shopify creation",
      description:
        "Your brand deserves a store of its own. I create a bespoke design and set up your Shopify store to welcome your first orders.",
      pricePrefix: "",
      price: "Pricing to be defined",
      features: [
        "Bespoke design tailored to your brand",
        "Creation of your store’s key pages",
        "Payment and shipping setup",
        "Initial product catalog integration",
        "Training to manage your store",
      ],
      cta: "Book a call →",
      ctaWidth: 108,
      dark: true,
      titleBordered: true,
    },
  ],
} as const;

// ── Card ──────────────────────────────────────────────────────────────────────

type Plan = (typeof plansByLanguage)[keyof typeof plansByLanguage][number];

function PricingCard({ plan }: { plan: Plan }) {
  const {
    title,
    description,
    price,
    pricePrefix,
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
          <div className="flex flex-col gap-2 md:min-h-[120px]">
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
                className={`font-manrope font-medium text-[28px] tracking-normal leading-none border border-transparent py-1 ${
                  dark ? "text-white" : "text-title"
                }`}
              >
                {title}
              </h3>
            )}

            <p
              data-pc-desc
              className={`font-manrope font-light text-base  ${
                dark ? "text-[#a4a4a4]" : "text-body"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Prix */}
          <div className="flex flex-col gap-2">
          <span className={`font-manrope text-sm min-h-5 ${dark ? "text-[#a4a4a4]" : "text-body"}`}>
            {pricePrefix}
          </span>
          <p
            data-pricing-price
            data-value={price}
            className={`font-bricolage font-semibold text-[32px] lg:text-[40px] tracking-[-0.02em] leading-none ${
              dark ? "text-white" : "text-title"
            }`}
          >
            {price}
          </p>
          </div>
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
          href="https://calendly.com/ulas-onder07/30min"
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
        <div className="absolute -bottom-3 -left-2 hidden lg:block pointer-events-none select-none">
          <CornerBlob />
        </div>
      )}
    </article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function Pricing() {
  const { language } = useLanguage();
  const plans = plansByLanguage[language];
  const { ref: headerRef } = useTextReveal();
  const { sectionRef } = usePricingScroll(language);

  return (
    <div ref={sectionRef}>
      <div
        ref={headerRef}
        className="flex flex-wrap items-center gap-x-3 gap-y-1"
      >
        <span
          data-eyebrow
          className="font-manrope font-light text-accent text-base"
        >
          {language === "fr" ? "// parlons budget" : "// let's talk budget"}
        </span>
        <h2
          data-heading
          className="font-bricolage font-normal text-white heading-2"
        >
          {language === "fr" ? "Les cartes sur table." : "Everything on the table."}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-[45px] max-w-[1200px] mx-auto mt-8 md:mt-[166px]">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
      <div className="max-w-[1200px] mx-auto mt-7 flex flex-col gap-3 font-manrope text-sm text-[#a4a4a4]">
        <p>
          {language === "fr"
            ? "Abonnement Shopify et éventuelles applications payantes non inclus. Les pages et le volume du catalogue sont définis ensemble ; la conservation de l’existant dépend de son état."
            : "Shopify subscription and any paid apps are not included. Pages and catalog size are agreed together; preserving the existing setup depends on its condition."}
        </p>
        <a
          href="https://calendly.com/ulas-onder07/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center self-start text-white underline decoration-accent underline-offset-4 hover:text-accent transition-colors"
        >
          {language === "fr"
            ? "Un projet de site vitrine ? Parlons-en →"
            : "Need a business website? Let’s talk →"}
        </a>
      </div>
    </div>
  );
}
