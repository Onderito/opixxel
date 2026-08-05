"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/app/ui/language-context";

gsap.registerPlugin(ScrollTrigger);

const copy = {
  fr: {
    back: "Tous les projets",
    eyebrow: "// Case study — beauté & e-commerce",
    intro:
      "Repenser une boutique de soins pour en faire une expérience de marque plus claire, plus humaine et naturellement premium.",
    heroAlt: "Nouvelle page d’accueil SBcare",
    projectEyebrow: "// Le projet",
    projectLead: "L’ancien site montrait les soins. Le redesign devait faire ressentir la marque —",
    projectLeadAccent: "et guider chaque visite vers le bon geste.",
    facts: [
      ["Mission", "Redesign e-commerce"],
      ["Rôle", "Direction artistique, UI/UX, développement"],
      ["Année", "2026"],
    ],
    comparisonEyebrow: "// Avant · après",
    comparisonTitle: "Même marque. Nouvelle sensation.",
    comparisonLabel: "Choisir la version du site à afficher",
    before: "Avant",
    after: "Après",
    beforeAlt: "Ancienne version du site SBcare",
    afterAlt: "Nouvelle version du site SBcare",
    decisionsEyebrow: "// Trois décisions structurantes",
    decisions: [
      {
        number: "01",
        title: "Clarifier dès le premier regard.",
        text: "La nouvelle entrée de page articule immédiatement la promesse, les preuves de confiance et les deux actions essentielles : découvrir les produits ou réserver un soin.",
      },
      {
        number: "02",
        title: "Faire de l’image une matière de marque.",
        text: "La photographie devient le cœur de l’expérience. Une grille plus généreuse, un grain assumé et une palette sauge et bleu ciel installent un univers sensible et reconnaissable.",
      },
      {
        number: "03",
        title: "Transformer sans brusquer.",
        text: "Les produits, les services et les bénéfices ont chacun une place claire. Le parcours conserve une respiration éditoriale tout en rapprochant les points de conversion.",
      },
    ],
    resultEyebrow: "// Le résultat",
    resultTitle: "Plus calme.",
    resultTitleAccent: "Plus évident.",
    resultText:
      "Une expérience qui laisse davantage respirer la marque, tout en rapprochant naturellement les produits, les soins et les preuves de confiance.",
    resultAlt: "Vue complète de la nouvelle expérience SBcare",
    continueEyebrow: "// Continuer",
    projectsCta: "Retour aux projets",
  },
  en: {
    back: "All projects",
    eyebrow: "// Case study — beauty & e-commerce",
    intro:
      "Reimagining a skincare store as a clearer, more human and naturally premium brand experience.",
    heroAlt: "New SBcare homepage",
    projectEyebrow: "// The project",
    projectLead: "The former website displayed the treatments. The redesign had to make the brand feel tangible —",
    projectLeadAccent: "and guide every visitor towards the right choice.",
    facts: [
      ["Mission", "E-commerce redesign"],
      ["Role", "Art direction, UI/UX, development"],
      ["Year", "2026"],
    ],
    comparisonEyebrow: "// Before · after",
    comparisonTitle: "Same brand. A whole new feeling.",
    comparisonLabel: "Choose which version of the website to display",
    before: "Before",
    after: "After",
    beforeAlt: "Previous version of the SBcare website",
    afterAlt: "New version of the SBcare website",
    decisionsEyebrow: "// Three defining decisions",
    decisions: [
      {
        number: "01",
        title: "Make everything clear at first glance.",
        text: "The new opening section immediately brings together the promise, trust signals and two essential actions: discovering the products or booking a treatment.",
      },
      {
        number: "02",
        title: "Turn imagery into a brand signature.",
        text: "Photography becomes the heart of the experience. A more generous grid, intentional grain and a sage-and-sky-blue palette create a distinctive, emotive world.",
      },
      {
        number: "03",
        title: "Drive conversion without the hard sell.",
        text: "Products, services and benefits each have a clear place. The journey retains its editorial rhythm while bringing conversion points closer at hand.",
      },
    ],
    resultEyebrow: "// The outcome",
    resultTitle: "More serene.",
    resultTitleAccent: "More intuitive.",
    resultText:
      "An experience that gives the brand more room to breathe while naturally connecting products, treatments and trust signals.",
    resultAlt: "Full view of the new SBcare experience",
    continueEyebrow: "// Keep exploring",
    projectsCta: "Back to projects",
  },
} as const;

