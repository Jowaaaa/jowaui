import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../lib/components/button/button";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "primaryBackground", name: "Background", variables: ["--jowa-button-primary-background"], category: "Primary" },
  { key: "primaryText", name: "Text", variables: ["--jowa-button-primary-foreground"], category: "Primary" },
  { key: "primaryHover", name: "Hover", variables: ["--jowa-button-primary-hover"], category: "Primary" },
  { key: "dangerBackground", name: "Background", variables: ["--jowa-button-danger-background"], category: "Danger" },
  { key: "dangerText", name: "Text", variables: ["--jowa-button-danger-foreground"], category: "Danger" },
  { key: "dangerHover", name: "Hover", variables: ["--jowa-button-danger-hover"], category: "Danger" },
  { key: "outlineText", name: "Text", variables: ["--jowa-button-outline-foreground"], category: "Outline" },
  { key: "outlineBorder", name: "Border", variables: ["--jowa-button-outline-border"], category: "Outline" },
  { key: "ghostText", name: "Text", variables: ["--jowa-button-ghost-foreground"], category: "Ghost" },
] as const;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "danger", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Primary Button" },
};

export const Outline: Story = {
  args: { variant: "outline", children: "Outline Button" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Danger Button" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Ghost Button" },
};

export const Small: Story = {
  args: { size: "sm", children: "Small" },
};

export const Large: Story = {
  args: { size: "lg", children: "Large" },
};

export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};
