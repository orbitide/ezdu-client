# EZDU Client — Web Demo Migration Plan

## Context

We're migrating the EZDU mobile app (Flutter, `D:\Orbitide\archive\ezdu\ezdu-mobile`) — a gamified exam-prep platform for SSC/HSC/BCS/IELTS/Vocabulary students — to a Next.js web client (`D:\Orbitide\ezdu-client`). This first pass builds **all 18 feature areas with demo/dummy data only** (no API integration) so the look, feel, and navigation can be reviewed before wiring up the backend.

In addition to the mobile app's existing **Practice** experience (gamified quizzes, model/mock tests, leaderboard, etc.), we're adding a brand-new **Learn** segment — a Coursera-style structured learning experience for SSC/HSC/university-admission/job-prep students in Bangladesh. Learn centers on subject → course → chapter → lesson content (video, text/notes, interactive explainers), plus a full supporting ecosystem: resource library, notes & highlights, doubt-solving Q&A, live classes, assignments, and per-course revision flashcard decks. Learn uses lighter gamification (progress/completion tracking, modest XP) vs. Practice's bright gamified vibe, and its dashboard is planning/weakness-oriented (today's study plan, weak topics, what to do next) rather than stats-heavy. Where relevant, Learn syncs with Practice — e.g. a course chapter links out to matching Practice quizzes/mock tests, and Practice mistakes/weak areas surface as recommended Learn content. Users switch between Practice and Learn via a mode switcher in the shared shell, which keeps the same header (coins, streak, profile) across both.

The visual theme is reused from `D:\better-ielts\better-ielts-client` (same stack: Next.js 16, React 19, Tailwind 4, shadcn/ui "base-nova" style, emerald/teal OKLCH color tokens, Geist fonts) — colors stay the same, but typography will be more polished and slightly larger for a friendlier, gamified feel.

Once this demo is approved, a follow-up phase wires it to real APIs (mirroring the 22 datasources/repositories already defined in the mobile app: auth, questions, quizzes, lessons, subjects, model-tests, archive, vocabulary, leaderboard, bookmarks, progress, notifications, feed, shop, payments, quests, recommendations, current-affairs, ads-rewards, word-languages, user-config).

---

## Reference Theme (from better-ielts-client)

- `app/globals.css`: OKLCH tokens, primary = emerald (`oklch(0.572 0.063 149.8)` ≈ `#008d61`), brand gradient `#00d492 → #008d61`, `.dark` class variant, radius tokens derived from `--radius: 0.625rem`
- `components.json`: style `base-nova`, baseColor `neutral`, cssVariables true, iconLibrary `lucide`, aliases `@/components`, `@/components/ui`, `@/lib`, `@/hooks`
- Fonts: Geist Sans + Geist Mono via `next/font/google` — for EZDU, bump base font-size (~17px root) and heading weights/tracking for a more "polished, larger" feel; add gamification tokens (`--color-coin`, `--color-xp`, `--color-streak`, 9-tier rank palette)
- Route groups: `(practice)` and `(learn)` authenticated shells (shared AppShell/AppHeader/AuthGate, mode-specific sidebars), `(marketing)` public shell

---

## Folder/Route Structure (`app/`)

