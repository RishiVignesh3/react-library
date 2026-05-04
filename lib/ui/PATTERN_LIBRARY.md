# UI pattern library (`@org/ui`)

Atomic design structure used across apps (e.g. `pkce-spa`). Import the package entry to load **design tokens** (`tokens.css`) and components.

## Layers

| Layer       | Role | Location |
|------------|------|----------|
| **Tokens** | Colors, typography, radii, spacing as CSS custom properties on `:root`. | `src/lib/tokens/tokens.css` |
| **Atoms**  | Single-purpose UI primitives (buttons, text, inputs). | `src/lib/atoms/*` |
| **Molecules** | Compositions of atoms for recurring patterns (card, section, shell). | `src/lib/molecules/*` |

## Conventions

- **Styling**: CSS Modules per component; use `var(--token-name)` from `tokens.css` instead of hard-coded hex values where possible.
- **Storybook**: Stories live next to components; titles follow `Atoms/…` or `Molecules/…` for sidebar grouping.
- **Exports**: Only the public API in `src/index.ts` is supported for consumers; avoid deep imports from app code.

## Adding a component

1. Place atoms under `atoms/<name>/` and molecules under `molecules/<name>/`.
2. Add `*.stories.tsx` with controls and at least one usage example.
3. Export from `src/index.ts`.
4. Prefer composing existing atoms before adding a new molecule.
