import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePresentationScroll() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>("[data-phrase]", section);

      // ── Groupes animés : images + badge design ────────────────────────────
      const animatedGroups = groups.filter(
        (g) =>
          g.querySelector("[data-img-clip]") !== null ||
          g.querySelector("[data-design-clip]") !== null,
      );

      // ── Mémorise largeurs naturelles AVANT réduction à 0 ─────────────────
      const naturalWidths = new Map<HTMLElement, number>();
      animatedGroups.forEach((g) => naturalWidths.set(g, g.offsetWidth));

      // ── État initial : groupes animés à 0, textes visibles ───────────────
      animatedGroups.forEach((g) =>
        gsap.set(g, { width: 0, overflow: "hidden" }),
      );

      const mm = gsap.matchMedia();

      // ── Desktop : scrub ───────────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            end: "80% 50%",
            scrub: 1.2,
          },
        });

        animatedGroups.forEach((g, i) => {
          tl.to(
            g,
            {
              width: naturalWidths.get(g),
              duration: 1.5,
              ease: "power2.out",
            },
            i * 0.5,
          );

          const inner = g.querySelector<HTMLElement>(
            "[data-img-clip], [data-design-clip]",
          );
          if (inner) {
            gsap.set(inner, { scale: 1.08, transformOrigin: "center center" });
            tl.to(
              inner,
              { scale: 1, duration: 0.7, ease: "power2.out" },
              i * 0.5,
            );
          }
        });
      });

      ////////////////////// FORMAT DES MOBILES ////////////////////////
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "60% 50%",
            scrub: 1.2,
          },
        });

        animatedGroups.forEach((g, i) => {
          tl.to(
            g,
            {
              width: naturalWidths.get(g),
              duration: 1.5,
              ease: "power2.out",
            },
            i * 0.5,
          );

          const inner = g.querySelector<HTMLElement>(
            "[data-img-clip], [data-design-clip]",
          );
          if (inner) {
            gsap.set(inner, { scale: 1.08, transformOrigin: "center center" });
            tl.to(
              inner,
              { scale: 1, duration: 0.7, ease: "power2.out" },
              i * 0.5,
            );
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
}
