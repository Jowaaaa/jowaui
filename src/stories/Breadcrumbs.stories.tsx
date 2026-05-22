import type { Meta, StoryObj } from "@storybook/react-vite";
import { Breadcrumbs } from "../lib/components/breadcrumbs/breadcrumbs";

const meta: Meta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  argTypes: {
    separator: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Running shoes" },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: "Home", href: "#" },
      { label: "Settings" },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: "Docs", href: "#" },
      { label: "Components", href: "#" },
      { label: "Breadcrumbs" },
    ],
    separator: "›",
  },
};
