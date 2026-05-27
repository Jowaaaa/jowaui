# Changelog

All notable changes to jowaui will be documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

---

## [0.2.1]

### Added

- **JSDoc documentation** — all exported prop interfaces across all 55 components now have full JSDoc comments on every property; improves IntelliSense and hover docs in consumer projects

### Changed

- **Storybook `argTypes`** — added missing controls to 28 story files (Accordion, Banner, Checkbox, ColorPicker, DatePicker, Drawer, Dropdown, FileInput, Gauge, Input, MarkdownRenderer, NumberInput, Pagination, Popover, Radio, RichTextEditor, Select, Skeleton, Sparkline, StatCard, Stepper, Switch, Table, Tabs, Textarea, Toast, Tree, WizardStepper)
- **Live controls** — fixed controls not reflecting changes in the Docs canvas for 17 stories

---

## [0.2.0]

### Added

- **11 new components:** Combobox, MultiSelect, OtpInput, RangeSlider, ConfirmDialog, Timeline, KanbanBoard, DataGrid, WizardStepper, MarkdownRenderer, RichTextEditor
  - `Combobox` — searchable dropdown with keyboard navigation, ARIA combobox/listbox roles
  - `MultiSelect` — multi-value select with removable chip tags and checkbox options
  - `OtpInput` — N-box one-time password / PIN input; auto-advance, paste support, SMS autofill (`autoComplete="one-time-code"`)
  - `RangeSlider` — single or dual-handle slider; pointer capture drag, tooltip, `Shift+Arrow` coarse step
  - `ConfirmDialog` — portal modal for destructive confirmations; focus trap, 3 variants (default / warning / danger)
  - `Timeline` — vertical activity feed with variant-colored dots, icon slot, and semantic `<time>` element
  - `KanbanBoard` — drag-and-drop board using HTML5 DnD API; controlled/uncontrolled, drop zone highlight
  - `DataGrid` — generic `DataGrid<T>` with column sorting, column resize, and row selection (header select-all + indeterminate)
  - `WizardStepper` — multi-step wizard with async step validation, completed/error indicator states
  - `MarkdownRenderer` — zero-dependency markdown parser (headings, bold/italic/code, lists, blockquotes, fenced code, links); XSS-safe href sanitization
  - `RichTextEditor` — contentEditable WYSIWYG with toolbar (bold, italic, underline, strikethrough, H1/H2, lists, link, undo/redo); active format detection

---

## [0.1.4]

### Changed

- **Theme** — Changed default storybook theme.
- **import warning** - This should fix import order warning.

---

## [0.1.3]

### Changed

- **Missing Exports** — Added 6 missing components from export.

---

## [0.1.2]

### Changed

- **Documentation updates** — NPM warning on `Introduction` deleted.
- **Updated versioning** - Changed the changelog version to reflect the current NPM version.
- **Navbar button fix** - dark mode styling of the outline and ghost button.
- **Carousel Component** Fixed the Carousel arrow buttons not being visible in dark mode.
- **Footer component** Fixed the Footer component only having dark mode.
- **Sidebar component** Fixed the Sidebar component not having controls in storybook.
- **Tooltip component** Fixed the Tooltip component span always starting in a corner before going to the correct position.
- **Dark Mode** Fixed an issue where dark mode was not changing background color in storybook.
- **Storybook update** - Updated storybook to version 10.4.0

---

## [0.1.1]

### Added

- **9 new components:** Accordion, DatePicker, FileInput, NumberInput, ColorPicker, Stepper, Banner, ContextMenu, Tree

### Changed

- **Documentation refactor** — Introduction trimmed to overview; new dedicated pages: `Docs/Install` and `Docs/Customize` (includes live design token reference)
- **Design tokens page** — all `--jowa-*` tokens reflected live with computed values; integrated into Customize page
- **Storybook default** — opens on Introduction page on launch

---

## [0.1.1] — 2026-05-20

### Added

- **Introduction page** creates some extra information on the introduction page of storybook

---

## [0.1.1] — 2026-05-20

### Added

- **14 new components:** Checkbox, Drawer, Popover, Radio, RadioGroup, Select, Skeleton, Switch, Table, Tabs, Textarea, Toast, and form-layout primitives
  - `Select` — native select with custom chevron, sm/md/lg sizes, consistent focus ring
  - `Checkbox` — custom styled checkbox with `indeterminate` support
  - `Radio` + `RadioGroup` — compound component with context, fieldset/legend, full keyboard nav
  - `Switch` — `role="switch"`, 3 sizes, spring thumb animation, left/right label
  - `Textarea` — configurable `resize` prop, same focus ring as Input
  - `Toast` + `useToast` hook — `ToastProvider` with `useReducer` queue, portal, `aria-live`, 6 positions, auto-dismiss
  - `Skeleton` — shimmer animation, text/rect/circle variants, multi-line via `lines` prop
  - `Drawer` — 4 sides, portal, Escape key, body scroll lock, directional spring animations
  - `Popover` — 4 placements, outside-click + Escape dismiss, controlled/uncontrolled
  - `Tabs` — line and pill variants, ARIA tablist/tabpanel, keyboard arrow navigation
  - `Table` — generic `Table<T>`, client-side sorting, striped/hoverable/bordered/stickyHeader variants
- **Interactive Theme Builder** Storybook story (`Theme/Theme Builder`)
  - Live token editing via range sliders (colors, shape, spacing/density, motion, typography)
  - Real-time preview canvas with representative components
  - Copy CSS button exports `:root { ... }` overrides to clipboard
  - Reset button restores computed defaults

### Fixed

- Theme Builder color sliders now update the preview in real-time by explicitly computing and setting derived oklch color tokens (`--jowa-color-primary`, `--jowa-color-danger`, etc.) directly on the preview element via `setProperty`

---

## [0.1.1] — 2026-05-20

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
- CSS custom properties design token system (`@jowaaaa/jowaui/styles`)
- Inter font loaded via Google Fonts
- Full TypeScript types for all components
- Storybook 8 with autodocs and stories for every component
- tsup build (CJS + ESM + `.d.ts`)
- `"@jowaaaa/jowaui/styles"` export for global token import
