import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../lib/components/progress/progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "success", "warning", "danger"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = { args: { value: 60 } };
export const WithLabel: Story = { args: { value: 45, label: "Uploading…", showValue: true } };
export const Success: Story = { args: { value: 100, variant: "success", label: "Complete", showValue: true } };
export const Warning: Story = { args: { value: 78, variant: "warning", label: "Storage", showValue: true } };
export const Danger: Story = { args: { value: 95, variant: "danger", label: "Memory", showValue: true } };

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </div>
  ),
};