```
app/
├── layout.tsx                     # root layout: fonts, ThemeProvider
├── globals.css
├── page.tsx                       # landing -> redirect to /home if authed
│
├── (marketing)/                   # public shell
│   ├── layout.tsx
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── verify-otp/page.tsx
│   ├── verify-email/page.tsx
│   ├── forgot-password/page.tsx
│   ├── reset-password/page.tsx
│   ├── welcome/page.tsx
│   ├── privacy/page.tsx
│   └── terms/page.tsx
│
├── onboarding/
│   ├── layout.tsx                 # stepper shell
│   ├── page.tsx                   # exam-group/class selection (SSC/HSC/BCS/IELTS/Vocab)
│   ├── subjects/page.tsx          # subject preferences
│   └── avatar/page.tsx            # initial avatar setup -> /home
│
├── (practice)/                     # authenticated shell - Practice mode (AppShell)
│   ├── layout.tsx                  # AuthGate + AppShell (mode="practice")
│   ├── home/page.tsx                # Dashboard
│   │
│   ├── practice/
│   │   ├── layout.tsx               # Model/Mock/Quick Challenge tabs
│   │   ├── page.tsx                 # -> redirect to model-tests
│   │   ├── model-tests/page.tsx
│   │   ├── mock-tests/page.tsx
│   │   ├── mock-tests/[subjectId]/page.tsx
│   │   ├── quick-challenge/page.tsx
│   │   └── presets/page.tsx         # preset quiz sets
│   │
│   ├── quiz/[id]/
│   │   ├── layout.tsx               # minimal fullscreen shell (no sidebar)
│   │   ├── page.tsx                 # quiz engine runner (?type=model|mock|quick|archive|preset)
│   │   └── results/page.tsx         # congratulations/score screen
│   │
│   ├── progress/
│   │   ├── page.tsx                  # overview: XP, streak, accuracy, rank
│   │   ├── mastery/page.tsx
│   │   ├── mastery/[subjectId]/page.tsx
│   │   ├── mistakes/page.tsx         # preset mistakes review
│   │   └── history/
│   │       ├── page.tsx
│   │       └── [attemptId]/page.tsx
│   │
│   ├── vocabulary/
│   │   ├── page.tsx                  # hub: difficulty levels + 5 modes
│   │   ├── [difficulty]/page.tsx     # mode selector
│   │   ├── [difficulty]/flashcards/page.tsx
│   │   ├── [difficulty]/word-match/page.tsx
│   │   ├── [difficulty]/fill-gaps/page.tsx
│   │   ├── [difficulty]/synonym-antonym/page.tsx
│   │   └── bank/page.tsx             # searchable word bank + bookmarks
│   │
│   ├── leaderboard/page.tsx
│   │
│   ├── profile/
│   │   ├── page.tsx                  # own profile
│   │   ├── achievements/page.tsx
│   │   ├── friends/page.tsx
│   │   └── [username]/page.tsx       # public profile view
│   │
│   ├── avatar/page.tsx               # avatar builder (reused from onboarding)
│   │
│   ├── shop/
│   │   ├── page.tsx                  # coin bundles
│   │   └── premium/page.tsx          # pro plans
│   │
│   ├── settings/
│   │   ├── page.tsx
│   │   ├── profile/page.tsx
│   │   ├── password/page.tsx
│   │   ├── preferences/page.tsx
│   │   └── notifications/page.tsx
│   │
│   ├── archive/
│   │   ├── page.tsx
│   │   ├── [examId]/page.tsx
│   │   └── [examId]/review/page.tsx
│   │
│   ├── notifications/page.tsx
│   ├── feed/page.tsx
│   ├── study-plan/page.tsx
│   │
│   ├── current-affairs/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   │
│   └── more/page.tsx                 # mobile "More" hub
│
└── (learn)/                         # authenticated shell - Learn mode (AppShell)
    ├── layout.tsx                   # AuthGate + AppShell (mode="learn")
    │
    ├── learn/page.tsx                # Learn dashboard: today's study plan, weak topics / what to do next,
    │                                  # continue-learning card, upcoming live classes, recent notes/assignments
    │
    ├── learn/courses/
    │   ├── page.tsx                  # course catalog (filter by subject/exam group: SSC/HSC/Admission/BCS/Job-prep)
    │   └── [courseId]/
    │       ├── page.tsx              # course detail: chapter list, progress, "start/continue", linked resources/flashcards
    │       ├── flashcards/page.tsx    # revision flashcard deck for this course
    │       ├── discussion/page.tsx    # course-level discussion/community thread
    │       └── chapters/[chapterId]/
    │           ├── page.tsx          # chapter detail: lesson list, chapter assignment(s), linked Practice quiz CTA
    │           └── lessons/[lessonId]/
    │               ├── layout.tsx    # lesson shell (sidebar: chapter outline, content area, notes panel)
    │               └── page.tsx      # lesson viewer (video / text+notes / interactive explainer)
    │                                  #   + inline "ask a doubt" CTA -> /learn/qa/new
    │
    ├── learn/my-courses/page.tsx     # enrolled courses with progress
    │
    ├── learn/resources/
    │   ├── page.tsx                  # resource library: PDFs, cheat sheets, formula sheets, past-paper solutions
    │   └── [resourceId]/page.tsx     # resource viewer/detail
    │
    ├── learn/notes/
    │   ├── page.tsx                  # all notes & highlights, searchable, organized by subject/topic
    │   └── [noteId]/page.tsx         # note detail/editor
    │
    ├── learn/qa/
    │   ├── page.tsx                  # doubt-solving Q&A forum: browse/search questions
    │   ├── new/page.tsx              # ask a new question (optionally pre-filled from a lesson)
    │   └── [questionId]/page.tsx     # question detail thread with answers
    │
    ├── learn/live-classes/
    │   ├── page.tsx                  # calendar/list of upcoming + recorded live classes
    │   └── [classId]/page.tsx        # live class detail (join/replay, materials)
    │
    ├── learn/assignments/
    │   ├── page.tsx                  # assignment list with due dates and submission status
    │   └── [assignmentId]/page.tsx   # assignment detail: instructions, submission, grade/feedback
    │
    └── learn/progress/page.tsx       # learning progress overview (per-subject completion, weak areas, streaks)
```

