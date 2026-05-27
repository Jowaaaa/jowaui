import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "../lib/components/checkbox/checkbox";

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
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story       = {};
export const Checked: Story       = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: "Select all" } };
export const WithHint: Story      = { args: { hint: "Required to continue." } };
export const WithError: Story     = { args: { error: "You must accept the terms." } };
export const Disabled: Story      = { args: { disabled: true } };
