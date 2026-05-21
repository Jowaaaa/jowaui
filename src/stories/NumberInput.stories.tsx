import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "../lib/components/numberinput/numberinput";

const meta: Meta<typeof NumberInput> = {
  title: "Forms/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  args: {
    label: "Quantity",
    defaultValue: 5,
    min: 0,
    max: 20,
    step: 1,
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "Enter a value between 0 and 20",
  },
};

export const WithError: Story = {
  args: {
    error: "Value must be at least 1",
    defaultValue: 0,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 10,
  },
};

export const AtMin: Story = {
  args: {
    defaultValue: 0,
    min: 0,
  },
};

export const AtMax: Story = {
  args: {
    defaultValue: 20,
    max: 20,
  },
};

export const LargeStep: Story = {
  args: {
    label: "Price",
    defaultValue: 100,
    step: 10,
    min: 0,
    max: 1000,
    hint: "Increments by 10",
  },
};
