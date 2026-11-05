import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "../lib/components/tooltip/tooltip";
import { Button } from "../lib/components/button/button";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "backgroundColor", name: "Background", variables: ["--jowa-neutral-900"], category: "Tooltip" },
  { key: "textColor", name: "Text", variables: ["--jowa-neutral-0"], category: "Tooltip" },
] as const;

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    position: { control: "select", options: ["top", "bottom", "left", "right"] },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  render: (args) => (
    <div style={{ padding: "60px", display: "inline-block" }}>
      <Tooltip {...args} content="This is a tooltip">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Bottom: Story = {
  render: (args) => (
    <div style={{ padding: "60px", display: "inline-block" }}>
      <Tooltip {...args} content="Tooltip on the bottom">
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
