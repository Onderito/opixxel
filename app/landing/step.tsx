"use client";

import Image from "next/image";
import { useLanguage } from "@/app/ui/language-context";
import { useStepScroll } from "@/animation-gsap/use-step-scroll";

const stepsByLanguage = {
  fr: [
    {
      number: "01",
      title: "On parle de ta boutique",
      description:
        "Tu me présentes ta marque, tes produits et ton projet. Ensemble, on pose les pages, les priorités et le budget.",
      image: "/images/method/step-01-refined.png",
      alt: "Deux formes sculpturales se rencontrent autour d’un accent orange",
    },
    {
      number: "02",
      title: "Je maquette, puis je développe",
      description:
        "Tu valides le design. Je construis ensuite une interface sur mesure, pensée pour tes produits et reliée à Shopify.",
      image: "/images/method/step-02-refined.png",
      alt: "Une composition de matières et de grilles en cours d’assemblage",
    },
    {
      number: "03",
      title: "Ta boutique prend vie",
      description:
        "On vérifie le parcours d’achat avant la mise en ligne. Puis je te montre comment gérer ta boutique au quotidien.",
      image: "/images/method/step-03-refined.png",
      alt: "Une architecture abstraite achevée, éclairée d’une lumière orange",
    },
  ],
  en: [
    {
      number: "01",
      title: "We talk about your store",
      description:
        "You introduce me to your brand, products and project. Together, we define the pages, priorities and budget.",
      image: "/images/method/step-01-refined.png",
      alt: "Two sculptural forms meeting around an orange accent",
    },
    {
      number: "02",
      title: "I create the mockups, then develop",
      description:
        "You approve the design. I then build a custom interface, tailored to your products and connected to Shopify.",
      image: "/images/method/step-02-refined.png",
      alt: "A composition of materials and grids being assembled",
    },
    {
      number: "03",
      title: "Your store comes to life",
      description:
        "We check the shopping journey before launch. Then I show you how to manage your store day to day.",
      image: "/images/method/step-03-refined.png",
      alt: "A completed abstract structure illuminated by an orange light",
    },
  ],
} as const;

export default function Step() {
  const { language } = useLanguage();
  const { sectionRef } = useStepScroll(language);
  const steps = stepsByLanguage[language];

  return (
    <div ref={sectionRef} className="relative bg-[#e9ddcc]" data-method-root>
      <div
        className="relative h-svh min-h-[560px] overflow-hidden motion-reduce:h-auto motion-reduce:overflow-visible"
        data-method-stage
      >
        {steps.map((step, index) => (
          <article
            key={step.number}
            data-method-panel
            className="absolute inset-0 isolate overflow-hidden bg-[#e9ddcc] [backface-visibility:hidden] motion-reduce:relative motion-reduce:min-h-svh"
          >
            <div className="absolute inset-x-0 top-0 h-[62%] md:inset-0 md:h-full">
            <Image
              src={step.image}
              alt={step.alt}
              fill
              sizes="(max-width: 767px) 160vw, 100vw"
              quality={90}
              loading="eager"
              fetchPriority={index === 0 ? "high" : "auto"}
              className="object-cover object-[85%_center] md:object-center"
            />
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,236,225,0.98)_0%,rgba(244,236,225,0.9)_25%,rgba(244,236,225,0.32)_49%,rgba(244,236,225,0)_70%)] max-md:bg-[linear-gradient(0deg,#e9ddcc_0%,#e9ddcc_35%,rgba(233,221,204,0.92)_43%,rgba(233,221,204,0)_62%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 ring-1 ring-inset ring-black/10"
            />

            <div className="relative z-10 flex h-full items-end px-6 pb-8 pt-24 sm:px-8 sm:pb-10 md:items-center md:px-12 md:pb-0 lg:px-[7vw]">
              <div className="w-full text-title md:max-w-[540px]">
                <div
                  data-method-kicker
                  className="mb-5 flex items-center gap-3 font-manrope text-[11px] font-medium uppercase tracking-[0.18em] md:mb-8 md:text-xs"
                >
                    <span className="text-accent">
                    {language === "fr" ? "La méthode" : "The process"}
                  </span>
                  <span aria-hidden="true" className="h-px w-9 bg-current opacity-35" />
                  <span className="opacity-70">{step.number} / 03</span>
                </div>

                <h2
                  data-method-title
                  className="max-w-[12ch] text-balance font-bricolage text-[clamp(2.5rem,8.8vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.055em] md:text-[clamp(3.5rem,5.2vw,5.75rem)]"
                >
                  {step.title}
                </h2>

                <p
                  data-method-description
                  className="mt-5 max-w-[37ch] text-pretty font-manrope text-sm font-light leading-[1.55] opacity-85 sm:text-[15px] md:mt-8 md:text-base md:leading-[1.6]"
                >
                  {step.description}
                </p>

                {index === steps.length - 1 && (
                  <a
                    data-method-cta
                    href="https://calendly.com/ulas-onder07/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex min-h-11 items-center border-b border-current pb-1 font-bricolage text-2xl italic tracking-[-0.04em] transition-colors duration-200 hover:text-accent md:mt-10 md:text-4xl"
                  >
                    {language === "fr" ? "→ On démarre ?" : "→ Shall we start?"}
                  </a>
                )}
              </div>
            </div>

            <span
              aria-hidden="true"
              className="absolute right-6 top-6 z-10 hidden font-manrope text-[10px] uppercase tracking-[0.18em] text-title/45 sm:block md:right-12 md:top-10"
            >
              Öpixxel® — {step.number}
            </span>
          </article>
        ))}
        <aside
          aria-label={language === "fr" ? "Progression des étapes" : "Step progress"}
          className="pointer-events-none absolute right-6 top-24 z-30 font-manrope md:right-12 md:top-1/2 md:-translate-y-1/2 motion-reduce:hidden"
        >
          <ol className="flex flex-col gap-5">
            {steps.map((step, index) => (
              <li key={step.number} className="flex items-center justify-end gap-3">
                <span data-method-marker-number className={`text-[11px] font-medium tabular-nums text-title ${index === 0 ? "opacity-100" : "opacity-45"}`}>
                  <span className="sr-only">{language === "fr" ? "Étape " : "Step "}</span>
                  {step.number}
                </span>
                <span className="relative h-[2px] w-8">
                  <span aria-hidden="true" className="absolute inset-y-0 right-0 w-3 bg-title/25" />
                  <span data-method-marker-bar aria-hidden="true" className={`absolute inset-0 origin-right bg-accent ${index === 0 ? "scale-x-100 opacity-100" : "scale-x-[0.375] opacity-0"}`} />
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
