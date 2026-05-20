# Changelog

All notable changes to jowaui will be documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

---

## [0.2.0] — 2026-05-20

### Added

- **3 new inline data components:** `Sparkline`, `Gauge`, `StatCard`
  - `Sparkline` — pure SVG line chart with optional filled area and last-point dot; color overridable via CSS custom property
  - `Gauge` — 270° arc meter with 4 variants (primary/success/warning/danger), accessible `role="meter"`
  - `StatCard` — dashboard metric card with value, trend badge (up/down/neutral), icon slot, and inline chart slot
- **Storybook dark/light mode toggle** via `@storybook/addon-themes`; toolbar sun/moon icon switches the entire preview canvas between themes
- `[data-theme="light"]` explicit token block in `tokens.css` so light mode is stable regardless of system preference

### Changed

- **All 21 component CSS files** wrapped in `@layer jowa.components { ... }` — consumer styles now always win without `!important`
- All component transitions migrated to motion tokens (`--jowa-duration-*`, `--jowa-ease-*`)
- `tokens.css` — redesigned with oklch color space, motion tokens, density system, `@layer` declaration, dark mode via both `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`, print token overrides
- `card.css`, `hero.css`, `sidebar.css` — added `@container` queries for responsive layout within constrained containers
- `button.css`, `pagination.css` — `scale(0.97)` micro-interaction on `:active`
- `modal.css` — spring-physics enter animation (`jowa-modal-in` keyframe)
- `dropdown.css` — scale+translate enter animation (`jowa-dropdown-in`)
- `tooltip.css` — scale enter animation (`jowa-tooltip-in`)
- `input.css` — focus ring uses `oklch(from var(--jowa-color-primary) l c h / 15%)` relative color
- `tag.css` — border colors auto-derived from fill color via relative oklch syntax
- `footer.css` — uses neutral primitive tokens directly for dark background

---

## [0.1.0] — 2026-05-20

### Added

- Initial release
- **21 components:** Alert, Avatar, Badge, Breadcrumbs, Button, Card, Carousel, Chart, Divider, Dropdown, Footer, Hero, Input, Modal, Navbar, Pagination, Progress, Sidebar, Spinner, Tag, Tooltip
- CSS custom properties design token system (`jowaui/styles`)
- Inter font loaded via Google Fonts
- Full TypeScript types for all components
- Storybook 8 with autodocs and stories for every component
- tsup build (CJS + ESM + `.d.ts`)
- `"jowaui/styles"` export for global token import
