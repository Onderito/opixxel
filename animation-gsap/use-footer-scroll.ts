import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useFooterScroll() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      const tagline = footer.querySelector("[data-footer-tagline]");
      const cols = footer.querySelectorAll("[data-footer-col]");
      const brand = footer.querySelector<HTMLElement>("[data-footer-brand]");

      // ── États initiaux ────────────────────────────────────────────────────
      gsap.set(tagline, { opacity: 0, y: 24 });
      gsap.set(cols, { opacity: 0, y: 32 });
      gsap.set(brand, { clipPath: "inset(-20px 100% -10px 0)", letterSpacing: "-0.1em" });

      const ST = { trigger: footer, start: "top 80%", once: true };

      // ── Tagline ───────────────────────────────────────────────────────────
      gsap.to(tagline, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: ST,
      });

      // ── Colonnes nav en stagger ───────────────────────────────────────────
      gsap.to(cols, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
        scrollTrigger: ST,
      });

      // ── Öpixxel — étirement de gauche à droite ────────────────────────────
      // scaleX 0.08 → 1 depuis le bord gauche : les lettres semblent s'étirer
      // letter-spacing part du négatif puis revient à 0 : renforce la sensation
      gsap.to(brand, {
        clipPath: "inset(-20px 0% -10px 0)",
        letterSpacing: "0em",
        duration: 1.6,
        ease: "power3.inOut",
        delay: 0.3,
        scrollTrigger: { trigger: footer, start: "top 60%", once: true },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return { footerRef };
}
