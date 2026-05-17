import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useStepScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1280px)", () => {
      const ctx = gsap.context(() => {

        // ── Cards ──────────────────────────────────────────────
        const xlLayout = section.querySelector("[data-step-xl]");
        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-step-card]",
          xlLayout ?? section,
        );
        cards.forEach((card, i) => {
          const fromX = i === 1 ? 160 : -160;
          gsap.set(card, { opacity: 0, y: 80, x: fromX, rotate: i === 1 ? 4 : -4 });
          gsap.to(card, {
            opacity: 1,
            y: 0,
            x: 0,
            rotate: 0,
            duration: 0.7,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: card, start: "top 80%" },
          });
        });

        // ── Flèches ────────────────────────────────────────────
        const arrows = gsap.utils.toArray<HTMLElement>("[data-step-arrow]", section);
        arrows.forEach((arrow) => {
          const line = arrow.querySelector<SVGPathElement>("[data-arrow-line]");
          const head = arrow.querySelector<SVGPathElement>("[data-arrow-head]");
          if (line)
            gsap.set(line, {
              strokeDasharray: line.getTotalLength(),
              strokeDashoffset: line.getTotalLength(),
            });
          if (head) gsap.set(head, { opacity: 0 });
          const tl = gsap.timeline({ scrollTrigger: { trigger: arrow, start: "top 88%" } });
          if (line) tl.to(line, { strokeDashoffset: 0, duration: 0.4, ease: "power3.out" });
          if (head) tl.to(head, { opacity: 1, duration: 0.15 }, "-=0.05");
        });

        // ── Clipboard ──────────────────────────────────────────
        const clipboard = section.querySelector("[data-clipboard]");
        if (clipboard) {
          const body   = clipboard.querySelectorAll("[data-clip-body]");
          const inner  = clipboard.querySelectorAll("[data-clip-inner]");
          const check  = clipboard.querySelectorAll("[data-clip-check]");
          const cta    = clipboard.querySelector("[data-clip-cta]");
          const annots = clipboard.querySelectorAll("[data-clip-annotation]");
          const decos  = clipboard.querySelectorAll("[data-clip-deco]");
          const caption = clipboard.querySelector("[data-clip-caption]");

          gsap.set([body, inner, check, cta, annots, decos, caption], { opacity: 0 });
          gsap.set(body,  { y: 20 });
          gsap.set(inner, { y: 8 });
          gsap.set(check, { scale: 0, transformOrigin: "center" });
          gsap.set(decos, { scale: 0, transformOrigin: "center" });

          const tl = gsap.timeline({ scrollTrigger: { trigger: clipboard, start: "top 78%" } });

          tl.to(body,  { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)", stagger: 0.06 });
          tl.to(inner, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out", stagger: 0.04 }, "-=0.15");
          tl.to(check, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)", stagger: 0.05 }, "-=0.1");
          tl.to(cta,   { opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.05");
          tl.to(decos, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", stagger: 0.04 }, "-=0.2");
          tl.to(annots,{ opacity: 1, duration: 0.25, stagger: 0.08, ease: "power2.out" }, "-=0.1");
          tl.to(caption,{ opacity: 1, duration: 0.3, ease: "power2.out" });
        }

        // ── Wireframe ──────────────────────────────────────────
        const wire = section.querySelector("[data-wireframe]");
        if (wire) {
          const brackets  = wire.querySelectorAll<SVGPathElement>("[data-wire-bracket]");
          const box       = wire.querySelector("[data-wire-box]");
          const grid      = wire.querySelectorAll("[data-wire-grid]");
          const inner     = wire.querySelectorAll("[data-wire-inner]");
          const image     = wire.querySelector("[data-wire-image]");
          const textLines = wire.querySelectorAll("[data-wire-text-line]");
          const pill      = wire.querySelector("[data-wire-pill]");
          const bottoms   = wire.querySelectorAll("[data-wire-bottom]");
          const arrow     = wire.querySelectorAll("[data-wire-arrow]");
          const labels    = wire.querySelectorAll("[data-wire-label]");
          const caption   = wire.querySelector("[data-wire-caption]");

          brackets.forEach((b) =>
            gsap.set(b, { strokeDasharray: b.getTotalLength(), strokeDashoffset: b.getTotalLength() }),
          );
          gsap.set([box, grid, inner, image, textLines, pill, bottoms, arrow, labels, caption], { opacity: 0 });

          const tl = gsap.timeline({ scrollTrigger: { trigger: wire, start: "top 78%" } });

          tl.to(brackets,  { strokeDashoffset: 0, duration: 0.65, ease: "power3.inOut", stagger: 0 });
          tl.to(labels,    { opacity: 1, duration: 0.2, stagger: 0.06, ease: "power2.out" }, "-=0.15");
          tl.to(box,       { opacity: 1, duration: 0.25, ease: "power2.out" }, "-=0.05");
          tl.to(grid,      { opacity: 1, duration: 0.2, stagger: 0.03, ease: "none" });
          tl.to(inner,     { opacity: 1, duration: 0.18, stagger: 0.04, ease: "power2.out" });
          tl.fromTo(image, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" });
          tl.to(textLines, { opacity: 1, duration: 0.14, stagger: 0.05, ease: "power2.out" }, "-=0.05");
          tl.fromTo(pill,  { opacity: 0, scaleX: 0.5 }, { opacity: 1, scaleX: 1, duration: 0.28, ease: "back.out(2.5)" });
          tl.to(bottoms,   { opacity: 1, duration: 0.18, stagger: 0.06, ease: "power2.out" });
          tl.to(arrow,     { opacity: 1, duration: 0.18, stagger: 0.08, ease: "power2.out" });
          tl.to(caption,   { opacity: 1, duration: 0.28, ease: "power2.out" });
        }

        // ── CTA ────────────────────────────────────────────────
        const cta      = section.querySelector<HTMLElement>("[data-step-cta]");
        const ctaUnder = section.querySelector<HTMLElement>("[data-cta-underline]");

        if (cta && ctaUnder) {
          gsap.set(ctaUnder, { scaleX: 0, transformOrigin: "left center" });

          const tl = gsap.timeline({ scrollTrigger: { trigger: cta, start: "top 90%" } });
          tl.fromTo(cta, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.65, ease: "back.out(1.6)" });
          tl.to(ctaUnder, { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, "-=0.3");
        }

        // ── Rocket ─────────────────────────────────────────────
        const rocket = section.querySelector("[data-rocket]");
        if (rocket) {
          const body      = rocket.querySelectorAll("[data-rocket-body]");
          const wings     = rocket.querySelectorAll("[data-rocket-wing]");
          const porthole  = rocket.querySelector("[data-rocket-porthole]");
          const flame     = rocket.querySelector("[data-rocket-flame]");
          const decos     = rocket.querySelectorAll("[data-rocket-deco]");
          const annotations = rocket.querySelectorAll("[data-rocket-annotation]");
          const publish   = rocket.querySelectorAll("[data-rocket-publish]");

          gsap.set([body, wings, porthole], { opacity: 0, y: 40 });
          gsap.set(flame, { opacity: 0, scaleY: 0, transformOrigin: "top center" });
          gsap.set(decos, { opacity: 0, scale: 0, transformOrigin: "center" });
          gsap.set([annotations, publish], { opacity: 0 });

          const tl = gsap.timeline({ scrollTrigger: { trigger: rocket, start: "top 78%" } });

          tl.to([body, wings], { opacity: 1, y: 0, duration: 0.55, ease: "back.out(1.8)", stagger: 0.03 });
          tl.to(porthole,  { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2.5)" }, "-=0.2");
          tl.to(flame,     { opacity: 1, scaleY: 1, duration: 0.4, ease: "back.out(3)" }, "-=0.1");
          tl.to(flame,     { scaleY: 1.08, scaleX: 0.94, repeat: -1, yoyo: true, duration: 0.45, ease: "sine.inOut", transformOrigin: "top center" });
          tl.to(decos,     { opacity: 1, scale: 1, duration: 0.28, stagger: 0.03, ease: "back.out(2.5)" }, "<-0.15");
          tl.fromTo(publish, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2.5)", stagger: 0.04 }, "-=0.05");
          tl.to(annotations, { opacity: 1, duration: 0.28, stagger: 0.08, ease: "power2.out" });
        }

      }, sectionRef);

      return () => ctx.revert();
    });

    // ── Mobile + tablet (< 1280px) ─────────────────────────────
    mm.add("(max-width: 1279px)", () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-step-card]", section);

        cards.forEach((card) => {
          gsap.set(card, { opacity: 0, y: 50 });
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "back.out(1.5)",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        });

        // ── CTA mobile ─────────────────────────────────────────
        const cta      = section.querySelector<HTMLElement>("[data-step-cta-mobile]");
        const ctaUnder = cta?.querySelector<HTMLElement>("[data-cta-underline]");

        if (cta && ctaUnder) {
          gsap.set(ctaUnder, { scaleX: 0, transformOrigin: "left center" });
          const tl = gsap.timeline({ scrollTrigger: { trigger: cta, start: "top 90%" } });
          tl.fromTo(cta, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.65, ease: "back.out(1.6)" });
          tl.to(ctaUnder, { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, "-=0.3");
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return { sectionRef };
}
