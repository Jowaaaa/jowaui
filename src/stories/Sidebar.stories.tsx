import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "../lib/components/sidebar/sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "400px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    collapsed: { control: "boolean" },
    header: { control: "text" },
    footer: { control: "text" },
  },
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
  render: (args) => {
    const [collapsed, setCollapsed] = useState(args.collapsed ?? false);
    return (
      <Sidebar
        {...args}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        key={args.collapsed ? "collapsed" : "expanded"}
      />
    );
  },
  args: {
    groups,
    header: "jowaui",
    footer: "v0.1.1",
    collapsed: false,
  },
};

export const Collapsed: Story = {
  args: {
    groups,
    header: "jowaui",
    collapsed: true,
  },
};
