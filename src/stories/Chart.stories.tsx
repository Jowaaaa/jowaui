import type { Meta, StoryObj } from "@storybook/react";
import { Chart } from "../lib/components/chart/chart";

const meta: Meta<typeof Chart> = {
  title: "Components/Chart",
  component: Chart,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: ["bar", "line"] },
    showGrid: { control: "boolean" },
    showLabels: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Chart>;

const data = [
  { label: "Jan", value: 40 },
  { label: "Feb", value: 65 },
  { label: "Mar", value: 50 },
  { label: "Apr", value: 80 },
  { label: "May", value: 72 },
  { label: "Jun", value: 90 },
];

export const Bar: Story = { args: { data, type: "bar" } };
export const Line: Story = { args: { data, type: "line" } };
export const CustomColor: Story = { args: { data, type: "bar", color: "#16a34a" } };
