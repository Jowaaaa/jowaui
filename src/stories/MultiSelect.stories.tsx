import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelect } from "../lib/components/multiselect/multiselect";
import "../lib/components/multiselect/multiselect.css";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "textColor", name: "Text", variables: ["--jowa-color-neutral-text"], category: "Field" },
  { key: "backgroundColor", name: "Background", variables: ["--jowa-color-surface"], category: "Field" },
  { key: "borderColor", name: "Border", variables: ["--jowa-color-neutral-border"], category: "Field" },
  { key: "focusColor", name: "Focus", variables: ["--jowa-color-primary"], category: "States" },
  { key: "mutedColor", name: "Placeholder", variables: ["--jowa-color-muted"], category: "States" },
] as const;

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
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
};
export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: (args) => <MultiSelect key={JSON.stringify(args.defaultValue)} {...args} />,
};

export const WithDefaultValue: Story = {
  args: { defaultValue: ["react", "svelte"] },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: ["react"] },
};

export const ManySelected: Story = {
  args: { defaultValue: ["react", "vue", "angular", "svelte"] },
};
