import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "../lib/components/tooltip/tooltip";
import { Button } from "../lib/components/button/button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    position: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  render: () => (
    <div style={{ padding: "60px", display: "inline-block" }}>
      <Tooltip content="This is a tooltip" position="top">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Bottom: Story = {
  render: () => (
    <div style={{ padding: "60px", display: "inline-block" }}>
      <Tooltip content="Tooltip on the bottom" position="bottom">
        <Button variant="outline">Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div style={{ padding: "80px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
      {(["top", "bottom", "left", "right"] as const).map((pos) => (
        <Tooltip key={pos} content={`Position: ${pos}`} position={pos}>
          <Button variant="ghost" size="sm">{pos}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
