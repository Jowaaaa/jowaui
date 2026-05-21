import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/* ── Token helpers ────────────────────────────────────────────────────────── */

function getToken(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function readAllTokens(): Record<string, string> {
  const names = [
    '--jowa-blue-500',
    '--jowa-blue-600',
    '--jowa-blue-50',
    '--jowa-green-500',
    '--jowa-green-600',
    '--jowa-green-50',
    '--jowa-red-500',
    '--jowa-red-600',
    '--jowa-red-50',
    '--jowa-amber-500',
    '--jowa-amber-600',
    '--jowa-amber-50',
    '--jowa-sky-500',
    '--jowa-sky-50',
    '--jowa-neutral-0',
    '--jowa-neutral-50',
    '--jowa-neutral-100',
    '--jowa-neutral-200',
    '--jowa-neutral-300',
    '--jowa-neutral-400',
    '--jowa-neutral-500',
    '--jowa-neutral-600',
    '--jowa-neutral-700',
    '--jowa-neutral-800',
    '--jowa-neutral-900',
    '--jowa-neutral-950',
    '--jowa-color-primary',
    '--jowa-color-primary-hover',
    '--jowa-color-primary-bg',
    '--jowa-color-danger',
    '--jowa-color-danger-hover',
    '--jowa-color-danger-bg',
    '--jowa-color-success',
    '--jowa-color-success-bg',
    '--jowa-color-warning',
    '--jowa-color-warning-bg',
    '--jowa-color-info',
    '--jowa-color-info-bg',
    '--jowa-color-neutral-bg',
    '--jowa-color-neutral-border',
    '--jowa-color-neutral-text',
    '--jowa-color-neutral-hover',
    '--jowa-color-muted',
    '--jowa-color-surface',
    '--jowa-font-family',
    '--jowa-font-size-xs',
    '--jowa-font-size-sm',
    '--jowa-font-size-md',
    '--jowa-font-size-lg',
    '--jowa-font-weight-normal',
    '--jowa-font-weight-medium',
    '--jowa-font-weight-semibold',
    '--jowa-font-weight-bold',
    '--jowa-line-height',
    '--jowa-spacing-xs',
    '--jowa-spacing-sm',
    '--jowa-spacing-md',
    '--jowa-spacing-lg',
    '--jowa-spacing-xl',
    '--jowa-spacing-2xl',
    '--jowa-radius-sm',
    '--jowa-radius-md',
    '--jowa-radius-lg',
    '--jowa-radius-xl',
    '--jowa-radius-full',
    '--jowa-shadow-sm',
    '--jowa-shadow-md',
    '--jowa-shadow-lg',
    '--jowa-duration-instant',
    '--jowa-duration-fast',
    '--jowa-duration-normal',
    '--jowa-duration-slow',
    '--jowa-duration-slower',
    '--jowa-ease-smooth',
    '--jowa-ease-spring',
    '--jowa-ease-bounce',
    '--jowa-ease-in',
    '--jowa-ease-out',
    '--jowa-ease-linear',
  ];
  const result: Record<string, string> = {};
  for (const name of names) result[name] = getToken(name);
  return result;
}

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
  h3: {
    fontSize: '1rem',
    fontWeight: 700,
    margin: '1.5rem 0 0.5rem',
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
  // Token display styles
  swatchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  swatchCard: {
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid var(--jowa-color-neutral-border, #e5e7eb)',
    background: 'var(--jowa-color-surface, #f8f9fa)',
  },
  swatchBox: {
    height: 56,
    width: '100%',
  },
  swatchMeta: {
    padding: '0.5rem 0.625rem',
  },
  swatchName: {
    fontSize: '0.75rem',
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    fontWeight: 600,
    color: 'var(--jowa-color-neutral-text, #111)',
    marginBottom: 2,
    wordBreak: 'break-all' as const,
  },
  swatchValue: {
    fontSize: '0.6875rem',
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    color: 'var(--jowa-color-muted, #6b7280)',
    wordBreak: 'break-all' as const,
  },
  tokenTable: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.875rem',
    marginBottom: '1.5rem',
  },
  th: {
    textAlign: 'left' as const,
    padding: '0.5rem 0.75rem',
    borderBottom: '2px solid var(--jowa-color-neutral-border, #e5e7eb)',
    fontWeight: 600,
    fontSize: '0.8125rem',
    color: 'var(--jowa-color-muted, #6b7280)',
  },
  td: {
    padding: '0.5rem 0.75rem',
    borderBottom: '1px solid var(--jowa-color-neutral-border, #e5e7eb)',
    verticalAlign: 'middle' as const,
  },
  mono: {
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    fontSize: '0.8125rem',
  },
  spacingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.625rem',
  },
  spacingLabel: {
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    fontSize: '0.8125rem',
    minWidth: 180,
    color: 'var(--jowa-color-neutral-text, #111)',
  },
  spacingBar: {
    height: 20,
    background: 'var(--jowa-color-primary, oklch(52% 0.22 262))',
    borderRadius: 4,
    opacity: 0.7,
  },
  spacingValue: {
    fontSize: '0.75rem',
    color: 'var(--jowa-color-muted, #6b7280)',
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    minWidth: 48,
  },
  radiusGrid: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '1.25rem',
    marginBottom: '1.5rem',
    alignItems: 'flex-end',
  },
  radiusItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.5rem',
  },
  radiusBox: {
    width: 64,
    height: 64,
    background: 'var(--jowa-color-primary-bg, #eff6ff)',
    border: '2px solid var(--jowa-color-primary, oklch(52% 0.22 262))',
  },
  radiusLabel: {
    fontSize: '0.75rem',
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    color: 'var(--jowa-color-muted, #6b7280)',
    textAlign: 'center' as const,
  },
  shadowGrid: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap' as const,
    marginBottom: '1.5rem',
    alignItems: 'flex-end',
  },
  shadowItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '0.75rem',
  },
  shadowBox: {
    width: 96,
    height: 64,
    background: 'var(--jowa-color-surface, #f8f9fa)',
    borderRadius: 8,
    border: '1px solid var(--jowa-color-neutral-border, #e5e7eb)',
  },
  shadowLabel: {
    fontSize: '0.75rem',
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
    color: 'var(--jowa-color-muted, #6b7280)',
  },
  badge: {
    display: 'inline-block',
    padding: '0.15rem 0.5rem',
    borderRadius: 4,
    fontSize: '0.75rem',
    fontWeight: 600,
    background: 'var(--jowa-color-primary-bg, #eff6ff)',
    color: 'var(--jowa-color-primary, oklch(52% 0.22 262))',
    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
  },
};

