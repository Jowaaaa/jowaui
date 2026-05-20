import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../lib/components/switch/switch";

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { label: "Enable notifications" },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story  = {};
export const Checked: Story  = { args: { defaultChecked: true } };
export const Small: Story    = { args: { size: "sm" } };
export const Large: Story    = { args: { size: "lg" } };
export const LabelLeft: Story = { args: { labelPosition: "left" } };
export const WithHint: Story  = { args: { hint: "You can change this later in settings." } };
export const Disabled: Story  = { args: { disabled: true, defaultChecked: true } };
