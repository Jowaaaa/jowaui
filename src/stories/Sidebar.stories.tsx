import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "../lib/components/sidebar/sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const groups = [
  {
    heading: "Main",
    items: [
      { label: "Dashboard", icon: "⊞", active: true },
      { label: "Projects", icon: "📁" },
      { label: "Tasks", icon: "✓" },
    ],
  },
  {
    heading: "Settings",
    items: [
      { label: "Profile", icon: "👤" },
      { label: "Billing", icon: "💳" },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ display: "flex", height: "400px" }}>
      <Sidebar groups={groups} header="jowaui" footer="v0.1.0" />
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <div style={{ display: "flex", height: "400px" }}>
      <Sidebar groups={groups} collapsed />
    </div>
  ),
};
