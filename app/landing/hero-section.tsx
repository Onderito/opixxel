"use client";

import { useHeroReveal } from "@/animation-gsap/use-hero-reveal";
import { useHeroMotionRefs } from "@/animation-gsap/use-hero-motion-refs";
import { OWithEyes } from "@/components/o-with-eyes";
import { useLanguage } from "@/app/ui/language-context";

const copy = {
  fr: {
    role: "Développeur front-end créatif, de la maquette au code animé.",
    roleEnd: "Je construis l’interface entière.",
    availability: <>Disponible pour des projets<br />partout dans le monde</>,
  },
  en: {
    role: "Creative front-end developer, from design to animated code.",
    roleEnd: "I build the whole interface.",
    availability: <>Available for projects<br />worldwide</>,
  },
} as const;

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
  const { language } = useLanguage();
  const text = copy[language];
  const { leftCopyRef, rightCopyRef, titleRef } = useHeroMotionRefs();
  useHeroReveal({ leftCopyRef, rightCopyRef, titleRef });
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
