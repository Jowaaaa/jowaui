import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../lib/components/tag/tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["neutral", "primary", "success", "warning", "danger"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = { args: { children: "React", variant: "neutral" } };
export const Primary: Story = { args: { children: "TypeScript", variant: "primary" } };

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript", "CSS", "Storybook"]);
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tags.map((t) => (
          <Tag key={t} variant="primary" onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}>
            {t}
          </Tag>
        ))}
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag variant="neutral">Neutral</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="danger">Danger</Tag>
    </div>
  ),
};
