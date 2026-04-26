# Ezdu 

Marketing site for **Ezdu — Pocket Learning Companion** (https://ezdu.net). AI-powered exam-prep app for Bangladeshi learners (SSC, HSC, BCS, IELTS, vocabulary). This repo is the public landing site only — the mobile app lives elsewhere; CTAs link to App Store / Play Store.

## Stack

- **Next.js 16** App Router, **React 19**, **TypeScript** strict, target ES2017, `moduleResolution: bundler`
- **Tailwind CSS v4** via `@tailwindcss/postcss` — there is **no `tailwind.config.{js,ts}`**. Tokens, custom variants, keyframes, and utility layers all live in [app/globals.css](app/globals.css) under `@theme inline` / `@layer utilities`. The empty `tailwind.config` field in [components.json](components.json) is intentional.
- **shadcn/ui** (new-york style, neutral base, `lucide-react` icons)
- **framer-motion** for animations; **@vercel/analytics** mounted in [components/marketing-shell.tsx](components/marketing-shell.tsx)
- Path alias: `@/*` → repo root

## Scripts

```bash
npm run dev      # next dev (localhost:3000)
npm run build    # next build
npm run start    # next start
npm run lint     # eslint flat config (eslint.config.mjs)
```

There is **no test setup**. Don't claim a feature works on the basis of "tests pass" — verify by running `dev` and viewing the page, or by `build`.

## Dark-only theme — important

The site is **permanently dark**. [app/layout.tsx](app/layout.tsx) hard-sets `<html className="h-full bg-zinc-950">` and the body resolves to `bg-zinc-950 text-zinc-100`. The shadcn light/dark CSS variables exist in [app/globals.css](app/globals.css), but `.dark` is **never toggled** and there is no theme switcher. Don't author light-mode variants, don't read `prefers-color-scheme`, and don't introduce light surfaces — match the existing zinc-900/950 palette.

## Routing layout

App Router with two route groups, both wrapped by `MarketingShell` (Navbar + Footer + Analytics) — see [components/marketing-shell.tsx](components/marketing-shell.tsx). Don't duplicate global chrome inside child pages.

- **[app/(main)/](app/(main)/)** — homepage and exam pages.
  - **[app/(main)/(exams)/](app/(main)/(exams)/)** — `ssc`, `hsc`, `bcs`, `ielts`, `vocabulary`. The canonical exam-path list is `EXAM_PATHS` in [lib/exam-routes.ts](lib/exam-routes.ts); the navbar uses `isExamPath` to swap chrome on these routes. **Adding a new exam requires touching three files:** the new route folder, `EXAM_PATHS`, and [app/sitemap.ts](app/sitemap.ts).
- **[app/(boilerplate)/](app/(boilerplate)/)** — `about`, `blog`, `career`, `contact`, `cookies`, `faq`, `privacy-policy`, `terms`.

The homepage in [app/(main)/page.tsx](app/(main)/page.tsx) composes `Hero`, `Features`, `EdtechModules`, `Pricing`, `Testimonials`. `Blog` and `Contact` are intentionally commented out — don't re-enable without checking.

## Exam pages — single shared template

Every exam page renders [components/ExamPageTemplate.tsx](components/ExamPageTemplate.tsx) with an `ExamPageConfig` object. **Do not write bespoke per-exam layouts.** Extend the config, the template, or the icon set instead.

- The template is `'use client'` (it owns interactive theme/animation state).
- `config.color` is a fixed union: `'emerald' | 'blue' | 'purple' | 'rose' | 'amber' | 'indigo' | 'cyan' | 'orange' | 'green'`. Adding a new color requires extending **both** the union type and the local `themeMap` in the same file.
- Icon names come from `ExamIconName` in [lib/exam-icons.tsx](lib/exam-icons.tsx) — add new icons there, not inline.

## SEO

- Root `<html lang="bn">` (Bengali primary, `en_US` as alternate locale). Most user-facing copy is **in Bengali** — don't "fix" Bengali strings to English.
- Default metadata + Open Graph in [app/layout.tsx](app/layout.tsx); JSON-LD via [lib/jsonld.ts](lib/jsonld.ts).
- **Per-page metadata**: use `buildMetadata(slug, {...})` from [lib/metadata.ts](lib/metadata.ts). It centralises canonical URL, OG, Twitter cards, locale. Don't hand-roll `Metadata` unless you need something it doesn't cover.
- **Sitemap is hand-maintained** — update [app/sitemap.ts](app/sitemap.ts) when adding/removing routes. Robots in [app/robots.ts](app/robots.ts).
- Favicons are generated dynamically by [app/icon.tsx](app/icon.tsx) and [app/apple-icon.tsx](app/apple-icon.tsx); the OG image URL is `https://ezdu.net/icon`.

## Components & styling conventions

- **[components/](components/)** — section components (`hero`, `features`, `modules`, `pricing`, `testimonials`, `blog`, `contact`, `footer`, `navbar`, `marketing-shell`, `exam-hub-nav`, `legal-notice`) plus the shared `ExamPageTemplate`.
- **[components/ui/](components/ui/)** — shadcn primitives (`button`, `card`, `input`, `tabs`, `textarea`, `download-button`). Add new shadcn parts here via the CLI; extend with new variants rather than restyling.
- **`cn()`** lives in [lib/utils.ts](lib/utils.ts) — use it for class-merging instead of template strings.
- **Server Components by default.** Only add `'use client'` for interactivity, framer-motion, or hooks.

### Use the existing CSS-var/utility helpers — don't reinvent

[app/globals.css](app/globals.css) defines a small design system on top of Tailwind. Prefer these over ad-hoc styles:

- **Chrome offsets** — `--ez-marketing-nav-height`, `--ez-exam-bar-height`, `--ez-safe-top`, `--ez-chrome-row`, `--ez-marketing-header-exam`. Use the matching utilities `pt-ez-below-nav`, `pt-ez-below-nav-lg`, `scroll-mt-ez-nav` instead of hardcoding nav padding.
- **Surfaces** — `.surface-page`, `.surface-section-muted`, `.surface-raised`, `.surface-raised-hover`, `.surface-chrome`.
- **Live indicators** — `.live-dot` (with `.live-dot-sm` / `.live-dot-on-light` modifiers), `.badge-live`, `.ribbon-live`. They already respect `prefers-reduced-motion` via the `@media` block at the bottom of `globals.css`.

Existing files use **4-space indentation** — match it.
