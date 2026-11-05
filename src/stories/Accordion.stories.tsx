import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accordion } from "../lib/components/accordion/accordion";
import type { AccordionItem, AccordionProps } from "../lib/components/accordion/accordion";

const ITEMS: AccordionItem[] = [
  {
    id: "item-1",
    title: "What is jowaui?",
    content: "jowaui is a zero-dependency React component library built with CSS custom properties.",
  },
  {
    id: "item-2",
    title: "How do I install it?",
    content: "Run npm install jowaui and import the components you need.",
  },
  {
    id: "item-3",
    title: "Is it accessible?",
    content: "Yes — all components follow WCAG AA guidelines with proper ARIA attributes and keyboard navigation.",
  },
  {
    id: "item-4",
    title: "This item is disabled",
    content: "You should not be able to open this.",
    disabled: true,
  },
];

type AccordionStoryArgs = AccordionProps & {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  hoverColor: string;
  accentColor: string;
  contentBackgroundColor: string;
  contentTextColor: string;
};

const DEFAULT_COLORS = {
  backgroundColor: "#ffffff",
  textColor: "#1f2937",
  borderColor: "#e5e7eb",
  hoverColor: "#f8fafc",
  accentColor: "#2563eb",
  contentBackgroundColor: "#ffffff",
  contentTextColor: "#1f2937",
};

const CSS_VARIABLES = [
  ["--jowa-accordion-background", "backgroundColor"],
  ["--jowa-accordion-text", "textColor"],
  ["--jowa-accordion-border", "borderColor"],
  ["--jowa-accordion-hover", "hoverColor"],
  ["--jowa-accordion-accent", "accentColor"],
  ["--jowa-accordion-content-background", "contentBackgroundColor"],
  ["--jowa-accordion-content-text", "contentTextColor"],
] as const;

const STORY_VARIABLES = [
  ["--jowa-editor-accordion-background", "backgroundColor"],
  ["--jowa-editor-accordion-foreground", "textColor"],
  ["--jowa-editor-accordion-border", "borderColor"],
  ["--jowa-editor-accordion-hover", "hoverColor"],
  ["--jowa-editor-accordion-accent", "accentColor"],
  ["--jowa-editor-accordion-content-background", "contentBackgroundColor"],
  ["--jowa-editor-accordion-content-foreground", "contentTextColor"],
] as const;

function CopyCssButton({ colors }: { colors: Pick<AccordionStoryArgs, "backgroundColor" | "textColor" | "borderColor" | "hoverColor" | "accentColor" | "contentBackgroundColor" | "contentTextColor"> }) {
  const [copied, setCopied] = useState(false);

  const copyCss = async () => {
    const css = [
      ".jowa-accordion {",
      ...CSS_VARIABLES.map(([variable, key]) => `  ${variable}: ${colors[key]};`),
      "}",
    ].join("\n");
    await navigator.clipboard.writeText(css);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copyCss}
      style={{
        border: "1px solid var(--jowa-color-neutral-border)",
        borderRadius: "var(--jowa-radius-sm)",
        background: "var(--jowa-color-neutral-bg)",
        color: "var(--jowa-color-neutral-text)",
        padding: "0.45rem 0.75rem",
        cursor: "pointer",
        font: "500 0.8125rem var(--jowa-font-family)",
      }}
    >
      {copied ? "CSS copied" : "Copy CSS"}
    </button>
  );
}

const renderAccordion = (args: AccordionStoryArgs) => {
  const {
    backgroundColor,
    textColor,
    borderColor,
    hoverColor,
    accentColor,
    contentBackgroundColor,
    contentTextColor,
    ...accordionProps
  } = args;
  const colors = { backgroundColor, textColor, borderColor, hoverColor, accentColor, contentBackgroundColor, contentTextColor };
  const style = Object.fromEntries(
    STORY_VARIABLES.map(([variable, key]) => [variable, colors[key]]),
  ) as React.CSSProperties;

  return (
    <div style={{ ...style, display: "grid", gap: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CopyCssButton colors={colors} />
      </div>
      <Accordion {...accordionProps} />
    </div>
  );
};

const meta: Meta<AccordionStoryArgs> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: { items: ITEMS, ...DEFAULT_COLORS },
  argTypes: {
    multiple: { control: 'boolean' },
    backgroundColor: { control: "color", table: { category: "Colors" } },
    textColor: { control: "color", table: { category: "Colors" } },
    borderColor: { control: "color", table: { category: "Colors" } },
    hoverColor: { control: "color", table: { category: "Colors" } },
    accentColor: { control: "color", table: { category: "Colors" } },
    contentBackgroundColor: { control: "color", table: { category: "Content colors" } },
    contentTextColor: { control: "color", table: { category: "Content colors" } },
  },
  render: renderAccordion,
};

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

export const Default: Story = {
  render: (args) => <React.Fragment key={String(args.multiple) + String(args.defaultOpen)}>{renderAccordion(args)}</React.Fragment>,
};

export const Multiple: Story = {
  args: { multiple: true, defaultOpen: ["item-1", "item-2"] },
};

export const DefaultOpen: Story = {
  args: { defaultOpen: ["item-2"] },
};
