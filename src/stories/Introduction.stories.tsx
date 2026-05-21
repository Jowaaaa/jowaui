import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/* ── Data ─────────────────────────────────────────────────────────────────── */

const COMPONENTS = [
  { name: 'Accordion', category: 'Layout', description: 'Collapsible content panels with animated height' },
  { name: 'Alert', category: 'Feedback', description: 'Dismissible status messages — info/success/warning/danger' },
  { name: 'Avatar', category: 'Display', description: 'User avatar with image fallback and initials' },
  { name: 'Badge', category: 'Display', description: 'Inline status labels' },
  { name: 'Banner', category: 'Feedback', description: 'Full-width site notification strip' },
  { name: 'Breadcrumbs', category: 'Navigation', description: 'Hierarchical path navigator' },
  { name: 'Button', category: 'Form', description: 'Primary/outline/ghost/danger, sm/md/lg' },
  { name: 'Card', category: 'Layout', description: 'Surface container with header/footer slots' },
  { name: 'Carousel', category: 'Display', description: 'Touch-friendly image/content slider' },
  { name: 'Chart', category: 'Data', description: 'SVG bar and line charts, no dependencies' },
  { name: 'Checkbox', category: 'Form', description: 'Styled checkbox with indeterminate state' },
  { name: 'ColorPicker', category: 'Form', description: 'Swatch + hex input backed by native color picker' },
  { name: 'ContextMenu', category: 'Overlay', description: 'Right-click triggered floating menu' },
  { name: 'DatePicker', category: 'Form', description: 'Styled native date input' },
  { name: 'Divider', category: 'Layout', description: 'Horizontal or vertical separator' },
  { name: 'Drawer', category: 'Overlay', description: 'Side panel — left/right/top/bottom' },
  { name: 'Dropdown', category: 'Navigation', description: 'Trigger + floating menu' },
  { name: 'FileInput', category: 'Form', description: 'Styled file upload trigger with filename display' },
  { name: 'Footer', category: 'Layout', description: 'Page footer with columns and bottom bar' },
  { name: 'Gauge', category: 'Data', description: '270° arc meter with variant colors' },
  { name: 'Hero', category: 'Layout', description: 'Full-width page hero with CTA slots' },
  { name: 'Input', category: 'Form', description: 'Text input with label, helper text, error state' },
  { name: 'Modal', category: 'Overlay', description: 'Accessible dialog with portal and focus trap' },
  { name: 'Navbar', category: 'Navigation', description: 'Responsive top navigation bar' },
  { name: 'NumberInput', category: 'Form', description: 'Numeric stepper with − and + buttons' },
  { name: 'Pagination', category: 'Navigation', description: 'Page navigator with ellipsis' },
  { name: 'Popover', category: 'Overlay', description: '4-placement floating content panel' },
  { name: 'Progress', category: 'Feedback', description: 'Linear progress bar' },
  { name: 'Radio', category: 'Form', description: 'Accessible radio group with keyboard nav' },
  { name: 'Select', category: 'Form', description: 'Styled native select' },
  { name: 'Sidebar', category: 'Navigation', description: 'Collapsible side navigation' },
  { name: 'Skeleton', category: 'Feedback', description: 'Shimmer loading placeholder' },
  { name: 'Sparkline', category: 'Data', description: 'Inline SVG trend line' },
  { name: 'Spinner', category: 'Feedback', description: 'Loading indicator' },
  { name: 'StatCard', category: 'Data', description: 'Dashboard metric card with trend and chart slot' },
  { name: 'Stepper', category: 'Navigation', description: 'Horizontal/vertical step progress indicator' },
  { name: 'Switch', category: 'Form', description: 'Toggle switch with spring animation' },
  { name: 'Table', category: 'Data', description: 'Generic sortable data table' },
  { name: 'Tabs', category: 'Navigation', description: 'Line and pill tab variants' },
  { name: 'Tag', category: 'Display', description: 'Removable label/chip' },
  { name: 'Textarea', category: 'Form', description: 'Multi-line text input' },
  { name: 'Toast', category: 'Feedback', description: 'Toast notification queue with 6 positions' },
  { name: 'Tooltip', category: 'Overlay', description: 'Hover tooltip — 4 placements' },
  { name: 'Tree', category: 'Display', description: 'Collapsible hierarchical node tree' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Feedback:   'oklch(52% 0.22 262)',
  Display:    'oklch(52% 0.18 155)',
  Navigation: 'oklch(55% 0.20 300)',
  Form:       'oklch(55% 0.22 25)',
  Layout:     'oklch(55% 0.18 75)',
  Overlay:    'oklch(48% 0.20 230)',
  Data:       'oklch(52% 0.20 195)',
};

const DOC_PAGES = [
  {
    title: 'Install',
    story: 'Docs/Install',
    description: 'npm install, usage snippet, and CSS layers explanation.',
    icon: '📦',
  },
  {
    title: 'Customize',
    story: 'Docs/Customize',
    description: 'Override tokens, scope themes to a subtree, dark mode, reduced motion, and all available design tokens with live values.',
    icon: '🎨',
  },
];

/* ── Styles ───────────────────────────────────────────────────────────────── */

const s: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '2.5rem 1.5rem 5rem',
    fontFamily: 'var(--jowa-font-family, Inter, sans-serif)',
    color: 'var(--jowa-color-neutral-text, #111)',
    lineHeight: 1.7,
  },
  hero: {
    marginBottom: '3rem',
  },
  h1: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    margin: '0 0 0.5rem',
    background: 'linear-gradient(135deg, oklch(52% 0.22 262), oklch(60% 0.28 300))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  tagline: {
    fontSize: '1.125rem',
    color: 'var(--jowa-color-muted, #6b7280)',
    margin: '0 0 1.5rem',
    maxWidth: 560,
  },
  pillRow: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.3rem 0.75rem',
    borderRadius: 999,
    fontSize: '0.8125rem',
    fontWeight: 600,
    background: 'var(--jowa-color-primary-bg, #eff6ff)',
    color: 'var(--jowa-color-primary, oklch(52% 0.22 262))',
    border: '1px solid oklch(from var(--jowa-color-primary, oklch(52% 0.22 262)) l c h / 20%)',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid var(--jowa-color-neutral-border, #e5e7eb)',
    margin: '2.5rem 0',
  },
  h2: {
    fontSize: '1.25rem',
    fontWeight: 700,
    margin: '0 0 1rem',
    paddingBottom: '0.4rem',
    borderBottom: '2px solid var(--jowa-color-neutral-border, #e5e7eb)',
  },
  inlineCode: {
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    fontSize: '0.875em',
    background: 'var(--jowa-color-primary-bg, #eff6ff)',
    color: 'var(--jowa-color-primary, oklch(52% 0.22 262))',
    padding: '1px 5px',
    borderRadius: 4,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '0.75rem',
    margin: '0 0 1.5rem',
  },
  componentCard: {
    padding: '0.75rem 1rem',
    borderRadius: 8,
    border: '1px solid var(--jowa-color-neutral-border, #e5e7eb)',
    background: 'var(--jowa-color-surface, #f8f9fa)',
  },
  componentName: {
    fontWeight: 700,
    fontSize: '0.875rem',
    marginBottom: 2,
  },
  componentDesc: {
    fontSize: '0.8125rem',
    color: 'var(--jowa-color-muted, #6b7280)',
    margin: 0,
    lineHeight: 1.5,
  },
  categoryDot: {
    display: 'inline-block',
    width: 8,
    height: 8,
    borderRadius: '50%',
    marginRight: 6,
    verticalAlign: 'middle',
    flexShrink: 0,
  },
  callout: {
    borderLeft: '3px solid var(--jowa-color-primary, oklch(52% 0.22 262))',
    margin: '0 0 1rem',
    padding: '0.5rem 1rem',
    background: 'var(--jowa-color-primary-bg, #eff6ff)',
    borderRadius: '0 6px 6px 0',
    fontSize: '0.9rem',
  },
  docGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '1rem',
    margin: '0 0 1.5rem',
  },
  docCard: {
    padding: '1.25rem',
    borderRadius: 10,
    border: '1px solid var(--jowa-color-neutral-border, #e5e7eb)',
    background: 'var(--jowa-color-surface, #f8f9fa)',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.375rem',
  },
  docCardIcon: {
    fontSize: '1.5rem',
    lineHeight: 1,
    marginBottom: '0.25rem',
  },
  docCardTitle: {
    fontWeight: 700,
    fontSize: '1rem',
    color: 'var(--jowa-color-neutral-text, #111)',
  },
  docCardStory: {
    fontSize: '0.75rem',
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    color: 'var(--jowa-color-primary, oklch(52% 0.22 262))',
  },
  docCardDesc: {
    fontSize: '0.8125rem',
    color: 'var(--jowa-color-muted, #6b7280)',
    lineHeight: 1.5,
    margin: 0,
  },
};

