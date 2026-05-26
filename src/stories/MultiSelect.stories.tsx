import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect } from "../lib/components/multiselect/multiselect";
import "../lib/components/multiselect/multiselect.css";

const OPTIONS = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "qwik", label: "Qwik" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Forms/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
  args: { options: OPTIONS, placeholder: "Select frameworks…" },
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: ["react", "svelte"] },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: ["react"] },
};

export const ManySelected: Story = {
  args: { defaultValue: ["react", "vue", "angular", "svelte"] },
};
