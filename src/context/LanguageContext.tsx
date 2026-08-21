'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  locale: string;
  setLocale: (code: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<string>('en');

  useEffect(() => {
    const saved = localStorage.getItem('app_locale');
    if (saved) setLocaleState(saved);
  }, []);

  const setLocale = (code: string) => {
    setLocaleState(code);
    localStorage.setItem('app_locale', code);
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);