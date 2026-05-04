# PKM Folio

**PKM Folio** is a client-only **personal knowledge management** and **productivity** app in this monorepo. Data stays in the browser (see `docs/complex-react-app-client-only.md` for the full plan).

## Nx project

- **Name:** `pkm-folio`
- **Serve:** `pnpm nx serve pkm-folio` (dev server: port **4204**)
- **Build:** `pnpm nx build pkm-folio`

## Phases (see `docs/complex-react-app-client-only.md`)

- **Phase 1** — Routes + layout shell.
- **Phase 2** — **Capture** screen: `CaptureItem` domain type, `useReducer` + `CaptureProvider`, list + detail CRUD.
- **Phase 3** — **IndexedDB** (`src/storage/capture-db.ts`), debounced save from `CaptureProvider`, **JSON v1** export/import (`src/lib/capture-backup.ts`).
- **Phase 4** (next) — Search, library content, quality (see `docs/complex-react-app-client-only.md`).

## Routes

| Route     | Screen                                      |
|----------|---------------------------------------------|
| `/`      | **Today** — dashboard (placeholder)        |
| `/capture` | **Capture** — inbox list + detail editor |
| `/library` | **Library** — knowledge base (placeholder) |

## Stack

- Vite, React, `react-router-dom`, `@org/ui` design system.

## Next steps

Follow phases in `docs/complex-react-app-client-only.md`: domain types, in-memory CRUD, then IndexedDB and export/import.
