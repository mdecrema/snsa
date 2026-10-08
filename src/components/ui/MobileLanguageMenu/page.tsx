'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Globe, ChevronDown } from 'lucide-react';
import { Language } from '@/app/generated/prisma';
import { useLanguage } from '@/src/context/LanguageContext';

interface MobileLanguageMenuProps {
  languages: Language[];
}

export default function MobileLanguageMenu({languages}: MobileLanguageMenuProps) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { locale, setLocale } = useLanguage();

  // Trova la lingua corrente dal Context per la label del pulsante
  const currentLanguage = languages.find(
    (lang) => lang.code.toLowerCase() === locale.toLowerCase()
  );

  const handleSelectLanguage = (code: string) => {
    setLocale(code);
    setIsLangOpen(false);
  };

  return (
    <div className="border-b border-white/10 py-3">
      {/* Pulsante per aprire/chiudere il sottomenu */}
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="flex items-center justify-between w-full text-white font-medium text-sm focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <Globe size={20} className="text-white/80" />
          <span>{'Language'} {`(${(currentLanguage?.name || locale.toUpperCase())})`}</span>
        </div>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Elenco Lingue (Sottomenu) */}
      {isLangOpen && (
        <div className="pl-9 pt-2 flex flex-col gap-2">
          {languages.map((lang) => {
            const isSelected = lang.code.toLowerCase() === locale.toLowerCase();

            return (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`text-left py-1 text-sm transition-colors ${
                  isSelected
                    ? 'text-white font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {lang.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}