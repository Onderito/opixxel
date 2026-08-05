"use client";

import { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/ui/language-context";

const copy = {
  fr: {
    navigation: ["Accueil", "Qui suis-je", "Projets", "Méthode", "Offres"],
    cta: "Je commence mon projet",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    navLabel: "Navigation principale",
    languageLabel: "Choisir la langue",
  },
  en: {
    navigation: ["Home", "About", "Projects", "Process", "Services"],
    cta: "Start a project",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navLabel: "Main navigation",
    languageLabel: "Choose language",
  },
} as const;

const navigationHrefs = ["/", "/#qui-suis-je", "/#projets", "/#methode", "/#offres"];

function LanguageSwitch({ id }: { id: string }) {
  const { language, setLanguage } = useLanguage();
  const text = copy[language];

  return (
    <LayoutGroup id={id}>
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
                transition={{ type: "spring", duration: 0.35, bounce: 0 }}
              />
            )}
            <span className="relative z-10">{option}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}

export default function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();
  const text = copy[language];
  const navigation = text.navigation.map((label, index) => ({
    label,
    href: navigationHrefs[index],
  }));

  if (pathname === "/projets/sbcare") return null;

  return (
    <div className="absolute inset-x-0 top-0 z-[100] px-6 py-6 md:px-12 md:py-10">
      <header className="relative flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 xl:flex-1">
          <button
            type="button"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-stroke text-title xl:hidden"
            aria-expanded={menuOpen}
            aria-controls="global-mobile-menu"
            aria-label={menuOpen ? text.closeMenu : text.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="flex w-[18px] flex-col gap-[5px]">
              <span className={`h-px w-full bg-current transition-transform duration-200 ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>

          <nav
            className="hidden items-center gap-8 pt-2 text-[16px] font-manrope text-label xl:flex"
            aria-label={text.navLabel}
          >
            {navigation.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-colors duration-200 hover:text-title"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:block">
          <LanguageSwitch id="desktop-language-switch" />
        </div>

        <a
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
      </header>

      <div
        id="global-mobile-menu"
        className={`${menuOpen ? "mt-4 block" : "hidden"} relative z-50 xl:hidden`}
      >
        <nav
          className="rounded-3xl border border-stroke bg-surface p-5 shadow-[0_20px_60px_rgba(17,17,16,0.06)]"
          aria-label={text.navLabel}
        >
          <div className="flex flex-col gap-4 text-base text-title">
            {navigation.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-colors duration-200 hover:text-accent"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-stroke pt-4">
            <span className="text-sm text-label">{text.languageLabel}</span>
            <LanguageSwitch id="mobile-language-switch" />
          </div>
        </nav>
      </div>
    </div>
  );
}
