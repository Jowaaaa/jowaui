import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "../lib/components/divider/divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = { args: { orientation: "horizontal" } };

export const WithLabel: Story = { args: { label: "or continue with" } };

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", height: 32, gap: 8, fontFamily: "Inter, sans-serif", fontSize: 14 }}>
      <span>Home</span>
      <Divider orientation="vertical" />
      <span>About</span>
      <Divider orientation="vertical" />
      <span>Contact</span>
    </div>
  ),
};
