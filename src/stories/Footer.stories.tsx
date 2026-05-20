import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "../lib/components/footer/footer";

const meta: Meta<typeof Footer> = {
  title: "Components/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Footer>;

const groups = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export const Default: Story = {
  render: () => (
    <Footer
      brand="jowaui"
      groups={groups}
      bottom="© 2026 jowaui. All rights reserved."
    />
  ),
};

export const BrandOnly: Story = {
  render: () => <Footer brand="jowaui" bottom="© 2026 jowaui." />,
};
