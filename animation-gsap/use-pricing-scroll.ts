import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// "1.500€" → 1500 | "3.500€" → 3500 | "Sur devis" → null
function parsePrice(raw: string): number | null {
  const n = parseFloat(
    raw.replace(/\./g, "").replace(",", ".").replace("€", "").trim(),
  );
  return isNaN(n) ? null : n;
}

// 1500 → "1.500€"
function formatPrice(n: number): string {
  return Math.round(n).toLocaleString("fr-FR").replace(/\s/g, ".") + "€";
}

export function usePricingScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-pricing-card]",
        section,
      );
      const prices = gsap.utils.toArray<HTMLElement>(
        "[data-pricing-price]",
        section,
      );

      const ST = { trigger: section, start: "top 68%", once: true };

      // ── État initial — tout invisible ─────────────────────────────────────
      gsap.set(cards, { opacity: 0, y: 50 });
      cards.forEach((card) => {
        const title    = card.querySelector("[data-pc-title]");
        const desc     = card.querySelector("[data-pc-desc]");
        const features = card.querySelectorAll("[data-pc-feature]");
        const price    = card.querySelector("[data-pricing-price]");
        const cta      = card.querySelector("[data-pc-cta]");
        gsap.set([title, desc, features, price, cta], { opacity: 0, y: 18 });
      });

      // ── 1. Cards slide up en stagger ─────────────────────────────────────
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.18,
        scrollTrigger: ST,
        onStart() {
          // ── 2. Contenu de chaque card en séquence ─────────────────────────
          cards.forEach((card, i) => {
            const cardDelay = i * 0.18; // suit le stagger des cards
            const title     = card.querySelector("[data-pc-title]");
            const desc      = card.querySelector("[data-pc-desc]");
            const features  = card.querySelectorAll("[data-pc-feature]");
            const priceEl   = card.querySelector<HTMLElement>("[data-pricing-price]");
            const cta       = card.querySelector("[data-pc-cta]");

            const tl = gsap.timeline({ delay: cardDelay });

            // Titre
            tl.to(title, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.15);
            // Description
            tl.to(desc,  { opacity: 1, y: 0, duration: 0.4,  ease: "power2.out" }, 0.3);
            // Features en stagger
            tl.to(features, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.07 }, 0.48);

            // Prix — compteur ou fade
            const raw    = priceEl?.dataset.value ?? "";
            const target = parsePrice(raw);

            if (priceEl && target !== null) {
              priceEl.textContent = "0€";
              const obj = { val: 0 };
              tl.to(obj, {
                val: target,
                duration: 1.2,
                ease: "power2.out",
                onUpdate() { priceEl.textContent = formatPrice(obj.val); },
                onComplete() { priceEl.textContent = raw; },
              }, 0.55);
              tl.to(priceEl, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55);
            } else if (priceEl) {
              tl.to(priceEl, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.55);
            }

            // CTA en dernier
            tl.to(cta, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.5");
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return { sectionRef };
}
