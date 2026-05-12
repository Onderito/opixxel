import { useRef } from "react";

export type HeroMotionRefs = {
  navRef: React.RefObject<HTMLElement | null>;
  ctaRef: React.RefObject<HTMLAnchorElement | null>;
  leftCopyRef: React.RefObject<HTMLParagraphElement | null>;
  rightCopyRef: React.RefObject<HTMLParagraphElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
};

export function useHeroMotionRefs(): HeroMotionRefs {
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const leftCopyRef = useRef<HTMLParagraphElement>(null);
  const rightCopyRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return {
    navRef,
    ctaRef,
    leftCopyRef,
    rightCopyRef,
    titleRef,
  };
}
