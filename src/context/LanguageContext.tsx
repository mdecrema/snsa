'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // Read the active cookie on initial mount so React state matches the server cookie
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
    const cookieLocale = match ? decodeURIComponent(match[1]) : null;
    if (cookieLocale) {
      setLocaleState(cookieLocale);
    }
  }, []);

  const setLocale = (code: string) => {
    setLocaleState(code);
    localStorage.setItem('app_locale', code);
    
    // Set cookie valid for 1 year
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    
    // Refresh Server Components so getDictionary() reads the updated cookie
    router.refresh();
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);