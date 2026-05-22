import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper } from "../lib/components/stepper/stepper";
import type { StepperStep } from "../lib/components/stepper/stepper";

const STEPS: StepperStep[] = [
  { id: "account", label: "Account", description: "Create your account" },
  { id: "profile", label: "Profile", description: "Set up your profile" },
  { id: "billing", label: "Billing", description: "Add payment method" },
  { id: "confirm", label: "Confirm", description: "Review and confirm" },
];

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  args: {
    steps: STEPS,
    activeStep: 1,
    orientation: "horizontal",
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

export const FirstStep: Story = {
  args: { activeStep: 0 },
};

export const LastStep: Story = {
  args: { activeStep: 3 },
};

export const AllCompleted: Story = {
  args: {
    activeStep: 4,
  },
};

export const WithError: Story = {
  args: {
    steps: [
      { id: "account", label: "Account", description: "Create your account" },
      { id: "profile", label: "Profile", description: "Set up your profile", status: "error" },
      { id: "billing", label: "Billing", description: "Add payment method" },
      { id: "confirm", label: "Confirm", description: "Review and confirm" },
    ],
    activeStep: 1,
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    activeStep: 2,
  },
};

export const VerticalWithError: Story = {
  args: {
    orientation: "vertical",
    steps: [
      { id: "account", label: "Account", description: "Create your account" },
      { id: "profile", label: "Profile", description: "Set up your profile", status: "error" },
      { id: "billing", label: "Billing", description: "Add payment method" },
      { id: "confirm", label: "Confirm", description: "Review and confirm" },
    ],
    activeStep: 1,
  },
};
