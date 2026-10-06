import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Manrope } from "next/font/google";
import ClientWrapper from "./ui/client-wrapper";
import { LanguageProvider } from "./ui/language-context";
import SiteNavbar from "./ui/site-navbar";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-family",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope-family",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat-family",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Öpixxel — Création et refonte de boutiques Shopify sur mesure",
  description:
    "Je crée et repense des boutiques Shopify avec un design et une interface sur mesure. Un seul interlocuteur, de la maquette à la mise en ligne.",
  openGraph: {
    title: "Öpixxel — Boutiques Shopify sur mesure",
    description:
      "Création et refonte de boutiques Shopify avec un design et une interface sur mesure, de la maquette à la mise en ligne.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${bricolageGrotesque.variable} ${manrope.variable} ${caveat.variable} h-full antialiased overflow-x-clip`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <ClientWrapper>
          <LanguageProvider>
            <SiteNavbar />
            {children}
          </LanguageProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
