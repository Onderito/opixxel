import { useRef } from "react";

export type HeroMotionRefs = {
  leftCopyRef: React.RefObject<HTMLParagraphElement | null>;
  rightCopyRef: React.RefObject<HTMLParagraphElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
};

export function useHeroMotionRefs(): HeroMotionRefs {
  const leftCopyRef = useRef<HTMLParagraphElement>(null);
  const rightCopyRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return {
    leftCopyRef,
    rightCopyRef,
    titleRef,
  };
}
