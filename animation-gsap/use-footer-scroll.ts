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

      gsap.set(tagline, { opacity: 0, y: 24 });
      gsap.set(cols, { opacity: 0, y: 32 });
      gsap.set(brand, {
        clipPath: "inset(-20px 100% -10px 0)",
        letterSpacing: "-0.1em",
      });

      const ST = { trigger: footer, start: "top 80%", once: true };

      gsap.to(tagline, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: ST,
      });

      gsap.to(cols, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
        scrollTrigger: ST,
      });

      gsap.to(brand, {
        clipPath: "inset(-20px 0% -10px 0)",
        letterSpacing: "0em",
        duration: 1.6,
        ease: "power3.inOut",
        delay: 0.3,
        scrollTrigger: {
          trigger: footer,
          start: "50% 90%",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return { footerRef };
}
