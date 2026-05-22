import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "../lib/components/textarea/textarea";

const meta: Meta<typeof Textarea> = {
  title: "Forms/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { label: "Message", placeholder: "Type your message…", rows: 4 },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story   = {};
export const WithHint: Story  = { args: { hint: "Max 500 characters." } };
export const WithError: Story = { args: { error: "Message is required." } };
export const Disabled: Story  = { args: { disabled: true, value: "Read-only text" } };
export const NoResize: Story  = { args: { resize: "none" } };
