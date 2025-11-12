# devkitlibrary

devkitlibrary is a Next.js toolkit of everyday developer utilities (JSON, Base64, Color, Markdown, URL, Cron, JWT, UUID, QR, Date/Time, Math, File, System, and more), optimized for atomic commits and a clean PR workflow.

## Stack
- Next.js (App Router) + TypeScript
- Package manager: Bun
- Deployment: Vercel

## Quick Start
```bash
bun install
bun run dev
```

## Scripts
- `bun run dev` — start dev server
- `bun run build` — build for production
- `bun run start` — start production server
- `bun run lint` — run Next lint

## Repo Flow
- Branches: `main` (stable), `dev` (integration), `feature/*` (tools)
- Open PRs from `feature/*` to `dev`, then merge `dev` to `main`

## Helper Scripts
See `scripts/` for daily workflow helpers: branch creation, formatted commits, optional co-author, PR prep, and Quickdraw issue helper.

## Tools Implemented (Day 1)
- JSON formatter (pretty/minify, safe parse)
- Base64 encoder/decoder (Unicode-safe)
- Color converter (HEX ↔ RGB)

More tools will be added following the 10-day roadmap.

## Deployment
This repo is Vercel-ready. Create a new Vercel project, link the repo, set framework to Next.js, and use Bun as the package manager. Defaults are fine.
