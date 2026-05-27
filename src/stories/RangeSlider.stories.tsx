import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RangeSlider } from "../lib/components/rangeslider/rangeslider";
import "../lib/components/rangeslider/rangeslider.css";

const meta: Meta<typeof RangeSlider> = {
  title: "Forms/RangeSlider",
  component: RangeSlider,
  tags: ["autodocs"],
  args: { min: 0, max: 100, step: 1, showTooltip: true },
  argTypes: {
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
    step: { control: { type: "number" } },
    disabled: { control: "boolean" },
    showTooltip: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Single: Story = {
  render: (args) => <RangeSlider key={JSON.stringify(args.defaultValue)} {...args} />,
  args: { defaultValue: 40 },
};

export const Dual: Story = {
  render: (args) => <RangeSlider key={JSON.stringify(args.defaultValue)} {...args} />,
  args: { defaultValue: [20, 70] },
};

export const WithStep: Story = {
  render: (args) => <RangeSlider key={JSON.stringify(args.defaultValue)} {...args} />,
  args: { defaultValue: 50, step: 10 },
};

export const DualWithStep: Story = {
  render: (args) => <RangeSlider key={JSON.stringify(args.defaultValue)} {...args} />,
  args: { defaultValue: [20, 80], step: 5 },
};

export const NoTooltip: Story = {
  render: (args) => <RangeSlider key={JSON.stringify(args.defaultValue)} {...args} />,
  args: { defaultValue: 60, showTooltip: false },
};

export const Disabled: Story = {
  render: (args) => <RangeSlider key={JSON.stringify(args.defaultValue)} {...args} />,
  args: { defaultValue: 40, disabled: true },
};

export const DisabledDual: Story = {
  render: (args) => <RangeSlider key={JSON.stringify(args.defaultValue)} {...args} />,
  args: { defaultValue: [30, 70], disabled: true },
};
