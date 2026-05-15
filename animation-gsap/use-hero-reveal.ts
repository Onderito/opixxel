import { useLayoutEffect } from "react";
import gsap from "gsap";
import type { HeroMotionRefs } from "@/animation-gsap/use-hero-motion-refs";

export function useHeroReveal({
  navRef,
  ctaRef,
  leftCopyRef,
  rightCopyRef,
  titleRef,
}: HeroMotionRefs) {
  useLayoutEffect(() => {
    const navElement = navRef.current;
    const ctaElement = ctaRef.current;
    const leftCopyElement = leftCopyRef.current;
    const rightCopyElement = rightCopyRef.current;
    const titleElement = titleRef.current;

    if (!ctaElement || !leftCopyElement || !rightCopyElement || !titleElement) {
      return;
    }

    const reelElements =
      titleElement.querySelectorAll<HTMLElement>("[data-xx-reel]");
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const getFinalOffset = (element: HTMLElement) => {
      const firstLetter = element.firstElementChild as HTMLElement | null;
      if (!firstLetter) return 0;
      return -((element.children.length - 1) * firstLetter.offsetHeight);
    };

    if (reduceMotion) {
      gsap.set([navElement, ctaElement, leftCopyElement, rightCopyElement], {
        autoAlpha: 1,
        x: 0,
      });
      reelElements.forEach((element) => {
        gsap.set(element, { y: getFinalOffset(element) });
      });
      return;
    }

    gsap.set(navElement, { autoAlpha: 0, x: -72 });
    gsap.set(ctaElement, { autoAlpha: 0, x: 72 });
    gsap.set(leftCopyElement, { autoAlpha: 0, x: -72 });
    gsap.set(rightCopyElement, { autoAlpha: 0, x: 72 });
    gsap.set(reelElements, { y: 0 });

    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline.to(
      reelElements,
      {
        y: (_, element) => getFinalOffset(element as HTMLElement),
        duration: 3,
        stagger: 0.08,
        ease: "power3.out",
      },
      0,
    );

    timeline.addLabel("contentReveal", 0.6);

    if (navElement) {
      timeline.to(navElement, { autoAlpha: 1, x: 0, duration: 0.8 }, "contentReveal");
    }

    timeline.to(
      [ctaElement, rightCopyElement],
      { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.06 },
      "contentReveal",
    );

    timeline.to(leftCopyElement, { autoAlpha: 1, x: 0, duration: 0.8 }, "contentReveal");

    return () => {
      timeline.kill();
      gsap.set(
        [navElement, ctaElement, leftCopyElement, rightCopyElement, ...reelElements],
        { clearProps: "all" },
      );
    };
  }, [ctaRef, leftCopyRef, navRef, rightCopyRef, titleRef]);
}