---

## `components/` Structure

```
components/
├── ui/              # shadcn primitives
├── layout/          # AppShell, AppSidebar, AppHeader, BottomNav, MobileNav, AuthGate,
│                     ThemeProvider/ThemeToggle, LanguageToggle, MarketingShell, ProfileMenu, BrandMark
├── shared/           # PageHeader, EmptyState, LoadingSkeleton, CountdownTimer, CoinBalance,
│                     XpBadge, StreakBadge, RankBadge, DifficultyBadge, ProgressRing,
│                     BookmarkButton, ConfettiOverlay, LatexRenderer
├── auth/             # LoginForm, RegisterForm, OtpForm, ForgotPasswordForm, ResetPasswordForm, AuthDivider
├── onboarding/       # OnboardingFlow, ExamGroupSelector, SubjectPreferenceSelector
├── avatar/           # AvatarBuilder, AvatarPreview, AvatarCategoryTabs, AvatarOptionGrid, AvatarSummary
├── home/             # ProfileSummaryCard, DailyRevisionCard, UpcomingModelTestsCard, TodaysPlanCard,
│                     HomeGrid, MiniLeaderboardCard, RecommendedQuizzesSection, OfflineProfileWarningBanner
├── quiz/             # QuizEngine, QuestionCounter, QuizTimer, QuestionStem, McqOptionList,
│                     QuizNavBar, QuestionIndicatorBar, BookmarkFlagControls, QuizResultsScreen
├── practice/         # PracticeTabs, ModelTestList/Card, MockSubjectGrid, LessonTopicPicker,
│                     QuickChallengeLauncher, StreakTracker
├── progress/         # OverviewStatsGrid, MasterySubjectList, MasteryLessonBreakdown, HistoryList,
│                     QuizAttemptDetail, ActivityBarChart
├── vocabulary/       # VocabHub, FlashcardDeck, WordMatchGame, FillGapsGame, SynonymAntonymGame,
│                     VocabBank, VocabWordCard
├── leaderboard/      # LeaderboardList, LeaderboardRow, RankTierLegend
├── profile/          # ProfileHeader, ProfileStatsGrid, WeeklyActivityChart, AchievementsSection,
│                     AchievementCard, FriendsList, PublicProfileView
├── shop/             # CoinBundleCard/Grid, PremiumPlanCard
├── settings/         # SettingsNav, ProfileEditForm, ChangePasswordForm, PreferencesForm,
│                     NotificationToggles, LanguageSelector, SocialLinksSection
├── archive/          # ArchiveExamList, ArchiveQuizStart, PreviousQuestionBrowser, ArchiveReviewScoreBreakdown
├── notifications/    # NotificationList, NotificationItem
├── feed/             # FeedList, AnnouncementCard, FriendActivityCard
├── study-plan/       # TodaysPlanList, SubjectRotationCard
├── current-affairs/  # NewsList, NewsArticleCard
├── charts/           # recharts wrappers (ActivityBarChart, MasteryRadar, XpLineChart)
│
└── learn/            # LearnDashboard (StudyPlanCard, WeakTopicsCard, ContinueLearningCard,
                      #   UpcomingLiveClassCard, RecentNotesCard, AssignmentsDueCard),
                      # SubjectGrid, CourseCatalog, CourseCard, CourseDetail, ChapterList,
                      # LessonOutlineSidebar, LessonViewer (video/text/interactive variants),
                      # VideoPlayer, InteractiveExplainer, LessonProgressBar, LessonNotesPanel,
                      # AskDoubtButton, MyCoursesList, LearnProgressOverview,
                      # ResourceLibraryGrid, ResourceCard, ResourceViewer,
                      # NotesList, NoteEditor, HighlightMarker,
                      # QaForumList, QaQuestionCard, QaQuestionThread, QaAskForm,
                      # LiveClassCalendar, LiveClassCard, LiveClassPlayer,
                      # AssignmentList, AssignmentCard, AssignmentSubmissionForm,
                      # FlashcardDeck (course revision - shares base with vocabulary FlashcardDeck),
                      # PracticeLinkCallout (cross-link CTA into Practice quizzes from a chapter)
```

