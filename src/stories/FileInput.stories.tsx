import type { Meta, StoryObj } from "@storybook/react";
import { FileInput } from "../lib/components/fileinput/fileinput";

const meta: Meta<typeof FileInput> = {
  title: "Forms/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  args: { label: "Upload file" },
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
