import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider, useToast } from "../lib/components/toast/toast";
import { Button } from "../lib/components/button/button";

const meta: Meta = {
  title: "Feedback/Toast",
  tags: ["autodocs"],
  decorators: [
    (Story, { args }) => (
      <ToastProvider
        position={args["position"] as Parameters<typeof ToastProvider>[0]["position"]}
        defaultDuration={args["defaultDuration"] as number | undefined}
      >
        <Story />
      </ToastProvider>
    ),
  ],
  argTypes: {
    position: { control: 'select', options: ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'] },
    defaultDuration: { control: 'number' },
  },
  args: {
    position: "top-right",
    defaultDuration: 3000,
  },
};
export default meta;
type Story = StoryObj;

const ToastDemo = ({ variant }: { variant?: "info" | "success" | "warning" | "danger" }) => {
  const { toast } = useToast();
  return (
    <Button
      variant="primary"
      onClick={() => toast({
        variant,
        title: variant ? `${variant.charAt(0).toUpperCase() + variant.slice(1)}!` : "Notification",
        message: "This is a toast notification.",
      })}
    >
      Show {variant ?? "info"} toast
    </Button>
  );
};

export const Info: Story    = { render: () => <ToastDemo variant="info" /> };
export const Success: Story = { render: () => <ToastDemo variant="success" /> };
export const Warning: Story = { render: () => <ToastDemo variant="warning" /> };
export const Danger: Story  = { render: () => <ToastDemo variant="danger" /> };

export const AllVariants: Story = {
  render: () => {
    const { toast } = useToast();
    return (
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {(["info", "success", "warning", "danger"] as const).map((v) => (
          <Button key={v} variant="outline" onClick={() => toast({ variant: v, title: v, message: "Toast message here." })}>
            {v}
          </Button>
        ))}
      </div>
    );
  },
  decorators: [(Story) => <ToastProvider position="top-right"><Story /></ToastProvider>],
};
