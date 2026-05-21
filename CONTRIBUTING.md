# Contributing to jowaui

Thanks for your interest in contributing! jowaui is a zero-dependency React component library built with TypeScript and CSS custom properties.

- [Open issues](https://github.com/Jowaaaa/jowaui/issues)
- [Discussions](https://github.com/Jowaaaa/jowaui/discussions)

---

## Development setup

**Prerequisites:** Node 20+, npm

```bash
git clone https://github.com/Jowaaaa/jowaui.git
cd jowaui
npm install
npm run storybook
```

Storybook runs at `http://localhost:6006`.

---

## Project structure

```
src/
  lib/
    components/       # One folder per component: <Name>/<Name>.tsx + <Name>.css
    index.ts          # Public exports (components + types)
    styles/
      tokens.css      # All --jowa-* CSS custom properties
  stories/            # Storybook stories: <Name>.stories.tsx
```

---

## Adding a new component

1. **Create files**
   ```
   src/lib/components/<Name>/<Name>.tsx
   src/lib/components/<Name>/<Name>.css
   ```

2. **Follow naming conventions**
   - CSS classes: `jowa-<component>` prefix (e.g. `jowa-button`, `jowa-button--primary`)
   - All styles inside `@layer jowa.components {}`

3. **Use only `--jowa-*` tokens**
   No hardcoded colors, no Tailwind classes, no external CSS.
   ```css
   @layer jowa.components {
     .jowa-button {
       background: var(--jowa-color-primary);
       border-radius: var(--jowa-radius-md);
     }
   }
   ```

4. **Export from `src/lib/index.ts`**
   ```ts
   export { Button } from './components/Button/Button';
   export type { ButtonProps } from './components/Button/Button';
   ```

5. **Add a Storybook story**
   ```
   src/stories/<Name>.stories.tsx
   ```

6. **Update `Introduction.stories.tsx`** — add the component to the component list.

7. **Update `CHANGELOG.md`** — add an entry under `[Unreleased]`.

---

## Code conventions

| Rule | Detail |
|------|--------|
| CSS class prefix | `jowa-` |
| CSS layer | `@layer jowa.components {}` |
| CSS tokens | `--jowa-*` only — no hardcoded values |
| Dependencies | Zero runtime dependencies — do not add any |
| TypeScript | Strict types, export all public prop interfaces |

---

## Running checks

```bash
npm run lint      # TypeScript type-check + ESLint
npm run build     # Vite library build
npm run storybook # Dev server for visual testing
```

All checks must pass before submitting a PR.

---

## Submitting a PR

1. Fork the repo and create a branch:
   - New component: `feat/component-name`
   - Bug fix: `fix/short-description`
   - Docs: `docs/what-changed`

2. Make your changes and run `npm run lint` + `npm run build`.

3. Open a PR against `main`. Fill in the [PR checklist](.github/pull_request_template.md).

4. @Jowaaaa will review — expect feedback within a few days.

---

## Reporting bugs

Use the [bug report template](https://github.com/Jowaaaa/jowaui/issues/new?template=bug_report.yml) to file an issue. Include a minimal reproduction if possible.
