import HeroSection from "@/app/landing/hero-section";
import Presentation from "@/app/landing/presentation";
import Pricing from "@/app/landing/pricing";
import Projects from "@/app/landing/projects";
import Step from "@/app/landing/step";
import Footer from "@/app/landing/footer";
import SmoothScroll from "@/app/landing/smooth-scroll";

function Section({
  children,
  bg = "bg-canvas",
}: {
  children: React.ReactNode;
  bg?: string;
}) {
  return (
    <section
      className={`${bg} xl:min-h-screen xl:flex xl:flex-col xl:justify-center`}
    >
      <div className="container py-16 xl:py-24 w-full">{children}</div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <HeroSection />
      <Section bg="bg-surface">
        <Presentation />
      </Section>

      <Section bg="bg-canvas">
        <Projects />
      </Section>

      <Section bg="bg-surface">
        <Step />
      </Section>

      <Section bg="bg-[#222222]">
        <Pricing />
      </Section>
      <Footer />
    </>
  );
}
