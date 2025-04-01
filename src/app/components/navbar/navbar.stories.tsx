import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./navbar";

const meta: Meta<typeof Navbar> = {
  title: "UI/Navbar",
  component: Navbar,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: { control: "text" },
    bgColor: { control: "color" }, // Allow color picker
    shadow: {
      control: "select",
      options: ["large", "medium", "none"],
    },
    shadowColor: { control: "color" },
    logoSrc: {
      control: { type: "text" }, // Allows pasting an image URL instead of upload
      description: "Logo image for the navbar",
    },
    logoAlt: {control: "text"},
    title: { control: "text" },
    links: {
      control: "object",
      description: "Navigation links for the navbar",
    },
  },
};
export default meta;

type Story = StoryObj<typeof Navbar>;

export const Primary: Story = {
  args: {
    className: "",
    bgColor: "#1E3A8A",
    shadow: "large",
    shadowColor: "rgba(0,0,0,0.2)",
    logoSrc: "/logo.png", 
    title: "MyBrand",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
};
