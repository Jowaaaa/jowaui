import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatCard } from "../lib/components/statcard/statcard";
import { Sparkline } from "../lib/components/sparkline/sparkline";

const meta: Meta<typeof StatCard> = {
  title: "Components/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  args: {
    label: "Total Revenue",
    value: "$48,295",
    change: "+12.4%",
    trend: "up",
  },
};
export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {};

export const WithChart: Story = {
  args: {
    label: "Active Users",
    value: "3,842",
    change: "+8.1%",
    trend: "up",
    chart: <Sparkline data={[22, 31, 28, 40, 36, 50, 45, 62, 58, 72]} width={100} height={32} />,
  },
};

export const Down: Story = {
  args: {
    label: "Bounce Rate",
    value: "43.2",
    unit: "%",
    change: "-2.3%",
    trend: "down",
    chart: <Sparkline data={[55, 52, 49, 50, 47, 44, 43]} width={100} height={32} color="oklch(52% 0.22 25)" />,
  },
};

export const Neutral: Story = {
  args: {
    label: "Avg. Session",
    value: "4m 22s",
    change: "0.0%",
    trend: "neutral",
    icon: "⏱",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Orders",
    value: "1,204",
    change: "+23",
    trend: "up",
    icon: "🛒",
  },
};
