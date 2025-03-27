import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "danger"],
    },
    shadow: {
      control: "select",
      options: ["large", "medium", "none"]
    }
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
    shadow: "large"
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
    shadow: "large"
  },
};

export const Danger: Story = {
    args: {
      variant: "danger",
      children: "Danger Button",
      shadow: "large"
    },
  };
