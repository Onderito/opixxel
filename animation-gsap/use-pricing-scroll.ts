import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// "1.500€" → 1500 | "€1,500" → 1500 | "Sur devis" → null
function parsePrice(raw: string): number | null {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;

  const value = Number(digits);
  return Number.isNaN(value) ? null : value;
}

function formatPrice(n: number, template: string): string {
  const value = Math.round(n);

  return template.trim().startsWith("€")
    ? `€${value.toLocaleString("en-US")}`
    : `${value.toLocaleString("fr-FR").replace(/\s/g, ".")}€`;
}

export function usePricingScroll(refreshKey: string) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    // A reveal only needs viewport visibility, not ScrollTrigger's shared
    // refresh cycle (which may remove completed triggers while iterating).
    const observeReveal = (animation: gsap.core.Animation, bottomMargin: string) => {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          animation.play();
          observer.disconnect();
        }
      }, { rootMargin: `0px 0px ${bottomMargin} 0px` });
      observer.observe(section);
      return observer;
    };

    // ── Mobile (< 768px) — animation légère, pas de compteur ─────────────
    mm.add("(max-width: 767px)", () => {
      let observer: IntersectionObserver | undefined;
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-pricing-card]", section);

        gsap.set(cards, { opacity: 0, y: 40 });
        const reveal = gsap.to(cards, {
          paused: true,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,

        });
        observer = observeReveal(reveal, "-20%");
      }, sectionRef);

      return () => {
        observer?.disconnect();
        ctx.revert();
      };
    });

    // ── Desktop (≥ 768px) — animation complète avec compteur ─────────────
    mm.add("(min-width: 768px)", () => {
      const cardTimelines: gsap.core.Timeline[] = [];
      let observer: IntersectionObserver | undefined;
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-pricing-card]", section);

        gsap.set(cards, { opacity: 0, y: 50 });
        cards.forEach((card) => {
          const title    = card.querySelector("[data-pc-title]");
          const desc     = card.querySelector("[data-pc-desc]");
          const features = card.querySelectorAll("[data-pc-feature]");
          const price    = card.querySelector("[data-pricing-price]");
          const cta      = card.querySelector("[data-pc-cta]");
          gsap.set([title, desc, features, price, cta], { opacity: 0, y: 18 });
        });

        const reveal = gsap.to(cards, {
          paused: true,
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.18,
          onStart() {
            cards.forEach((card, i) => {
              const cardDelay = i * 0.18;
              const title     = card.querySelector("[data-pc-title]");
              const desc      = card.querySelector("[data-pc-desc]");
              const features  = card.querySelectorAll("[data-pc-feature]");
              const priceEl   = card.querySelector<HTMLElement>("[data-pricing-price]");
              const cta       = card.querySelector("[data-pc-cta]");

              const tl = gsap.timeline({ delay: cardDelay });
              cardTimelines.push(tl);

              tl.to(title,    { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.15);
              tl.to(desc,     { opacity: 1, y: 0, duration: 0.4,  ease: "power2.out" }, 0.3);
              tl.to(features, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out", stagger: 0.07 }, 0.48);

              const raw    = priceEl?.dataset.value ?? "";
              const target = parsePrice(raw);

              if (priceEl && target !== null) {
                priceEl.textContent = "0€";
                const obj = { val: 0 };
                tl.to(obj, {
                  val: target,
                  duration: 1.2,
                  ease: "power2.out",
                  onUpdate() {
                    priceEl.textContent = formatPrice(obj.val, raw);
                  },
                  onComplete() { priceEl.textContent = raw; },
                }, 0.55);
                tl.to(priceEl, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.55);
              } else if (priceEl) {
                tl.to(priceEl, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.55);
              }

              tl.to(cta, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.5");
            });
          },
        });
        observer = observeReveal(reveal, "-32%");
      }, sectionRef);

      return () => {
        observer?.disconnect();
        cardTimelines.forEach((timeline) => timeline.kill());
        ctx.revert();
        section.querySelectorAll<HTMLElement>("[data-pricing-price]").forEach((price) => {
          price.textContent = price.dataset.value ?? "";
        });
      };
    });

    return () => mm.revert();
  }, [refreshKey]);

  return { sectionRef };
}
