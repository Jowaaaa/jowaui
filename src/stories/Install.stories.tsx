import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

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
  h1: {
    fontSize: '1.75rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    margin: '0 0 0.25rem',
  },
  subtitle: {
    fontSize: '0.9375rem',
    color: 'var(--jowa-color-muted, #6b7280)',
    margin: '0 0 2.5rem',
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
  codeBlock: {
    background: 'var(--jowa-color-surface, #f8f9fa)',
    border: '1px solid var(--jowa-color-neutral-border, #e5e7eb)',
    borderRadius: 8,
    padding: '1rem 1.25rem',
    overflowX: 'auto' as const,
    fontSize: '0.875rem',
    lineHeight: 1.6,
    margin: '0 0 1.25rem',
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    whiteSpace: 'pre' as const,
  },
  inlineCode: {
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    fontSize: '0.875em',
    background: 'var(--jowa-color-primary-bg, #eff6ff)',
    color: 'var(--jowa-color-primary, oklch(52% 0.22 262))',
    padding: '1px 5px',
    borderRadius: 4,
  },
  callout: {
    borderLeft: '3px solid var(--jowa-color-primary, oklch(52% 0.22 262))',
    margin: '0 0 1rem',
    padding: '0.5rem 1rem',
    background: 'var(--jowa-color-primary-bg, #eff6ff)',
    borderRadius: '0 6px 6px 0',
    fontSize: '0.9rem',
  },
  p: {
    margin: '0 0 0.75rem',
    color: 'var(--jowa-color-muted, #6b7280)',
  },
};

/* ── Component ────────────────────────────────────────────────────────────── */

const InstallPage: React.FC = () => (
  <div style={s.page}>
    <h1 style={s.h1}>Install</h1>
    <p style={s.subtitle}>Get jowaui into your project.</p>

    <div
      style={{
        ...s.callout,
        borderColor: 'var(--jowa-color-warning)',
        background: 'var(--jowa-color-warning-bg)',
      }}
    >
      <strong>NPM package currently not available.</strong> Development is still
      underway — this page documents the intended install flow.
    </div>

    <hr style={s.hr} />

    <h2 style={s.h2}>Install</h2>
    <pre style={s.codeBlock}>{`npm install @jowaaaa/jowaui`}</pre>

    <hr style={s.hr} />

    <h2 style={s.h2}>Usage</h2>
    <p style={s.p}>
      Import the token stylesheet once at your app root, then use components
      anywhere:
    </p>
    <pre
      style={s.codeBlock}
    >{`// 1. Import the token stylesheet once at your app root
import "@jowaaaa/jowaui/styles";

// 2. Use components anywhere
import { Button, Modal, useToast } from "@jowaaaa/jowaui";

export default function App() {
  return <Button variant="primary">Hello</Button>;
}`}</pre>
  </div>
);

/* ── Story ────────────────────────────────────────────────────────────────── */

const meta: Meta = {
  title: 'Docs/Install',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
    actions: { disable: true },
  },
};
export default meta;

type Story = StoryObj;
export const Install: Story = {
  name: 'Install',
  render: () => <InstallPage />,
};
