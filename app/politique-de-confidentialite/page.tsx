import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Öpixxel",
  description:
    "Politique de confidentialité et gestion des données personnelles du site Öpixxel.",
};

const sections = [
  {
    title: "1. Responsable du traitement",
    content: [
      "**Ulas Onder** (Öpixxel) — Paris, France",
      "Contact : via [Calendly](https://calendly.com/ulas-onder/30min)",
    ],
  },
  {
    title: "2. Données collectées",
    content: [
      "Ce site ne collecte aucune donnée personnelle directement.",
      "Cependant, lorsque vous réservez un appel via **Calendly** (service tiers), celui-ci collecte vos informations de contact (nom, adresse e-mail, éventuellement numéro de téléphone) afin d'organiser le rendez-vous.",
      "Aucun formulaire de contact, cookie de tracking ou outil d'analyse n'est intégré sur ce site.",
    ],
  },
  {
    title: "3. Finalité des traitements",
    content: [
      "Les données transmises via Calendly sont utilisées uniquement pour :",
      "— Organiser et confirmer les rendez-vous demandés.",
      "— Vous recontacter dans le cadre d'une mission potentielle.",
      "Elles ne sont ni revendues, ni partagées avec des tiers, ni utilisées à des fins commerciales.",
    ],
  },
  {
    title: "4. Base légale",
    content: [
      "Le traitement repose sur votre **consentement explicite**, matérialisé par la prise de rendez-vous volontaire via Calendly.",
    ],
  },
  {
    title: "5. Durée de conservation",
    content: [
      "Les données de rendez-vous sont conservées dans Calendly selon les paramètres de ce service (par défaut, jusqu'à suppression manuelle ou résiliation du compte).",
      "Pour toute demande de suppression, contactez-nous directement.",
    ],
  },
  {
    title: "6. Vos droits (RGPD)",
    content: [
      "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :",
      "— **Droit d'accès** : obtenir une copie des données vous concernant.",
      "— **Droit de rectification** : corriger des données inexactes.",
      "— **Droit à l'effacement** : demander la suppression de vos données.",
      "— **Droit d'opposition** : vous opposer à un traitement.",
      "— **Droit à la portabilité** : recevoir vos données dans un format structuré.",
      "Pour exercer ces droits, contactez-nous via [Calendly](https://calendly.com/ulas-onder/30min) ou par e-mail. Vous pouvez également introduire une réclamation auprès de la **CNIL** (cnil.fr).",
    ],
  },
  {
    title: "7. Services tiers",
    content: [
      "**Calendly** (Calendly LLC) — outil de prise de rendez-vous. Politique de confidentialité : [calendly.com/privacy](https://calendly.com/privacy)",
      "**Vercel** — hébergement du site. Politique de confidentialité : [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy)",
    ],
  },
  {
    title: "8. Cookies",
    content: [
      "Ce site n'utilise pas de cookies de tracking ou d'analyse.",
      "Vercel peut déposer des cookies techniques strictement nécessaires au fonctionnement de l'hébergement. Ces cookies ne nécessitent pas de consentement.",
    ],
  },
  {
    title: "9. Modifications",
    content: [
      "Cette politique peut être mise à jour à tout moment. La date de dernière modification est indiquée en haut de page. Nous vous invitons à la consulter régulièrement.",
    ],
  },
];

// ── Rendu du contenu avec markdown basique (gras + liens) ────────────────────

function renderLine(line: string, key: number) {
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

export default function PolitiqueConfidentialite() {
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
            // confidentialité
          </p>
          <h1 className="font-bricolage font-medium text-[40px] xl:text-[52px] tracking-[-0.02em] leading-none text-title">
            Politique de
            <br />
            confidentialité
          </h1>
          <p className="font-manrope font-light text-sm text-label mt-4">
            Dernière mise à jour : Mai 2026
          </p>
        </div>

        {/* Intro */}
        <p className="font-manrope font-light text-base text-body leading-relaxed mb-10 pl-4 border-l-2 border-accent">
          Öpixxel s'engage à protéger la vie privée de ses visiteurs. Cette
          politique explique quelles données sont susceptibles d'être
          collectées, pourquoi, et comment vous pouvez exercer vos droits.
        </p>

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
