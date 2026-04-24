# Building a complex client-only React app (no backend)

This guide is for building a **non-trivial single-page app** with **React only**: no custom API server, no database you host. You still “persist” and structure data using the browser and static assets.

## What “no backend” actually means

| You skip | You use instead |
|----------|-----------------|
| Your own API server | **Static hosting** (Netlify, GitHub Pages, S3+CloudFront, Nx’s build output) |
| Server database | **Browser storage** (`localStorage`, `IndexedDB`), **in-memory** state, or **imported static JSON** shipped with the app |
| Real-time multi-user sync | **Single-user** workflows, or **export/import files** the user shares manually (JSON, zip) |
| Server-side auth | **Client-only** patterns: no accounts, or **“passphrase in browser”** (limited), or **static export** of encrypted blobs (advanced) |

For most “complex but solo” apps, you combine **rich UI + local persistence + file import/export** so users don’t lose work.

---

## App ideas that fit this model

1. **Productivity / PKM** – Outliner, notes, kanban, habit tracker, journal with tags and search (all in IndexedDB).
2. **Creators** – Image collage editor, simple music step sequencer, diagram tool (Excalidraw-style data as JSON in memory + save file).
3. **Data + visualization** – Upload CSV, clean/filter in the client, chart with Chart.js or D3; optional “Save project” as a `.json` file.
4. **Learning** – Flashcards, spaced repetition (SM-2) with stats in local storage.
5. **Small “fake backend”** – Admin-style UI that manages **static JSON** you edit in the repo, or a **mock API** in dev only (`msw`); production stays static.

Pick **one** core loop (e.g. “User edits a tree of items and the app persists to disk”) and grow features around it.

---

## Suggested stack (stays “React only”)

- **Build**: Vite (you already have Nx + Vite projects).
- **Routing**: `react-router-dom` for multiple screens and URLs.
- **State**:
  - **Server/cache shape**: TanStack Query is optional with **no server** if you use it for IndexedDB/file adapters, but for many apps **Zustand** or **React Context + useReducer** is enough.
  - **Large structured data**: **IndexedDB** (via `idb` or **Dexie.js**) for notes, tasks, or blobs; **`localStorage`** only for small prefs (theme, last route).
- **Persistence strategy** (pick early):
  - **A** – All state in memory; “Save” downloads a file; “Open” loads JSON (portable, backup-friendly).
  - **B** – Auto-save to IndexedDB; optional export/import.
  - **C** – Seed from static `data/*.json` in the repo, user edits in memory + IndexedDB.
- **UI complexity**: co-locate features (`src/features/notes/`), use composition; add **Storybook** in a UI library package for primitives (you already have `@org/ui` patterns).

---

## Step-by-step implementation plan

Work **vertically** (one screen end-to-end) before spreading wide. Each phase should leave you with something you can run and click through.

### Phase 0 – Scope and constraints (half day)

- [ ] Write a **one-paragraph** product goal and list **3 must-have** user stories.
- [ ] Decide **persistence**: (A) file only, (B) IndexedDB + export, or (C) static seed + local edits.
- [ ] List **non-goals** (e.g. “no accounts”, “no collaboration”).

### Phase 1 – Shell of the app (1–2 days)

- [ ] **Routes** – `react-router-dom`: a home route, 1–2 feature routes, optional `*` 404.
- [ ] **Layout** – `Outlet` for shared chrome (nav, main); responsive shell (CSS modules or a small token set).
- [ ] **Global preferences** – theme or density in `localStorage` (optional but teaches persistence early).

**Exit:** Navigate between pages; no feature logic yet.

### Phase 2 – First real feature slice (2–4 days)

- [ ] **Domain types** – TypeScript interfaces for your core entity (e.g. `Node`, `Document`, `Task`).
- [ ] **In-memory state** – `useReducer` or Zustand store with **actions** (add/update/delete) and **selectors** if needed.
- [ ] **UI** – One screen: list + detail, or tree + panel (your `Tree` experiment can evolve here with typed data).

**Exit:** Full CRUD in memory; refresh loses data (OK for now).

### Phase 3 – Persistence (2–4 days)

- [ ] If using **IndexedDB**: one module `storage/db.ts` (open DB, version migrations, get/put for entities).
- [ ] On startup: **hydrate** store from DB; on change: **debounced persist** (e.g. 300–500 ms) so typing stays smooth.
- [ ] If using **file export/import**: `JSON.stringify` / `FileReader` + `download` link for backup; schema version in JSON for future migrations.

**Exit:** Refresh keeps data; optional file backup works.

### Phase 4 – Power features (ongoing, vertical slices)

Implement in order of user value, one slice at a time:

- [ ] **Search / filter** – client-side; index with simple string match or add **MiniSearch** / **Fuse.js** for fuzzy search on medium-sized lists.
- [ ] **Undo** – per-field or action stack (command pattern) for critical editors.
- [ ] **Import** – CSV/JSON with validation (Zod) before merging into store.
- [ ] **Performance** – virtualize long lists (`@tanstack/react-virtual`); avoid re-rendering whole trees (split components, `memo` where measured).

**Exit:** App feels “complex” but still snappy in Chrome with realistic data size.

### Phase 5 – Quality and ship (1–2 weeks, parallel to Phase 4)

- [ ] **Error boundaries** – at route or feature level; friendly fallback UI.
- [ ] **A11y** – keyboard tree navigation, focus management in modals, labels on inputs.
- [ ] **Tests** – Vitest + Testing Library for reducers and critical components; E2E (Playwright) for main flows.
- [ ] **Build** – Nx `build` to static files; **host** on a static host; set **client-side** `basename` for router if not served from `/`.
- [ ] **Docs** – short `README` with “Data stays in your browser” and export/backup steps.

**Exit:** Deployable static site; you can demo the full story.

---

## Common pitfalls

1. **Everything in `localStorage`** – breaks on size limits (~5 MB); use IndexedDB for real apps.
2. **No schema versioning** – add `version: 1` in persisted JSON/DB and migration steps when you change shapes.
3. **Giant context** – split stores by feature; avoid one mega-context without selectors.
4. **Assuming a server** – OAuth and “cloud sync” need a backend; don’t plan them in a client-only v1.

---

## How this monorepo can help

- **`ui` library + Storybook** – build buttons, inputs, and future primitives in isolation, then import into the app.
- **`component-library` (Vite app)** – use for the full SPA routes and features, or add another app under Nx for a second product.
- **Nx** – `nx run component-library:build` for production bundle; `nx graph` to keep dependencies clear.

---

## Next action for you

1. Choose **one** app idea from the list (or your own) and write the **3 user stories** + persistence choice.
2. Complete **Phase 1** in your existing Vite app (routes + layout).
3. Revisit this doc for **Phase 2** and check off items as you go.

If you name the app idea and target host (e.g. GitHub Pages with `/repo-name/`), a follow-up can spell out **exact** router `basename` and Nx `base` in `index.html` for that setup.
