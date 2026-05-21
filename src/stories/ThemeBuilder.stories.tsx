import React, { useState, useCallback, useRef, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../lib/components/button/button";
import { Badge } from "../lib/components/badge/badge";
import { Alert } from "../lib/components/alert/alert";
import { Input } from "../lib/components/input/input";
import { Card } from "../lib/components/card/card";
import { Progress } from "../lib/components/progress/progress";
import { Switch } from "../lib/components/switch/switch";
import { Tabs } from "../lib/components/tabs/tabs";

/* ── Token definitions ────────────────────────────────────────────────────── */
interface TokenGroup {
  label: string;
  tokens: { key: string; label: string; type: "color" | "range" | "select"; min?: number; max?: number; step?: number; options?: string[] }[];
}

const TOKEN_GROUPS: TokenGroup[] = [
  {
    label: "Colors",
    tokens: [
      { key: "--jowa-blue-h",   label: "Primary hue",       type: "range", min: 0,   max: 360, step: 1 },
      { key: "--jowa-blue-c",   label: "Primary chroma",    type: "range", min: 0,   max: 0.4, step: 0.01 },
      { key: "--jowa-blue-l",   label: "Primary lightness", type: "range", min: 20,  max: 95,  step: 1 },
      { key: "--jowa-red-l",    label: "Danger lightness",  type: "range", min: 20,  max: 95,  step: 1 },
      { key: "--jowa-green-l",  label: "Success lightness", type: "range", min: 20,  max: 95,  step: 1 },
      { key: "--jowa-amber-l",  label: "Warning lightness", type: "range", min: 20,  max: 95,  step: 1 },
    ],
  },
  {
    label: "Shape",
    tokens: [
      { key: "--jowa-radius-sm",   label: "Radius SM",   type: "range", min: 0, max: 16, step: 1 },
      { key: "--jowa-radius-md",   label: "Radius MD",   type: "range", min: 0, max: 20, step: 1 },
      { key: "--jowa-radius-lg",   label: "Radius LG",   type: "range", min: 0, max: 24, step: 1 },
      { key: "--jowa-radius-xl",   label: "Radius XL",   type: "range", min: 0, max: 32, step: 1 },
    ],
  },
  {
    label: "Spacing & Density",
    tokens: [
      { key: "--jowa-density", label: "Density", type: "range", min: -2, max: 4, step: 1 },
    ],
  },
  {
    label: "Motion",
    tokens: [
      { key: "--jowa-duration-fast",   label: "Duration fast (ms)",   type: "range", min: 0, max: 600, step: 10 },
      { key: "--jowa-duration-normal", label: "Duration normal (ms)", type: "range", min: 0, max: 800, step: 10 },
      { key: "--jowa-duration-slow",   label: "Duration slow (ms)",   type: "range", min: 0, max: 1200, step: 25 },
    ],
  },
  {
    label: "Typography",
    tokens: [
      { key: "--jowa-font-size-sm", label: "Font size SM", type: "range", min: 10, max: 20, step: 1 },
      { key: "--jowa-font-size-md", label: "Font size MD", type: "range", min: 12, max: 24, step: 1 },
      { key: "--jowa-font-size-lg", label: "Font size LG", type: "range", min: 14, max: 28, step: 1 },
    ],
  },
];

/* Default values read from actual CSS variables at runtime */
function getDefaultValues(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const style = getComputedStyle(document.documentElement);
  const defaults: Record<string, string> = {};
  for (const group of TOKEN_GROUPS) {
    for (const token of group.tokens) {
      defaults[token.key] = style.getPropertyValue(token.key).trim();
    }
  }
  return defaults;
}

function formatValue(key: string, raw: string): string {
  // Duration tokens need "ms" suffix if bare number
  if (key.includes("duration")) return raw.endsWith("ms") ? raw : `${raw}ms`;
  // Radius tokens need "px" suffix
  if (key.includes("radius")) return raw.endsWith("px") ? raw : `${raw}px`;
  // Font size tokens need "rem"
  if (key.includes("font-size")) {
    const num = parseFloat(raw);
    return isNaN(num) ? raw : `${(num / 16).toFixed(4)}rem`;
  }
  return raw;
}

function parseNumeric(key: string, value: string): number {
  if (key.includes("duration")) return parseFloat(value) || 0;
  if (key.includes("radius"))   return parseFloat(value) || 0;
  if (key.includes("font-size")) return Math.round(parseFloat(value) * 16) || 16;
  return parseFloat(value) || 0;
}

/* ── Preview canvas ───────────────────────────────────────────────────────── */
const PreviewCanvas: React.FC<{ vars: Record<string, string> }> = ({ vars }) => {
  const [switchOn, setSwitchOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set primitive vars
    for (const [k, v] of Object.entries(vars)) {
      el.style.setProperty(k, v);
    }

    // Recompute derived color tokens that depend on blue/red/green/amber primitives
    // These are resolved at :root so they don't re-cascade from child overrides alone
    const blueL  = vars["--jowa-blue-l"]  ?? "52%";
    const blueC  = vars["--jowa-blue-c"]  ?? "0.22";
    const blueH  = vars["--jowa-blue-h"]  ?? "262";
    const redL   = vars["--jowa-red-l"]   ?? "53%";
    const greenL = vars["--jowa-green-l"] ?? "52%";
    const amberL = vars["--jowa-amber-l"] ?? "68%";

    const lNum = (v: string) => v.endsWith("%") ? v : `${v}%`;

    const blue500  = `oklch(${lNum(blueL)} ${blueC} ${blueH})`;
    const blue600  = `oklch(${Math.max(0, parseFloat(blueL) - 8)}% ${blueC} ${blueH})`;
    const blue50   = `oklch(97% 0.03 ${blueH})`;
    const red500   = `oklch(${lNum(redL)} 0.22 25)`;
    const red600   = `oklch(${Math.max(0, parseFloat(redL) - 8)}% 0.22 25)`;
    const red50    = `oklch(97% 0.04 25)`;
    const green500 = `oklch(${lNum(greenL)} 0.17 155)`;
    const green50  = `oklch(97% 0.04 155)`;
    const amber500 = `oklch(${lNum(amberL)} 0.18 75)`;
    const amber50  = `oklch(98% 0.04 75)`;

    el.style.setProperty("--jowa-blue-500",  blue500);
    el.style.setProperty("--jowa-blue-600",  blue600);
    el.style.setProperty("--jowa-blue-50",   blue50);
    el.style.setProperty("--jowa-color-primary",       blue500);
    el.style.setProperty("--jowa-color-primary-hover", blue600);
    el.style.setProperty("--jowa-color-primary-bg",    blue50);

    el.style.setProperty("--jowa-red-500",  red500);
    el.style.setProperty("--jowa-red-600",  red600);
    el.style.setProperty("--jowa-red-50",   red50);
    el.style.setProperty("--jowa-color-danger",       red500);
    el.style.setProperty("--jowa-color-danger-hover", red600);
    el.style.setProperty("--jowa-color-danger-bg",    red50);

    el.style.setProperty("--jowa-green-500", green500);
    el.style.setProperty("--jowa-green-50",  green50);
    el.style.setProperty("--jowa-color-success",    green500);
    el.style.setProperty("--jowa-color-success-bg", green50);

    el.style.setProperty("--jowa-amber-500", amber500);
    el.style.setProperty("--jowa-amber-50",  amber50);
    el.style.setProperty("--jowa-color-warning",    amber500);
    el.style.setProperty("--jowa-color-warning-bg", amber50);
  }, [vars]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="neutral">Neutral</Badge>
      </div>

      <Alert variant="info" title="Info alert">This is how info alerts look.</Alert>
      <Alert variant="success" title="Success!">Action completed successfully.</Alert>

      <Progress label="Upload progress" value={68} size="md" variant="primary" />

      <Card header="Card component">
        <Input label="Your name" placeholder="Enter your name..." />
        <div style={{ marginTop: "0.75rem" }}>
          <Switch label="Enable notifications" checked={switchOn} onChange={(e) => setSwitchOn(e.target.checked)} />
        </div>
      </Card>

      <Tabs
        variant="pill"
        items={[
          { value: "a", label: "Overview",  content: <p style={{ margin: 0, color: "var(--jowa-color-neutral-text)" }}>Overview tab content</p> },
          { value: "b", label: "Analytics", content: <p style={{ margin: 0, color: "var(--jowa-color-neutral-text)" }}>Analytics tab content</p> },
          { value: "c", label: "Settings",  content: <p style={{ margin: 0, color: "var(--jowa-color-neutral-text)" }}>Settings tab content</p> },
        ]}
      />
    </div>
  );
};

