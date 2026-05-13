"use client";

import { useState } from "react";
import { useHeroReveal } from "@/animation-gsap/use-hero-reveal";
import { useHeroMotionRefs } from "@/animation-gsap/use-hero-motion-refs";
import { useHeroChips } from "@/animation-gsap/use-hero-chips";

const navigation = [
  "Accueil",
  "A propos",
  "Realisations",
  "Le process",
  "Tarifs",
  "Contact",
];

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
  const { navRef, ctaRef, leftCopyRef, rightCopyRef, titleRef } =
    useHeroMotionRefs();
  useHeroReveal({ navRef, ctaRef, leftCopyRef, rightCopyRef, titleRef });
  const { sectionRef: chipsRef } = useHeroChips();

  return (
    <section ref={chipsRef} className="relative min-h-screen overflow-hidden bg-canvas">
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
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
              className="hidden items-center gap-8 pt-2 text-[15px] font-manrope text-label xl:flex"
              aria-label="Navigation principale"
            >
              {navigation.map((item) => (
                <a key={item} href="#" className="hover:text-title">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <a
            ref={ctaRef}
            href="#"
            className="inline-block w-fit self-center border-b border-accent pb-2 text-right text-[0.95rem] font-medium leading-none text-title sm:text-base xl:self-start"
          >
            Je commence mon projet
          </a>
        </header>

        <div
          id="mobile-menu"
          className={`${menuOpen ? "mt-4 block" : "hidden"} xl:hidden`}
        >
          <nav
            className="rounded-3xl border border-stroke bg-surface p-5 shadow-[0_20px_60px_rgba(17,17,16,0.06)]"
            aria-label="Navigation mobile"
          >
            <div className="flex flex-col gap-4 text-base text-title">
              {navigation.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 px-6 md:px-12">
          <div className="flex justify-center">
            <h1
              ref={titleRef}
              data-chips-zone
              className="pointer-events-auto font-bold text-center font-bricolage text-[5.1rem] leading-[0.88] tracking-[-0.05em] text-title sm:text-[7.2rem] md:text-[9.5rem] lg:text-[11.5rem] xl:text-[150px]"
            >
              Öpi
              <span
                className="relative inline-flex translate-y-[0.06em] italic leading-none text-accent"
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
            Design Engineer freelance. De la maquette au code anime. Je
            construis l&apos;interface <br className="hidden xl:block" />{" "}
            entiere.
          </p>
          <p
            ref={rightCopyRef}
            className="w-full font-light text-right text-[1.05rem] leading-[1.35] md:text-[1.15rem] xl:w-auto whitespace-nowrap"
          >
            Basé nulle part,
            <br />
            disponible partout
          </p>
        </div>
      </div>
    </section>
  );
}