/* ── Component ────────────────────────────────────────────────────────────── */

const IntroductionPage: React.FC = () => {
  const categories = [...new Set(COMPONENTS.map((c) => c.category))].sort();

  return (
    <div style={s.page}>
      {/* Warning */}
      <div
        style={{
          ...s.callout,
          borderColor: 'var(--jowa-color-warning)',
          background: 'var(--jowa-color-warning-bg)',
        }}
      >
        <strong>NPM package currently not available.</strong> While this
        documentation page is already active it currently does not serve a
        purpose, since development is still undergoing.
      </div>

      {/* Hero */}
      <div style={s.hero}>
        <h1 style={s.h1}>jowaui</h1>
        <p style={s.tagline}>
          A zero-dependency React component library built on CSS custom
          properties. No Tailwind required. No ThemeProvider required. No
          framer-motion required.
        </p>
        <div style={s.pillRow}>
          {[
            'Zero dependencies',
            'CSS custom properties',
            'oklch colors',
            'Dark mode',
            'Reduced motion',
            '44 components',
          ].map((t) => (
            <span key={t} style={s.pill}>{t}</span>
          ))}
        </div>
      </div>

      <hr style={s.hr} />

      {/* Documentation links */}
      <h2 style={s.h2}>Documentation</h2>
      <div style={s.docGrid}>
        {DOC_PAGES.map((page) => (
          <div key={page.title} style={s.docCard}>
            <div style={s.docCardIcon}>{page.icon}</div>
            <div style={s.docCardTitle}>{page.title}</div>
            <div style={s.docCardStory}>{page.story}</div>
            <p style={s.docCardDesc}>{page.description}</p>
          </div>
        ))}
      </div>

      <hr style={s.hr} />

      {/* Components */}
      <h2 style={s.h2}>Components</h2>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        {categories.map((cat) => (
          <span
            key={cat}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.8125rem',
              color: 'var(--jowa-color-muted, #6b7280)',
            }}
          >
            <span
              style={{
                ...s.categoryDot,
                background: CATEGORY_COLORS[cat] ?? '#aaa',
              }}
            />
            {cat}
          </span>
        ))}
      </div>

      <div style={s.grid}>
        {COMPONENTS.map((c) => (
          <div key={c.name} style={s.componentCard}>
            <div
              style={{
                ...s.componentName,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  ...s.categoryDot,
                  background: CATEGORY_COLORS[c.category] ?? '#aaa',
                }}
              />
              <code
                style={{
                  ...s.inlineCode,
                  background: 'none',
                  padding: 0,
                  color: 'var(--jowa-color-neutral-text, #111)',
                }}
              >
                {c.name}
              </code>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: CATEGORY_COLORS[c.category] ?? '#aaa',
                  fontFamily: 'var(--jowa-font-family)',
                }}
              >
                {c.category}
              </span>
            </div>
            <p style={s.componentDesc}>{c.description}</p>
          </div>
        ))}
      </div>

      <hr style={s.hr} />
    </div>
  );
};

/* ── Story ────────────────────────────────────────────────────────────────── */

const meta: Meta = {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
    actions: { disable: true },
  },
};
export default meta;

type Story = StoryObj;
export const Docs: Story = {
  name: 'Introduction',
  render: () => <IntroductionPage />,
};
