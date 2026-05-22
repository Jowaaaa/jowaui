import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPicker } from "../lib/components/colorpicker/colorpicker";

const meta: Meta<typeof ColorPicker> = {
  title: "Forms/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  args: {
    label: "Brand Color",
    defaultValue: "#6366f1",
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    hint: "Enter a valid hex color (e.g. #ff0000)",
  },
};

export const WithError: Story = {
  args: {
    error: "Invalid color value",
    defaultValue: "#zzzzzz",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "#3b82f6",
  },
};

export const NoLabel: Story = {
  args: {
    label: undefined,
    defaultValue: "#10b981",
  },
};
