import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../lib/components/button/button";
import { CtaBanner } from "../lib/components/ctabanner/ctabanner";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "background", name: "Background", variables: ["--jowa-cta-banner-background"], category: "CTA Banner" },
  { key: "foreground", name: "Foreground", variables: ["--jowa-cta-banner-foreground"], category: "CTA Banner" },
  { key: "border", name: "Border", variables: ["--jowa-cta-banner-border"], category: "CTA Banner" },
  { key: "titleColor", name: "Title", variables: ["--jowa-cta-banner-title-color"], category: "CTA Banner" },
  { key: "descriptionColor", name: "Description", variables: ["--jowa-cta-banner-description-color"], category: "CTA Banner" },
] as const;

const meta: Meta<typeof CtaBanner> = {
  title: "Components/CTA Banner",
  component: CtaBanner,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    actions: { control: "text" },
    media: { control: "text" },
    align: { control: "select", options: ["left", "center"] },
    className: { control: "text" },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
};

export default meta;
type Story = StoryObj<typeof CtaBanner>;

export const Default: Story = {
  args: {
    title: "Ready to ship your next idea?",
    description: "Build polished interfaces faster with composable, themeable components.",
    actions: "Get started",
    media: "Preview",
    align: "left",
    className: "",
  },
  render: ({ actions, media, ...args }) => (
    <CtaBanner
      {...args}
      actions={actions ? <Button variant="outline">{String(actions)}</Button> : undefined}
      media={media ? <div style={{ padding: "24px", border: "1px solid currentColor", borderRadius: "8px" }}>{String(media)}</div> : undefined}
    />
  ),
};

export const WithSecondaryAction: Story = {
  render: () => (
    <CtaBanner
      title="Bring your team together"
      description="Invite your teammates and keep every project moving in one place."
      actions={
        <>
          <Button variant="outline">Invite team</Button>
          <Button variant="ghost">Learn more</Button>
        </>
      }
    />
  ),
};

export const WithMedia: Story = {
  render: () => (
    <CtaBanner
      title="A clearer way to work"
      description="Give your team a focused workspace for the work that matters."
      actions={<Button variant="outline">See how it works</Button>}
      media={<img src="https://placehold.co/240x160/ffffff/2563eb?text=Preview" alt="Product preview" />}
    />
  ),
};

export const Centered: Story = {
  render: () => (
    <CtaBanner
      align="center"
      title="Make your next release your best one"
      description="Everything you need to move from idea to launch."
      actions={<Button variant="outline">Start building</Button>}
    />
  ),
};
