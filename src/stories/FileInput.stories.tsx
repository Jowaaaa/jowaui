import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileInput } from "../lib/components/fileinput/fileinput";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "textColor", name: "Text", variables: ["--jowa-color-neutral-text"], category: "Field" },
  { key: "backgroundColor", name: "Background", variables: ["--jowa-color-neutral-bg"], category: "Field" },
  { key: "borderColor", name: "Border", variables: ["--jowa-color-neutral-border"], category: "Field" },
  { key: "errorColor", name: "Error", variables: ["--jowa-color-danger"], category: "States" },
  { key: "hintColor", name: "Hint", variables: ["--jowa-color-muted"], category: "States" },
] as const;

const meta: Meta<typeof FileInput> = {
  title: "Forms/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  args: { label: "Upload file" },
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {};

export const MultipleFiles: Story = {
  args: { multiple: true, label: "Upload files", hint: "You can select multiple files" },
};

export const WithAccept: Story = {
  args: { accept: "image/*", label: "Upload image", hint: "PNG, JPG, GIF accepted" },
};

export const WithError: Story = {
  args: { error: "File is required" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
