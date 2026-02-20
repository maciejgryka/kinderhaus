import de from './de.json';
import en from './en.json';

const translations: Record<string, Record<string, string>> = { de, en };

export type Locale = 'de' | 'en';

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? translations.de[key] ?? key;
}

export function getLocale(url: URL): Locale {
  const [, firstSegment] = url.pathname.split('/');
  return firstSegment === 'en' ? 'en' : 'de';
}

/** Map German page slugs to English equivalents */
const pageMap: Record<string, string> = {
  '': '',
  'ueber-uns': 'about',
  'anmeldung': 'registration',
  'alltag': 'daily-life',
  'kontakt': 'contact',
  'vielfalt': 'diversity',
  'impressum': 'imprint',
  'datenschutz': 'privacy',
  '404': '404',
};

const reversePageMap: Record<string, string> = Object.fromEntries(
  Object.entries(pageMap).map(([de, en]) => [en, de])
);

/** Get the path to the alternate-language version of the current page */
export function getAlternatePath(url: URL, targetLocale: Locale): string {
  const segments = url.pathname.split('/').filter(Boolean);
  const isEnglish = segments[0] === 'en';

  if (targetLocale === 'en') {
    // Currently German -> target English
    const slug = segments[0] ?? '';
    const enSlug = pageMap[slug] ?? slug;
    return enSlug ? `/en/${enSlug}` : '/en/';
  } else {
    // Currently English -> target German
    const slug = segments[1] ?? '';
    const deSlug = reversePageMap[slug] ?? slug;
    return deSlug ? `/${deSlug}` : '/';
  }
}

/** Navigation items for a given locale */
export function getNavItems(locale: Locale) {
  if (locale === 'en') {
    return [
      { label: t(locale, 'nav.about'), href: '/en/about' },
      { label: t(locale, 'nav.registration'), href: '/en/registration' },
      { label: t(locale, 'nav.dailyLife'), href: '/en/daily-life' },
      { label: t(locale, 'nav.contact'), href: '/en/contact' },
    ];
  }
  return [
    { label: t(locale, 'nav.about'), href: '/ueber-uns' },
    { label: t(locale, 'nav.registration'), href: '/anmeldung' },
    { label: t(locale, 'nav.dailyLife'), href: '/alltag' },
    { label: t(locale, 'nav.contact'), href: '/kontakt' },
  ];
}
