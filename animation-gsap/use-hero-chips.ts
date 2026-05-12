import { useEffect, useRef } from "react";
import gsap from "gsap";

const LABELS  = ["Design", "Animation", "Code", "Motion", "GSAP", "Figma", "UX", "Interface"];
const LIFE    = 900;
const POOL    = 12;

// Trois variantes visuelles tirées aléatoirement
const VARIANTS = [
  // Orange plein
  "background:var(--accent);color:#fff;border:none;",
  // Dark plein
  "background:#111110;color:#fff;border:none;",
  // Outline accent
  "background:transparent;color:var(--accent);border:1.5px solid var(--accent);",
];

export function useHeroChips() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const container = document.createElement("div");
    container.style.cssText = "position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:20;";
    section.appendChild(container);

    // Pool de chips — tailles variées
    const chips: HTMLElement[] = Array.from({ length: POOL }, (_, i) => {
      const el = document.createElement("div");
      const isLarge = i % 3 === 0;
      el.style.cssText = `
        position:absolute;top:0;left:0;
        opacity:0;pointer-events:none;will-change:transform,opacity,filter;
        font-family:var(--font-bricolage-family),sans-serif;
        font-style:italic;font-weight:700;
        font-size:${isLarge ? "clamp(1rem,1.6vw,1.25rem)" : "clamp(0.65rem,1vw,0.85rem)"};
        padding:0.25em 0.65em;border-radius:4px;white-space:nowrap;line-height:1.4;
      `;
      container.appendChild(el);
      return el;
    });

    let poolIdx  = 0;
    let labelIdx = 0;
    let lastTime = 0;
    let lastX = 0, lastY = 0;
    let vx = 0, vy = 0;

    function onMove(e: MouseEvent) {
      const now  = Date.now();
      const rect = section!.getBoundingClientRect();
      const x    = e.clientX - rect.left;
      const y    = e.clientY - rect.top;

      // Vélocité instantanée
      const dt = Math.max(now - lastTime, 1);
      vx = (x - lastX) / dt;
      vy = (y - lastY) / dt;
      lastX = x; lastY = y;

      const speed = Math.sqrt(vx * vx + vy * vy); // px/ms

      // Cooldown fixe très bas — fluide à toute vitesse
      if (now - lastTime < 150) return;
      lastTime = now;

      const chip = chips[poolIdx % POOL];
      poolIdx++;

      // Label + variante
      chip.textContent = LABELS[labelIdx % LABELS.length];
      labelIdx++;
      const variant = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];
      chip.style.cssText += variant;

      // Direction opposée au mouvement + aléatoire
      const spread = Math.min(60 + speed * 120, 160);
      const angle  = Math.atan2(vy, vx) + Math.PI + (Math.random() - 0.5) * 1.4;
      const dist   = spread * (0.5 + Math.random() * 0.5);
      const offsetX = Math.cos(angle) * dist;
      const offsetY = Math.sin(angle) * dist;
      const rotation = (Math.random() - 0.5) * 18;

      gsap.killTweensOf(chip);
      gsap.set(chip, {
        x: x + offsetX - chip.offsetWidth / 2,
        y: y + offsetY - chip.offsetHeight / 2,
        rotation,
        scale: 0.68,
        opacity: 0,
        filter: "blur(0px)",
      });

      // Entrée avec rebond léger
      gsap.to(chip, {
        scale: 1,
        opacity: 1,
        duration: 0.32,
        ease: "back.out(1.6)",
      });

      // Sortie : monte + blur + fade
      gsap.to(chip, {
        y: `-=${22 + speed * 30}`,
        opacity: 0,
        filter: "blur(5px)",
        duration: 0.5,
        ease: "power2.in",
        delay: LIFE / 1000,
      });
    }

    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      container.remove();
    };
  }, []);

  return { sectionRef };
}
