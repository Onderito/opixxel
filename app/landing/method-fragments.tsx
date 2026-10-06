import Image from "next/image";
import type { Language } from "@/app/ui/language-context";

const photo = "/images/method/materials-v1.png";
const shadow = "shadow-[0_12px_32px_rgba(40,30,30,0.08)]";

function ProductPhoto({ className = "" }: { className?: string }) {
  return <div className={`relative overflow-hidden ${className}`}><Image src={photo} alt="Composition de matières et flacon sans marque" fill sizes="(max-width: 1024px) 85vw, 45vw" className="object-cover" /></div>;
}

function Storefront({ language, mobile = false }: { language: Language; mobile?: boolean }) {
  return (
    <div className="bg-canvas text-title">
      <div className="flex items-center justify-between border-b border-stroke px-[7%] py-[5%]">
        <span className="font-bricolage text-sm font-semibold">essentiel.</span>
        <span aria-hidden="true" className="flex gap-1"><span className="h-1 w-1 rounded-full bg-accent" /><span className="h-1 w-1 rounded-full bg-title" /></span>
      </div>
      <div className={`grid ${mobile ? "" : "grid-cols-2"}`}>
        <div className="flex flex-col justify-center gap-3 p-[12%]">
          <p className={`font-bricolage font-medium tracking-tight leading-[1.05] ${mobile ? "text-xl" : "text-[clamp(20px,2.7vw,42px)]"}`}>{language === "fr" ? <>Moins.<br />Mais mieux.</> : <>Less.<br />But better.</>}</p>
          <span className="h-0.5 w-8 bg-accent" />
          <span className="w-fit bg-accent px-3 py-2 font-manrope text-[8px] text-white">{language === "fr" ? "Découvrir" : "Explore"} ↗</span>
        </div>
        <ProductPhoto className={mobile ? "aspect-[1.15]" : "aspect-[1.05]"} />
      </div>
      <div className="flex items-center justify-between px-[7%] py-[5%] font-manrope text-[8px] text-body"><span>{language === "fr" ? "Le soin, simplement." : "Care, simply."}</span><span className="text-accent">01 — 03</span></div>
    </div>
  );
}

export function MethodFragments({ language, sceneIndex }: { language: Language; sceneIndex?: number }) {
  return <>
    {(sceneIndex === undefined || sceneIndex === 0) && <div data-method-scene className="absolute inset-0">
      <div data-method-fragment className="absolute left-0 top-0 bottom-[13%] w-[74%]"><ProductPhoto className="h-full" /></div>
      <div data-method-fragment className="absolute right-0 top-0 bottom-[13%] w-[22%] flex flex-col justify-between border-t border-title/20 pt-5">
        <p className="font-bricolage text-title text-[clamp(32px,5vw,80px)] leading-none tracking-[-0.06em]">Aa.</p>
        <div className="grid gap-2">{["#f5f4f0", "#281e1e", "#ff4d2e"].map(color => <span key={color} className="h-8 md:h-12 outline outline-black/10" style={{ backgroundColor: color }} />)}</div>
      </div>
      <span data-method-fragment className="absolute left-0 right-0 bottom-0 border-t border-stroke pt-3 font-caveat text-xl md:text-2xl text-body">{language === "fr" ? "Trouver le bon ton." : "Find the right feel."}</span>
    </div>}
    {(sceneIndex === undefined || sceneIndex === 1) && <div data-method-scene className="absolute inset-0">
      <div data-method-fragment className="absolute left-0 top-0 w-[40%] border-t border-title/20 pt-5">
        <p className="font-bricolage text-[clamp(24px,3.4vw,54px)] tracking-[-0.05em] leading-[1.04] text-title">{language === "fr" ? <>L’essentiel,<br />au quotidien.</> : <>Everyday<br />essentials.</>}</p>
        <span className="mt-5 block h-0.5 w-12 bg-accent" />
      </div>
      <div data-method-fragment className="absolute right-0 top-0 bottom-[13%] w-[55%]"><ProductPhoto className="h-full" /></div>
      <div data-method-fragment className="absolute left-0 bottom-[13%] w-[35%] border-t border-stroke pt-4"><p className="font-bricolage text-title text-base md:text-xl">{language === "fr" ? "Soin quotidien" : "Daily care"}</p><div className="mt-3 flex justify-between items-center"><span className="text-sm text-body">28 €</span><span className="flex h-9 w-9 items-center justify-center bg-accent text-white">+</span></div></div>
      <span data-method-fragment className="absolute left-0 right-0 bottom-0 border-t border-stroke pt-3 font-caveat text-xl md:text-2xl text-body">{language === "fr" ? "L’univers prend forme." : "The vision takes shape."}</span>
    </div>}
    {(sceneIndex === undefined || sceneIndex === 2) && <div data-method-scene className="absolute inset-0">
      <div data-method-fragment className={`absolute left-0 top-0 w-[86%] overflow-hidden outline outline-black/10 ${shadow}`}><Storefront language={language} /></div>
      <div data-method-fragment className={`absolute right-0 bottom-[13%] w-[24%] overflow-hidden rounded-[20px] border-[5px] border-title bg-canvas ${shadow}`}><Storefront language={language} mobile /></div>
      <span data-method-fragment className="absolute left-0 right-0 bottom-0 border-t border-stroke pt-3 font-caveat text-xl md:text-2xl text-body">{language === "fr" ? "Tout trouve sa place." : "Everything falls into place."}</span>
    </div>}
  </>;
}