---

## `lib/` Structure

```
lib/
├── utils.ts                 # cn() helper (from better-ielts)
├── utils/
│   ├── format.ts             # number/date/XP formatting
│   ├── rank.ts               # XP -> rank tier mapping (9 tiers: Novice..Mythic)
│   └── quiz.ts               # scoring/time helpers
│
├── types/                    # one file per domain + index.ts barrel
│   user.ts, avatar.ts, onboarding.ts, subject.ts, question.ts, quiz.ts,
│   model-test.ts, vocabulary.ts, leaderboard.ts, achievement.ts, shop.ts,
│   notification.ts, feed.ts, study-plan.ts, current-affairs.ts, archive.ts, progress.ts,
│   course.ts (Course, Chapter, Lesson, LessonContentType, FlashcardDeck),
│   learning-progress.ts (WeakTopic, LearningPlanItem),
│   resource.ts (Resource, ResourceType), note.ts (Note, Highlight),
│   qa.ts (Question, Answer), live-class.ts (LiveClass), assignment.ts (Assignment, Submission)
│
├── mock/                     # demo data, one file per domain (mirrors types/)
│   users.ts, avatars.ts, subjects.ts, questions.ts, model-tests.ts, mock-tests.ts,
│   quick-challenge.ts, quiz-attempts.ts, vocabulary.ts, leaderboard.ts, achievements.ts,
│   shop.ts, notifications.ts, feed.ts, study-plan.ts, current-affairs.ts, archive.ts, progress.ts,
│   courses.ts, lessons.ts, learning-progress.ts, resources.ts, notes.ts, qa.ts,
│   live-classes.ts, assignments.ts
│
├── store/                    # zustand, persisted where noted
│   index.ts, auth-store.ts (persisted), onboarding-store.ts (persisted),
│   avatar-store.ts (persisted), ui-store.ts (theme/language/sidebar/app-mode),
│   quiz-store.ts (active session), progress-store.ts (demo XP/coins/streak mutation),
│   learning-store.ts (enrolled courses, lesson completion, notes, highlights,
│                       flashcard review state, assignment submissions - persisted)
│
└── hooks/
    use-timer.ts, use-media-query.ts, use-confetti.ts
```

No `lib/api/` — intentionally omitted until API integration phase.

---

## Theme Setup

1. Copy `app/globals.css`, `components.json`, `lib/utils.ts` from `D:\better-ielts\better-ielts-client` as base.
2. Keep emerald/teal primary + brand gradient (`#00d492 → #008d61`) — matches EZDU's existing teal/cyan brand.
3. Typography: Geist Sans/Mono, but bump base size (~17px root) and heading weights/tracking for a more polished, larger feel.
4. Add gamification tokens: `--color-coin`, `--color-xp`, `--color-streak`, plus a 9-color rank-tier palette (Novice → Mythic).
5. Dark mode via `.dark` class + `ThemeProvider`/`ThemeToggle` (next-themes), copied from better-ielts.

