import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../lib/components/badge/badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = { args: { children: "Neutral", variant: "neutral" } };
export const Primary: Story = { args: { children: "Primary", variant: "primary" } };
export const Success: Story = { args: { children: "Success", variant: "success" } };
export const Warning: Story = { args: { children: "Warning", variant: "warning" } };
export const Danger: Story = { args: { children: "Danger", variant: "danger" } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Error</Badge>
    </div>
  ),
};