/* ── Sub-components ───────────────────────────────────────────────────────── */

interface SwatchProps {
  name: string;
  value: string;
}

const ColorSwatch: React.FC<SwatchProps> = ({ name, value }) => (
  <div style={s.swatchCard}>
    <div style={{ ...s.swatchBox, background: `var(${name})` }} />
    <div style={s.swatchMeta}>
      <div style={s.swatchName}>{name}</div>
      <div style={s.swatchValue}>{value || '—'}</div>
    </div>
  </div>
);

/* ── Page ─────────────────────────────────────────────────────────────────── */

const CustomizePage: React.FC = () => {
  const [tokens, setTokens] = useState<Record<string, string>>({});

  useEffect(() => {
    setTokens(readAllTokens());
    const observer = new MutationObserver(() => setTokens(readAllTokens()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const t = (name: string): string => tokens[name] ?? '';

  const colorPrimitives = [
    '--jowa-blue-500',
    '--jowa-blue-600',
    '--jowa-blue-50',
    '--jowa-green-500',
    '--jowa-green-600',
    '--jowa-green-50',
    '--jowa-red-500',
    '--jowa-red-600',
    '--jowa-red-50',
    '--jowa-amber-500',
    '--jowa-amber-600',
    '--jowa-amber-50',
    '--jowa-sky-500',
    '--jowa-sky-50',
  ];

  const neutralPalette = [
    '--jowa-neutral-0',
    '--jowa-neutral-50',
    '--jowa-neutral-100',
    '--jowa-neutral-200',
    '--jowa-neutral-300',
    '--jowa-neutral-400',
    '--jowa-neutral-500',
    '--jowa-neutral-600',
    '--jowa-neutral-700',
    '--jowa-neutral-800',
    '--jowa-neutral-900',
    '--jowa-neutral-950',
  ];

  const semanticColors = [
    '--jowa-color-primary',
    '--jowa-color-primary-hover',
    '--jowa-color-primary-bg',
    '--jowa-color-danger',
    '--jowa-color-danger-hover',
    '--jowa-color-danger-bg',
    '--jowa-color-success',
    '--jowa-color-success-bg',
    '--jowa-color-warning',
    '--jowa-color-warning-bg',
    '--jowa-color-info',
    '--jowa-color-info-bg',
    '--jowa-color-neutral-bg',
    '--jowa-color-neutral-border',
    '--jowa-color-neutral-text',
    '--jowa-color-neutral-hover',
    '--jowa-color-muted',
    '--jowa-color-surface',
  ];

  const fontSizeTokens = [
    { name: '--jowa-font-size-xs', label: 'xs' },
    { name: '--jowa-font-size-sm', label: 'sm' },
    { name: '--jowa-font-size-md', label: 'md' },
    { name: '--jowa-font-size-lg', label: 'lg' },
  ];

  const spacingTokens = [
    '--jowa-spacing-xs',
    '--jowa-spacing-sm',
    '--jowa-spacing-md',
    '--jowa-spacing-lg',
    '--jowa-spacing-xl',
    '--jowa-spacing-2xl',
  ];

  const radiusTokens = [
    '--jowa-radius-sm',
    '--jowa-radius-md',
    '--jowa-radius-lg',
    '--jowa-radius-xl',
    '--jowa-radius-full',
  ];

  const shadowTokens = [
    '--jowa-shadow-sm',
    '--jowa-shadow-md',
    '--jowa-shadow-lg',
  ];

  const motionTokens = [
    '--jowa-duration-instant',
    '--jowa-duration-fast',
    '--jowa-duration-normal',
    '--jowa-duration-slow',
    '--jowa-duration-slower',
    '--jowa-ease-smooth',
    '--jowa-ease-spring',
    '--jowa-ease-bounce',
    '--jowa-ease-in',
    '--jowa-ease-out',
    '--jowa-ease-linear',
  ];

  return (
    <div style={s.page}>
      <h1 style={s.h1}>Customize</h1>
      <p style={s.subtitle}>
        Override <code style={s.inlineCode}>--jowa-*</code> tokens to restyle
        the entire library — no ThemeProvider, no build step.
      </p>

      {/* ── Theming ── */}
      <h2 style={s.h2}>Theming</h2>
      <p style={s.p}>
        Override any <code style={s.inlineCode}>--jowa-*</code> token on{' '}
        <code style={s.inlineCode}>:root</code> to restyle the entire library:
      </p>
      <pre style={s.codeBlock}>{`:root {
  /* Hue — try 145 green, 25 orange, 300 purple */
  --jowa-blue-h: 145;
  --jowa-blue-c: 0.18;   /* chroma (saturation) */
  --jowa-blue-l: 48%;    /* lightness */

  --jowa-radius-md: 12px;        /* rounder corners */
  --jowa-duration-normal: 400ms; /* slower animations */
  --jowa-density: 2;             /* comfortable spacing */
}`}</pre>

      <h3 style={s.h3}>Scope to a subtree</h3>
      <p style={s.p}>
        Apply a theme to any subtree by setting tokens on a wrapper element — no{' '}
        <code style={s.inlineCode}>ThemeProvider</code> needed:
      </p>
      <pre
        style={s.codeBlock}
      >{`<div style={{ "--jowa-blue-h": "145", "--jowa-blue-l": "48%" }}>
  {/* All jowaui components here use green as primary */}
  <Button variant="primary">Green Button</Button>
</div>`}</pre>

      <hr style={s.hr} />

      {/* ── Dark mode ── */}
      <h2 style={s.h2}>Dark Mode</h2>
      <p style={s.p}>
        All tokens ship with dark mode values. jowaui respects the OS preference
        via{' '}
        <code style={s.inlineCode}>@media (prefers-color-scheme: dark)</code>{' '}
        automatically. You can also force dark or light mode on any element
        using the <code style={s.inlineCode}>data-theme</code> attribute:
      </p>
      <pre style={s.codeBlock}>{`/* Force dark mode on a specific subtree */
<div data-theme="dark">
  <Card>Always dark</Card>
</div>

/* Force light mode */
<div data-theme="light">
  <Card>Always light</Card>
</div>`}</pre>

      <hr style={s.hr} />

      {/* ── Reduced motion ── */}
      <h2 style={s.h2}>Reduced Motion</h2>
      <p style={s.p}>
        All animation duration tokens are automatically set to{' '}
        <code style={s.inlineCode}>0ms</code> when the user has enabled the{' '}
        <code style={s.inlineCode}>prefers-reduced-motion</code> OS setting. No
        extra code is required in your app — the library handles it in{' '}
        <code style={s.inlineCode}>tokens.css</code>.
      </p>

      <hr style={s.hr} />

      {/* ── CSS Layers ── */}
      <h2 style={s.h2}>CSS Layers</h2>
      <p style={s.p}>
        All component styles are scoped to{' '}
        <code style={s.inlineCode}>@layer jowa.components</code>. Unlayered CSS
        in your app always wins — no{' '}
        <code style={s.inlineCode}>!important</code> needed:
      </p>
      <pre
        style={s.codeBlock}
      >{`@layer jowa.tokens, jowa.base, jowa.components, jowa.utilities;

/* This always overrides the library */
.jowa-btn {
  border-radius: 999px;
}`}</pre>

      <hr style={s.hr} />

      {/* ── Design Tokens ── */}
      <h2 style={s.h2}>Design Tokens</h2>
      <p style={s.p}>
        All <code style={s.inlineCode}>--jowa-*</code> tokens are listed below.
        Tokens are organized into three tiers: primitives → semantic →
        component.
      </p>

      <h3 style={s.h3}>Color Primitives</h3>
      <div style={s.swatchGrid}>
        {colorPrimitives.map((name) => (
          <ColorSwatch key={name} name={name} value={t(name)} />
        ))}
      </div>

      <h3 style={s.h3}>Neutral Palette</h3>
      <div
        style={{
          ...s.swatchGrid,
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        }}
      >
        {neutralPalette.map((name) => {
          const step = name.replace('--jowa-neutral-', '');
          return (
            <div key={name} style={{ ...s.swatchCard, border: 'none' }}>
              <div
                style={{
                  ...s.swatchBox,
                  height: 48,
                  background: `var(${name})`,
                  border: '1px solid var(--jowa-color-neutral-border, #e5e7eb)',
                  borderRadius: '8px 8px 0 0',
                }}
              />
              <div style={{ ...s.swatchMeta, padding: '0.375rem 0.5rem' }}>
                <div style={{ ...s.swatchName, fontSize: '0.6875rem' }}>
                  {step}
                </div>
                <div style={{ ...s.swatchValue, fontSize: '0.625rem' }}>
                  {t(name) || '—'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h3 style={s.h3}>Semantic Colors</h3>
      <div style={s.swatchGrid}>
        {semanticColors.map((name) => (
          <ColorSwatch key={name} name={name} value={t(name)} />
        ))}
      </div>

      <hr style={s.hr} />

      {/* ── Typography ── */}
      <h2 style={s.h2}>Typography</h2>
      <table style={s.tokenTable}>
        <thead>
          <tr>
            <th style={s.th}>Token</th>
            <th style={s.th}>Value</th>
            <th style={s.th}>Preview</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={s.td}>
              <span style={s.mono}>--jowa-font-family</span>
            </td>
            <td
              style={{ ...s.td, ...s.mono, color: 'var(--jowa-color-muted)' }}
            >
              {t('--jowa-font-family') || '—'}
            </td>
            <td style={s.td}>
              <span style={{ fontFamily: 'var(--jowa-font-family)' }}>
                The quick brown fox
              </span>
            </td>
          </tr>
          {fontSizeTokens.map(({ name, label }) => (
            <tr key={name}>
              <td style={s.td}>
                <span style={s.mono}>{name}</span>
              </td>
              <td
                style={{ ...s.td, ...s.mono, color: 'var(--jowa-color-muted)' }}
              >
                {t(name) || '—'}
              </td>
              <td style={s.td}>
                <span
                  style={{
                    fontSize: `var(${name})`,
                    fontFamily: 'var(--jowa-font-family)',
                  }}
                >
                  {label} — The quick brown fox
                </span>
              </td>
            </tr>
          ))}
          {[
            '--jowa-font-weight-normal',
            '--jowa-font-weight-medium',
            '--jowa-font-weight-semibold',
            '--jowa-font-weight-bold',
          ].map((name) => (
            <tr key={name}>
              <td style={s.td}>
                <span style={s.mono}>{name}</span>
              </td>
              <td
                style={{ ...s.td, ...s.mono, color: 'var(--jowa-color-muted)' }}
              >
                {t(name) || '—'}
              </td>
              <td style={s.td}>
                <span
                  style={{
                    fontWeight:
                      `var(${name})` as React.CSSProperties['fontWeight'],
                    fontFamily: 'var(--jowa-font-family)',
                  }}
                >
                  The quick brown fox
                </span>
              </td>
            </tr>
          ))}
          <tr>
            <td style={s.td}>
              <span style={s.mono}>--jowa-line-height</span>
            </td>
            <td
              style={{ ...s.td, ...s.mono, color: 'var(--jowa-color-muted)' }}
            >
              {t('--jowa-line-height') || '—'}
            </td>
            <td style={s.td}>
              <span style={{ lineHeight: 'var(--jowa-line-height)' }}>
                Line height sample
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <hr style={s.hr} />

      {/* ── Spacing ── */}
      <h2 style={s.h2}>Spacing</h2>
      <p style={s.p}>
        Spacing is derived from <code style={s.inlineCode}>--jowa-density</code>{' '}
        (default <code style={s.inlineCode}>0</code>). Set it to{' '}
        <code style={s.inlineCode}>-2</code> for compact or{' '}
        <code style={s.inlineCode}>2</code> for comfortable.
      </p>
      <div style={{ marginBottom: '1.5rem' }}>
        {spacingTokens.map((name) => {
          const value = t(name);
          const px = parseFloat(value) || 0;
          return (
            <div key={name} style={s.spacingRow}>
              <span style={s.spacingLabel}>{name}</span>
              <div style={{ ...s.spacingBar, width: Math.max(px * 2, 4) }} />
              <span style={s.spacingValue}>{value || '—'}</span>
            </div>
          );
        })}
      </div>

      <hr style={s.hr} />

      {/* ── Radius ── */}
      <h2 style={s.h2}>Border Radius</h2>
      <div style={s.radiusGrid}>
        {radiusTokens.map((name) => {
          const value = t(name);
          const label = name.replace('--jowa-radius-', '');
          return (
            <div key={name} style={s.radiusItem}>
              <div style={{ ...s.radiusBox, borderRadius: `var(${name})` }} />
              <div style={s.radiusLabel}>
                <div style={{ fontWeight: 600 }}>{label}</div>
                <div>{value || '—'}</div>
              </div>
            </div>
          );
        })}
      </div>

      <hr style={s.hr} />

      {/* ── Shadows ── */}
      <h2 style={s.h2}>Shadows</h2>
      <div style={s.shadowGrid}>
        {shadowTokens.map((name) => {
          const label = name.replace('--jowa-shadow-', '');
          return (
            <div key={name} style={s.shadowItem}>
              <div style={{ ...s.shadowBox, boxShadow: `var(${name})` }} />
              <div style={s.shadowLabel}>{label}</div>
            </div>
          );
        })}
      </div>

      <hr style={s.hr} />

      {/* ── Motion ── */}
      <h2 style={s.h2}>Motion</h2>
      <table style={s.tokenTable}>
        <thead>
          <tr>
            <th style={s.th}>Token</th>
            <th style={s.th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {motionTokens.map((name) => (
            <tr key={name}>
              <td style={s.td}>
                <span style={s.mono}>{name}</span>
              </td>
              <td style={s.td}>
                <span style={s.badge}>{t(name) || '—'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ── Story ────────────────────────────────────────────────────────────────── */

const meta: Meta = {
  title: 'Docs/Customize',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
    actions: { disable: true },
  },
};
export default meta;

type Story = StoryObj;
export const Customize: Story = {
  name: 'Customize',
  render: () => <CustomizePage />,
};
