# Montessori-Kinderhaus Potsdam West - Website Redesign Plan

## Overview

Rebuild the website for Montessori-Kinderhaus Potsdam West using Astro + Tailwind CSS. The new design features a modern, warm aesthetic with organic shapes, soft colors, and clean typography.

**Current site:** https://www.montessori-kinderhaus-potsdam.de/
**Design mockup:** `image.png` (in project root)
**Tech stack:** Astro, Tailwind CSS, hosted on GitHub Pages (or Netlify/Vercel)

---

## Design Characteristics

- Warm color palette (cream, beige, soft yellow/orange accents)
- Organic blob shapes as decorative elements
- Rounded corners throughout
- Clean, modern typography
- Card-based layouts
- Plenty of whitespace

---

## Navigation Structure

| New Navigation        | Current Site Content Source              |
|-----------------------|------------------------------------------|
| Über uns              | Einrichtung (Team, Pädagogik)            |
| Anmeldung & Aufnahme  | Anmeldung, Hospitation                   |
| Alltag & Angebote     | Tagesablauf, Mahlzeiten, Team            |
| Kontakt               | Kontakt, Verein, Beiträge                |

---

## Homepage Content

### Hero Section
- **Headline:** "Montessori-Kinderhaus Potsdam West"
- **Subheadline:** "Elterninitiative im Potsdamer Westen"
- **CTA Button:** "Mehr über unser Kinderhaus"
- **Image:** Child from behind, warm tones

### Three Feature Cards

#### 1. Anmeldung
- Brief intro to registration process
- Mention Open House Café dates
- Link: "Zur Anmeldung →"

#### 2. Hospitation
- Observation visits available Tue/Thu
- Times: 8:45-10:30
- Link: "Hospitation →"

#### 3. Pädagogik
- Montessori principles teaser
- Child-centered approach
- Link: "Mehr zur Pädagogik →"

### "Unsere Pädagogik & Werte" Section
- Child at the center of everything
- Educators as observers and companions
- Free choice of activities
- Following sensitive developmental phases
- Mutual respect and peaceful coexistence
- Image: Montessori materials shelf

### Key Facts Section
- **Ages:** 1 year to school entry
- **Capacity:** 66 children
- **Groups:** 3 (1 infant group, 2 mixed-age groups)
- **Team:** 9 Montessori-trained educators
- **Location:** Near Sanssouci Park
- **Since:** October 2002

---

## Subpages

### 1. Über uns
**Content:**
- History (opened October 2002)
- Team structure:
  - 9 state-certified educators
  - All have Montessori training or are in training
  - Supported by interns and parent volunteers
- Group structure:
  - Infant group (under 3): 3 educators
  - Mixed-age group 1 (2.5 to school): 2 educators
  - Mixed-age group 2 (2.5 to school): 2 educators
- Operating hours:
  - Mon-Thu: 7:30 - 16:30
  - Fri: 7:30 - 15:00
- Location near Sanssouci Park

### 2. Anmeldung & Aufnahme
**Content:**
- Registration process overview
- Required: Read pedagogical concept first
- Download: Registration form, concept documents

**Open House Café:**
- Twice yearly
- Next dates: 04.03.2026 & 02.10.2026, 15:00
- Meet parents, representatives, educators
- No registration required

**Hospitation (Observation Visits):**
- Available Tue/Thu, September-November & January-May
- Time: 8:45-10:30
- Followed by discussion with educator
- Book via: hospitation@montessori-kinderhaus-potsdam.de
- Note: Cannot observe with own child present

**Admission Process:**
- Submit registration form by mail
- Attend Open House or Hospitation (recommended)
- Get-to-know conversation with child (mandatory)
- No numbered waiting list

**Important:** Enrollment does not guarantee admission to Montessori secondary school

### 3. Alltag & Angebote
**Content:**
- Daily schedule/rhythm (to be detailed)
- Meals:
  - Organic lunch: €37.50/month
  - Additional meals: €28.00/month
  - Bildungspaket support available
- Pre-school program for children preparing for elementary school
- Weekly activities and offerings

### 4. Kontakt
**Contact Information:**
- **Address:** Knobelsdorffstr. 7, 14471 Potsdam
- **Phone:** 0331 – 620 44 30
- **Email:** info@montessori-kinderhaus-potsdam.de

**The Association (Verein):**
- Montessori-Kinderhaus Potsdam e.V.
- Parent-run initiative (Elterninitiative)

**Fees:**
- Income-dependent contributions
- Fees waived from child's 3rd birthday
- Additional €30/month per family for individualized care
- Meal costs separate

**Parent Participation:**
- 12 working hours per quarter required
- Work groups (AGs):
  - Außengelände (Outdoor grounds)
  - Kommunikation (Communications)
  - Küche (Kitchen)
  - Feste und Veranstaltungen (Events)
  - Material (Materials)
- Optional: Parent representative, board positions

**Banking Details:**
- Bank: DKB, Deutsche Kreditbank AG
- BLZ: 12030000
- Konto: 18705772

---

## Assets Needed

- Hero image (child, warm tones)
- Montessori materials/shelf image
- Outdoor/garden image
- Team or group activity image
- Decorative blob shapes (SVG)

---

## Technical Implementation

### Project Structure
```
/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── FeatureCard.astro
│   │   ├── Hero.astro
│   │   └── Section.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── ueber-uns.astro
│   │   ├── anmeldung.astro
│   │   ├── alltag.astro
│   │   └── kontakt.astro
│   └── styles/
│       └── global.css
├── public/
│   └── images/
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

### Color Palette (from mockup)
- Background: #FDF8F3 (warm cream)
- Primary accent: #F5D59A (soft yellow)
- Secondary accent: #E8C47C (darker yellow)
- Text: #2D2D2D (dark gray)
- Muted text: #6B6B6B

### Fonts
- Headings: Serif or rounded sans-serif
- Body: Clean sans-serif

---

## Next Steps

1. Initialize Astro project
2. Configure Tailwind with custom colors
3. Create base layout with header/footer
4. Build homepage with all sections
5. Create subpages
6. Add placeholder images
7. Test and deploy
