import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tree } from "../lib/components/tree/tree";
import type { TreeNode } from "../lib/components/tree/tree";

const meta: Meta<typeof Tree> = {
  title: "Components/Tree",
  component: Tree,
  tags: ["autodocs"],
  argTypes: {
    selected: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

const fileTree: TreeNode[] = [
  {
    id: "src",
    label: "src",
    icon: "📁",
    children: [
      {
        id: "components",
        label: "components",
        icon: "📁",
        children: [
          { id: "button", label: "Button.tsx", icon: "📄" },
          { id: "input", label: "Input.tsx", icon: "📄" },
          { id: "modal", label: "Modal.tsx", icon: "📄" },
        ],
      },
      {
        id: "styles",
        label: "styles",
        icon: "📁",
        children: [
          { id: "tokens", label: "tokens.css", icon: "🎨" },
          { id: "global", label: "global.css", icon: "🎨" },
        ],
      },
      { id: "index", label: "index.ts", icon: "📄" },
    ],
  },
  {
    id: "public",
    label: "public",
    icon: "📁",
    children: [{ id: "favicon", label: "favicon.svg", icon: "🖼️" }],
  },
  { id: "package", label: "package.json", icon: "📄" },
  { id: "readme", label: "README.md", icon: "📝", disabled: true },
];

export const Default: Story = {
  render: (args) => <Tree key={JSON.stringify(args.defaultExpanded)} {...args} />,
  args: {
    nodes: fileTree,
    defaultExpanded: ["src"],
  },
};

export const WithSelection: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string>("button");
    return <Tree {...args} selected={selected} onSelect={setSelected} />;
  },
  args: {
    nodes: fileTree,
    defaultExpanded: ["src", "components"],
  },
};

export const AllExpanded: Story = {
  args: {
    nodes: fileTree,
    defaultExpanded: ["src", "components", "styles", "public"],
  },
};

export const Simple: Story = {
  args: {
    nodes: [
      { id: "a", label: "Item A" },
      {
        id: "b",
        label: "Item B",
        children: [
          { id: "b1", label: "Item B1" },
          { id: "b2", label: "Item B2" },
        ],
      },
      { id: "c", label: "Item C (disabled)", disabled: true },
    ],
    defaultExpanded: ["b"],
  },
};
