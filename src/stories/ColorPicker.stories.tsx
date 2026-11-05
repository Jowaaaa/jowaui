import type { Meta, StoryObj } from "@storybook/react-vite";
import { ColorPicker } from "../lib/components/colorpicker/colorpicker";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "textColor", name: "Text", variables: ["--jowa-color-neutral-text"], category: "Field" },
  { key: "backgroundColor", name: "Background", variables: ["--jowa-color-neutral-bg"], category: "Field" },
  { key: "borderColor", name: "Border", variables: ["--jowa-color-neutral-border"], category: "Field" },
  { key: "errorColor", name: "Error", variables: ["--jowa-color-danger"], category: "States" },
  { key: "hintColor", name: "Hint", variables: ["--jowa-color-muted"], category: "States" },
] as const;

const meta: Meta<typeof ColorPicker> = {
  title: "Forms/ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  args: {
    label: "Brand Color",
    defaultValue: "#6366f1",
  },
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
    disabled: { control: 'boolean' },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
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
