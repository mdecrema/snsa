// src/lib/dictionary.ts
import 'server-only';
import { cookies } from 'next/headers';
import type dictionaryIt from '../public/i18n/it.json';

export type Dictionary = typeof dictionaryIt;

const dictionaries = {
  it: () => import('../public/i18n/it.json').then((module) => module.default),
  en: () => import('../public/i18n/en.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

/**
 * Making `locale?` optional allows calling getDictionary() with 0 arguments.
 */
export async function getDictionary(locale?: Locale): Promise<Dictionary> {
  let targetLocale = locale;

  if (!targetLocale) {
    const cookieStore = await cookies();
    targetLocale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || 'it';
  }

  const loadDictionary = dictionaries[targetLocale] || dictionaries.it;
  return loadDictionary() as Promise<Dictionary>;
}