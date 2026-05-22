import type { Meta, StoryObj } from "@storybook/react-vite";
import { Gauge } from "../lib/components/gauge/gauge";

const meta: Meta<typeof Gauge> = {
  title: "Components/Gauge",
  component: Gauge,
  tags: ["autodocs"],
  args: {
    value: 68,
    max: 100,
    size: 120,
    strokeWidth: 10,
    variant: "primary",
    label: "CPU",
  },
};
export default meta;
type Story = StoryObj<typeof Gauge>;

export const Default: Story = {};

export const Success: Story = { args: { value: 82, variant: "success", label: "Uptime" } };
export const Warning: Story = { args: { value: 55, variant: "warning", label: "Memory" } };
export const Danger:  Story = { args: { value: 92, variant: "danger",  label: "Disk"   } };

export const Small: Story = { args: { size: 80, strokeWidth: 7, label: undefined } };
export const Large: Story = { args: { size: 160, strokeWidth: 14 } };
