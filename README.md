# Montessori-Kinderhaus Potsdam West

Website for the Montessori-Kinderhaus Potsdam West, a parent-run Montessori kindergarten in Potsdam, Germany.

**Live site:** (Cloudflare Pages - URL TBD)

## Tech Stack

- [Astro](https://astro.build/) - Static site generator
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [Bun](https://bun.sh/) - Package manager and runtime

## Getting Started

### Prerequisites

This project uses [mise](https://mise.jdx.dev/) to manage the Bun runtime. Install mise first, then:

```sh
mise install
```

### Development

```sh
bun install    # Install dependencies
bun run dev    # Start dev server at localhost:4321
```

### Build

```sh
bun run build    # Build to ./dist/
bun run preview  # Preview the build locally
```

## Deployment

The site is deployed to **Cloudflare Pages** via Workers Builds.

### Cloudflare Pages (current)

Automatic deployment on every push to `main`.

- **Config:** `wrangler.jsonc` defines the static assets directory
- **Build command:** `bun run build`
- **Output directory:** `dist`

## Project Structure

```
src/
├── components/    # Reusable Astro components
├── layouts/       # Page layouts
├── pages/         # Routes (each .astro file becomes a page)
└── styles/        # Global CSS with Tailwind
public/
└── images/        # Static assets
```

## Documentation

- `plan.md` - Content plan and site structure
- `AGENTS.md` - Guidelines for AI agents working on this project
- `image.png` - Design mockup reference
