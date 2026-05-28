# Ezdu Next.js Folder Structure
> Inspired by the Flutter mobile app's feature-first architecture. Last updated: 2026-05-28.

---

## Flutter → Next.js Mapping

| Flutter Layer | Next.js Equivalent |
|---|---|
| `lib/app/` (routes, themes, DI) | `app/` (App Router) + `config/` |
| `lib/core/` (widgets, utils, services) | `components/ui/`, `components/shared/`, `lib/`, `hooks/` |
| `lib/core/network/DioClient` | `lib/api-client.ts` — configured Axios instance (`apiClient`) |
| `lib/data/datasources/` + `repositories/` | `features/[name]/[name].service.ts` — merged into one file |
| `StateNotifier` / `Riverpod` | `features/[name]/[name].store.ts` or `store/` — Zustand (only when session state exists) |
| `lib/data/models/` | `features/[name]/types.ts` + `types/` |
| `lib/features/[name]/pages/` | `app/(main)/[route]/page.tsx` |
| `lib/features/[name]/widgets/` | `features/[name]/components/` |
| `lib/features/[name]/providers/` | `features/[name]/[name].store.ts` (Zustand) |

---

## Route Groups (App Router)

```
app/
├── (marketing)/          # Public marketing site — wrapped by MarketingShell
│   ├── layout.tsx
│   ├── page.tsx          # Homepage
│   ├── about/
│   ├── blog/
│   ├── career/
│   ├── contact/
│   ├── faq/
│   ├── cookies/
│   ├── privacy-policy/
│   └── terms/
│
├── (main)/               # Authenticated web app — wrapped by AppShell (sidebar)
│   ├── layout.tsx        # Sidebar + top header
│   ├── dashboard/page.tsx
│   ├── study-plan/page.tsx
│   ├── leaderboard/page.tsx
│   ├── profile/page.tsx
│   ├── settings/page.tsx
│   └── quiz/
│       ├── page.tsx          # Quiz listing
│       └── [id]/page.tsx     # Active quiz session
│
└── (auth)/               # Auth flows — centered layout, no sidebar
    ├── layout.tsx
    ├── login/page.tsx
    ├── register/page.tsx
    └── onboarding/page.tsx
```

---

## Feature Modules

Each feature is a **flat folder** — no subfolders for service/store, just files.
Add a `[name].store.ts` only when the feature has client-side session state across components.

```
features/
├── auth/
│   ├── components/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── auth.service.ts       # Axios calls: login, register, refresh, logout
│   └── types.ts
│
├── dashboard/
│   ├── components/
│   │   ├── StatsCard.tsx
│   │   ├── StreakCard.tsx
│   │   ├── RecentActivity.tsx
│   │   └── QuickStart.tsx
│   └── types.ts
│
├── quiz/                     # Mirrors Flutter's quiz_engine + mock_test + quick_challenge
│   ├── components/
│   │   ├── QuestionCard.tsx
│   │   ├── OptionButton.tsx
│   │   ├── QuizHeader.tsx
│   │   └── ResultScreen.tsx
│   ├── quiz.service.ts       # fetch-questions, submit-answer
│   ├── quiz.store.ts         # Zustand — timer, current question, score (real session state)
│   └── types.ts
│
├── study-plan/
│   ├── components/
│   │   └── StudyPlanCard.tsx
│   ├── study-plan.service.ts
│   └── types.ts
│
├── leaderboard/              # Fetch + display only → no store needed
│   ├── components/
│   │   └── LeaderboardTable.tsx
│   ├── leaderboard.service.ts
│   └── types.ts
│
├── profile/
│   ├── components/
│   │   ├── ProfileHeader.tsx
│   │   └── ProfileStats.tsx
│   ├── profile.service.ts
│   └── types.ts
│
├── onboarding/               # Step-based → needs a store
│   ├── components/
│   ├── onboarding.service.ts
│   ├── onboarding.store.ts
│   └── types.ts
│
├── streak/
├── vocabulary/
├── notifications/
├── shop/
└── feed/
```

**Rule:** Start with `[feature].service.ts` + `components/`. Add `[feature].store.ts` only when the feature manages client-side session state shared across multiple components.

---

## Shared Core

```
components/
├── ui/                       # shadcn/ui primitives — add via CLI
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── tabs.tsx
│   └── textarea.tsx
├── marketing/                # Marketing section components (hero, features, pricing…)
└── shared/                   # Cross-feature reusable widgets
    ├── AppSidebar.tsx
    ├── AppHeader.tsx
    ├── Avatar.tsx
    ├── Badge.tsx
    └── ProgressBar.tsx

hooks/                        # Shared React hooks
├── use-local-storage.ts
├── use-media-query.ts
└── use-debounce.ts
```

---

## API Client

```ts
// lib/api-client.ts
import axios from 'axios';
import { cookies } from 'next/headers';

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Cookie: cookies().toString(),
    },
});

export default apiClient;
```

All services import from `@/lib/api-client`, never from `axios` directly.

---

## Service Pattern (no API implementation in this repo)

The .NET 8 backend lives in a separate project. Services here are **thin Axios wrappers only**.

```ts
// features/auth/auth.service.ts
import apiClient from '@/lib/api-client';
import type { LoginDto, AuthResponse } from './types';

export const authService = {
    login: (data: LoginDto) => apiClient.post<AuthResponse>('/auth/login', data),
    register: (data: RegisterDto) => apiClient.post<AuthResponse>('/auth/register', data),
    refresh: () => apiClient.post<AuthResponse>('/auth/refresh'),
};
```

---

## Zustand Stores

```
store/                        # Global stores (cross-feature state only)
├── auth.store.ts             # User session, login/logout actions
├── ui.store.ts               # Global UI state (sidebar open, modals, toasts)
└── index.ts
```

Feature-local stores (like `quiz.store.ts`) live inside the feature folder.

```ts
// store/auth.store.ts
import { create } from 'zustand';

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: false,
    login: async (data) => { ... },
    logout: () => set({ user: null }),
}));
```

For simpler features (leaderboard read, profile display), call the service directly from the Server Component — no store needed.

---

## Types & Config

```
types/
├── user.ts                   # User, UserProfile
├── quiz.ts                   # Question, Option, QuizSession
├── exam.ts                   # Exam, ExamConfig
└── index.ts                  # Re-exports

config/
├── exams.ts                  # Exam metadata: name, color, icon, path
├── site.ts                   # URLs, social links, app store links
└── api.ts                    # Endpoint constants
```

---

## Current → Proposed Directory Changes

| Current | Proposed | Action |
|---|---|---|
| `components/hero.tsx`, `features.tsx`… | `components/marketing/` | Move section components into subfolder |
| `features/auth/` (empty) | `features/auth/` (populated) | Implement |
| `features/hooks/` | `hooks/` (root level) | Move to root (shared hooks aren't auth-specific) |
| `types/` (empty) | `types/user.ts`, `quiz.ts`, `exam.ts` | Populate |
| `store/` (empty) | `store/auth.store.ts`, `ui.store.ts` | Populate |
