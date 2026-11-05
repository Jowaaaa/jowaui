import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../lib/components/input/input";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "background", name: "Background", variables: ["--jowa-input-background"], category: "Field" },
  { key: "text", name: "Text", variables: ["--jowa-input-foreground"], category: "Field" },
  { key: "label", name: "Label", variables: ["--jowa-input-label-color"], category: "Field" },
  { key: "border", name: "Border", variables: ["--jowa-input-border-color"], category: "Field" },
  { key: "placeholder", name: "Placeholder", variables: ["--jowa-input-placeholder-color"], category: "Field" },
  { key: "focus", name: "Focus", variables: ["--jowa-input-focus-color"], category: "States" },
  { key: "errorColor", name: "Error", variables: ["--jowa-input-error-color"], category: "States" },
] as const;

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { label: "Email", placeholder: "you@example.com", type: "email" },
};

export const WithHint: Story = {
  args: { label: "Username", placeholder: "jdoe", hint: "Only letters, numbers and underscores." },
};

export const WithError: Story = {
  args: { label: "Password", type: "password", value: "abc", error: "Password must be at least 8 characters.", readOnly: true },
};

export const Disabled: Story = {
  args: { label: "Disabled field", value: "Cannot edit", disabled: true },
};
