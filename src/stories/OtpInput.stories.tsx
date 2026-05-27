import type { Meta, StoryObj } from "@storybook/react-vite";
import { OtpInput } from "../lib/components/otpinput/otpinput";
import "../lib/components/otpinput/otpinput.css";

const meta: Meta<typeof OtpInput> = {
  title: "Forms/OtpInput",
  component: OtpInput,
  tags: ["autodocs"],
  argTypes: {
    length: { control: { type: "number", min: 2, max: 10 } },
    disabled: { control: "boolean" },
    type: { control: "select", options: ["text", "number", "password"] },
  },
};
export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Default: Story = {
  args: { length: 6 },
};

export const FourDigit: Story = {
  args: { length: 4, type: "number" },
};

export const Password: Story = {
  args: { length: 6, type: "password" },
};

export const WithDefaultValue: Story = {
  args: { length: 6, defaultValue: "123456" },
};

export const Disabled: Story = {
  args: { length: 6, disabled: true, defaultValue: "123456" },
};
