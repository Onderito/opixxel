import type { Metadata } from "next";
import SbcareCaseStudy from "./sbcare-case-study";

export const metadata: Metadata = {
  title: "SBcare — Case study | Öpixxel",
  description:
    "Redesign complet de SBcare : une expérience e-commerce plus sensible, claire et premium pour une marque de soins.",
};

export default function SbcarePage() {
  return <SbcareCaseStudy />;
}
