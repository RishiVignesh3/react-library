# Implementing Module Federation in this workspace

This document describes how to add **Module Federation** (runtime loading of separately built JavaScript bundles) to the Nx monorepo, with attention to how **`pkm-folio`** is built today (**Vite**, React 19, dev server on port **4204**).

## When Module Federation helps

Use it when you want **independent deployable units** (e.g. a shell app plus feature apps), **separate teams or release cadences**, or **gradual migration** of a large UI into smaller bundles. If everything ships as one static SPA and you do not need runtime composition, a normal Nx library graph is simpler.

## Core concepts

| Term | Meaning |
|------|---------|
| **Host** | The application that loads remote code at runtime (consumes `remoteEntry.js`). |
| **Remote** | A build that **exposes** modules and publishes `remoteEntry.js` at a known URL. |
| **Exposes** | Named entry points the remote offers (e.g. `./Routes`, `./Widget`). |
| **Remotes** (host config) | Map of remote names to URLs (or dynamic discovery) pointing at each remote’s assets. |
| **Shared** | Dependencies deduplicated across host and remotes (critical: **`react` / `react-dom`** as **singletons**). |

Federation behavior is defined by the **bundler plugin** (Webpack, Rspack, or Vite) plus a small runtime that loads chunks.

---

## Choose a path (important for this repo)

### Path A — Nx-first (Webpack or Rspack host/remotes)

**Nx’s built-in generators and executors** for React Module Federation target **Webpack or Rspack**, not the current `@nx/vite` setup used by `pkm-folio`.

**Fit this path if** you are willing to:

- Add a **new** host (and remotes) with the React + Webpack/Rspack stack Nx expects, **or**
- **Recreate or migrate** an app from Vite to Webpack/Rspack specifically for federation.

**High-level steps:**

1. **Discover generators and flags** (do not guess options):

   ```bash
   pnpm exec nx g @nx/react:host --help
   pnpm exec nx g @nx/react:remote --help
   ```

2. **Install tooling if prompted** — Nx docs reference `@nx/module-federation` and the React host/remote generators; align package versions with your Nx release (**22.x** in this workspace).

3. **Generate a host** — e.g. shell app that will declare `remotes` and load them at runtime.

4. **Generate one or more remotes** — each exposes modules (routes, components) consumed by the host.

5. **Review generated files** — typically includes `module-federation.config.ts` (or `.js`), webpack/rspack config wired through `withModuleFederation`, and updated `project.json` targets.

6. **Local development** — Nx wires **serve** targets so the host and remotes can run together with correct URLs. Use the generated **serve** / **dev** targets via Nx (e.g. `pnpm nx run-many -t serve -p host,remote1` — exact project names depend on what you generate).

7. **Production URLs** — remotes must be served from predictable base paths. For static deployment, each remote’s build output (including `remoteEntry.js`) must be available at the URL the host expects. Nx docs describe updating production config (e.g. remotes pointing at `https://your-cdn/app/remote/remoteEntry.js`).

8. **Implicit dependencies (optional but useful)** — so `nx build host` builds remotes in the right order and CI graphs stay clear, add `implicitDependencies` from the host project to each remote in `project.json` (see [Nx Module Federation docs](https://nx.dev/docs/technologies/module-federation/guides/overview)).

9. **Type safety** — Nx supports typed contracts between host and remotes; enable or configure per the same Module Federation section in the Nx docs after scaffolding.

**References:**

- [Nx: Module Federation (overview and guides)](https://nx.dev/docs/technologies/module-federation/guides/overview)
- Example repos: [nrwl/react-module-federation](https://github.com/nrwl/react-module-federation), [nrwl/ng-module-federation](https://github.com/nrwl/ng-module-federation) (Angular)

---

### Path B — Keep Vite (`pkm-folio` and future Vite apps)

**Fit this path if** you want federation **without** switching `pkm-folio` to Webpack/Rspack.

**High-level steps:**

1. **Pick a Vite federation integration** — the ecosystem moves quickly; common choice is the official **`@module-federation/vite`** package (align versions with [Module Federation documentation](https://module-federation.io/)).

2. **Add the plugin** to `pkm-folio/vite.config.mts` (or a dedicated config file):

   - **Host**: `name`, `remotes` (name → URL of `remoteEntry.js` in dev/prod), `shared` (with `singleton: true` for `react` / `react-dom` and compatible version ranges).
   - **Remote**: `name`, `filename` (e.g. `remoteEntry.js`), `exposes`, `shared` (matching the host).

3. **Expose concrete entry files** — e.g. `./Capture` → `./src/exposed/capture.tsx` that mounts or exports what the host should load.

4. **Consume in the host** — use `import('remoteName/exposedPath')` or the dynamic pattern your plugin documents; wrap in React `lazy` / `Suspense` where appropriate.

5. **Dev servers and CORS** — each remote runs on its own port; the host’s config must point at each remote’s dev URL. If the browser blocks requests, configure dev server **CORS** on remotes.

6. **Production** — build each app; deploy so `remoteEntry.js` and chunks are under stable URLs; update host `remotes` for production bases.

7. **Nx tasks** — keep using `pnpm nx build pkm-folio` (and a `build` per remote). For local multi-serve, use `run-many` on **serve** targets or a small orchestration script; ensure ports do not clash with existing apps (e.g. `pkce-spa`, `react-webgl`).

**Caveat:** You will **not** get Nx’s Webpack-specific Module Federation generators for this path; you maintain Vite plugin config yourself.

---

## Shared dependencies (both paths)

- Declare **`react` and `react-dom` as singletons** with a **single version** across host and remotes. Version skew is a frequent source of “Invalid hook call” and mysterious runtime errors.
- Align **`react-router-dom`** (if used in both) or isolate routing so only the host owns the router unless you have a deliberate nested pattern.
- For any large library (e.g. `three`, UI kit), decide **shared vs bundled** per remote to balance cache reuse vs isolation.

---

## Checklist before going to production

- [ ] Host and all remotes agree on **shared** package versions.
- [ ] **Remote URLs** are correct for each environment (dev/stage/prod).
- [ ] **Caching / CDN** — `remoteEntry.js` naming and cache headers (often: short cache or hashed names per build).
- [ ] **Fallback UX** if a remote fails to load (network, 404, version mismatch).
- [ ] **CI** — Nx can build host and remotes; with Nx Cloud, **distributed execution** helps when many remotes exist (see Nx Module Federation deployment notes).
- [ ] **E2E** — cover at least one federated navigation path in Playwright if remotes are required for critical flows.

---

## Mapping to current workspace

| Project | Bundler (current) | Federation path |
|---------|-------------------|-----------------|
| `pkm-folio` | Vite | Path B in place, or migrate to Path A |
| Other React apps | Varies per `project.json` / config | Match bundler to Path A or B |

If you standardize on **Path A** for a new shell, you can still keep `pkm-folio` as a standalone Vite app until you explicitly federate it or replace it with a host.

---

## Suggested order of work

1. Decide **Path A vs B** from deployment and team structure.
2. **Spike** one minimal remote + one host locally (one button or one route).
3. Lock **shared** dependency policy and **ports** / URLs.
4. Add **production** remote URLs and CI builds.
5. Add **error boundaries** and optional **type contracts** (Nx or `@module-federation/enhanced` / DTS tooling as needed).

This file is an implementation guide only; generator flags and package names should be verified with `nx g ... --help` and the linked Nx / Module Federation docs at implementation time.
