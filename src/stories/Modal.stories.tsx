import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "../lib/components/modal/modal";
import { Button } from "../lib/components/button/button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    closeOnOverlayClick: { control: "boolean" },
    showCloseButton: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalDemo = (args: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: "Example Modal",
    children: "This is the modal content. You can put anything here.",
    closeOnOverlayClick: true,
    showCloseButton: true,
  },
};

export const NoTitle: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    children: "Modal without a title.",
    closeOnOverlayClick: true,
    showCloseButton: true,
  },
};
