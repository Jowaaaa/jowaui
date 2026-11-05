import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner } from "../lib/components/banner/banner";

const variantColors = {
  infoBackgroundColor: "--jowa-banner-info-background",
  infoTextColor: "--jowa-banner-info-foreground",
  infoBorderColor: "--jowa-banner-info-border",
  successBackgroundColor: "--jowa-banner-success-background",
  successTextColor: "--jowa-banner-success-foreground",
  successBorderColor: "--jowa-banner-success-border",
  warningBackgroundColor: "--jowa-banner-warning-background",
  warningTextColor: "--jowa-banner-warning-foreground",
  warningBorderColor: "--jowa-banner-warning-border",
  dangerBackgroundColor: "--jowa-banner-danger-background",
  dangerTextColor: "--jowa-banner-danger-foreground",
  dangerBorderColor: "--jowa-banner-danger-border",
} as const;

const variantColorControls = Object.fromEntries(
  Object.keys(variantColors).map((name) => [name, { control: "color", table: { category: "Variant colors" } }]),
);

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["info", "success", "warning", "danger"] },
    ...variantColorControls,
    dismissible: { control: 'boolean' },
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
type Story = StoryObj<typeof Banner>;

export const Info: Story = {
  args: { variant: "info", children: "A new version of the app is available. Refresh to update." },
};

export const Success: Story = {
  args: { variant: "success", children: "Your changes have been saved successfully." },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Your trial expires in 3 days. Upgrade to keep access." },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Service disruption detected. Some features may be unavailable." },
};

export const WithAction: Story = {
  args: {
    variant: "info",
    children: "A new version is available.",
    action: (
      <button
        style={{
          background: "none",
          border: "1px solid currentColor",
          borderRadius: "4px",
          padding: "2px 10px",
          cursor: "pointer",
          color: "inherit",
          fontSize: "0.8125rem",
          fontWeight: 500,
        }}
        onClick={() => alert("Updating...")}
      >
        Update now
      </button>
    ),
  },
};

export const Dismissible: Story = {
  args: {
    variant: "warning",
    children: "Scheduled maintenance on Sunday 02:00–04:00 UTC.",
    dismissible: true,
    onDismiss: () => alert("dismissed"),
  },
};

export const DismissibleWithAction: Story = {
  args: {
    variant: "danger",
    children: "Critical security update required.",
    dismissible: true,
    onDismiss: () => alert("dismissed"),
    action: (
      <button
        style={{
          background: "none",
          border: "1px solid currentColor",
          borderRadius: "4px",
          padding: "2px 10px",
          cursor: "pointer",
          color: "inherit",
          fontSize: "0.8125rem",
          fontWeight: 500,
        }}
        onClick={() => alert("Updating...")}
      >
        Update now
      </button>
    ),
  },
};
