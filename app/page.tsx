import HeroSection from "@/app/landing/hero-section";
import Presentation from "@/app/landing/presentation";
import Pricing from "@/app/landing/pricing";
import Projects from "@/app/landing/projects";
import Step from "@/app/landing/step";
import Footer from "@/app/landing/footer";

function Section({
  children,
  bg = "bg-canvas",
  id,
}: {
  children: React.ReactNode;
  bg?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`${bg} xl:min-h-screen xl:flex xl:flex-col xl:justify-center`}
    >
      <div className="container py-16 xl:py-24 w-full">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div className="bg-[#1c1c1c]">
        <HeroSection />
        <Section id="qui-suis-je" bg="presentation-dark relative z-10 bg-[#1c1c1c]">
          <Presentation />
        </Section>
      </div>

      <section id="projets" className="bg-canvas">
        <Projects />
      </section>

      <section id="methode" className="bg-surface">
        <Step />
      </section>

      <Section id="offres" bg="bg-[#222222]">
        <Pricing />
      </Section>
      <Footer />
    </>
  );
}
