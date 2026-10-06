import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useStepScroll(refreshKey = "") {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const stage = section.querySelector<HTMLElement>("[data-method-stage]");
        const panels = gsap.utils.toArray<HTMLElement>(
          "[data-method-panel]",
          section,
        );

        if (!stage || panels.length < 2) return;

        const incomingPanels = panels.slice(1);
        const markerNumbers = gsap.utils.toArray<HTMLElement>("[data-method-marker-number]", section);
        const markerBars = gsap.utils.toArray<HTMLElement>("[data-method-marker-bar]", section);

        gsap.set(panels, { zIndex: (index) => index + 1 });
        gsap.set(incomingPanels, {
          yPercent: 100,
          force3D: true,
        });

        panels.forEach((panel, index) => {
          if (index === 0) return;
          gsap.set(
            panel.querySelectorAll(
              "[data-method-kicker], [data-method-title], [data-method-description], [data-method-cta]",
            ),
            { y: 24, autoAlpha: 0 },
          );
        });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.7}`,
            pin: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        incomingPanels.forEach((panel, index) => {
          const at = index * 1.25;
          const copy = panel.querySelectorAll(
            "[data-method-kicker], [data-method-title], [data-method-description], [data-method-cta]",
          );

          timeline.to(markerBars[index], {
            scaleX: 0.375, opacity: 0, duration: 0.5, ease: "power2.inOut",
          }, at + 0.3);
          timeline.to(markerBars[index + 1], {
            scaleX: 1, opacity: 1, duration: 0.5, ease: "power2.inOut",
          }, at + 0.3);
          timeline.to(markerNumbers[index], {
            opacity: 0.45, duration: 0.5, ease: "power2.inOut",
          }, at + 0.3);
          timeline.to(markerNumbers[index + 1], {
            opacity: 1, duration: 0.5, ease: "power2.inOut",
          }, at + 0.3);

          timeline.to(
            panel,
            {
              yPercent: 0,
              force3D: true,
              duration: 0.82,
              ease: "power2.inOut",
            },
            at,
          );
          timeline.to(
            copy,
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.42,
              stagger: 0.08,
              ease: "power3.out",
            },
            at + 0.54,
          );
          timeline.to({}, { duration: 0.43 });
        });
      }, section);

      return () => ctx.revert();
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      const panels = section.querySelectorAll<HTMLElement>("[data-method-panel]");
      gsap.set(panels, { clearProps: "all" });
    });

    return () => mm.revert();
  }, [refreshKey]);

  return { sectionRef };
}
