import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar } from "../lib/components/navbar/navbar";
import { Button } from "../lib/components/button/button";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    title: { control: "text" },
    logoSrc: { control: "text" },
    logoAlt: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    title: "MyBrand",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export const WithActions: Story = {
  args: {
    title: "MyBrand",
    links: [
      { label: "Home", href: "/" },
      { label: "Docs", href: "/docs" },
    ],
    actions: <Button variant="navbar" size="sm">Sign in</Button>,
  },
};

export const NoLinks: Story = {
  args: {
    title: "Minimal",
  },
};
