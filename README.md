# Our Mother of Perpetual Help — Devotional Web App

Bun + Vite + React 19 + TypeScript + Tailwind + shadcn/Radix + React Router.

## Running

```
bun install
bun run dev
```

(No new dependencies were added — everything used already exists in `package.json`.)

## What's implemented (V1, per our design conversation)

- **Home** — Header, Hero (time-aware greeting), Today Card (auto-featured
  session from the shared Schedule), Progress Card (resume-in-progress),
  Explore Devotions grid (all 8 sessions), Quote Card, Bottom Nav.
- **Session Player** (`/session/:sessionId`) — one component drives all 8
  devotions (Weekly Novena, St. Alphonsus Novena, St. Gerard Novena,
  Consecration Preparation, Feast Days & Events, Yearly Programs, Retreats,
  Prayer Collection). Session Intro → numbered stepper → nested Rosary
  sub-flow (Joyful Mysteries, dot stepper) → Completion screen with elapsed
  timer, Back to Home / Pray Again.
- **Notifications** (`/notifications`) — generated, not hand-written.
  Calendar-derived (from the shared Schedule) + action-triggered (e.g.
  finishing a session), filterable, grouped by Today / This Week / Earlier.
- **Calendar** (`/calendar`) — month grid rendering the same shared Schedule.
- **Hamburger menu** + **More** page — both read from one shared route list
  (`src/data/menu-items.ts`), so there's a single source of truth for
  navigation, not two.
- **Progress** — saved to `localStorage` on every "Continue" tap, not just
  at session end.

## Data model (`src/types`, `src/data`)

`Prayer` (written once, reused by id) → `Step` (prayer or nested) →
`NestedFlow` (Rosary-style sub-sequence) → `Session` (a full guide) →
`ScheduleEntry` (single source of truth for dates — drives both the Today
Card and Notifications) → `UserProgress` (local, per session).

## Known follow-ups / things to swap in

1. **Real artwork.** The hero icon and session icons currently use styled
   Lucide icons as placeholders (no image assets were provided as files —
   only screenshots). Drop your real Our Mother of Perpetual Help image at
   `public/images/moph-hero.jpg` and swap it in at `src/components/home/Hero.tsx`
   (the swap point is commented there).
2. **Full offline PWA (service worker).** The manifest is in place
   (`public/site.webmanifest`) but a service worker isn't wired up yet.
   If you want real offline caching, install `vite-plugin-pwa`:
   ```
   bun add -d vite-plugin-pwa
   ```
   and register it in `vite.config.ts`. Nothing else in the app needs to
   change for this.
3. **Push notifications.** Notifications are currently in-app only
   (generated + stored locally). Real device push notifications would need
   a service worker + the Notifications API/permission flow — a deliberate
   follow-up, not part of this V1 scope.
4. **Audio guide / Reflect (journal).** Explicitly excluded from V1 per your
   instruction — the data model doesn't block adding them later.
5. **Rosary mystery sets.** Only the Joyful Mysteries have real content
   (`src/data/nested-flows.ts`); Sorrowful/Glorious/Luminous are shown as
   labels on the mystery-selection screen but "Begin Rosary" currently
   always opens the Joyful set. Add more `NestedFlow` entries and route
   selection to expand this.
