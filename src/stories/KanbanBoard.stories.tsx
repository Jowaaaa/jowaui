import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { KanbanBoard } from "../lib/components/kanban/kanban";
import type { KanbanColumn } from "../lib/components/kanban/kanban";

const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  component: KanbanBoard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

const initialColumns: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    color: "#94a3b8",
    cards: [
      { id: "c1", title: "Research competitors", description: "Analyse top 5 competitors in the market.", tags: ["research"], assignee: "Alice" },
      { id: "c2", title: "Write onboarding copy", tags: ["content"] },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "#3b82f6",
    cards: [
      { id: "c3", title: "Design new dashboard", description: "Figma mockups for the analytics dashboard.", tags: ["design", "ui"], assignee: "Bob" },
      { id: "c4", title: "Fix login bug", description: "Users cannot log in with SSO on Safari.", tags: ["bug"], assignee: "Carol" },
    ],
  },
  {
    id: "review",
    title: "In Review",
    color: "#f59e0b",
    cards: [
      { id: "c5", title: "API rate limiting", description: "Implement per-user rate limits on all endpoints.", tags: ["backend"], assignee: "Dave" },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "#22c55e",
    cards: [
      { id: "c6", title: "Set up CI/CD pipeline", tags: ["devops"], assignee: "Eve" },
      { id: "c7", title: "Update privacy policy", tags: ["legal"] },
    ],
  },
];

const ControlledDemo = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  return <KanbanBoard columns={columns} onChange={setColumns} />;
};

export const Default: Story = {
  render: () => <ControlledDemo />,
};

export const Uncontrolled: Story = {
  args: {
    columns: initialColumns,
  },
};

export const EmptyColumns: Story = {
  args: {
    columns: [
      { id: "todo", title: "To Do", color: "#94a3b8", cards: [] },
      { id: "doing", title: "Doing", color: "#3b82f6", cards: [] },
      { id: "done", title: "Done", color: "#22c55e", cards: [] },
    ],
  },
};