## shadcn/ui Components to Install

Core: `button`, `card`, `badge`, `avatar`, `input`, `password-input`, `textarea`, `select`, `switch`, `tabs`, `progress`, `dialog`, `sheet`, `dropdown-menu`, `separator`, `scroll-area`, `skeleton`, `tooltip`

Additional: `accordion`, `alert`, `alert-dialog`, `checkbox`, `radio-group`, `popover`, `command`, `sonner` (toasts), `hover-card`, `table`, `breadcrumb`, `label`, `form`

Plus: `recharts` for activity/mastery charts, `react-katex` (or similar) for math/LaTeX question rendering, a confetti lib for results celebration, a video player (`video.js`/`react-player` or native `<video>` for demo) for Learn lessons.

---

## Navigation

### Mode Switcher
A switcher in `AppHeader` (or top of `AppSidebar`) toggles between **Practice** and **Learn** — persisted in `ui-store.appMode`. Both modes share the same `AppShell`, `AppHeader` (coins, streak, profile, notifications), `AuthGate`, and `BottomNav` shell chrome, but render different sidebar nav items and landing routes.

### Practice mode
**Desktop sidebar**: Home, Practice, Progress, Vocabulary, Leaderboard — divider — Profile, Avatar, Achievements, Archive, Study Plan, Current Affairs, Feed, Notifications — divider — Shop, Settings. Bottom card shows rank tier + XP progress.

**Mobile bottom nav** (5 tabs, mirrors mobile app): Home, Progress, Practice, Vocabulary, More (→ `/more` hub surfacing everything else: Leaderboard, Profile, Avatar, Achievements, Archive, Study Plan, Current Affairs, Feed, Notifications, Shop, Settings, Logout).

### Learn mode
**Desktop sidebar**: Dashboard, Courses (catalog), My Courses — divider — Resources, Notes, Q&A, Live Classes, Assignments — divider — Progress, shared items (Profile, Settings) reused from Practice sidebar config. "More" overflow groups Q&A/Live Classes/Assignments on smaller breakpoints if needed.

**Mobile bottom nav**: Dashboard, Courses, My Courses, Resources, More (→ Notes, Q&A, Live Classes, Assignments, Progress, Profile, Settings, Logout).

**AuthGate**: zustand `auth-store` + `onboarding-store` guard — unauthenticated → `/login`, authenticated-but-not-onboarded → `/onboarding`. Onboarding can offer an initial Practice/Learn preference, defaulting `ui-store.appMode`.

**Quiz routes** (`/quiz/[id]`) and **Lesson routes** (`/learn/courses/.../lessons/[lessonId]`): minimal fullscreen-focused layouts, no sidebar/bottom-nav (lesson layout instead shows a chapter-outline sidebar + content + tutor panel).

---

## Build Order

