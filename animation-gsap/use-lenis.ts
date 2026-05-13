import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Référence stockée pour pouvoir retirer le ticker proprement
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Recalcule les positions ScrollTrigger après que Lenis a pris le contrôle
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);
}
