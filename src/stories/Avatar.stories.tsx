import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../lib/components/avatar/avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "xl"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Initials: Story = { args: { initials: "JD", size: "md" } };

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "Jane Doe",
    size: "md",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Avatar initials="AB" size="sm" />
      <Avatar initials="AB" size="md" />
      <Avatar initials="AB" size="lg" />
      <Avatar initials="AB" size="xl" />
    </div>
  ),
};