export default function SbcareCaseStudy() {
  const { language } = useLanguage();
  const text = copy[language];
  const pageRef = useRef<HTMLElement>(null);
  const comparisonAfterRef = useRef<HTMLDivElement>(null);
  const [comparisonMode, setComparisonMode] = useState<"before" | "after">(
    "before",
  );

  const selectComparison = (mode: "before" | "after") => {
    setComparisonMode(mode);
    const after = comparisonAfterRef.current;
    if (!after) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    gsap.to(after, {
      clipPath:
        mode === "after" ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
      duration: reduceMotion ? 0 : 0.75,
      ease: "power3.inOut",
      overwrite: "auto",
    });
  };

  useLayoutEffect(() => {
    // Lenis persiste entre les routes : réinitialiser sa position native au
    // montage garantit que le case study commence toujours tout en haut.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const page = pageRef.current;
    if (!page) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      gsap.set(
        page.querySelectorAll("[data-hero-image], [data-decision] > *"),
        { opacity: 1 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from("[data-hero-nav]", { opacity: 0, y: -16, duration: 0.55 })
        .from(
          "[data-hero-copy] > *",
          { opacity: 0, y: 60, duration: 0.85, stagger: 0.09 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero-image]",
          { clipPath: "inset(18% 12% 18% 12%)", opacity: 0, scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            scale: 1,
            duration: 1.25,
          },
          "-=0.65",
        );

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 70,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((image) => {
        gsap.from(image, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.15,
          ease: "power4.inOut",
          scrollTrigger: { trigger: image, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-decision]").forEach((decision) => {
        gsap.set(decision.children, { y: 42 });
        gsap.to(decision.children, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: {
            trigger: decision,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, page);

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={pageRef} className="min-h-screen bg-canvas text-title">
      <header className="container !pt-28 md:!pt-32 xl:!pt-36">
        <Link
          href="/#projets"
          data-hero-nav
          className="group fixed left-6 top-6 z-[100] inline-flex min-h-11 items-center gap-2 rounded-full bg-surface px-4 text-sm font-medium shadow-[0_8px_24px_rgba(17,17,16,0.08)] transition-transform duration-200 active:scale-[0.96] md:left-12 md:top-10"
        >
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          {text.back}
        </Link>
        <div data-hero-copy className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-accent md:text-sm">
              {text.eyebrow}
            </p>
            <h1 className="max-w-5xl text-balance font-bricolage text-[clamp(4.5rem,14vw,12rem)] font-medium leading-[0.78] tracking-[-0.08em]">
              SBcare
            </h1>
          </div>
          <p className="max-w-md text-pretty text-base leading-relaxed text-body lg:col-span-4 lg:ml-auto lg:pb-2 lg:text-right lg:text-lg">
            {text.intro}
          </p>
        </div>

        <div
          data-hero-image
          className="relative mt-12 aspect-[2558/1652] overflow-hidden rounded-[1rem] bg-[#a8c7eb] md:mt-20 md:rounded-[1.5rem]"
          style={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 0 }}
        >
          <Image
            src="/images/case-studies/sbcare-hero-clean.webp"
            alt={text.heroAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover object-top"
          />
        </div>
      </header>

      <section className="container border-b border-stroke !pt-12 !pb-6 md:!py-28">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <p data-reveal className="text-xs font-medium uppercase tracking-[0.18em] text-accent lg:col-span-3">
            {text.projectEyebrow}
          </p>
          <div className="lg:col-span-9">
            <p data-reveal className="max-w-5xl text-pretty font-bricolage text-3xl font-medium leading-[1.08] tracking-[-0.04em] md:text-5xl xl:text-6xl">
              {text.projectLead}{" "}
              <span className="text-label">
                {text.projectLeadAccent}
              </span>
            </p>
            <dl className="mt-10 grid w-full gap-5 border-t border-stroke pt-6 md:mt-16 md:grid-cols-3 md:gap-7 md:pt-7">
              {text.facts.map(([label, value], index) => (
                <div
                  data-reveal
                  key={label}
                  className={index === text.facts.length - 1 ? "md:justify-self-end md:text-right" : undefined}
                >
                  <dt className="mb-2 text-xs uppercase tracking-[0.14em] text-label">
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-title md:text-base">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="container !py-20 md:!py-32">
        <div data-reveal className="mb-12 flex flex-col gap-5 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {text.comparisonEyebrow}
            </p>
            <h2 className="max-w-3xl text-balance font-bricolage text-4xl font-medium leading-none tracking-[-0.05em] md:text-6xl xl:text-7xl">
              {text.comparisonTitle}
            </h2>
          </div>
          <div
            role="group"
            aria-label={text.comparisonLabel}
            className="inline-flex w-fit rounded-full bg-surface p-1 shadow-[0_8px_24px_rgba(17,17,16,0.08)]"
          >
            {(["before", "after"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={comparisonMode === mode}
                onClick={() => selectComparison(mode)}
                className={`min-h-11 rounded-full px-5 text-sm font-medium transition-[background-color,color,transform] duration-300 active:scale-[0.96] ${
                  comparisonMode === mode
                    ? "bg-title text-white"
                    : "text-body hover:text-title"
                }`}
              >
                {mode === "before" ? text.before : text.after}
              </button>
            ))}
          </div>
        </div>

        <div
          data-comparison
          className="relative aspect-[2558/1652] overflow-hidden rounded-[1rem] bg-surface md:rounded-[1.5rem]"
        >
          <Image
            src="/images/case-studies/sbcare-before.png"
            alt={text.beforeAlt}
            fill
            sizes="100vw"
            className="object-cover object-top"
          />
          <div
            ref={comparisonAfterRef}
            data-comparison-after
            className="absolute inset-y-0 -left-px -right-px bg-[#a8c7eb]"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <Image
              src="/images/case-studies/sbcare-hero-clean.webp"
              alt={text.afterAlt}
              fill
              sizes="100vw"
              className="object-contain object-top"
            />
          </div>
        </div>
      </section>

      <section className="bg-dark text-white">
        <div className="container !py-20 md:!py-32">
          <p data-reveal className="mb-16 text-xs font-medium uppercase tracking-[0.18em] text-accent md:mb-24">
            {text.decisionsEyebrow}
          </p>
          <div className="divide-y divide-white/15 border-y border-white/15">
            {text.decisions.map((decision) => (
              <article
                data-decision
                key={decision.number}
                className="grid gap-5 py-10 md:grid-cols-12 md:gap-8 md:py-16"
              >
                <span className="opacity-0 text-xs text-white/45 md:col-span-1">{decision.number}</span>
                <h3 className="opacity-0 text-balance font-bricolage text-3xl font-medium leading-tight tracking-[-0.04em] md:col-span-6 md:text-5xl">
                  {decision.title}
                </h3>
                <p className="opacity-0 max-w-lg text-pretty text-sm leading-relaxed text-white/65 md:col-span-5 md:text-base">
                  {decision.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-surface py-16 md:py-28">
        <div className="container !py-0">
          <div data-reveal className="mb-12 grid gap-8 md:mb-20 lg:grid-cols-12">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent lg:col-span-3">
              {text.resultEyebrow}
            </p>
            <div className="lg:col-span-9">
              <h2 className="text-balance font-bricolage text-5xl font-medium leading-[0.88] tracking-[-0.06em] md:text-7xl xl:text-9xl">
                {text.resultTitle}
                <span className="block pl-[0.7em] font-bold italic text-accent md:pl-[1.25em]">
                  {text.resultTitleAccent}
                </span>
              </h2>
              <p className="ml-auto mt-10 max-w-md text-pretty text-sm leading-relaxed text-body md:mt-14 md:text-base">
                {text.resultText}
              </p>
            </div>
          </div>
          <div
            data-image-reveal
            className="mx-auto max-w-5xl overflow-hidden rounded-[1rem] bg-white shadow-[0_35px_100px_rgba(17,17,16,0.14)] outline outline-1 -outline-offset-1 outline-black/10 md:rounded-[1.5rem]"
          >
            <Image
              src="/images/case-studies/sbcare-after.png"
              alt={text.resultAlt}
              width={1054}
              height={1786}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <footer className="bg-canvas">
        <div className="container !py-20 md:!py-28">
          <p data-reveal className="mb-5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {text.continueEyebrow}
          </p>
          <div data-reveal className="flex justify-end border-t border-stroke pt-10">
            <Link
              href="/#projets"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 active:scale-[0.96]"
            >
              {text.projectsCta}&nbsp; ↗
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
