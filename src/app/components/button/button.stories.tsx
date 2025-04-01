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
    },
    shadowColor: { control: "color" },
    className: {
      control: "text"
    },
    bgColor: {
      control: "color"
    },

  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
    shadow: "large",
    bgColor: "#101eda",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    className: ""
  },
};

