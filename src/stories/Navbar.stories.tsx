import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navbar } from "../lib/components/navbar/navbar";
import { Button } from "../lib/components/button/button";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "background", name: "Background", variables: ["--jowa-navbar-bg"], category: "Navbar" },
  { key: "text", name: "Text", variables: ["--jowa-navbar-text"], category: "Navbar" },
] as const;

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
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
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

export const MobileMenu: Story = {
  args: {
    title: "MyBrand",
    links: [
      { label: "Home", href: "/" },
      { label: "Docs", href: "/docs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const NoLinks: Story = {
  args: {
    title: "Minimal",
  },
};
