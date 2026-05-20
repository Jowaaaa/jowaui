# jowaui

A lightweight, zero-dependency React component library built with pure CSS custom properties. No Tailwind, no Radix, no framework lock-in — just React, TypeScript, and CSS.

## Features

- **Zero runtime dependencies** — only React as a peer dependency
- **Themeable** — all design tokens are CSS custom properties, override any of them globally
- **Typed** — full TypeScript types shipped with the package
- **Tree-shakeable** — ESM + CJS builds via tsup
- **Inter font** — clean, modern typography out of the box

## Installation

```bash
npm install jowaui
```

## Usage

Import the stylesheet once at your app root:

```tsx
import "jowaui/styles";
```

Then use components anywhere:

```tsx
import { Button, Card, Alert } from "jowaui";

export default function App() {
  return (
    <Card header="Hello">
      <Alert variant="success" title="Ready to go!" />
      <Button>Click me</Button>
    </Card>
  );
}
```

## Theming

Override any token in your own CSS:

```css
:root {
  --jowa-color-primary: #7c3aed;
  --jowa-color-primary-hover: #6d28d9;
  --jowa-radius-md: 8px;
}
```

## Components

| Component | Description |
|-----------|-------------|
| `Alert` | Feedback banners — info / success / warning / danger |
| `Avatar` | User image with initials fallback, 4 sizes |
| `Badge` | Inline status chips, 5 variants |
| `Breadcrumbs` | Accessible nav trail with custom separator |
| `Button` | Primary / outline / danger / ghost, 3 sizes |
| `Card` | Content container with header and footer slots |
| `Carousel` | Slide viewer with dots, arrows, and optional autoplay |
| `Chart` | SVG bar and line charts, zero dependencies |
| `Divider` | Horizontal or vertical separator with optional label |
| `Dropdown` | Click-triggered menu with Escape/outside-click dismiss |
| `Footer` | Dark site footer with link groups and bottom bar |
| `Hero` | Full-width section with centered or split layout |
| `Input` | Text input with label, hint, and error state |
| `Modal` | Portal modal with overlay, Escape key, scroll lock |
| `Navbar` | Top navigation with logo, links, and actions slot |
| `Pagination` | Controlled page navigator with smart ellipsis |
| `Progress` | Progress bar — 4 variants, 3 sizes, animated fill |
| `Sidebar` | Vertical nav with groups, icons, and collapsible mode |
| `Spinner` | Animated loading ring, 3 sizes |
| `Tag` | Removable chips, 5 variants |
| `Tooltip` | Hover hint — top / bottom / left / right |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build library (CJS + ESM + types) |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run lint` | Type-check with `tsc --noEmit` |

## Design Tokens

Key tokens you can override (full list in `src/lib/styles/tokens.css`):

```css
--jowa-font-family
--jowa-color-primary
--jowa-color-danger
--jowa-color-success
--jowa-color-warning
--jowa-radius-md
--jowa-shadow-md
--jowa-spacing-lg
--jowa-navbar-bg
```

## Browser Support

Modern evergreen browsers. Uses CSS custom properties and `clamp()`.

## License

MIT
