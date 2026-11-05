import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hero } from "../lib/components/hero/hero";
import { Button } from "../lib/components/button/button";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "background", name: "Background", variables: ["--jowa-hero-background"], category: "Hero" },
  { key: "title", name: "Title", variables: ["--jowa-hero-title-color"], category: "Hero" },
  { key: "subtitle", name: "Subtitle", variables: ["--jowa-hero-subtitle-color"], category: "Hero" },
] as const;

const meta: Meta<typeof Hero> = {
  title: "Components/Hero",
  component: Hero,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    align: { control: "select", options: ["center", "left"] },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Centered: Story = {
  render: () => (
    <Hero
      title="Build faster with jowaui"
      subtitle="A zero-dependency React component library powered by CSS custom properties. Fully themeable, accessible, and ready to ship."
      actions={
        <>
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="outline">View docs</Button>
        </>
      }
    />
  ),
};

export const LeftAligned: Story = {
  render: () => (
    <Hero
      align="left"
      title="Ship your product today"
      subtitle="Stop re-building the same components. jowaui gives you everything you need out of the box."
      actions={<Button size="lg">Start for free</Button>}
    />
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Hero
      align="left"
      title="Beautiful components, zero deps"
      subtitle="Composable, accessible, and themeable React components with CSS custom properties."
      actions={
        <>
          <Button size="lg">Get started</Button>
          <Button size="lg" variant="ghost">Learn more</Button>
        </>
      }
      media={
        <img
          src="https://placehold.co/480x320/2563eb/ffffff?text=Preview"
          alt="App preview"
        />
      }
    />
  ),
};
