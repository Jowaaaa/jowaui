import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "../lib/components/card/card";
import { Button } from "../lib/components/button/button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Simple: Story = {
  args: { children: "This is the card body. You can put any content here." },
};

export const WithHeader: Story = {
  args: {
    header: "Card Title",
    children: "Some content inside the card body.",
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: "Confirm action",
    children: "Are you sure you want to delete this item? This action cannot be undone.",
    footer: (
      <>
        <Button variant="danger" size="sm">Delete</Button>
        <Button variant="ghost" size="sm">Cancel</Button>
      </>
    ),
  },
};
