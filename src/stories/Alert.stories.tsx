import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "../lib/components/alert/alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { variant: "info", title: "New update available", children: "A new version of the app has been released." },
};

export const Success: Story = {
  args: { variant: "success", title: "Changes saved", children: "Your profile has been updated successfully." },
};

export const Warning: Story = {
  args: { variant: "warning", title: "Storage nearly full", children: "You have used 90% of your available storage." },
};

export const Danger: Story = {
  args: { variant: "danger", title: "Something went wrong", children: "Unable to connect to the server. Please try again." },
};

export const Dismissible: Story = {
  args: {
    variant: "info",
    title: "Tip",
    children: "Click the × button to dismiss this alert.",
    onClose: () => alert("closed"),
  },
};
