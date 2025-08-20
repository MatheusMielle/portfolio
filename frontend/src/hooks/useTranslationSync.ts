import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "./useLanguage";

export const useTranslationSync = (namespace: string) => {
  const { language } = useLanguage();
  const { t, i18n } = useTranslation(namespace);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return { t, i18n };
};
