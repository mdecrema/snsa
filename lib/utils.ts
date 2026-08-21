// src/lib/utils.ts
export function getLocalizedField(
  jsonField: Record<string, string> | any,
  locale: string,
  fallback = 'en'
): string {
  if (!jsonField || typeof jsonField !== 'object') return '';
  return jsonField[locale] || jsonField[fallback] || '';
}