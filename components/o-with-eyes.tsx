"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

function Eye({ pupilRef }: { pupilRef: React.RefObject<HTMLSpanElement | null> }) {
  return (
    <span
      className="absolute flex items-center justify-center rounded-full overflow-hidden"
      style={{
        width: "0.15em",
        height: "0.15em",
        border: "0.018em solid currentColor",
        background: "var(--bg-canvas)",
      }}
    >
      <span
        ref={pupilRef}
        className="rounded-full will-change-transform"
        style={{
          width: "0.065em",
          height: "0.065em",
          background: "currentColor",
          flexShrink: 0,
        }}
      />
    </span>
  );
}

export function OWithEyes() {
  const pupil1Ref = useRef<HTMLSpanElement>(null);
  const pupil2Ref = useRef<HTMLSpanElement>(null);
  const eye1Ref = useRef<HTMLSpanElement>(null);
  const eye2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const p1 = pupil1Ref.current;
    const p2 = pupil2Ref.current;
    if (!p1 || !p2) return;

    const RANGE = 3;
    const DURATION = 0.45;

    const x1 = gsap.quickTo(p1, "x", { duration: DURATION, ease: "power3.out" });
    const y1 = gsap.quickTo(p1, "y", { duration: DURATION, ease: "power3.out" });
    const x2 = gsap.quickTo(p2, "x", { duration: DURATION, ease: "power3.out" });
    const y2 = gsap.quickTo(p2, "y", { duration: DURATION, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      if (window.matchMedia("(max-width: 1023px)").matches) return;

      [
        { eyeRef: eye1Ref, xTo: x1, yTo: y1 },
        { eyeRef: eye2Ref, xTo: x2, yTo: y2 },
      ].forEach(({ eyeRef, xTo, yTo }) => {
        const rect = eyeRef.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
        xTo(Math.cos(angle) * RANGE);
        yTo(Math.sin(angle) * RANGE);
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <span className="relative inline-block" aria-label="Ö">
      O
      <span ref={eye1Ref} className="absolute" style={{ left: "0.14em", top: "0.02em" }}>
        <Eye pupilRef={pupil1Ref} />
      </span>
      <span ref={eye2Ref} className="absolute" style={{ left: "0.41em", top: "0.02em" }}>
        <Eye pupilRef={pupil2Ref} />
      </span>
    </span>
  );
}
