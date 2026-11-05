import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "../lib/components/datepicker/datepicker";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "textColor", name: "Text", variables: ["--jowa-color-neutral-text"], category: "Field" },
  { key: "backgroundColor", name: "Background", variables: ["--jowa-color-neutral-bg"], category: "Field" },
  { key: "borderColor", name: "Border", variables: ["--jowa-color-neutral-border"], category: "Field" },
  { key: "focusColor", name: "Focus", variables: ["--jowa-color-primary"], category: "States" },
  { key: "errorColor", name: "Error", variables: ["--jowa-color-danger"], category: "States" },
  { key: "mutedColor", name: "Muted", variables: ["--jowa-color-muted"], category: "States" },
] as const;

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: { label: "Date of birth" },
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
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "Select your date of birth" },
};

export const WithError: Story = {
  args: { error: "Date is required" },
};

export const Disabled: Story = {
  args: { disabled: true, value: "2024-01-15" },
};
