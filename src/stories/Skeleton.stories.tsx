import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../lib/components/skeleton/skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story    = { args: { variant: "text",   width: 240 } };
export const Rect: Story    = { args: { variant: "rect",   width: 320, height: 160 } };
export const Circle: Story  = { args: { variant: "circle", width: 48, height: 48 } };
export const MultiLine: Story = { args: { variant: "text", lines: 4, width: 320 } };

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center", width: 320 }}>
      <Skeleton variant="circle" width={48} height={48} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="75%" />
      </div>
    </div>
  ),
};
