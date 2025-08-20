import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export const SUPPORTED_LANGUAGES = ["en", "pt", "es"] as const;
type Language = typeof SUPPORTED_LANGUAGES[number];

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      setLanguage("en");
    }
  }, []);

  const handleSetLanguage = (lang: string) => {
    // Check if the language is supported
    if (SUPPORTED_LANGUAGES.includes(lang as Language)) {
      const validLang = lang as Language;
      setLanguage(validLang);
      localStorage.setItem("language", validLang);
    } else {
      console.warn(`Language '${lang}' is not supported. Falling back to 'en'.`);
      setLanguage("en");
      localStorage.setItem("language", "en");
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
