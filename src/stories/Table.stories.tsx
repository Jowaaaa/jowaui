import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "../lib/components/table/table";
import { Badge } from "../lib/components/badge/badge";

interface User { id: number; name: string; email: string; role: string; status: string }

const DATA: User[] = [
  { id: 1, name: "Alice Johnson",  email: "alice@example.com",  role: "Admin",   status: "active"   },
  { id: 2, name: "Bob Smith",      email: "bob@example.com",    role: "Editor",  status: "active"   },
  { id: 3, name: "Carol Williams", email: "carol@example.com",  role: "Viewer",  status: "inactive" },
  { id: 4, name: "Dave Brown",     email: "dave@example.com",   role: "Editor",  status: "active"   },
  { id: 5, name: "Eve Davis",      email: "eve@example.com",    role: "Admin",   status: "pending"  },
];

const COLUMNS = [
  { key: "name",   header: "Name",   sortable: true },
  { key: "email",  header: "Email",  sortable: true },
  { key: "role",   header: "Role",   sortable: true },
  {
    key: "status", header: "Status", sortable: true,
    render: (row: User) => (
      <Badge variant={row.status === "active" ? "success" : row.status === "pending" ? "warning" : "neutral"}>
        {row.status}
      </Badge>
    ),
  },
];

const meta: Meta = {
  title: "Data/Table",
  tags: ["autodocs"],
  argTypes: {
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    bordered: { control: 'boolean' },
    stickyHeader: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    striped: false,
    bordered: false,
    hoverable: false,
    stickyHeader: false,
  },
  render: (args) => <Table columns={COLUMNS} data={DATA} rowKey="id" {...args} />,
};
export const Striped: Story = {
  render: () => <Table columns={COLUMNS} data={DATA} rowKey="id" striped />,
};
export const Bordered: Story = {
  render: () => <Table columns={COLUMNS} data={DATA} rowKey="id" bordered />,
};
export const Empty: Story = {
  render: () => <Table columns={COLUMNS} data={[]} rowKey="id" emptyMessage="No users found." />,
};
