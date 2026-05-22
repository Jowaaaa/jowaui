import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dropdown } from "../lib/components/dropdown/dropdown";
import { Button } from "../lib/components/button/button";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const items = [
  { label: "Profile", onClick: () => {} },
  { label: "Settings", onClick: () => {} },
  { divider: true, label: "" },
  { label: "Sign out", onClick: () => {} },
];

export const Default: Story = {
  render: () => (
    <div style={{ padding: "40px" }}>
      <Dropdown trigger={<Button>Options ▾</Button>} items={items} />
    </div>
  ),
};

export const AlignRight: Story = {
  render: () => (
    <div style={{ padding: "40px", display: "flex", justifyContent: "flex-end" }}>
      <Dropdown trigger={<Button variant="outline">Account ▾</Button>} items={items} align="right" />
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <div style={{ padding: "40px" }}>
      <Dropdown
        trigger={<Button variant="ghost">More ▾</Button>}
        items={[
          { label: "Edit", onClick: () => {} },
          { label: "Duplicate", onClick: () => {} },
          { divider: true, label: "" },
          { label: "Delete", onClick: () => {}, disabled: true },
        ]}
      />
    </div>
  ),
};
