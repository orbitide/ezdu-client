# Ezdu Web Client

Web client + marketing site for **Ezdu — Pocket Learning Companion** (https://ezdu.net). AI-powered exam-prep app for Bangladeshi learners (SSC, HSC, BCS, IELTS, vocabulary). The web client mirrors all features from the mobile app; CTAs on public pages link to App Store / Play Store.

## Stack

- **Next.js 16** App Router, **React 19**, **TypeScript** strict, target ES2017, `moduleResolution: bundler`
- **Tailwind CSS v4** via `@tailwindcss/postcss` — there is **no `tailwind.config.{js,ts}`**. Tokens, custom variants, keyframes, and utility layers all live in [app/globals.css](app/globals.css) under `@theme inline` / `@layer utilities`. The empty `tailwind.config` field in [components.json](components.json) is intentional.
- **shadcn/ui** on **`@base-ui/react`** (`lucide-react` icons), plus `sonner` for toasts and `cmdk` for the command palette. Also imports `shadcn/tailwind.css` for the custom variants (`data-open`, `data-closed`, …) the primitives rely on.
- **framer-motion** for animations; **@vercel/analytics** mounted in [components/marketing-shell.tsx](components/marketing-shell.tsx)
- **Zustand** for client state (auth store, quiz store, UI store)
- **Axios** for API calls — configured in [lib/api-client.ts](lib/api-client.ts) with `withCredentials: true`
- Path alias: `@/*` → repo root

## Scripts

```bash
npm run dev      # next dev (localhost:3000)
npm run build    # next build
npm run start    # next start
npm run lint     # eslint flat config (eslint.config.mjs)
```

There is **no test setup**. Don't claim a feature works on the basis of "tests pass" — verify by running `dev` and viewing the page, or by `build`.

## Backend API

- Dev: `http://localhost:5001/api/`
- Prod: `https://api.ezdu.net/api/`
- Configured via `NEXT_PUBLIC_API_URL` in `.env`
- Auth: JWT + httpOnly cookies (`withCredentials: true` handles this automatically)
- API service modules live in `lib/api/` — one file per domain (auth, users, quiz, progress, etc.)

## Design system — token-driven, dark-only

The palette was ported from the Orbitide `ezdu-client` reference. Its **dark** token values are promoted directly onto `:root` in [app/globals.css](app/globals.css) — there is **no `.dark` class**, no `next-themes`, and no theme switcher. Don't author light-mode variants, don't read `prefers-color-scheme`, and don't reintroduce a `.dark` block.

**Never hardcode palette colours.** There are zero `zinc-*` and zero `emerald-*` classes in the codebase, and it must stay that way. Always use the semantic tokens:

| Role | Token |
|---|---|
| Page background | `bg-background` |
| Raised surface / cards | `bg-card` |
| Secondary surface | `bg-muted` |
| Primary text | `text-foreground` |
| Secondary text | `text-muted-foreground` |
| Brand accent (was emerald) | `text-primary` / `bg-primary` / `border-primary` |
| Text on a solid `bg-primary` | `text-primary-foreground` |
| Hairlines | `border-border` (already carries alpha — don't add `/50`) |

Domain tokens also exist and should be preferred over raw colours: `coin` (gold), `xp` (blue), `streak` (orange), `pro` (purple), and `rank-{novice…mythic}` for league tiers.

`text-white` is allowed **only** on a solid coloured surface (e.g. a `bg-primary` button or a red badge), where the foreground token would be unreadable. Everywhere else use `text-foreground`.

Typography: **Fredoka** (`--font-sans`), `17px` root font size, and global `h1`–`h4` styles in the `@layer base` block — prefer a bare `<h1>` over restating size classes.

## Page layout — two-column shell

Content routes use the reference's 2/3 + 1/3 layout. The standard shape is:

```tsx
<PageContainer>
    <TwoColumnShell right={<DefaultRightRail />}>
        {/* main content */}
    </TwoColumnShell>
</PageContainer>
```

- **[PageContainer](components/layout/page-container.tsx)** — `max-w-5xl` + padding. The reference puts this in its AppShell, but our immersive routes own their own full-height scroll containers, so pages opt in instead.
- **[TwoColumnShell](components/layout/two-column-shell.tsx)** — `lg:grid-cols-3` with the main column at `lg:col-span-2`; stacks on mobile.
- **[DefaultRightRail](components/layout/default-right-rail.tsx)** — stats + study plan + upcoming model tests. **Self-contained**: it reads the app-data store itself, so pages don't thread props. Unlike the reference (which renders hardcoded `lib/mock/home.ts`), ours is backed by the live API.

**Immersive routes stay single-column** — a right rail would break them: the quiz engine (`/quiz/session`), challenge and mock-test sessions, archive quiz, the vocabulary game modes, and `/archive/[examId]` (fixed bottom CTA).

## Routing layout

App Router with multiple route groups:

- **`(auth)/`** — `login`, `register`, `forgot-password`, `reset-password`. No shell wrapper.
- **`(onboarding)/`** — class/group selection for new users. Triggered after first registration.
- **`(main)/`** — everything else, split into:
  - Marketing pages (homepage, exam pages, blog, about, etc.) wrapped by `MarketingShell`
  - App pages (dashboard, quiz, progress, vocabulary, etc.) wrapped by `AppShell` (sidebar + header)
- **`(boilerplate)/`** — `about`, `blog`, `career`, `contact`, `cookies`, `faq`, `privacy-policy`, `terms`

### App routes (authenticated)
- `/dashboard` — home with stats, streak, daily revision
- `/quiz`, `/quiz/[id]`, `/quiz/[id]/review` — quiz list + engine + review
- `/model-tests`, `/model-tests/[id]` — scheduled model tests
- `/challenge` — quick challenge with subject/lesson selection
- `/progress`, `/progress/history`, `/progress/mastery`, `/progress/mistakes`
- `/vocabulary`, `/vocabulary/[level]`, `/vocabulary/flashcards`, `/vocabulary/fill-gaps`, `/vocabulary/synonym-antonym`, `/vocabulary/word-match`
- `/leaderboard` — weekly rankings
- `/leagues` — league tiers and outcomes
- `/achievements` — badges and milestones
- `/shop` — coins, streak freeze, pro subscription
- `/feed` — announcements and friend activity
- `/friends` — follow/unfollow, user search
- `/archive`, `/archive/[examId]` — past board exams
- `/profile`, `/profile/[username]` — own + public profiles
- `/settings`, `/settings/avatar` — preferences + avatar builder

### Middleware
`middleware.ts` at repo root protects all app routes — redirects unauthenticated users to `/login`.

## Exam pages — single shared template

Every marketing exam page renders [components/ExamPageTemplate.tsx](components/ExamPageTemplate.tsx) with an `ExamPageConfig` object. **Do not write bespoke per-exam layouts.**

- `config.color` is a fixed union: `'emerald' | 'blue' | 'purple' | 'rose' | 'amber' | 'indigo' | 'cyan' | 'orange' | 'green'`
- Icon names come from `ExamIconName` in [lib/exam-icons.tsx](lib/exam-icons.tsx)

## SEO

- Root `<html lang="bn">` (Bengali primary). Most user-facing copy is **in Bengali** — don't "fix" Bengali strings to English.
- **Per-page metadata**: use `buildMetadata(slug, {...})` from [lib/metadata.ts](lib/metadata.ts).
- **Sitemap is hand-maintained** — update [app/sitemap.ts](app/sitemap.ts) when adding/removing public routes.

## Components & styling conventions

- **[components/](components/)** — marketing section components + shared `ExamPageTemplate`
- **[components/shared/](components/shared/)** — `AppHeader` / `AppSidebar` plus token-driven presentational primitives ported from the reference: `CoinBalance`, `XpBadge`, `StreakBadge`, `RankBadge`, `ProgressRing`, `PageHeader`, `EmptyState`, `DifficultyBadge`, `OnlineDot`, `LoadingSkeleton`. Compose these rather than re-inlining badge/stat markup.
- **[components/ui/](components/ui/)** — shadcn primitives built on **`@base-ui/react`** (not Radix). 34 primitives are available. `form.tsx` was intentionally omitted — it needs `react-hook-form`, which isn't a dependency.
- **[features/](features/)** — feature-specific components, hooks, and types grouped by domain
- **`cn()`** lives in [lib/utils.ts](lib/utils.ts) — use it for class-merging
- **Server Components by default.** Only add `'use client'` for interactivity, framer-motion, or hooks.

### Use the existing CSS-var/utility helpers — don't reinvent

[app/globals.css](app/globals.css) defines a small design system on top of Tailwind:

- **Chrome offsets** — `pt-ez-below-nav`, `pt-ez-below-nav-lg`, `scroll-mt-ez-nav`
- **Surfaces** — `.surface-page`, `.surface-section-muted`, `.surface-raised`, `.surface-raised-hover`, `.surface-chrome` (all token-backed)
- **Live indicators** — `.live-dot`, `.badge-live`, `.ribbon-live`
- **Bengali numerals** — `toBangla()` plus `bnDin`/`bnGhonta`/`bnMinute`/`bnSecond`/`bnMas` in [lib/utils.ts](lib/utils.ts). User-facing numbers render in Bengali digits, matching the mobile app.

Existing files use **4-space indentation** — match it.
