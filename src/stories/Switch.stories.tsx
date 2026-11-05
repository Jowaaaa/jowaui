import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "../lib/components/switch/switch";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "trackColor", name: "Track", variables: ["--jowa-color-neutral-border"], category: "Switch" },
  { key: "checkedColor", name: "Checked track", variables: ["--jowa-color-primary"], category: "Switch" },
  { key: "textColor", name: "Text", variables: ["--jowa-color-neutral-text"], category: "Switch" },
  { key: "hintColor", name: "Hint", variables: ["--jowa-color-muted"], category: "Switch" },
] as const;

const meta: Meta<typeof Switch> = {
  title: "Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { label: "Enable notifications" },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    labelPosition: { control: 'select', options: ['left', 'right'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
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
