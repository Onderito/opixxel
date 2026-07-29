"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "fr" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("opixxel-language");
    if (savedLanguage === "fr" || savedLanguage === "en") {
      // Restoring a browser preference necessarily happens after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLanguage);
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: Language) => {
        setLanguageState(nextLanguage);
        window.localStorage.setItem("opixxel-language", nextLanguage);
        document.documentElement.lang = nextLanguage;
      },
    }),
    [language],
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
