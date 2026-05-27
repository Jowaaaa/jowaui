# jowaui

> **This library is under active development.** Bugs and missing features are expected. If you run into anything, please [open an issue](https://github.com/jowaaaa/jowaui/issues) — contributions are welcome.

A lightweight, zero-dependency React component library built with pure CSS custom properties. No Tailwind, no Radix, no framework lock-in — just React, TypeScript, and CSS.

## Features

- **Zero runtime dependencies** — only React as a peer dependency
- **CSS custom properties as the API** — every token is a CSS variable; override globally, per-page, or per-component
- **oklch color space** — perceptually uniform colors with automatic dark mode derivation
- **Dark mode** — system preference (`prefers-color-scheme`) + manual `[data-theme="dark"]` attribute
- **Motion tokens** — `--jowa-duration-*` and `--jowa-ease-*` tokens; `prefers-reduced-motion` respected by default
- **Density system** — one CSS variable (`--jowa-density`) adjusts spacing across the entire app
- **`@layer` architecture** — your styles always win, no `!important` needed
- **Container queries** — components reflow based on their container, not the viewport
- **Inline data components** — Sparkline, Gauge, StatCard with no chart library required
- **Typed** — full TypeScript types shipped with the package
- **Tree-shakeable** — ESM + CJS builds via tsup

## Installation

```bash
npm install @jowaaaa/jowaui
```

## Usage

Import the stylesheet once at your app root:

```tsx
import "@jowaaaa/jowaui/styles";
```

Then use components anywhere:

```tsx
import { Button, Card, Alert, StatCard, Sparkline, Combobox, RangeSlider } from "@jowaaaa/jowaui";

export default function App() {
  return (
    <Card header="Hello">
      <Alert variant="success" title="Ready to go!" />
      <StatCard
        label="Revenue"
        value="$48,295"
        change="+12%"
        trend="up"
        chart={<Sparkline data={[3, 7, 5, 9, 6, 12]} />}
      />
      <Button>Click me</Button>
    </Card>
  );
}
```

## Theming

### Global override

```css
:root {
  --jowa-color-primary: oklch(52% 0.25 280);
  --jowa-radius-md: 8px;
}
```

### Dark mode

Dark mode activates automatically via `prefers-color-scheme: dark`. To control it manually, set the attribute on any ancestor element:

```html
<html data-theme="dark"> <!-- or "light" to force light -->
```

### Scoped theming (no ThemeProvider needed)

CSS custom properties cascade. You can theme any subtree without React context:

```tsx
<div style={{ "--jowa-color-primary": "oklch(55% 0.3 140)" } as React.CSSProperties}>
  {/* All jowaui components here use green as primary */}
  <Button>Green Button</Button>
</div>
```

### Density

```css
:root {
  --jowa-density: -2; /* compact */
  --jowa-density:  0; /* default */
  --jowa-density:  2; /* comfortable */
}
```

### Motion

All animation durations are CSS variables. To disable all motion globally:

```css
:root {
  --jowa-duration-instant: 0ms;
  --jowa-duration-fast:    0ms;
  --jowa-duration-normal:  0ms;
  --jowa-duration-slow:    0ms;
}
```

`prefers-reduced-motion: reduce` sets all durations to `0ms` automatically.

## Components

| Component | Description |
|-----------|-------------|
| `Alert` | Feedback banners — info / success / warning / danger |
| `Avatar` | User image with initials fallback, 4 sizes |
| `Badge` | Inline status chips, 5 variants |
| `Breadcrumbs` | Accessible nav trail with custom separator |
| `Button` | Primary / outline / danger / ghost, 3 sizes |
| `Card` | Content container with header/footer slots; container-query responsive |
| `Carousel` | Slide viewer with dots, arrows, and optional autoplay |
| `Chart` | SVG bar and line charts, zero dependencies |
| `Divider` | Horizontal or vertical separator with optional label |
| `Dropdown` | Click-triggered menu with Escape/outside-click dismiss |
| `Footer` | Dark site footer with link groups and bottom bar |
| `Gauge` | 270° arc meter — 4 variants, accessible `role="meter"` |
| `Hero` | Full-width section with centered or split layout; container-query responsive |
| `Input` | Text input with label, hint, and error state |
| `Modal` | Portal modal with overlay, Escape key, scroll lock |
| `Navbar` | Top navigation with logo, links, and actions slot |
| `Pagination` | Controlled page navigator with smart ellipsis |
| `Progress` | Progress bar — 4 variants, 3 sizes, animated fill |
| `Sidebar` | Vertical nav with groups, icons, and collapsible mode; container-query responsive |
| `Sparkline` | Inline SVG line chart with optional fill; color via CSS variable |
| `Spinner` | Animated loading ring, 3 sizes |
| `StatCard` | Dashboard metric card with value, trend badge, icon, and chart slot |
| `Tag` | Removable chips, 5 variants |
| `Tooltip` | Hover hint — top / bottom / left / right |
| `Accordion` | Collapsible content sections |
| `Banner` | Full-width dismissable notification bar |
| `Checkbox` | Custom styled checkbox with `indeterminate` support |
| `ColorPicker` | Hue/saturation/lightness color picker |
| `ContextMenu` | Right-click triggered menu |
| `DatePicker` | Calendar date picker |
| `Drawer` | 4-side slide-in panel with overlay |
| `FileInput` | Styled file upload input |
| `NumberInput` | Numeric input with increment/decrement |
| `Popover` | 4-placement floating content panel |
| `Radio` / `RadioGroup` | Compound radio group with keyboard nav |
| `Select` | Native select with custom chevron, 3 sizes |
| `Skeleton` | Shimmer loading placeholder — text / rect / circle |
| `Stepper` | Step indicator with status states |
| `Switch` | Toggle switch with spring animation |
| `Table` | Generic `Table<T>` with client-side sort and variants |
| `Tabs` | Line and pill tab variants with ARIA |
| `Textarea` | Multi-line text input |
| `Toast` / `useToast` | Toast queue with `ToastProvider`, 6 positions, auto-dismiss |
| `Tree` | Collapsible tree view |
| `Combobox` | Searchable dropdown with keyboard navigation |
| `MultiSelect` | Multi-value select with removable chip tags |
| `OtpInput` | N-box OTP / PIN input with paste and SMS autofill |
| `RangeSlider` | Single or dual-handle slider with tooltip |
| `ConfirmDialog` | Portal modal for destructive confirmations, 3 variants |
| `Timeline` | Vertical activity feed with variant dots and icon slot |
| `KanbanBoard` | Drag-and-drop board (HTML5 DnD), controlled/uncontrolled |
| `DataGrid` | Generic table with sorting, column resize, row selection |
| `WizardStepper` | Multi-step wizard with async validation |
| `MarkdownRenderer` | Zero-dep markdown renderer with XSS-safe links |
| `RichTextEditor` | contentEditable WYSIWYG with formatting toolbar |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build library (CJS + ESM + types) |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run lint` | Type-check with `tsc --noEmit` |

## Design Tokens

Key tokens you can override (full list in `src/lib/styles/tokens.css`):

```css
/* Brand */
--jowa-font-family
--jowa-color-primary
--jowa-color-danger
--jowa-color-success
--jowa-color-warning

/* Shape */
--jowa-radius-md
--jowa-shadow-md

/* Spacing & density */
--jowa-spacing-lg
--jowa-density          /* -2 compact · 0 default · +2 comfortable */

/* Motion */
--jowa-duration-fast    /* default 150ms */
--jowa-duration-normal  /* default 250ms */
--jowa-ease-spring      /* cubic-bezier(0.34, 1.56, 0.64, 1) */

/* Component-specific */
--jowa-navbar-bg
--jowa-navbar-height
```

## Browser Support

Modern evergreen browsers (Chrome 111+, Firefox 113+, Safari 16.4+). Requires support for:

- CSS custom properties
- `oklch()` color function
- CSS `@layer`
- CSS container queries (`@container`)
- `oklch()` relative color syntax (`oklch(from var(...) l c h)`)

## License

MIT
