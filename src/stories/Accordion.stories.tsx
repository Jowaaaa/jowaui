import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "../lib/components/accordion/accordion";
import type { AccordionItem } from "../lib/components/accordion/accordion";

const ITEMS: AccordionItem[] = [
  {
    id: "item-1",
    title: "What is jowaui?",
    content: "jowaui is a zero-dependency React component library built with CSS custom properties.",
  },
  {
    id: "item-2",
    title: "How do I install it?",
    content: "Run npm install jowaui and import the components you need.",
  },
  {
    id: "item-3",
    title: "Is it accessible?",
    content: "Yes — all components follow WCAG AA guidelines with proper ARIA attributes and keyboard navigation.",
  },
  {
    id: "item-4",
    title: "This item is disabled",
    content: "You should not be able to open this.",
    disabled: true,
  },
];

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: { items: ITEMS },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {};

export const Multiple: Story = {
  args: { multiple: true, defaultOpen: ["item-1", "item-2"] },
};

export const DefaultOpen: Story = {
  args: { defaultOpen: ["item-2"] },
};
