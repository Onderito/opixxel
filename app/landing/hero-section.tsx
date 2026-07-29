"use client";

import { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { useHeroReveal } from "@/animation-gsap/use-hero-reveal";
import { useHeroMotionRefs } from "@/animation-gsap/use-hero-motion-refs";
import { OWithEyes } from "@/components/o-with-eyes";
import { useLanguage } from "@/app/ui/language-context";

const copy = {
  fr: {
    navigation: ["Accueil", "Qui suis-je", "Projets", "Méthode", "Offres"],
    cta: "Je commence mon projet",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    navLabel: "Navigation principale",
    role: "Développeur front-end créatif, de la maquette au code animé.",
    roleEnd: "Je construis l’interface entière.",
    availability: <>Disponible pour des projets<br />partout dans le monde</>,
    languageLabel: "Choisir la langue",
  },
  en: {
    navigation: ["Home", "About", "Projects", "Process", "Services"],
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navLabel: "Main navigation",
    role: "Creative front-end developer, from design to animated code.",
    roleEnd: "I build the whole interface.",
    availability: <>Available for projects<br />worldwide</>,
    languageLabel: "Choose language",
  },
} as const;

const navigationHrefs = ["#", "#qui-suis-je", "#projets", "#methode", "#offres"];

function scrollTo(href: string) {
  if (href === "#" || href.startsWith("http")) return;
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const firstReel = [
  "q",
  "m",
  "a",
  "r",
  "v",
  "n",
  "k",
  "p",
  "e",
  "s",
  "o",
  "u",
  "c",
  "l",
  "t",
  "x",
];

const secondReel = [
  "w",
  "i",
  "o",
  "b",
  "h",
  "y",
  "d",
  "a",
  "m",
  "v",
  "r",
  "u",
  "n",
  "e",
  "s",
  "x",
];

export default function HeroSection() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const text = copy[language];
  const navigation = text.navigation.map((label, index) => ({
    label,
    href: navigationHrefs[index],
  }));
  const { navRef, ctaRef, leftCopyRef, rightCopyRef, titleRef } =
    useHeroMotionRefs();
  useHeroReveal({ navRef, ctaRef, leftCopyRef, rightCopyRef, titleRef });
  return (
    <section className="relative min-h-screen overflow-hidden bg-canvas">
      <span
        className="pointer-events-none absolute right-[11%] top-[16%] hidden h-44 w-44 opacity-50 md:block"
        aria-hidden="true"
      >
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-accent/15" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent/15" />
      </span>
      <span
        className="pointer-events-none absolute bottom-[25%] left-2 h-28 w-28 opacity-50 md:bottom-[18%] md:left-[14%] md:h-44 md:w-44"
        aria-hidden="true"
      >
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-accent/15" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent/15" />
      </span>

      <div className="relative z-10 min-h-screen px-6 py-6 md:px-12 md:py-10">
        <header className="relative z-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 xl:flex-1">
            <button
              type="button"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-stroke text-title xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? text.closeMenu : text.openMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="flex w-[18px] flex-col gap-[5px]">
                <span
                  className={`h-px w-full bg-current ${
                    menuOpen ? "translate-y-[6px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-full bg-current ${menuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-px w-full bg-current ${
                    menuOpen ? "-translate-y-[6px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>

            <nav
              ref={navRef}
              className="hidden items-center gap-8 pt-2 text-[16px] font-manrope text-label xl:flex"
              aria-label={text.navLabel}
            >
              {navigation.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="hover:text-title transition-colors duration-200"
                  onClick={(e) => {
                    if (!href.startsWith("http") && href !== "#") {
                      e.preventDefault();
                      scrollTo(href);
                    }
                  }}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-5 xl:self-start">
            <LayoutGroup id="language-switch">
              <div
                className="flex h-10 items-center rounded-full bg-surface p-1 shadow-[0_1px_3px_rgba(17,17,16,0.08)]"
                role="group"
                aria-label={text.languageLabel}
              >
                {(["fr", "en"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLanguage(option)}
                    aria-pressed={language === option}
                    className={`relative flex h-8 min-w-9 items-center justify-center rounded-full px-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-[color,transform] duration-200 active:scale-[0.96] ${
                      language === option
                        ? "text-canvas"
                        : "text-label hover:text-title"
                    }`}
                  >
                    {language === option && (
                      <motion.span
                        layoutId="active-language"
                        className="absolute inset-0 rounded-full bg-title shadow-[0_1px_3px_rgba(17,17,16,0.18)]"
                        transition={{
                          type: "spring",
                          duration: 0.35,
                          bounce: 0,
                        }}
                      />
                    )}
                    <span className="relative z-10">{option}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <a
              ref={ctaRef}
              href="https://calendly.com/ulas-onder/30min"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={text.cta}
              className="flex h-8 w-[156px] shrink-0 items-start justify-end text-right text-[0.75rem] font-medium leading-none text-title transition-colors duration-200 hover:text-accent sm:w-[190px] sm:text-base"
            >
              <span className="w-fit whitespace-nowrap border-b border-accent pb-2">
                {text.cta}
              </span>
            </a>
          </div>
        </header>

        <div
          id="mobile-menu"
          className={`${menuOpen ? "mt-4 block" : "hidden"} xl:hidden relative z-50`}
        >
          <nav
            className="rounded-3xl border border-stroke bg-surface p-5 shadow-[0_20px_60px_rgba(17,17,16,0.06)]"
            aria-label="Navigation mobile"
          >
            <div className="flex flex-col gap-4 text-base text-title">
              {navigation.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="hover:text-accent transition-colors duration-200"
                  onClick={(e) => {
                    setMenuOpen(false);
                    if (!href.startsWith("http") && href !== "#") {
                      e.preventDefault();
                      scrollTo(href);
                    }
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 px-6 md:px-12">
          <div className="flex justify-center">
            <h1
              ref={titleRef}
              className="font-bold text-center font-bricolage text-[5.1rem] leading-[0.88] tracking-[-0.05em] text-title sm:text-[7.2rem] md:text-[9.5rem] lg:text-[11.5rem] xl:text-[150px]"
            >
              <OWithEyes />
              pi
              <span
                className="relative inline-flex translate-y-[0.10em] sm:translate-y-[0.06em] italic leading-none text-accent overflow-hidden"
                aria-label="xx"
                role="text"
              >
                {[firstReel, secondReel].map((letters, index) => (
                  <span
                    key={index}
                    className="relative -mx-[0.025em] inline-flex h-[0.88em] w-[0.5em] overflow-x-visible overflow-y-hidden px-[0.04em] sm:w-[0.52em] md:w-[0.54em]"
                  >
                    <span
                      data-xx-reel
                      className="absolute left-0 top-0 flex w-full flex-col items-center"
                    >
                      {letters.map((letter, letterIndex) => (
                        <span
                          key={`${letter}-${letterIndex}`}
                          className="flex h-[0.88em] items-center justify-center leading-none"
                        >
                          {letter}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </span>
              el
            </h1>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col gap-6 px-6 text-body md:bottom-10 md:px-12 xl:flex-row xl:items-end xl:justify-between">
          <p
            ref={leftCopyRef}
            className="w-full font-light max-w-none text-[1.05rem] leading-[1.35] sm:max-w-[18ch] md:max-w-[24ch] md:text-[1.15rem] xl:max-w-[34ch]"
          >
            {text.role} {text.roleEnd}
          </p>
          <p
            ref={rightCopyRef}
            className="w-full font-light text-right text-[1.05rem] leading-[1.35] md:text-[1.15rem] xl:w-auto whitespace-nowrap"
          >
            {text.availability}
          </p>
        </div>
      </div>
    </section>
  );
}
