import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../lib/components/input/input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
    disabled: { control: 'boolean' },
  },
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
