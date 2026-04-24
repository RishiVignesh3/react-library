# React app with WebGL / Three.js (3D models, no dedicated graphics backend)

This document outlines a **third application style**: a **static React client** that renders **3D models in the browser** using **WebGL** via **Three.js**. You do **not** need a custom “3D server”—the GPU work happens **on the user’s machine**. You only need static hosting (or CDN) for your JS bundle and model assets.

---

## What runs where

| Piece | Where it runs | Notes |
|-------|----------------|--------|
| Three.js / WebGL | User’s **GPU** (browser) | WebGL 1/2 context from `<canvas>` |
| Model files (`.glb`, `.gltf`) | **Same origin** or **CDN** | Fetched as static assets; optional Draco compression |
| Your **React** UI | Main thread + React tree | Keep heavy work off the main thread when possible (see performance) |
| Optional **backend** | Not required for viewing | Only if you add auth, user uploads to storage, or dynamic APIs |

**Standard format for web 3D:** **glTF 2.0** (`.gltf` JSON + buffers, or **`.glb`** binary). Three.js has first-class support through `GLTFLoader`. Treat **FBX/OBJ** as authoring formats—**export to glTF** for shipping when you can.

---

## Suggested stack

| Layer | Recommendation | Why |
|-------|----------------|-----|
| Bundler | **Vite** (Nx app you already have) | Fast HMR; good for large assets with `?url` imports |
| 3D engine | **Three.js** (r160+ or current stable) | De facto standard; huge ecosystem |
| React integration | **@react-three/fiber (R3F)** + **@react-three/drei** | Declarative scenes (`<mesh>`, `<Canvas>`), helpers (OrbitControls, environments, `useGLTF`) |
| Alternative | **Vanilla Three.js** in `useEffect` | Full control; more boilerplate; fine for one-off viewers |

**Default recommendation:** Start with **R3F + drei** unless you have a strong reason to manage the renderer and loop by hand.

---

## Asset pipeline (no custom server)

1. **Place models** under `public/models/` (served as-is) **or** import from `src/assets` with Vite (hashed filenames in production).
2. **Prefer `.glb`** for a single file; use **Draco** or **meshopt** compression to reduce size (Three.js loaders support these).
3. **Textures** — embed in glTF or use relative paths; watch **color space** (`SRGBColorSpace` for PBR albedo).
4. **Scale** — large scenes: **Level of detail (LOD)** or split by **room/object** and load on demand.

---

## Security and UX

- **User-uploaded models** — parse in a **worker** when possible; never `eval` file contents; validate file type; cap size to protect memory.
- **WebGL context loss** — mobile devices may lose the context; listen for `webglcontextlost` / `restored` and rebuild the scene or show a soft error.
- **Motion** — respect **`prefers-reduced-motion`** for auto-rotating cameras or intense animations.

---

## Step-by-step implementation plan

Use this as a parallel product line to [complex-react-app-client-only.md](./complex-react-app-client-only.md) and [react-spa-oidc-pkce.md](./react-spa-oidc-pkce.md). Adjust effort to your model count and quality bar.

### Phase 0 – Goals and constraints

- [ ] Define **target devices** (desktop only vs mobile WebGL).
- [ ] Pick **model source** (your own glTF vs stock assets).
- [ ] Set **max poly / texture** budget if you ship to low-end phones.

**Exit:** Written one-paragraph goal and device scope.

### Phase 1 – Dependencies and an empty canvas

- [ ] In your Nx Vite app (e.g. `component-library` or a new `nx g` app), add:
  - `three`
  - `@react-three/fiber`
  - `@react-three/drei`
- [ ] Add a route or page with **one** `<Canvas>` from R3F filling a container (fixed height or `100dvh`).
- [ ] Verify WebGL works: solid color background or a `mesh` + `boxGeometry` + `meshStandardMaterial`.

**Exit:** Gray/blank 3D space with a simple cube or grid.

### Phase 2 – Load a glTF / glb model

