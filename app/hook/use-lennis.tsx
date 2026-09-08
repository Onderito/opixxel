"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.5,           // était 1.2 — plus de glisse, plus aérien
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -9 * t)), // légèrement adouci (-10 → -9)
      smoothWheel: true,
      wheelMultiplier: 0.9, // était 1 — un poil moins rapide, plus contrôlé
      infinite: false,
      // Tactile : on laisse le scroll natif du téléphone (fluide, pas de
      // jank). syncTouch:false = Lenis ne smoothe pas le toucher.
      syncTouch: false,
    });

    // ── Sync critique Lenis ↔ GSAP ScrollTrigger ──────────────
    // Sans ça, Lenis et ScrollTrigger tournent sur des timings
    // différents → jank sur toutes les animations scrub.
    lenisRef.current.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenisRef.current?.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    // Supprime le lag smoothing de GSAP — Lenis s'en charge
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/projets/sbcare" || window.location.hash) return;

    // Reset the smooth-scroll target after the destination has mounted.
    // A native scrollTo alone leaves an in-flight Lenis animation running.
    lenisRef.current?.resize();
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return lenisRef;
};

export default useLenis;
