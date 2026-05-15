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
      <HeroSection />
      <Section id="qui-suis-je" bg="bg-surface">
        <Presentation />
      </Section>

      <Section id="projets" bg="bg-canvas">
        <Projects />
      </Section>

      <Section id="methode" bg="bg-surface">
        <Step />
      </Section>

      <Section id="offres" bg="bg-[#222222]">
        <Pricing />
      </Section>
      <Footer />
    </>
  );
}
