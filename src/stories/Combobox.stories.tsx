import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "../lib/components/combobox/combobox";
import "../lib/components/combobox/combobox.css";

const OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "durian", label: "Durian", disabled: true },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
  { value: "grape", label: "Grape" },
  { value: "honeydew", label: "Honeydew" },
];

const meta: Meta<typeof Combobox> = {
  title: "Forms/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  args: { options: OPTIONS, placeholder: "Search fruit…" },
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: "banana" },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "apple" },
};

export const FewOptions: Story = {
  args: {
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    placeholder: "Choose…",
  },
};
