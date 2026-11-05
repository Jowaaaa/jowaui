import type { Meta, StoryObj } from "@storybook/react-vite";
import { OtpInput } from "../lib/components/otpinput/otpinput";
import "../lib/components/otpinput/otpinput.css";
import { componentColorArgTypes, withComponentColors } from "./component-colors";

const colorControls = [
  { key: "textColor", name: "Text", variables: ["--jowa-color-neutral-text"], category: "OTP input" },
  { key: "backgroundColor", name: "Background", variables: ["--jowa-color-neutral-bg"], category: "OTP input" },
  { key: "borderColor", name: "Border", variables: ["--jowa-color-neutral-border"], category: "OTP input" },
  { key: "focusColor", name: "Focus", variables: ["--jowa-color-primary"], category: "States" },
] as const;

const meta: Meta<typeof OtpInput> = {
  title: "Forms/OtpInput",
  component: OtpInput,
  tags: ["autodocs"],
  argTypes: {
    length: { control: { type: "number", min: 2, max: 10 } },
    disabled: { control: "boolean" },
    type: { control: "select", options: ["text", "number", "password"] },
    ...componentColorArgTypes(colorControls),
  },
  decorators: [withComponentColors(colorControls)],
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
