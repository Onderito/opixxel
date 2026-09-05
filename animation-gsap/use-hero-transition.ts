import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useHeroTransition() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = gsap.matchMedia();
    media.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
      const select = gsap.utils.selector(section);
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${section.offsetHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(select("[data-hero-secondary]"), { opacity: 0, duration: 0.18 }, 0)
        .to(select("[data-hero-curtain]"), {
          xPercent: (index) => index === 0 ? -100 : 100,
          duration: 0.85,
          ease: "power2.inOut",
        }, 0.08)
        .to(select("[data-hero-half]"), {
          x: (index) => (index === 0 ? -1 : 1) * window.innerWidth * 0.65,
          duration: 0.85,
          ease: "power2.inOut",
        }, 0.08)
        .to(section, { autoAlpha: 0, duration: 0.07 }, 0.93);

        return () => timeline.revert();
      },
    );

    return () => media.revert();
  }, []);

  return sectionRef;
}
