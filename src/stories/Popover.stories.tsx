import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "../lib/components/popover/popover";
import { Button } from "../lib/components/button/button";

const meta: Meta = { title: "Overlay/Popover", tags: ["autodocs"] };
export default meta;
type Story = StoryObj;

const content = (
  <div>
    <p style={{ margin: "0 0 0.5rem", fontWeight: 600 }}>Popover title</p>
    <p style={{ margin: 0, color: "var(--jowa-color-muted)" }}>Some helpful content here.</p>
  </div>
);

export const Bottom: Story = { render: () => <Popover trigger={<Button variant="outline">Open popover</Button>} placement="bottom">{content}</Popover> };
export const Top:    Story = { render: () => <div style={{ marginTop: 120 }}><Popover trigger={<Button variant="outline">Open popover</Button>} placement="top">{content}</Popover></div> };
export const Right:  Story = { render: () => <Popover trigger={<Button variant="outline">Open popover</Button>} placement="right">{content}</Popover> };
