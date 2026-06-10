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
const OPEN_EASE = "power1.inOut"; // démarrage ET fin en douceur → ouverture calme

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
            scale: 1.05,
            opacity: 0.6,
            willChange: "transform, opacity",
            transformOrigin: "center center",
          });

          // 3. Animation, positionnée en cascade (tour à tour).
          //    Easing "power1.inOut" : l'ouverture démarre lentement, monte
          //    à peine en vitesse puis se pose en douceur → pas d'effet
          //    « boum », tout en restant piloté par le scroll (scrub).
          const at = i * STEP;
          tl.to(
            clip,
            { width: naturalW, duration: DURATION, ease: OPEN_EASE },
            at,
          );
          tl.to(
            inner,
            {
              scale: 1,
              opacity: 1,
              duration: DURATION,
              ease: OPEN_EASE,
            },
            at,
          );
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    const mm = gsap.matchMedia();

    // Animation uniquement sur desktop (≥768px). Sur mobile, les images
    // restent dans le flux normal (visibles, pas de width:0) → aucun
    // risque qu'elles restent fermées ou débordent horizontalement.
    mm.add("(min-width: 768px)", () =>
      build({
        trigger: section,
        // La séquence commence un peu plus tôt et se déroule sur une plus
        // grande portion de scroll → chaque élément a le temps de respirer.
        start: "top 80%",
        end: "bottom 65%",
        // scrub numérique : la timeline « rattrape » le scroll avec ~1.2s de
        // lissage → mouvement calme et régulier, sans à-coups.
        scrub: 1.2,
      }),
    );

    return () => mm.revert();
  }, []);

  return { sectionRef };
}
