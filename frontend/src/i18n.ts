import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Dynamically import all translation files
const translationModules = import.meta.glob('./locales/**/*.json', { eager: true });

// Function to build resources object dynamically
const buildResources = () => {
  const resources: any = {};
  
  Object.entries(translationModules).forEach(([path, module]) => {
    // Extract language and namespace from path
    // e.g., "./locales/en/about.json" -> ["en", "about"]
    const matches = path.match(/\.\/locales\/([^/]+)\/([^/]+)\.json$/);
    
    if (matches) {
      const [, language, namespace] = matches;
      
      if (!resources[language]) {
        resources[language] = {};
      }
      
      resources[language][namespace] = (module as any).default || module;
    }
  });
  
  return resources;
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: buildResources(),
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
