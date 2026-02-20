# Plan: Add English version of the site (i18n)

## Context
The site is currently German-only. We want to add an English version using Astro's built-in i18n routing + JSON translation files. The site has ~9 pages of static content in `.astro` files.

## Steps

### 1. Configure Astro i18n routing
**File:** `astro.config.mjs`
- Add `i18n` config with `defaultLocale: 'de'` and `locales: ['de', 'en']`
- Use `prefixDefaultLocale: false` so German stays at `/`, English at `/en/...`

### 2. Create translation files for shared UI strings
**New files:** `src/i18n/de.json`, `src/i18n/en.json`, `src/i18n/utils.ts`
- Extract strings shared across pages: nav labels, button text, CTA text, footer content, meta descriptions
- `utils.ts` exports a `t(locale, key)` helper and a `getLocale(Astro)` helper

### 3. Make Layout, Header, Footer locale-aware
**Files:** `src/layouts/Layout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`
- Accept a `locale` prop (derived from URL path)
- Use `t()` for nav labels, footer text, aria labels, back-to-top button
- Set `<html lang={locale}>`
- Add a language switcher link (simple DE/EN toggle) in the header

### 4. Create English page versions
**New files:** `src/pages/en/*.astro` (index, about, registration, daily-life, contact, diversity, imprint, privacy, 404)
- Each English page imports Layout and components, passes `locale="en"`, contains English content
- URL structure: `/en/`, `/en/about`, `/en/registration`, `/en/daily-life`, `/en/contact`, `/en/diversity`, `/en/imprint`, `/en/privacy`

### 5. Add hreflang tags for SEO
**File:** `src/layouts/Layout.astro`
- Add `<link rel="alternate" hreflang="de" href="...">` and `<link rel="alternate" hreflang="en" href="...">` to `<head>`

## Verification
- `npm run build` succeeds
- German pages unchanged at `/`, `/ueber-uns`, etc.
- English pages accessible at `/en/`, `/en/about`, etc.
- Language switcher links between corresponding pages
- `<html lang="...">` correct per locale
