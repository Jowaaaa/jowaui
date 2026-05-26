import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfirmDialog } from "../lib/components/confirmdialog/confirmdialog";
import { Button } from "../lib/components/button/button";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "danger", "warning"] },
    title: { control: "text" },
    description: { control: "text" },
    confirmLabel: { control: "text" },
    cancelLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

const Demo = (args: React.ComponentProps<typeof ConfirmDialog>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <ConfirmDialog
        {...args}
        open={open}
        onConfirm={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <Demo {...args} />,
  args: {
    title: "Are you sure?",
    description: "This action cannot be undone. Please confirm to proceed.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
    variant: "default",
  },
};

export const Danger: Story = {
  render: (args) => <Demo {...args} />,
  args: {
    title: "Delete this item?",
    description: "This will permanently delete the item and all associated data. This action cannot be undone.",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
    variant: "danger",
  },
};

export const Warning: Story = {
  render: (args) => <Demo {...args} />,
  args: {
    title: "Unsaved changes",
    description: "You have unsaved changes. Are you sure you want to leave without saving?",
    confirmLabel: "Leave",
    cancelLabel: "Stay",
    variant: "warning",
  },
};

export const NoDescription: Story = {
  render: (args) => <Demo {...args} />,
  args: {
    title: "Confirm action",
    confirmLabel: "Yes, proceed",
    cancelLabel: "No, cancel",
    variant: "default",
  },
};
