import type { Meta, StoryObj } from "@storybook/react";
import { Sparkline } from "../lib/components/sparkline/sparkline";

const meta: Meta<typeof Sparkline> = {
  title: "Components/Sparkline",
  component: Sparkline,
  tags: ["autodocs"],
  args: {
    data: [3, 7, 2, 9, 4, 11, 6, 14, 8, 12],
    width: 120,
    height: 36,
    filled: true,
    showLastDot: true,
  },
};
export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Default: Story = {};

export const NoFill: Story = { args: { filled: false } };

export const CustomColor: Story = {
  args: { color: "oklch(55% 0.22 140)" },
};

export const Wide: Story = {
  args: { data: [5, 3, 8, 2, 10, 7, 4, 9, 6, 11, 8, 14], width: 200, height: 48 },
};

export const Danger: Story = {
  args: { data: [14, 11, 9, 7, 5, 3, 2, 1], color: "oklch(52% 0.22 25)" },
};
