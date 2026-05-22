import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "../lib/components/select/select";

const OPTIONS = [
  { value: "apple",  label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian", disabled: true },
];

const meta: Meta<typeof Select> = {
  title: "Forms/Select",
  component: Select,
  tags: ["autodocs"],
  args: { options: OPTIONS, label: "Fruit", placeholder: "Choose a fruit…" },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const WithHint: Story  = { args: { hint: "Pick your favourite." } };
export const WithError: Story = { args: { error: "Please select an option." } };
export const Disabled: Story  = { args: { disabled: true, value: "apple" } };
export const Small: Story     = { args: { size: "sm" } };
export const Large: Story     = { args: { size: "lg" } };
