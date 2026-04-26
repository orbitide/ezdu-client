# Ezdu Landing

Marketing site for **Ezdu — Pocket Learning Companion** (https://ezdu.net). AI-powered exam-prep app targeting Bangladeshi learners (SSC, HSC, BCS, IELTS, vocabulary). This repo is the public landing site only — the app itself lives elsewhere.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript strict)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — no `tailwind.config`, tokens live in [app/globals.css](app/globals.css)
- **shadcn/ui** (new-york style, neutral base, `lucide-react` icons) — config in [components.json](components.json)
- **framer-motion** for animations
- **@vercel/analytics** mounted in [components/marketing-shell.tsx](components/marketing-shell.tsx)
- Path alias: `@/*` → repo root (see [tsconfig.json](tsconfig.json))

## Scripts

```bash
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # eslint (flat config in eslint.config.mjs)
```

## Routing layout

App Router with two route groups, both wrapped by `MarketingShell` (Navbar + Footer + Analytics):

- **[app/(main)/](app/(main)/)** — homepage and exam pages
  - **[app/(main)/(exams)/](app/(main)/(exams)/)** — `ssc`, `hsc`, `bcs`, `ielts`, `vocabulary`. The list of exam paths is canonical in [lib/exam-routes.ts](lib/exam-routes.ts) (`EXAM_PATHS`); keep it in sync with the sitemap and any new exam route folder.
- **[app/(boilerplate)/](app/(boilerplate)/)** — `about`, `blog`, `career`, `contact`, `cookies`, `faq`, `privacy-policy`, `terms`

Both group layouts render the same shell — don't duplicate global chrome inside child pages.

## SEO

- Root `<html lang="bn">` (Bengali primary, `en_US` as alternate locale).
- Default metadata + Open Graph in [app/layout.tsx](app/layout.tsx); JSON-LD injected from [lib/jsonld.ts](lib/jsonld.ts).
- Per-page metadata: use `buildMetadata(slug, {...})` from [lib/metadata.ts](lib/metadata.ts) — it sets canonical URL, OG, and Twitter cards consistently. Don't hand-roll `Metadata` objects unless you need something it doesn't cover.
- **Sitemap is manual**: when adding/removing a route, also update [app/sitemap.ts](app/sitemap.ts). Robots in [app/robots.ts](app/robots.ts).
- Favicons are generated dynamically by [app/icon.tsx](app/icon.tsx) and [app/apple-icon.tsx](app/apple-icon.tsx); the OG image URL is `https://ezdu.net/icon`.

## Components

- **[components/](components/)** — section components (`hero`, `features`, `modules`, `pricing`, `testimonials`, `blog`, `contact`, `footer`, `navbar`, `marketing-shell`, `exam-hub-nav`, `legal-notice`) and `ExamPageTemplate.tsx` (the shared template each exam page renders).
- **[components/ui/](components/ui/)** — shadcn primitives (`button`, `card`, `input`, `tabs`, `textarea`, `download-button`). Add new shadcn components here via the CLI; don't restyle these — extend with new variants instead.
- **[lib/exam-icons.tsx](lib/exam-icons.tsx)** — exam-specific icon set used across hero/nav.
- **[lib/google-play.ts](lib/google-play.ts)** — Play Store CTA helper.

## Conventions

- This is a **content/marketing site**, not an app — prefer Server Components; only mark `"use client"` when you need state, effects, or framer-motion.
- New top-level pages go in `(boilerplate)`. New exam pages go in `(exams)` and must be added to `EXAM_PATHS` and the sitemap.
- Keep page metadata routed through `buildMetadata` so canonical/OG stays consistent.
- Indentation in existing files is 4 spaces — match it.
