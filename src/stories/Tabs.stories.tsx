import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../lib/components/tabs/tabs";

const ITEMS = [
  { value: "overview",  label: "Overview",  content: <p>Overview content goes here.</p> },
  { value: "analytics", label: "Analytics", content: <p>Analytics data goes here.</p> },
  { value: "settings",  label: "Settings",  content: <p>Settings panel goes here.</p> },
  { value: "disabled",  label: "Disabled",  content: <p>You shouldn't see this.</p>, disabled: true },
];

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: { items: ITEMS, defaultValue: "overview" },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Line: Story = { args: { variant: "line" } };
export const Pill: Story = { args: { variant: "pill" } };
