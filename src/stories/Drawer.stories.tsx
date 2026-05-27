import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Drawer } from "../lib/components/drawer/drawer";
import { Button } from "../lib/components/button/button";

const meta: Meta = {
  title: "Overlay/Drawer",
  tags: ["autodocs"],
  argTypes: {
    open: { control: 'boolean' },
    side: { control: 'select', options: ['left', 'right', 'top', 'bottom'] },
    title: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

const DrawerDemo = ({ side }: { side?: "left" | "right" | "top" | "bottom" }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open {side ?? "right"} drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} side={side} title="Drawer title">
        <p>This is the drawer body. You can put any content here.</p>
        <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  args: { side: "right", title: "Drawer Title" },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <p>Drawer content</p>
        </Drawer>
      </>
    );
  },
};

export const Right:  Story = { render: () => <DrawerDemo side="right" /> };
export const Left:   Story = { render: () => <DrawerDemo side="left" /> };
export const Top:    Story = { render: () => <DrawerDemo side="top" /> };
export const Bottom: Story = { render: () => <DrawerDemo side="bottom" /> };
