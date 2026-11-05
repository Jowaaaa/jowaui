import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../lib/components/badge/badge";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "neutralBackground", name: "Neutral background", variables: ["--jowa-color-surface"], category: "Neutral" },
  { key: "neutralText", name: "Neutral text", variables: ["--jowa-color-muted"], category: "Neutral" },
  { key: "primaryBackground", name: "Primary background", variables: ["--jowa-badge-primary-background"], category: "Primary" },
  { key: "primaryText", name: "Primary text", variables: ["--jowa-badge-primary-foreground"], category: "Primary" },
  { key: "successBackground", name: "Success background", variables: ["--jowa-badge-success-background"], category: "Success" },
  { key: "successText", name: "Success text", variables: ["--jowa-badge-success-foreground"], category: "Success" },
  { key: "warningBackground", name: "Warning background", variables: ["--jowa-badge-warning-background"], category: "Warning" },
  { key: "warningText", name: "Warning text", variables: ["--jowa-badge-warning-foreground"], category: "Warning" },
  { key: "dangerBackground", name: "Danger background", variables: ["--jowa-badge-danger-background"], category: "Danger" },
  { key: "dangerText", name: "Danger text", variables: ["--jowa-badge-danger-foreground"], category: "Danger" },
] as const;

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "danger"],
    },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
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
