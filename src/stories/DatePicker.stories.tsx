import type { Meta, StoryObj } from "@storybook/react-vite";
import { DatePicker } from "../lib/components/datepicker/datepicker";

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  args: { label: "Date of birth" },
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "Select your date of birth" },
};

export const WithError: Story = {
  args: { error: "Date is required" },
};

export const Disabled: Story = {
  args: { disabled: true, value: "2024-01-15" },
};
