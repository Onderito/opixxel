"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

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

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });

    // Supprime le lag smoothing de GSAP — Lenis s'en charge
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
};

export default useLenis;
