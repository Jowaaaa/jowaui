import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContextMenu } from "../lib/components/contextmenu/contextmenu";
import type { ContextMenuEntry } from "../lib/components/contextmenu/contextmenu";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

const defaultItems: ContextMenuEntry[] = [
  { id: "open", label: "Open" },
  { id: "rename", label: "Rename" },
  { id: "duplicate", label: "Duplicate" },
  { id: "sep1", separator: true },
  { id: "share", label: "Share" },
  { id: "sep2", separator: true },
  { id: "delete", label: "Delete", danger: true },
];

const trigger = (
  <div
    style={{
      padding: "32px",
      border: "2px dashed #ccc",
      borderRadius: "8px",
      textAlign: "center",
      color: "#666",
      userSelect: "none",
    }}
  >
    Right-click anywhere in this area
  </div>
);

export const Default: Story = {
  args: {
    items: defaultItems,
    onSelect: (id: string) => alert(`Selected: ${id}`),
    children: trigger,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { id: "edit", label: "Edit", icon: "✏️" },
      { id: "copy", label: "Copy", icon: "📋" },
      { id: "paste", label: "Paste", icon: "📌" },
      { id: "sep1", separator: true },
      { id: "delete", label: "Delete", icon: "🗑️", danger: true },
    ] as ContextMenuEntry[],
    onSelect: (id: string) => alert(`Selected: ${id}`),
    children: trigger,
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: "open", label: "Open" },
      { id: "rename", label: "Rename", disabled: true },
      { id: "sep1", separator: true },
      { id: "delete", label: "Delete", danger: true, disabled: true },
    ] as ContextMenuEntry[],
    onSelect: (id: string) => alert(`Selected: ${id}`),
    children: trigger,
  },
};
