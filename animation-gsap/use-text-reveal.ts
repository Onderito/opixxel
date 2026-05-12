import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────────────────────
// useTextReveal
//
// Hook réutilisable pour animer un bloc section (eyebrow + h2 + description).
// Pose le ref sur le conteneur parent, puis ajoute les data-* sur tes éléments :
//
//   data-eyebrow  → "// commentaire"  → glisse depuis la gauche
//   data-heading  → <h2>              → clip-path + y — même signature que la présentation
//   data-desc     → <p>               → fade + glisse vers le haut, décalé
//
// Usage :
//   const { ref } = useTextReveal();
//   <div ref={ref}>
//     <span data-eyebrow>// titre</span>
//     <h2 data-heading>Mon titre</h2>
//     <p data-desc>Ma description</p>   ← optionnel
//   </div>
// ─────────────────────────────────────────────────────────────────────────────

export function useTextReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const eyebrow = container.querySelector<HTMLElement>("[data-eyebrow]");
      const heading = container.querySelector<HTMLElement>("[data-heading]");
      const desc = container.querySelector<HTMLElement>("[data-desc]");

      if (!eyebrow && !heading && !desc) return;

      // ── États initiaux ──────────────────────────────────────────────────────

      // Eyebrow : hors-champ à gauche, invisible
      if (eyebrow) gsap.set(eyebrow, { opacity: 0, x: -28 });

      // Heading : clipPath qui masque par le bas + décalage vertical
      // → même vocabulaire que les mots de la présentation
      if (heading) {
        gsap.set(heading, {
          y: 52,
          clipPath: "inset(0 0 110% 0)",
        });
      }

      // Description : décalée vers le bas, invisible
      if (desc) gsap.set(desc, { opacity: 0, y: 36 });

      // ── Timeline play-once ──────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 82%",
          once: true,
        },
      });

      // 1. Eyebrow glisse depuis la gauche
      if (eyebrow) {
        tl.to(
          eyebrow,
          { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" },
          0,
        );
      }

      // 2. H2 : reveal clip-path + remontée — le moment fort
      if (heading) {
        tl.to(
          heading,
          {
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            ease: "power4.out",
          },
          0.14,
        );
      }

      // 3. Description : monte en douceur une fois le titre posé
      if (desc) {
        tl.to(
          desc,
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          0.48,
        );
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return { ref };
}
