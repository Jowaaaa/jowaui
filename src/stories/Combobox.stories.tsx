import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "../lib/components/combobox/combobox";
import "../lib/components/combobox/combobox.css";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "textColor", name: "Text", variables: ["--jowa-color-neutral-text"], category: "Field" },
  { key: "backgroundColor", name: "Background", variables: ["--jowa-color-surface"], category: "Field" },
  { key: "borderColor", name: "Border", variables: ["--jowa-color-neutral-border"], category: "Field" },
  { key: "focusColor", name: "Focus", variables: ["--jowa-color-primary"], category: "States" },
  { key: "mutedColor", name: "Placeholder", variables: ["--jowa-color-muted"], category: "States" },
] as const;

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
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
};
export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: (args) => <Combobox key={args.defaultValue} {...args} />,
};

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
