import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timeline } from "../lib/components/timeline/timeline";
import type { TimelineItem } from "../lib/components/timeline/timeline";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

const sampleItems: TimelineItem[] = [
  {
    id: 1,
    title: "Order placed",
    description: "Your order #1042 has been received.",
    timestamp: "Today, 09:14",
    variant: "info",
  },
  {
    id: 2,
    title: "Payment confirmed",
    description: "Payment of €49.99 was successfully processed.",
    timestamp: "Today, 09:15",
    variant: "success",
  },
  {
    id: 3,
    title: "Processing",
    description: "Your order is being prepared for shipment.",
    timestamp: "Today, 11:30",
    variant: "default",
  },
  {
    id: 4,
    title: "Shipment delayed",
    description: "There is a slight delay due to high demand.",
    timestamp: "Today, 14:00",
    variant: "warning",
  },
  {
    id: 5,
    title: "Delivered",
    description: "Package delivered to your address.",
    timestamp: "Tomorrow, 13:22",
    variant: "success",
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: sampleItems.map((item) => ({
      ...item,
      icon: "✓",
    })),
  },
};

export const Minimal: Story = {
  args: {
    items: [
      { id: 1, title: "Step one", variant: "success" },
      { id: 2, title: "Step two", variant: "success" },
      { id: 3, title: "Step three (current)", variant: "info" },
      { id: 4, title: "Step four" },
    ],
  },
};
