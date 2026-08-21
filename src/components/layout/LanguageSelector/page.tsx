'use client';

import { Globe } from 'lucide-react';

import type { Language } from '@/app/generated/prisma';
import { useLanguage } from '@/src/context/LanguageContext';

interface Props {
  languages: Language[];
}

export default function LanguageSelector({ languages }: Props) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="relative inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-sm text-gray-700">
      {/* <Globe className="w-5.5 h-3.5 text-gray-500" /> */}
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="bg-transparent border-none focus:outline-none cursor-pointer text-sm text-gray-800"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.code.toUpperCase()} ({lang.name})
          </option>
        ))}
      </select>
    </div>
  );
}