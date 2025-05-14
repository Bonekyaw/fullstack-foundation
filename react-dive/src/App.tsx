import { useLanguage } from "./providers/LanguageContext";

import "./App.css";

const translations = {
  en: "Hello!",
  es: "Hola!",
  fr: "Bonjour!",
};

function App() {
  const { language, changelanguage } = useLanguage() as {
    language: keyof typeof translations;
    changelanguage: (lang: string) => void;
  };

  return (
    <>
      <h3>React Context API</h3>
      <label htmlFor="language-select">Choose a language: </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => changelanguage(e.target.value)}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
      <h1>{translations[language]}</h1>
    </>
  );
}

export default App;
