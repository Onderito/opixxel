"use client";

import Link from "next/link";
import { useFooterScroll } from "@/animation-gsap/use-footer-scroll";
import { OWithEyes } from "@/components/o-with-eyes";

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

const explorer: { label: string; href: string }[] = [
  { label: "Réalisations", href: "#projets" },
  { label: "La méthode", href: "#methode" },
  { label: "Tarifs", href: "#offres" },
  { label: "Contact", href: "https://calendly.com/ulas-onder/30min" },
];

const social: { label: string; href: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ulasonder/" },
  { label: "Pinterest", href: "https://fr.pinterest.com/ulasonder07/" },
  { label: "X", href: "https://x.com/UnderDev0" },
];

const meta: { label: string; href?: string }[] = [
  { label: "© 2026 Öpixxel" },
  {
    label: "Politique de confidentialité",
    href: "/politique-de-confidentialite",
  },
  { label: "Mentions légales", href: "/mentions-legales" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ── Footer ────────────────────────────────────────────────────────────────────

export default function Footer() {
  const { footerRef } = useFooterScroll();

  return (
    <footer
      ref={footerRef}
      className="relative bg-canvas min-h-screen overflow-hidden"
    >
      {/* "+" décoration */}
      <div className="absolute left-[61px] top-[87px] hidden xl:block">
        <PlusCross />
      </div>

      {/* Header navigation */}
      <div className="max-w-[1100px] mx-auto pt-10 xl:pt-[57px] px-6 xl:px-0">
        <div className="flex flex-col xl:flex-row xl:items-start gap-10 xl:gap-[100px]">
          {/* Tagline */}
          <p
            data-footer-tagline
            className="font-manrope font-bold text-[20px] text-title leading-normal"
          >
            Öpixxel transforme tes idées en sites animés qui convertissent.
          </p>

          {/* Explorer */}
          <div data-footer-col className="flex flex-col gap-[20px] shrink-0">
            <p className="font-manrope font-bold text-[20px] text-title leading-normal whitespace-nowrap">
              Explorer
            </p>
            <ul className="flex flex-col gap-[6px] font-manrope font-light text-[18px] text-label leading-normal">
              {explorer.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="hover:text-title transition-colors duration-200 cursor-pointer"
                    onClick={(e) => {
                      if (!href.startsWith("http")) {
                        e.preventDefault();
                        scrollTo(href);
                      }
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suivez-moi */}
          <div data-footer-col className="flex flex-col gap-[20px] shrink-0">
            <p className="font-manrope font-bold text-[20px] text-title leading-normal whitespace-nowrap">
              Suivez-moi
            </p>
            <ul className="flex flex-col gap-[6px] font-manrope font-light text-[18px] text-label leading-normal">
              {social.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-title transition-colors duration-200 cursor-pointer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + meta */}
          <div data-footer-col className="flex flex-col shrink-0">
            <div className="flex flex-col w-fit">
              <a
                href="https://calendly.com/ulas-onder/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-manrope font-bold text-[20px] text-accent leading-normal hover:opacity-80 transition-opacity duration-200 cursor-pointer whitespace-nowrap"
              >
                Démarrer mon projet
              </a>
              <div className="mt-[10px] h-px w-full bg-[#999994] opacity-60" />
            </div>
            <ul className="flex flex-col gap-[6px] mt-[20px] font-manrope font-light text-[14px] text-label leading-normal">
              {meta.map(({ label, href }) => (
                <li key={label}>
                  {href ? (
                    <Link
                      href={href}
                      className="hover:text-title transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  ) : (
                    label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Texte géant "Öpixxel" — moitié visible */}
      <p
        data-footer-brand
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 xl:translate-y-[calc(50%-50px)] font-bricolage font-bold leading-none whitespace-nowrap text-title text-[clamp(5.5rem,26vw,500px)] xl:text-[clamp(6rem,32vw,500px)]"
      >
        <OWithEyes />
        pi<span className="text-accent">xx</span>el
      </p>
    </footer>
  );
}
