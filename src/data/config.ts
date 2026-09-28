/**
 * Central place for values that change periodically,
 * so they only need to be updated in one spot.
 */

// Set active to false once the vacancy has been filled.
export const jobVacancy = {
  active: true,
  url: "https://de.indeed.com/viewjob?jk=65c23c048095e936",
};

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
    timeDe: "15:00–17:00 Uhr",
    timeEn: "3:00–5:00 pm",
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
  {
    date: new Date(2027, 2, 5, 15, 0),
    kind: "cafe",
    titleDe: "Kennenlern-Café",
    titleEn: "Welcome Café",
    timeDe: "15:00–17:00 Uhr",
    timeEn: "3:00–5:00 pm",
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

export const cafeDates = termine
  .filter((t) => t.kind === "cafe")
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .map((t) => ({
    isoDate: `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, "0")}-${String(t.date.getDate()).padStart(2, "0")}`,
    shortDe: t.date.toLocaleDateString("de-DE", SHORT_DE),
    dateDe: formatTerminDateDe(t),
    dateEn: formatTerminDateEn(t),
    timeDe: t.timeDe,
    timeEn: t.timeEn,
  }));
