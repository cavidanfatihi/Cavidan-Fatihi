import { createContext, useContext, useEffect, useState } from "react";

export type Locale = "az" | "en";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => (localStorage.getItem("cf-locale") as Locale) || "az");

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    localStorage.setItem("cf-locale", nextLocale);
  };

  useEffect(() => {
    const meta = locale === "az"
      ? { title: "Cavidan Fatihi | Rəsmi Sayt", description: "Cavidan Fatihi — musiqi, konsertlər, kliplər və əməkdaşlıq üçün rəsmi sayt." }
      : { title: "Cavidan Fatihi | Official", description: "Cavidan Fatihi — music, concerts, videos and collaboration." };
    document.documentElement.lang = locale;
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", meta.description);
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
