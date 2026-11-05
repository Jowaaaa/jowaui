import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "../lib/components/alert/alert";

const variantColors = {
  infoBackgroundColor: "--jowa-alert-info-background",
  infoTextColor: "--jowa-alert-info-foreground",
  infoBorderColor: "--jowa-alert-info-border",
  successBackgroundColor: "--jowa-alert-success-background",
  successTextColor: "--jowa-alert-success-foreground",
  successBorderColor: "--jowa-alert-success-border",
  warningBackgroundColor: "--jowa-alert-warning-background",
  warningTextColor: "--jowa-alert-warning-foreground",
  warningBorderColor: "--jowa-alert-warning-border",
  dangerBackgroundColor: "--jowa-alert-danger-background",
  dangerTextColor: "--jowa-alert-danger-foreground",
  dangerBorderColor: "--jowa-alert-danger-border",
} as const;

const variantColorControls = Object.fromEntries(
  Object.keys(variantColors).map((name) => [name, { control: "color", table: { category: "Variant colors" } }]),
);

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
    ...variantColorControls,
  },
  decorators: [
    (Story, context) => {
      const args = context.args as Record<string, unknown>;
      const style = Object.fromEntries(
        Object.entries(variantColors)
          .filter(([name]) => args[name])
          .map(([name, variable]) => [variable, args[name]]),
      );
      return <div style={style}><Story /></div>;
    },
  ],
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
