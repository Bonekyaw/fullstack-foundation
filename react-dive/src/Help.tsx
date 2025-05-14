import { useLanguage } from "./providers/LanguageContext";

export default function Help() {
  const { theme } = useLanguage();
  return <div>{theme}</div>;
}
