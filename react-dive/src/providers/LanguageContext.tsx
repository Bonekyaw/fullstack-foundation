import { createContext, useState, use, type PropsWithChildren } from "react";

const LanguageContext = createContext<{
  language: string;
  changelanguage: (lang: string) => void;
}>({
  language: "en",
  changelanguage: () => null,
});

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setlanguage] = useState("en");

  const changelanguage = (lang: string) => setlanguage(lang);

  return (
    <LanguageContext value={{ language, changelanguage }}>
      {children}
    </LanguageContext>
  );
};

export const useLanguage = () => use(LanguageContext);
