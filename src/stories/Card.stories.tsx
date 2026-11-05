import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "../lib/components/card/card";
import { Button } from "../lib/components/button/button";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "cardBackground", name: "Card background", variables: ["--jowa-card-background"], category: "Surface" },
  { key: "cardBorder", name: "Border", variables: ["--jowa-card-border-color"], category: "Surface" },
  { key: "headerText", name: "Header text", variables: ["--jowa-card-header-color"], category: "Header" },
  { key: "bodyText", name: "Body text", variables: ["--jowa-card-body-color"], category: "Body" },
  { key: "footerBackground", name: "Footer background", variables: ["--jowa-card-footer-background"], category: "Footer" },
] as const;

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: componentColorArgTypes(colorControls),
  decorators: [withComponentColors(colorControls)],
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
