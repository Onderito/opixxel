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

const DESKTOP_DURATION = 1.05;
const DESKTOP_STEP = 0.55;
const OPEN_EASE = "power2.inOut";

export function usePresentationScroll(refreshKey: string) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const buildDesktop = (scrollTrigger: ScrollTrigger.Vars) => {
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

          const at = i * DESKTOP_STEP;
          tl.to(
            clip,
            {
              width: naturalW,
              duration: DESKTOP_DURATION,
              ease: OPEN_EASE,
            },
            at,
          );
          tl.to(
            inner,
            {
              scale: 1,
              opacity: 1,
              duration: DESKTOP_DURATION,
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
          const ctaAt = Math.max(
            0,
            (clips.length - 1) * DESKTOP_STEP + 0.15,
          );
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

    const buildMobile = () => {
      const ctx = gsap.context(() => {
        const rows = gsap.utils.toArray<HTMLElement>(
          "[data-presentation-row]",
          section,
        );
        const clips = gsap.utils.toArray<HTMLElement>("[data-clip]", section);

        rows.forEach((row) => {
          gsap.set(row, {
            opacity: 0,
            y: 18,
            filter: "blur(4px)",
          });
        });

        clips.forEach((clip) => {
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
            opacity: 0.72,
            scale: 0.96,
            transformOrigin: "center center",
            willChange: "transform, opacity",
          });

          clip.dataset.naturalWidth = String(naturalW);
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });

        rows.forEach((row, rowIndex) => {
          const rowAt = rowIndex * 0.11;
          tl.to(
            row,
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.48,
              ease: "power3.out",
            },
            rowAt,
          );

          const rowClips = gsap.utils.toArray<HTMLElement>("[data-clip]", row);
          rowClips.forEach((clip, clipIndex) => {
            const inner = clip.querySelector<HTMLElement>("[data-clip-inner]");
            const naturalW = Number(clip.dataset.naturalWidth);
            if (!inner || !naturalW) return;

            const clipAt = rowAt + 0.08 + clipIndex * 0.08;
            tl.to(
              clip,
              {
                width: naturalW,
                duration: 0.56,
                ease: "power3.out",
              },
              clipAt,
            );
            tl.to(
              inner,
              {
                opacity: 1,
                scale: 1,
                duration: 0.56,
                ease: "power3.out",
              },
              clipAt,
            );
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () =>
      buildDesktop({
        trigger: section,
        start: "top 80%",
        end: "bottom 58%",
        scrub: 1.05,
      }),
    );

    mm.add(
      "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      buildMobile,
    );

    return () => mm.revert();
  }, [refreshKey]);

  return { sectionRef };
}
