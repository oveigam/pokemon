import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./resources/en/_en";
import { es } from "./resources/es/_es";

i18n.use(initReactI18next).init({
  lng: "en",
  supportedLngs: ["en", "es"],
  fallbackLng: "en",
  defaultNS: "base",
  resources: { en, es },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export const initI18n = (lng?: "en" | "es") => {
  const instance = i18n.createInstance().use(initReactI18next);
  instance.init({
    lng,
    supportedLngs: ["en", "es"],
    fallbackLng: "en",
    defaultNS: "base",
    resources: { en, es },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
  return instance;
};

export default i18n;
