# AGENTS.md

Guidelines for AI agents working on this project.

## Project Overview

This is a static website for **Montessori-Kinderhaus Potsdam West**, a parent-run Montessori kindergarten in Potsdam, Germany. The site is being rebuilt from scratch with a modern design.

- **Tech stack:** Astro, Tailwind CSS v4, TypeScript
- **Package manager:** Bun (managed via mise)
- **Hosting target:** GitHub Pages or similar static hosting
- **Language:** German (all user-facing content is in German)

## Commands

```bash
bun run dev      # Start dev server at localhost:4321
bun run build    # Build to dist/
bun run preview  # Preview production build
```

## Project Structure

```
src/
├── components/    # Reusable Astro components
├── layouts/       # Page layouts (Layout.astro)
├── pages/         # Routes (index.astro, ueber-uns.astro, etc.)
└── styles/        # Global CSS with Tailwind
public/
└── images/        # Static assets (photos, logos)
```

## Design Guidelines

See `plan.md` for full content mapping. Key design principles:

### Color Palette
- Background: `#FDF8F3` (warm cream)
- Primary accent: `#F5D59A` (soft yellow)
- Secondary accent: `#E8C47C` (darker yellow)
- Text: `#2D2D2D` (dark gray)
- Muted text: `#6B6B6B`

### Visual Style
- Warm, inviting aesthetic suitable for a kindergarten
- Organic blob shapes as decorative elements (use SVG)
- Rounded corners throughout (`rounded-2xl`, `rounded-full`)
- Soft shadows (`shadow-sm`, `shadow-md`)
- Plenty of whitespace
- Card-based layouts for feature sections

### Typography
- Clean, readable fonts
- Headings should feel friendly, not corporate
- Body text should be comfortable to read

## Content Guidelines

- All content is in **German**
- Tone: Warm, welcoming, professional but not stiff
- Target audience: Parents looking for kindergarten options in Potsdam
- Key information to highlight:
  - Montessori pedagogy
  - Parent initiative (Elterninitiative) - active participation required
  - Registration process and dates
  - Contact information

## Pages

1. **Homepage** (`/`) - Hero, feature cards, pedagogy preview, key facts
2. **Über uns** (`/ueber-uns`) - History, team, groups, hours
3. **Anmeldung & Aufnahme** (`/anmeldung`) - Registration, hospitation, process
4. **Alltag & Angebote** (`/alltag`) - Daily schedule, meals, programs
5. **Kontakt** (`/kontakt`) - Contact info, fees, parent participation

## Code Conventions

### Astro Components
- Use `.astro` files for components and pages
- Keep components focused and reusable
- Use TypeScript for props interfaces

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="...">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>
```

### Tailwind CSS
- Use Tailwind v4 syntax (CSS-based config via `@theme`)
- Define custom colors in `src/styles/global.css`
- Prefer utility classes over custom CSS
- Use consistent spacing scale

### Images
- Place in `public/images/`
- Use descriptive filenames: `hero-child.jpg`, `montessori-materials.jpg`
- Optimize images before adding (compress, appropriate dimensions)
- Use `loading="lazy"` for below-fold images

## Reference Files

- `plan.md` - Full content plan and site structure
- `image.png` - Design mockup reference

## Notes

- This is a simple static site - no backend, no CMS
- Keep dependencies minimal
- Prioritize performance and accessibility
- Mobile-responsive design is required
