import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "../lib/components/carousel/carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    autoPlay: { control: "boolean" },
    showDots: { control: "boolean" },
    showArrows: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const slides = [
  <div key="1" style={{ background: "#2563eb", color: "#fff", height: 240, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 600 }}>Slide 1</div>,
  <div key="2" style={{ background: "#16a34a", color: "#fff", height: 240, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 600 }}>Slide 2</div>,
  <div key="3" style={{ background: "#ca8a04", color: "#fff", height: 240, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 600 }}>Slide 3</div>,
];

export const Default: Story = {
  render: () => <Carousel>{slides}</Carousel>,
};

export const AutoPlay: Story = {
  render: () => <Carousel autoPlay interval={2000}>{slides}</Carousel>,
};

export const NoArrows: Story = {
  render: () => <Carousel showArrows={false}>{slides}</Carousel>,
};
