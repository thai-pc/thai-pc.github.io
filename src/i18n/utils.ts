import en from './en.json';
import vi from './vi.json';
import zh from './zh.json';
import ja from './ja.json';
import ko from './ko.json';
import fr from './fr.json';
import de from './de.json';
import es from './es.json';
import hi from './hi.json';
import pt from './pt.json';
import ru from './ru.json';
import ar from './ar.json';
import th from './th.json';
import tr from './tr.json';
import it from './it.json';
import id from './id.json';

export const languages = {
  en: 'English',
  vi: 'Tiếng Việt',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  hi: 'हिन्दी',
  pt: 'Português',
  ru: 'Русский',
  ar: 'العربية',
  th: 'ไทย',
  tr: 'Türkçe',
  it: 'Italiano',
  id: 'Bahasa Indonesia',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';
export const langList = Object.keys(languages) as Lang[];

const translations: Record<Lang, Record<string, any>> = { en, vi, zh, ja, ko, fr, de, es, hi, pt, ru, ar, th, tr, it, id };

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const keys = key.split('.');
    let val: any = translations[lang] ?? translations[defaultLang];
    for (const k of keys) val = val?.[k];
    if (typeof val === 'string') return val;
    // Fallback to default lang
    let fallback: any = translations[defaultLang];
    for (const k of keys) fallback = fallback?.[k];
    return typeof fallback === 'string' ? fallback : key;
  };
}
