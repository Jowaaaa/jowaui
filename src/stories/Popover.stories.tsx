import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "../lib/components/popover/popover";
import { Button } from "../lib/components/button/button";

const meta: Meta = {
  title: "Overlay/Popover",
  tags: ["autodocs"],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

const content = (
  <div>
    <p style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>Popover title</p>
    <p style={{ margin: 0, color: "var(--jowa-color-muted)" }}>Some helpful content here.</p>
  </div>
);

export const Default: Story = {
  args: { placement: "bottom" },
  render: (args) => <Popover {...args} trigger={<Button variant="outline">Open popover</Button>}>{content}</Popover>,
};

export const Bottom: Story = { render: () => <Popover trigger={<Button variant="outline">Open popover</Button>} placement="bottom">{content}</Popover> };
export const Top:    Story = { render: () => <div style={{ marginTop: 120 }}><Popover trigger={<Button variant="outline">Open popover</Button>} placement="top">{content}</Popover></div> };
export const Right:  Story = { render: () => <Popover trigger={<Button variant="outline">Open popover</Button>} placement="right">{content}</Popover> };
