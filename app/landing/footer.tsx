"use client";

import { useFooterScroll } from "@/animation-gsap/use-footer-scroll";

// ── Décoration "+" coin haut-gauche ──────────────────────────────────────────

function PlusCross() {
  return (
    <svg width="159" height="115" viewBox="0 0 159 115" fill="none" aria-hidden>
      <line
        x1="80"
        y1="14"
        x2="80"
        y2="100"
        stroke="#999994"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <line
        x1="36"
        y1="57"
        x2="124"
        y2="57"
        stroke="#999994"
        strokeWidth="0.6"
        opacity="0.5"
      />
    </svg>
  );
}

// ── Ligne sous CTA ────────────────────────────────────────────────────────────

function Underline({ width = 220 }: { width?: number }) {
  return (
    <svg
      width={width}
      height="1"
      viewBox={`0 0 ${width} 1`}
      fill="none"
      aria-hidden
    >
      <line
        x1="0"
        y1="0.5"
        x2={width}
        y2="0.5"
        stroke="#999994"
        strokeWidth="0.6"
        opacity="0.6"
      />
    </svg>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────

const explorer = ["Réalisations", "La méthode", "Tarifs", "Contact"];
const social = ["LinkedIn", "Behance", "X"];
const meta = [
  "© 2026 Opixxel",
  "Politique de confidentialité",
  "Mentions légales",
];

// ── Footer ────────────────────────────────────────────────────────────────────

export default function Footer() {
  const { footerRef } = useFooterScroll();

  return (
    <footer ref={footerRef} className="relative bg-canvas min-h-screen overflow-hidden">
      {/* "+" décoration */}
      <div className="absolute left-[61px] top-[87px] hidden xl:block">
        <PlusCross />
      </div>

      {/* Header navigation */}
      <div className="max-w-[1071px] mx-auto pt-10 xl:pt-[57px] px-6 xl:px-0">
        <div className="flex flex-col xl:flex-row xl:items-start gap-10 xl:gap-[100px]">
          {/* Tagline */}
          <p data-footer-tagline className="font-manrope font-bold text-[20px] text-title leading-normal">
            Öpixxel transforme tes idées
            <br />
            en sites animés qui convertissent.
          </p>

          {/* Explorer */}
          <div data-footer-col className="flex flex-col gap-[20px] xl:w-[99px]">
            <p className="font-manrope font-bold text-[20px] text-title leading-normal">
              Explorer
            </p>
            <ul className="flex flex-col gap-[6px] font-manrope font-light text-[18px] text-label leading-normal cursor-pointer">
              {explorer.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Suivez-moi */}
          <div data-footer-col className="flex flex-col gap-[20px] xl:w-[119px]">
            <p className="font-manrope font-bold text-[20px] text-title leading-normal">
              Suivez-moi
            </p>
            <ul className="flex flex-col gap-[6px] font-manrope font-light text-[18px] text-label leading-normal cursor-pointer">
              {social.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* CTA + meta */}
          <div data-footer-col className="flex flex-col xl:w-[235px]">
            <p className="font-manrope font-bold text-[20px] text-accent leading-normal">
              Démarrer mon projet ↗
            </p>
            <div className="mt-[10px]">
              <Underline />
            </div>
            <ul className="flex flex-col gap-[6px] mt-[20px] font-manrope font-light text-[14px] text-label leading-normal cursor-pointer">
              {meta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Texte géant "Öpixxel" — moitié visible */}
      <p data-footer-brand className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 xl:translate-y-[calc(50%-50px)] font-bricolage font-bold leading-none whitespace-nowrap text-title text-[clamp(5.5rem,26vw,500px)] xl:text-[clamp(6rem,32vw,500px)]">
        Öpi<span className="text-accent">xx</span>el
      </p>
    </footer>
  );
}
