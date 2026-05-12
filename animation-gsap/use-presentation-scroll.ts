import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EASE_REVEAL = "power4.out";
const EASE_CLIP = "power3.inOut";

const SLIDE_DUR = 0.85;
const CLIP_DUR = 0.9;
const STEP = 0.15;
const PHRASE_GAP = 0.22;

function buildTimeline(tl: gsap.core.Timeline, groups: HTMLElement[]) {
  let currentPhrase = groups[0]?.dataset.phrase ?? "0";
  let cursor = 0;
  let phraseEndTime = 0;

  groups.forEach((group) => {
    const phrase = group.dataset.phrase ?? "0";

    if (phrase !== currentPhrase) {
      cursor = phraseEndTime + PHRASE_GAP;
      currentPhrase = phrase;
    }

    const slide = group.querySelector<HTMLElement>("[data-slide]");
    if (!slide) return;

    const fromLeft = group.dataset.dir === "left";
    const extraDelay = parseFloat(group.dataset.delay ?? "0");
    const ease = group.dataset.ease ?? EASE_REVEAL;

    tl.to(
      slide,
      {
        [fromLeft ? "xPercent" : "yPercent"]: 0,
        duration: SLIDE_DUR,
        ease,
      },
      cursor + extraDelay,
    );
    let groupEnd = cursor + SLIDE_DUR + extraDelay;

    const clipTarget =
      group.querySelector<HTMLElement>("[data-design-clip]") ??
      group.querySelector<HTMLElement>("[data-img-clip]");

    if (clipTarget) {
      tl.to(
        clipTarget,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: CLIP_DUR,
          ease: EASE_CLIP,
        },
        cursor + extraDelay,
      );
      groupEnd = Math.max(groupEnd, cursor + CLIP_DUR + extraDelay);
    }

    phraseEndTime = Math.max(phraseEndTime, groupEnd);
    cursor += STEP;
  });
}

export function usePresentationScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>("[data-phrase]", section);

      // États initiaux
      groups.forEach((group) => {
        const slide = group.querySelector<HTMLElement>("[data-slide]");
        if (slide) {
          group.dataset.dir === "left"
            ? gsap.set(slide, { xPercent: -110 })
            : gsap.set(slide, { yPercent: 110 });
        }
        const clipTarget =
          group.querySelector<HTMLElement>("[data-design-clip]") ??
          group.querySelector<HTMLElement>("[data-img-clip]");
        if (clipTarget)
          gsap.set(clipTarget, { clipPath: "inset(0% 50% 0% 50%)" });
      });

      const mm = gsap.matchMedia();

      // ── Desktop : section pinnée, animation séquence par séquence au scroll
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=180%",
            pin: true,
            anticipatePin: 1,
            scrub: 1.5,
          },
        });
        buildTimeline(tl, groups);
      });

      // ── Mobile : pas de pin, scroll classique
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 10%",
            scrub: 1,
          },
        });
        buildTimeline(tl, groups);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
}
