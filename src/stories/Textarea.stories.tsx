import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../lib/components/textarea/textarea";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "textColor", name: "Text", variables: ["--jowa-color-neutral-text"], category: "Field" },
  { key: "backgroundColor", name: "Background", variables: ["--jowa-color-neutral-bg"], category: "Field" },
  { key: "borderColor", name: "Border", variables: ["--jowa-color-neutral-border"], category: "Field" },
  { key: "focusColor", name: "Focus", variables: ["--jowa-color-primary"], category: "States" },
  { key: "errorColor", name: "Error", variables: ["--jowa-color-danger"], category: "States" },
  { key: "mutedColor", name: "Muted", variables: ["--jowa-color-muted"], category: "States" },
] as const;

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { label: "Message", placeholder: "Type your message…", rows: 4 },
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    disabled: { control: 'boolean' },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story   = {};
export const WithHint: Story  = { args: { hint: "Max 500 characters." } };
export const WithError: Story = { args: { error: "Message is required." } };
export const Disabled: Story  = { args: { disabled: true, value: "Read-only text" } };
export const NoResize: Story  = { args: { resize: "none" } };