- [ ] Put a sample **`.glb`** in `public/models/` (e.g. `public/models/sample.glb`).
- [ ] Use **`useGLTF`** (drei) or `GLTFLoader` with **Suspense** and a loading fallback (spinner / placeholder).
- [ ] Center the model: **`<Center>`** from drei, or compute bounding box with `Box3` and reposition.
- [ ] Add **`OrbitControls`** (drei) so the user can rotate/zoom.

**Exit:** Your model visible, interactive orbit, loading state.

### Phase 3 – Lighting and environment (PBR looks “right”)

- [ ] Add **`Environment`** (drei) for image-based lighting, or place **directional + ambient** lights and tune intensity.
- [ ] Set **`shadows`** on `Canvas` if you use cast/receive shadows (costs performance).
- [ ] Confirm **tone mapping** and **output color space** match Three.js defaults for r152+ (`ACESFilmic`, `SRGB`).

**Exit:** Materials look plausible; no flat black unless intended.

### Phase 4 – Performance and polish

- [ ] **Resize** — R3F usually handles `resize` via `Canvas`; ensure parent has defined size (CSS).
- [ ] **Pixel ratio** — cap `dpr={[1, 2]}` on `Canvas` to save GPU on high-DPI phones.
- [ ] **Lazy load** — `React.lazy` for the route that mounts the heavy scene; optional `useProgress` (drei) for a global loading bar.
- [ ] **Large files** — enable **Draco** loader in `useGLTF` options; consider splitting scenes.
- [ ] **Cleanup** — R3F disposes on unmount; avoid creating new `THREE.Texture` every frame in `useFrame` without disposing.

**Exit:** Smooth on target hardware; no obvious memory leak when navigating away.

### Phase 5 – Optional features

- [ ] **Annotations** — HTML overlays with `@react-three/drei` (`Html`) or project 3D → screen for tooltips.
- [ ] **Animation** — `useAnimations` from drei if glTF contains clips.
- [ ] **Export screenshot** — `renderer.domElement.toDataURL()` (user gesture for some browsers).
- [ ] **XR (VR/AR)** — `@react-three/xr` when you need device support; extra testing effort.

**Exit:** Feature set matches your product story.

---

## Nx / monorepo notes

- Keep **reusable 3D atoms** (lighting presets, error boundary for WebGL) in a **library** if multiple apps need them; heavy `three` imports are tree-shaken best when imported consistently.
- **Storybook** can host **isolated** `Canvas` stories in your `ui` or a `storybook-3d` lib; use small fixtures so CI stays fast.
- For **Cypress/Playwright**, 3D is hard to assert visually—prefer **smoke** tests (canvas exists, no WebGL error overlay) and manual QA for look.

---

## Common pitfalls

| Pitfall | Mitigation |
|---------|------------|
| Black / invisible mesh | Check normals, material `side`, and lights; use `MeshBasicMaterial` to debug. |
| Huge bundle | Lazy-load the route; load Draco from CDN; compress glTF. |
| Jank on mobile | Lower DPR, simpler materials, fewer lights, smaller textures. |
| Stealing all CPU | Don’t run physics or heavy JSON parse on the main thread without workers. |
| CORS for external URLs | glTF on another domain must send proper CORS headers. |

---

## References

- [Three.js Manual](https://threejs.org/manual/) – fundamentals and guides.
- [glTF 2.0](https://www.khronos.org/gltf/) – spec and sample models.
- [React Three Fiber](https://r3f.docs.pmnd.rs/) – React renderer for Three.js.
- [Drei](https://github.com/pmndrs/drei) – helpers (controls, `useGLTF`, environment).

---

## Next step

1. Add **R3F + drei** to a Vite app and complete **Phases 1–2** with a single `.glb`.  
2. Add **OrbitControls** + **Environment** (Phase 3) before fine-tuning art direction.

If you want this doc to name a **concrete** Nx project in this repo and exact `pnpm` package versions, say which app (`component-library` vs new) to target.
