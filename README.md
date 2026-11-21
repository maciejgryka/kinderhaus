# Montessori-Kinderhaus e.V.

Website for the Montessori-Kinderhaus Potsdam West, a parent-run Montessori kindergarten in Potsdam, Germany.

**Live site:** (Cloudflare Workers - URL TBD)

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

### Development with Admin Page

The site includes an admin page (`/admin`) for editing the hospitation page content. This requires running Wrangler locally:

```sh
# Terminal 1: Run the Astro dev server
bun run dev

# Terminal 2: Build and run with Wrangler (for /admin to work)
bun run build && bun run preview
```

Then access the admin page at: http://localhost:8787/admin

Local secrets go in a gitignored `.dev.vars` file (`ADMIN_PASSWORD=...`, `GITHUB_TOKEN=...`).

### Build

```sh
bun run build    # Build to ./dist/
bun run preview  # Preview the build locally with Wrangler
```

## Deployment

The site is deployed as a **Cloudflare Worker with static assets** via Workers Builds.

Automatic deployment on every push to `main`; other branches get a preview URL.

- **Config:** `wrangler.jsonc` serves `dist/` as static assets and routes `/admin` and `/api/*` to the Worker in `worker/`
- **Build command:** `bun run build`
- **Deploy command:** `npx wrangler deploy` (non-production branches: `npx wrangler versions upload`)
- **Secrets:** `ADMIN_PASSWORD`, `GITHUB_TOKEN`

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
