import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, Radio } from "../lib/components/radio/radio";

const meta: Meta = {
  title: "Forms/Radio",
  tags: ["autodocs"],
  argTypes: {
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { label: "Choose an option", orientation: "vertical" },
  render: (args) => {
    const [val, setVal] = useState("");
    return (
      <RadioGroup name="demo" {...args} value={val} onChange={setVal}>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [val, setVal] = useState("b");
    return (
      <RadioGroup name="fruit" value={val} onChange={setVal} label="Pick a fruit" orientation="vertical">
        <Radio value="a" label="Apple" />
        <Radio value="b" label="Banana" />
        <Radio value="c" label="Cherry" />
        <Radio value="d" label="Durian (disabled)" disabled />
      </RadioGroup>
    );
  },
};

export const Horizontal: Story = {
  render: () => {
    const [val, setVal] = useState("xs");
    return (
      <RadioGroup name="size" value={val} onChange={setVal} label="Size" orientation="horizontal">
        <Radio value="xs" label="XS" />
        <Radio value="sm" label="SM" />
        <Radio value="md" label="MD" />
        <Radio value="lg" label="LG" />
      </RadioGroup>
    );
  },
};

export const WithError: Story = {
  render: () => (
    <RadioGroup name="plan" label="Choose plan" error="Please select a plan.">
      <Radio value="free" label="Free" />
      <Radio value="pro"  label="Pro" />
    </RadioGroup>
  ),
};