/* ── Theme Builder ────────────────────────────────────────────────────────── */
const ThemeBuilderComponent: React.FC = () => {
  const [vars, setVars] = useState<Record<string, string>>(() => getDefaultValues());
  const [copied, setCopied] = useState(false);
  const [activeGroup, setActiveGroup] = useState(TOKEN_GROUPS[0].label);

  const handleChange = useCallback((key: string, raw: string) => {
    setVars((prev) => ({ ...prev, [key]: formatValue(key, raw) }));
  }, []);

  const reset = () => setVars(getDefaultValues());

  const exportCSS = () => {
    const lines = Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join("\n");
    const css = `:root {\n${lines}\n}`;
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const activeTokens = TOKEN_GROUPS.find((g) => g.label === activeGroup)?.tokens ?? [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.5rem", minHeight: "600px", fontFamily: "var(--jowa-font-family)" }}>
      {/* Controls panel */}
      <div style={{ background: "var(--jowa-color-surface)", borderRadius: "var(--jowa-radius-xl)", border: "1px solid var(--jowa-color-neutral-border)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Group tabs */}
        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid var(--jowa-color-neutral-border)" }}>
          {TOKEN_GROUPS.map((g) => (
            <button
              key={g.label}
              onClick={() => setActiveGroup(g.label)}
              style={{
                padding: "0.5rem 1rem",
                background: activeGroup === g.label ? "var(--jowa-color-primary-bg)" : "none",
                color: activeGroup === g.label ? "var(--jowa-color-primary)" : "var(--jowa-color-muted)",
                fontWeight: activeGroup === g.label ? 600 : 400,
                border: "none",
                borderLeft: activeGroup === g.label ? "3px solid var(--jowa-color-primary)" : "3px solid transparent",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.875rem",
                fontFamily: "var(--jowa-font-family)",
                transition: "background 150ms ease, color 150ms ease",
              }}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Token controls */}
        <div style={{ flex: 1, padding: "1rem", overflow: "auto", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {activeTokens.map((token) => {
            const raw = vars[token.key] ?? "";
            const numeric = parseNumeric(token.key, raw);
            return (
              <div key={token.key}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <label style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--jowa-color-neutral-text)" }}>
                    {token.label}
                  </label>
                  <code style={{ fontSize: "0.75rem", color: "var(--jowa-color-primary)", background: "var(--jowa-color-primary-bg)", padding: "1px 6px", borderRadius: "4px" }}>
                    {raw}
                  </code>
                </div>
                <input
                  type="range"
                  min={token.min}
                  max={token.max}
                  step={token.step}
                  value={numeric}
                  onChange={(e) => handleChange(token.key, e.target.value)}
                  style={{ width: "100%", accentColor: "var(--jowa-color-primary)" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6875rem", color: "var(--jowa-color-muted)" }}>
                  <span>{token.min}</span>
                  <span>{token.max}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div style={{ padding: "1rem", borderTop: "1px solid var(--jowa-color-neutral-border)", display: "flex", gap: "0.5rem" }}>
          <Button size="sm" variant="primary" onClick={exportCSS} style={{ flex: 1 }}>
            {copied ? "✓ Copied!" : "Copy CSS"}
          </Button>
          <Button size="sm" variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Live preview */}
      <div style={{ background: "var(--jowa-color-neutral-bg)", borderRadius: "var(--jowa-radius-xl)", border: "1px solid var(--jowa-color-neutral-border)", padding: "1.5rem", overflow: "auto" }}>
        <p style={{ margin: "0 0 1.25rem", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--jowa-color-muted)" }}>
          Live preview
        </p>
        <PreviewCanvas vars={vars} />
      </div>
    </div>
  );
};

/* ── Story ────────────────────────────────────────────────────────────────── */
const meta: Meta = {
  title: "Theme/Theme Builder",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Live theme builder — adjust tokens and see all components update in real time. Click **Copy CSS** to export your overrides.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;
export const Builder: Story = {
  render: () => <ThemeBuilderComponent />,
};
