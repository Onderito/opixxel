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
          const fromX = i === 1 ? 100 : -100;
          gsap.set(card, { opacity: 0, y: 64, x: fromX });
          gsap.to(card, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 78%" },
          });
        });

        // ── Flèches ────────────────────────────────────────────
        const arrows = gsap.utils.toArray<HTMLElement>(
          "[data-step-arrow]",
          section,
        );
        arrows.forEach((arrow) => {
          const line = arrow.querySelector<SVGPathElement>("[data-arrow-line]");
          const head = arrow.querySelector<SVGPathElement>("[data-arrow-head]");
          if (line)
            gsap.set(line, {
              strokeDasharray: line.getTotalLength(),
              strokeDashoffset: line.getTotalLength(),
            });
          if (head) gsap.set(head, { opacity: 0 });
          const tl = gsap.timeline({
            scrollTrigger: { trigger: arrow, start: "top 85%" },
          });
          if (line)
            tl.to(line, {
              strokeDashoffset: 0,
              duration: 0.7,
              ease: "power2.inOut",
            });
          if (head) tl.to(head, { opacity: 1, duration: 0.2 }, "-=0.05");
        });

        // ── Venn ───────────────────────────────────────────────
        const venn = section.querySelector("[data-venn]");
        if (venn) {
          const circleLeft = venn.querySelector<SVGPathElement>(
            "[data-venn-circle-left]",
          );
          const circleRight = venn.querySelector<SVGPathElement>(
            "[data-venn-circle-right]",
          );
          const lens = venn.querySelector("[data-venn-lens]");
          const texts = venn.querySelectorAll("[data-venn-text]");
          const plus = venn.querySelector("[data-venn-plus]");
          const annotation = venn.querySelector("[data-venn-annotation]");
          const decos = venn.querySelectorAll("[data-venn-deco]");

          if (circleLeft)
            gsap.set(circleLeft, {
              strokeDasharray: circleLeft.getTotalLength(),
              strokeDashoffset: circleLeft.getTotalLength(),
            });
          if (circleRight)
            gsap.set(circleRight, {
              strokeDasharray: circleRight.getTotalLength(),
              strokeDashoffset: circleRight.getTotalLength(),
            });
          gsap.set([lens, decos], { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: venn, start: "top 75%" },
          });
          tl.to([circleLeft, circleRight], {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "power3.inOut",
          });
          tl.to(
            lens,
            { opacity: 1, duration: 0.5, ease: "power2.out" },
            "-=0.3",
          );
          tl.to(
            texts,
            { opacity: 1, duration: 0.4, stagger: 0.12, ease: "power2.out" },
            "-=0.2",
          );
          tl.to(
            plus,
            { opacity: 1, duration: 0.3, ease: "power2.out" },
            "-=0.1",
          );
          tl.to(annotation, { opacity: 1, duration: 0.4, ease: "power2.out" });
          tl.to(
            decos,
            { opacity: 1, duration: 0.3, stagger: 0.07, ease: "power2.out" },
            "-=0.2",
          );
        }

        // ── Wireframe ──────────────────────────────────────────
        const wire = section.querySelector("[data-wireframe]");
        if (wire) {
          const brackets = wire.querySelectorAll<SVGPathElement>(
            "[data-wire-bracket]",
          );
          const box = wire.querySelector("[data-wire-box]");
          const grid = wire.querySelectorAll("[data-wire-grid]");
          const inner = wire.querySelectorAll("[data-wire-inner]");
          const image = wire.querySelector("[data-wire-image]");
          const textLines = wire.querySelectorAll("[data-wire-text-line]");
          const pill = wire.querySelector("[data-wire-pill]");
          const bottoms = wire.querySelectorAll("[data-wire-bottom]");
          const arrow = wire.querySelectorAll("[data-wire-arrow]");
          const labels = wire.querySelectorAll("[data-wire-label]");
          const caption = wire.querySelector("[data-wire-caption]");

          // Calcul longueurs brackets
          brackets.forEach((b) =>
            gsap.set(b, {
              strokeDasharray: b.getTotalLength(),
              strokeDashoffset: b.getTotalLength(),
            }),
          );
          gsap.set(
            [
              box,
              grid,
              inner,
              image,
              textLines,
              pill,
              bottoms,
              arrow,
              labels,
              caption,
            ],
            { opacity: 0 },
          );

          const tl = gsap.timeline({
            scrollTrigger: { trigger: wire, start: "top 75%" },
          });

          // 1. Brackets { } se dessinent simultanément — l'ouverture
          tl.to(brackets, {
            strokeDashoffset: 0,
            duration: 1.1,
            ease: "power3.inOut",
            stagger: 0,
          });

          // 2. Labels </> et .css pop in
          tl.to(
            labels,
            { opacity: 1, duration: 0.3, stagger: 0.08, ease: "power2.out" },
            "-=0.2",
          );

          // 3. Boîte principale apparaît
          tl.to(
            box,
            { opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.1",
          );

          // 4. Grille dashed se trace
          tl.to(grid, {
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "none",
          });

          // 5. Barre titre + contenu interne
          tl.to(inner, {
            opacity: 1,
            duration: 0.25,
            stagger: 0.06,
            ease: "power2.out",
          });

          // 6. Bloc image accent slide depuis la gauche
          tl.fromTo(
            image,
            { opacity: 0, x: -12 },
            { opacity: 1, x: 0, duration: 0.45, ease: "power3.out" },
          );

          // 7. Lignes de texte apparaissent en cascade
          tl.to(
            textLines,
            { opacity: 1, duration: 0.2, stagger: 0.07, ease: "power2.out" },
            "-=0.1",
          );

          // 8. Pill button
          tl.fromTo(
            pill,
            { opacity: 0, scaleX: 0.6 },
            { opacity: 1, scaleX: 1, duration: 0.35, ease: "back.out(2)" },
          );

          // 9. Blocs bas avec stagger
          tl.to(bottoms, {
            opacity: 1,
            duration: 0.25,
            stagger: 0.08,
            ease: "power2.out",
          });

          // 10. Flèche dans la cellule
          tl.to(arrow, {
            opacity: 1,
            duration: 0.25,
            stagger: 0.1,
            ease: "power2.out",
          });

          // 11. Caption finale
          tl.to(caption, { opacity: 1, duration: 0.4, ease: "power2.out" });
        }

        // ── CTA ────────────────────────────────────────────────
        const cta = section.querySelector<HTMLElement>("[data-step-cta]");
        const ctaUnder = section.querySelector<HTMLElement>(
          "[data-cta-underline]",
        );

        if (cta && ctaUnder) {
          gsap.set(ctaUnder, { scaleX: 0, transformOrigin: "left center" });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: cta, start: "top 90%" },
          });

          // 1. Slide up + fade in
          tl.fromTo(
            cta,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          );

          // 2. Underline draw gauche → droite
          tl.to(
            ctaUnder,
            { scaleX: 1, duration: 0.7, ease: "power3.inOut" },
            "-=0.35",
          );
        }

        // ── Rocket ─────────────────────────────────────────────
        const rocket = section.querySelector("[data-rocket]");
        if (rocket) {
          const body = rocket.querySelectorAll("[data-rocket-body]");
          const wings = rocket.querySelectorAll("[data-rocket-wing]");
          const porthole = rocket.querySelector("[data-rocket-porthole]");
          const flame = rocket.querySelector("[data-rocket-flame]");
          const decos = rocket.querySelectorAll("[data-rocket-deco]");
          const annotations = rocket.querySelectorAll(
            "[data-rocket-annotation]",
          );
          const publish = rocket.querySelectorAll("[data-rocket-publish]");

          gsap.set([body, wings, porthole], { opacity: 0, y: 30 });
          gsap.set(flame, {
            opacity: 0,
            scaleY: 0,
            transformOrigin: "top center",
          });
          gsap.set(decos, { opacity: 0, scale: 0, transformOrigin: "center" });
          gsap.set([annotations, publish], { opacity: 0 });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: rocket, start: "top 75%" },
          });

          // 1. Fusée atterrit depuis le haut (slide down into position)
          tl.to([body, wings], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.04,
          });

          // 2. Hublot se dessine
          tl.to(
            porthole,
            { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.5)" },
            "-=0.3",
          );

          // 3. Flamme surgit depuis le bas de la fusée
          tl.to(
            flame,
            { opacity: 1, scaleY: 1, duration: 0.5, ease: "back.out(2.5)" },
            "-=0.1",
          );

          // 4. Flamme pulse légèrement (loop)
          tl.to(flame, {
            scaleY: 1.08,
            scaleX: 0.94,
            repeat: -1,
            yoyo: true,
            duration: 0.45,
            ease: "sine.inOut",
            transformOrigin: "top center",
          });

          // 5. Décorations burst autour (toutes en même temps, scale 0→1)
          tl.to(
            decos,
            {
              opacity: 1,
              scale: 1,
              duration: 0.35,
              stagger: 0.04,
              ease: "back.out(2)",
            },
            "<-0.2",
          );

          // 6. Bouton PUBLISH scale in avec rebond
          tl.fromTo(
            publish,
            { opacity: 0, scale: 0.82 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.55,
              ease: "back.out(2)",
              stagger: 0.05,
            },
            "-=0.1",
          );

          // 7. Annotations
          tl.to(annotations, {
            opacity: 1,
            duration: 0.35,
            stagger: 0.1,
            ease: "power2.out",
          });
        }
      }, sectionRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return { sectionRef };
}
