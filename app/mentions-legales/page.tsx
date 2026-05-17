import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — Öpixxel",
  description: "Mentions légales du site Öpixxel.",
};

const sections = [
  {
    title: "1. Éditeur du site",
    content: [
      "Le site **opixxel.com** est édité par :",
      "**Ulas Onder**",
      "Activité : Développeur web freelance",
      "Adresse : Paris, France",
      "Contact : via [Calendly](https://calendly.com/ulas-onder/30min)",
      "SIRET : en cours d'immatriculation",
    ],
  },
  {
    title: "2. Directeur de la publication",
    content: ["**Ulas Onder**"],
  },
  {
    title: "3. Hébergement",
    content: [
      "Ce site est hébergé par :",
      "**Vercel Inc.**",
      "340 Pine Street, Suite 701 — San Francisco, CA 94104, États-Unis",
      "Site : [vercel.com](https://vercel.com)",
    ],
  },
  {
    title: "4. Propriété intellectuelle",
    content: [
      "L'ensemble du contenu de ce site (textes, visuels, animations, code) est la propriété exclusive d'Ulas Onder, sauf mention contraire.",
      "Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est interdite.",
    ],
  },
  {
    title: "5. Liens hypertextes",
    content: [
      "Le site peut contenir des liens vers des sites tiers. Öpixxel n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
    ],
  },
  {
    title: "6. Limitation de responsabilité",
    content: [
      "Öpixxel s'efforce de maintenir les informations du site à jour et exactes, mais ne garantit pas l'exhaustivité ou l'absence d'erreur des contenus publiés.",
    ],
  },
  {
    title: "7. Droit applicable",
    content: [
      "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.",
    ],
  },
];

// ── Rendu du contenu avec markdown basique (gras + liens) ────────────────────

function renderLine(line: string, key: number) {
  // Remplace **texte** par <strong> et [label](url) par <a>
  const parts = line
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g)
    .map((part, i) => {
      const bold = part.match(/^\*\*(.+)\*\*$/);
      if (bold)
        return (
          <strong key={i} className="font-semibold text-title">
            {bold[1]}
          </strong>
        );
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link)
        return (
          <a
            key={i}
            href={link[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-2 hover:opacity-70 transition-opacity"
          >
            {link[1]}
          </a>
        );
      return part;
    });
  return (
    <p
      key={key}
      className="font-manrope font-light text-base text-body leading-relaxed"
    >
      {parts}
    </p>
  );
}

export default function MentionsLegales() {
  return (
    <main className="bg-canvas min-h-screen">
      <div className="max-w-[720px] mx-auto px-6 py-16 xl:py-24">
        {/* Retour */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-manrope font-light text-sm text-label hover:text-title transition-colors duration-200 mb-12"
        >
          ← Retour
        </Link>

        {/* En-tête */}
        <div className="mb-12">
          <p className="font-manrope font-light text-accent text-base mb-3">
            // légal
          </p>
          <h1 className="font-bricolage font-medium text-[40px] xl:text-[52px] tracking-[-0.02em] leading-none text-title">
            Mentions légales
          </h1>
          <p className="font-manrope font-light text-sm text-label mt-4">
            Dernière mise à jour : Mai 2026
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map(({ title, content }) => (
            <section key={title}>
              <h2 className="font-manrope font-semibold text-[17px] text-title tracking-[-0.01em] mb-3">
                {title}
              </h2>
              <div className="flex flex-col gap-2 pl-4 border-l border-stroke">
                {content.map((line, i) => renderLine(line, i))}
              </div>
            </section>
          ))}
        </div>

        {/* Séparateur bas */}
        <div className="mt-16 pt-8 border-t border-stroke">
          <p className="font-manrope font-light text-sm text-label">
            © 2026 Öpixxel — Ulas Onder
          </p>
        </div>
      </div>
    </main>
  );
}
