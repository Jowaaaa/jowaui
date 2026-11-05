import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../lib/components/checkbox/checkbox";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "textColor", name: "Text", variables: ["--jowa-color-neutral-text"], category: "Checkbox" },
  { key: "backgroundColor", name: "Background", variables: ["--jowa-color-neutral-bg"], category: "Checkbox" },
  { key: "borderColor", name: "Border", variables: ["--jowa-color-neutral-border"], category: "Checkbox" },
  { key: "checkedColor", name: "Checked", variables: ["--jowa-color-primary"], category: "States" },
  { key: "errorColor", name: "Error", variables: ["--jowa-color-danger"], category: "States" },
  { key: "hintColor", name: "Hint", variables: ["--jowa-color-muted"], category: "States" },
] as const;

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "I agree to the terms" },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story       = {};
export const Checked: Story       = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: "Select all" } };
export const WithHint: Story      = { args: { hint: "Required to continue." } };
export const WithError: Story     = { args: { error: "You must accept the terms." } };
export const Disabled: Story      = { args: { disabled: true } };
