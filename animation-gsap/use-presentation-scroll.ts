import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Présentation — révélation des images/badges au scroll.
//
// Effet : chaque élément est "collé" au texte (largeur 0), puis s'ouvre en deux
// depuis le centre tout en poussant le texte. Les éléments s'animent l'un après
// l'autre (tour à tour), le tout synchronisé au scroll (scrub) en douceur.
//
// Structure DOM attendue (cf. presentation.tsx) :
//   <span data-clip>              ← conteneur dont la largeur s'anime 0 → W
//     <span data-clip-inner>      ← contenu centré en absolu (image/badge)
//       …
// ─────────────────────────────────────────────────────────────────────────────

const DURATION = 1.4; // durée d'ouverture d'un élément (unités timeline)
const STEP = 1.15; // décalage entre deux éléments (overlap = DURATION - STEP)

export function usePresentationScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const build = (scrollTrigger: ScrollTrigger.Vars) => {
      const ctx = gsap.context(() => {
        const clips = gsap.utils.toArray<HTMLElement>("[data-clip]", section);
        const tl = gsap.timeline({ scrollTrigger });

        clips.forEach((clip, i) => {
          const inner = clip.querySelector<HTMLElement>("[data-clip-inner]");
          if (!inner) return;

          // 1. Mesure des dimensions naturelles (avant de replier).
          const naturalW = inner.offsetWidth;
          const naturalH = inner.offsetHeight;

          // 2. État initial : conteneur fermé, contenu centré en absolu.
          //    Le contenu en absolu + overflow hidden = on ne voit que la
          //    bande centrale, qui s'élargira vers la gauche ET la droite.
          gsap.set(clip, { width: 0, height: naturalH, overflow: "hidden" });
          gsap.set(inner, {
            position: "absolute",
            left: "50%",
            top: 0,
            xPercent: -50,
            scale: 1.12,
            transformOrigin: "center center",
          });

          // 3. Animation, positionnée en cascade (tour à tour).
          //    ease "none" = la progression suit EXACTEMENT le scroll
          //    (1:1), pas d'accélération parasite → ressenti naturel.
          const at = i * STEP;
          tl.to(
            clip,
            { width: naturalW, duration: DURATION, ease: "none" },
            at,
          );
          tl.to(inner, { scale: 1, duration: DURATION, ease: "none" }, at);
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    const mm = gsap.matchMedia();

    // Desktop — plage de scroll large = animation lente et posée.
    mm.add("(min-width: 768px)", () =>
      build({
        trigger: section,
        start: "top 75%",
        end: "90% 60%",
        markers: true,
        scrub: true,
      }),
    );

    // Mobile.
    mm.add("(max-width: 767px)", () =>
      build({
        trigger: section,
        start: "top 90%",
        end: "bottom 50%",
        scrub: true,
      }),
    );

    return () => mm.revert();
  }, []);

  return { sectionRef };
}
