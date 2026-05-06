/**
 * Central place for values that change periodically,
 * so they only need to be updated in one spot.
 */

export type TerminKind =
  | "cafe"
  | "flea-market"
  | "team-day"
  | "closure"
  | "festival";

export interface Termin {
  date: Date;
  endDate?: Date;
  kind: TerminKind;
  titleDe: string;
  titleEn: string;
  timeDe?: string;
  timeEn?: string;
}

export const termine: Termin[] = [
  {
    date: new Date(2026, 5, 20, 14, 0),
    kind: "flea-market",
    titleDe: "Flohmarkt",
    titleEn: "Flea market",
    timeDe: "14–17 Uhr",
    timeEn: "2–5 pm",
  },
  {
    date: new Date(2026, 6, 3),
    kind: "team-day",
    titleDe: "Teamtag",
    titleEn: "Team day",
  },
  {
    date: new Date(2026, 6, 27),
    endDate: new Date(2026, 7, 14),
    kind: "closure",
    titleDe: "Schließzeit",
    titleEn: "Closed",
  },
  {
    date: new Date(2026, 8, 11),
    kind: "festival",
    titleDe: "Sommerfest",
    titleEn: "Summer festival",
  },
  {
    date: new Date(2026, 9, 2, 15, 0),
    kind: "cafe",
    titleDe: "Kennenlern-Café",
    titleEn: "Welcome Café",
    timeDe: "15:00 Uhr",
    timeEn: "3:00 PM",
  },
  {
    date: new Date(2026, 9, 9),
    kind: "team-day",
    titleDe: "Teamtag",
    titleEn: "Team day",
  },
  {
    date: new Date(2026, 10, 27),
    kind: "team-day",
    titleDe: "Teamtag",
    titleEn: "Team day",
  },
  {
    date: new Date(2026, 11, 23),
    kind: "closure",
    titleDe: "Schließzeit",
    titleEn: "Closed",
  },
  {
    date: new Date(2026, 11, 28),
    endDate: new Date(2026, 11, 31),
    kind: "closure",
    titleDe: "Schließzeit",
    titleEn: "Closed",
  },
];

const SHORT_DE = { day: "2-digit", month: "2-digit", year: "numeric" } as const;
const LONG_DE = { day: "2-digit", month: "long", year: "numeric" } as const;
const LONG_EN = { day: "numeric", month: "long", year: "numeric" } as const;

export function formatTerminDateDe(t: Termin): string {
  if (t.endDate) {
    return `${t.date.toLocaleDateString("de-DE", LONG_DE)} – ${t.endDate.toLocaleDateString("de-DE", LONG_DE)}`;
  }
  return t.date.toLocaleDateString("de-DE", LONG_DE);
}

export function formatTerminDateEn(t: Termin): string {
  if (t.endDate) {
    return `${t.date.toLocaleDateString("en-GB", LONG_EN)} – ${t.endDate.toLocaleDateString("en-GB", LONG_EN)}`;
  }
  return t.date.toLocaleDateString("en-GB", LONG_EN);
}

const cafe = termine.find((t) => t.kind === "cafe")!;
const flea = termine.find((t) => t.kind === "flea-market")!;

export const nextCafeDate = cafe.date.toLocaleDateString("de-DE", SHORT_DE);
export const nextCafeDateLongDe = cafe.date.toLocaleDateString("de-DE", LONG_DE);
export const nextCafeDateLongEn = cafe.date.toLocaleDateString("en-GB", LONG_EN);
export const nextCafeTimeDe = cafe.timeDe!;
export const nextCafeTimeEn = cafe.timeEn!;

export const fleaMarketDate = flea.date.toLocaleDateString("de-DE", SHORT_DE);
export const fleaMarketDateLongDe = flea.date.toLocaleDateString("de-DE", LONG_DE);
export const fleaMarketDateLongEn = flea.date.toLocaleDateString("en-GB", LONG_EN);
export const fleaMarketTimeDe = flea.timeDe!;
export const fleaMarketTimeEn = flea.timeEn!;