1. **Foundation** — install deps (zustand, lucide-react, recharts, next-themes, class-variance-authority, shadcn CLI), copy theme files, install shadcn components, scaffold `lib/types`, `lib/store`, `lib/mock` skeletons.
2. **Shell & Navigation** — AppShell, AppSidebar (mode-aware: practice/learn nav configs), AppHeader (incl. mode switcher), BottomNav, MobileNav, ThemeProvider/Toggle, AuthGate, MarketingShell, plus shared primitives (CoinBalance, XpBadge, StreakBadge, RankBadge, DifficultyBadge, ProgressRing, PageHeader, EmptyState, LoadingSkeleton). Validate with placeholder `/home` and `/learn`.
3. **Auth & Onboarding** — login/register/OTP/forgot/reset/welcome pages + onboarding flow (exam-group, subjects, avatar) → sets onboarding complete.
4. **Avatar Builder** — full builder with category tabs, live preview, AvatarSummary (reused everywhere).
5. **Home/Dashboard** — assemble all home cards and grid.
6. **Quiz Engine** (core, reused everywhere) — QuizEngine, timer, question stem + LaTeX, MCQ options, nav bar, indicator bar, results/congrats screen with confetti.
7. **Practice Modes** — Model/Mock/Quick Challenge tabs, subject/lesson pickers, presets, all linking into `/quiz/[id]`.
8. **Progress & History** — overview stats, mastery breakdown, history list, attempt detail, activity chart.
9. **Vocabulary** — hub, flashcards, word match, fill gaps, synonym/antonym, vocab bank.
10. **Leaderboard & Profile** — rank tiers, leaderboard list, profile header/stats/chart/achievements/friends, public profile.
11. **Shop & Settings** — coin bundles, premium plans, settings subsections.
12. **Remaining Practice areas** — Archive, Notifications, Feed, Study Plan, Current Affairs, `/more` hub.
13. **Learn module — courses & lessons (core)** — `lib/types/course.ts`, `lib/mock/courses.ts` + `lessons.ts` (subject → course → chapter → lesson hierarchy for SSC/HSC/Admission/BCS/Job-prep tracks; mixed content types: video/text/interactive), `learning-store`. Build `SubjectGrid`, `CourseCatalog`/`CourseCard`, `CourseDetail`/`ChapterList`, `LessonOutlineSidebar`, `LessonViewer` variants (`VideoPlayer`, text+notes layout, `InteractiveExplainer` — e.g. step-through worked examples, click-to-reveal explanations, embedded mini-checks), `LessonProgressBar`, `LessonNotesPanel`, `MyCoursesList`. Wire up the Learn sidebar/bottom-nav config + mode switcher.
14. **Learn module — dashboard & planning** — `lib/types/learning-progress.ts`, `lib/mock/learning-progress.ts`. Build `LearnDashboard` (StudyPlanCard, WeakTopicsCard, ContinueLearningCard, AssignmentsDueCard, UpcomingLiveClassCard, RecentNotesCard) and `LearnProgressOverview` (per-subject completion, weak-area breakdown). Wire weak-area data so it can later cross-link from Practice mistakes.
15. **Learn module — supporting features** — Resource library (`resources.ts` types/mock, `ResourceLibraryGrid`/`ResourceCard`/`ResourceViewer`), Notes & highlights (`notes.ts`, `NotesList`/`NoteEditor`/`HighlightMarker`), Doubt-solving Q&A (`qa.ts`, `QaForumList`/`QaQuestionCard`/`QaQuestionThread`/`QaAskForm`, with `AskDoubtButton` deep-linking from lesson pages), Live classes (`live-classes.ts`, `LiveClassCalendar`/`LiveClassCard`/`LiveClassPlayer`), Assignments (`assignments.ts`, `AssignmentList`/`AssignmentCard`/`AssignmentSubmissionForm`), per-course revision flashcard decks (`FlashcardDeck` reusing the Vocabulary flashcard base), course-level discussion threads, and `PracticeLinkCallout` cross-links from chapters into matching Practice quizzes/mock tests.
16. **Polish** — EN/Bengali toggle (string dictionary, UI-only), responsive QA (mobile/tablet/desktop) across both modes, dark mode QA, empty/loading states, toast notifications for XP/coin gains and lesson-completion XP.

---

## Verification

- `npm run dev` and walk through each route on desktop and mobile viewport widths, in both Practice and Learn modes.
- Confirm sidebar nav (desktop) and bottom nav (mobile) both navigate correctly and highlight active routes, and the mode switcher correctly swaps sidebar/bottom-nav configs while keeping the header shell.
- Run a full quiz flow end-to-end with mock questions through to the results/congratulations screen with confetti and XP/coin updates.
- Run a full Learn flow: course catalog → course detail → chapter → lesson (video, text, and interactive variants) → mark complete → progress reflected in `/learn/progress` and `/learn/my-courses`.
- Spot-check Learn's supporting features: browse resource library and open a resource, add/edit a note with a highlight, ask a question in the Q&A forum and view a thread, view live classes calendar and a class detail, open an assignment and submit, review a course's revision flashcard deck, and follow a `PracticeLinkCallout` from a chapter into a Practice quiz.
- Confirm `/learn` dashboard surfaces a study plan / weak-topics / next-steps view (not just stats).
- Toggle dark mode and language switch across a sample of pages in both modes.
- `npm run lint` / `npm run build` to confirm no type errors across all new routes.
