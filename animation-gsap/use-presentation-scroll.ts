import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// Présentation — révélation des images/badges au scroll.
//
// Effet : la largeur de chaque élément part de zéro au centre de sa ligne puis
// s'ouvre progressivement. Comme les lignes sont centrées, le texte se répartit
// simultanément vers la gauche et la droite.
//
// Structure DOM attendue (cf. presentation.tsx) :
//   <span data-clip>              ← conteneur dont la largeur s'anime 0 → W
//     <span data-clip-inner>      ← contenu centré en absolu (image/badge)
//       …
// ─────────────────────────────────────────────────────────────────────────────

const DURATION = 1.8;
const STEP = 1.1;
const OPEN_EASE = "sine.inOut";

export function usePresentationScroll(refreshKey: string) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const build = (scrollTrigger: ScrollTrigger.Vars) => {
      const ctx = gsap.context(() => {
        const clips = gsap.utils.toArray<HTMLElement>("[data-clip]", section);
        const cta = section.querySelector<HTMLElement>("[data-presentation-cta]");
        const tl = gsap.timeline({ scrollTrigger });

        clips.forEach((clip, i) => {
          const inner = clip.querySelector<HTMLElement>("[data-clip-inner]");
          if (!inner) return;

          const naturalW = inner.offsetWidth;
          const naturalH = inner.offsetHeight;

          gsap.set(clip, {
            width: 0,
            height: naturalH,
            overflow: "hidden",
          });
          gsap.set(inner, {
            position: "absolute",
            left: "50%",
            top: 0,
            xPercent: -50,
            scale: 0.995,
            opacity: 0.82,
            willChange: "transform, opacity",
            transformOrigin: "center center",
          });

          const at = i * STEP;
          tl.to(
            clip,
            {
              width: naturalW,
              duration: DURATION,
              ease: OPEN_EASE,
            },
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

        if (cta) {
          const ctaInner = cta.querySelector<HTMLElement>(
            "[data-presentation-cta-inner]",
          );
          if (!ctaInner) return;

          // Le CTA démarre avec le dernier visuel au lieu d'attendre la fin
          // complète de la séquence.
          const ctaAt = Math.max(0, (clips.length - 1) * STEP + 0.25);
          const naturalW = ctaInner.offsetWidth;
          const naturalH = ctaInner.offsetHeight;
          gsap.set(cta, {
            width: 0,
            height: naturalH,
            overflow: "hidden",
          });
          gsap.set(ctaInner, {
            position: "absolute",
            left: "50%",
            top: 0,
            xPercent: -50,
            scale: 0.995,
            opacity: 0.82,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });
          tl.to(
            cta,
            {
              width: naturalW,
              duration: 0.9,
              ease: "power3.out",
            },
            ctaAt,
          );
          tl.to(
            ctaInner,
            {
              scale: 1,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
            },
            ctaAt,
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    };

    const mm = gsap.matchMedia();

    // Animation uniquement sur desktop (≥768px). Sur mobile, les images
    // restent dans le flux normal (visibles, pas de width:0) → aucun
    // risque qu'elles restent fermées ou débordent horizontalement.
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () =>
      build({
        trigger: section,
        start: "top 80%",
        end: "bottom 35%",
        // L'inertie absorbe les grands écarts produits par un scroll rapide.
        scrub: 2.2,
      }),
    );

    return () => mm.revert();
  }, [refreshKey]);

  return { sectionRef };
}
