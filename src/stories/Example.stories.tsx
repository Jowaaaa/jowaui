import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Example",
  parameters: {
    layout: "centered",
    docs: { disable: true },
    controls: { disable: true },
    actions: { disable: true },
  },
};

export default meta;

type Story = StoryObj;

export const LiveWebsite: Story = {
  name: "Example",
  render: () => (
    <main
      style={{
        display: "grid",
        gap: "1rem",
        maxWidth: "34rem",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>See jowaui in action</h1>
      <p
        style={{
          margin: 0,
          color: "var(--jowa-color-neutral-text-muted, #64748b)",
        }}
      >
        Explore the live example website to see the component library in use.
      </p>
      <a
        href="https://jowaui-example.jobvanderwal.dev/"
        target="_blank"
        rel="noreferrer"
        style={{
          justifySelf: "center",
          color: "var(--jowa-color-primary, #2563eb)",
          fontWeight: 700,
        }}
      >
        Open the example website
      </a>
    </main>
  ),
};
