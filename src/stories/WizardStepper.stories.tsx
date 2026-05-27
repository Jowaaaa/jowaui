import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WizardStepper } from "../lib/components/wizardstepper/wizardstepper";
import type { WizardStep } from "../lib/components/wizardstepper/wizardstepper";

const BASIC_STEPS: WizardStep[] = [
  {
    id: "account",
    title: "Account",
    description: "Set up your account credentials.",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>
          Email
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              display: "block",
              marginTop: 4,
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--jowa-color-neutral-border)",
              borderRadius: "var(--jowa-radius-md)",
              fontFamily: "inherit",
              fontSize: "inherit",
              background: "var(--jowa-color-neutral-bg)",
              color: "var(--jowa-color-neutral-text)",
            }}
          />
        </label>
        <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>
          Password
          <input
            type="password"
            placeholder="••••••••"
            style={{
              display: "block",
              marginTop: 4,
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--jowa-color-neutral-border)",
              borderRadius: "var(--jowa-radius-md)",
              fontFamily: "inherit",
              fontSize: "inherit",
              background: "var(--jowa-color-neutral-bg)",
              color: "var(--jowa-color-neutral-text)",
            }}
          />
        </label>
      </div>
    ),
  },
  {
    id: "profile",
    title: "Profile",
    description: "Tell us a bit about yourself.",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label style={{ fontSize: "0.875rem", fontWeight: 500 }}>
          Full name
          <input
            type="text"
            placeholder="Jane Doe"
            style={{
              display: "block",
              marginTop: 4,
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--jowa-color-neutral-border)",
              borderRadius: "var(--jowa-radius-md)",
              fontFamily: "inherit",
              fontSize: "inherit",
              background: "var(--jowa-color-neutral-bg)",
              color: "var(--jowa-color-neutral-text)",
            }}
          />
        </label>
      </div>
    ),
  },
  {
    id: "confirm",
    title: "Confirm",
    description: "Review and confirm your details.",
    content: (
      <div>
        <p style={{ color: "var(--jowa-color-muted)", fontSize: "0.875rem" }}>
          Everything looks good! Click <strong>Complete</strong> to finish setup.
        </p>
      </div>
    ),
  },
];

const VALIDATION_STEPS: WizardStep[] = [
  {
    id: "step1",
    title: "Step 1",
    content: <p>This step always passes validation.</p>,
    validate: async () => {
      await new Promise((r) => setTimeout(r, 600));
      return true;
    },
  },
  {
    id: "step2",
    title: "Step 2",
    content: <p>This step always <strong>fails</strong> validation — demonstrating the error state.</p>,
    validate: async () => {
      await new Promise((r) => setTimeout(r, 600));
      return false;
    },
  },
  {
    id: "step3",
    title: "Step 3",
    content: <p>Final step.</p>,
  },
];

const meta: Meta = {
  title: "Navigation/WizardStepper",
  tags: ["autodocs"],
  argTypes: {
    currentStep: { control: 'number' },
    defaultStep: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { currentStep: 0 },
  render: (args) => (
    <WizardStepper {...args} steps={BASIC_STEPS} onComplete={() => {}} />
  ),
};

export const WithValidation: Story = {
  render: () => (
    <WizardStepper
      steps={VALIDATION_STEPS}
      onComplete={() => alert("Done!")}
    />
  ),
};
