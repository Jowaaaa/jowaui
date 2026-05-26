import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RichTextEditor } from "../lib/components/richtexteditor/richtexteditor";

const meta: Meta<typeof RichTextEditor> = {
  title: "Forms/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {
  args: {
    placeholder: "Start typing your content…",
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue:
      "<h1>Welcome</h1><p>This editor supports <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and more.</p><ul><li>Bullet lists</li><li>Ordered lists</li><li>Links</li></ul>",
    placeholder: "Start typing…",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "<p>This editor is <strong>disabled</strong> and cannot be edited.</p>",
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [html, setHtml] = React.useState<string>("<p>Controlled value</p>");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <RichTextEditor value={html} onChange={setHtml} placeholder="Type here…" />
        <details>
          <summary style={{ fontSize: "0.8rem", color: "var(--jowa-color-muted)", cursor: "pointer" }}>
            Raw HTML output
          </summary>
          <pre
            style={{
              marginTop: 8,
              padding: 12,
              background: "var(--jowa-color-surface)",
              border: "1px solid var(--jowa-color-neutral-border)",
              borderRadius: "var(--jowa-radius-md)",
              fontSize: "0.75rem",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {html}
          </pre>
        </details>
      </div>
    );
  },
};
