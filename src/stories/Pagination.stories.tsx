import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination } from "../lib/components/pagination/pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const Controlled = ({ total }: { total: number }) => {
  const [page, setPage] = useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "#6b7280" }}>
        Page {page} of {Math.ceil(total / 10)}
      </p>
      <Pagination page={page} total={total} onChange={setPage} />
    </div>
  );
};

export const Default: Story = {
  render: () => <Controlled total={100} />,
};

export const FewPages: Story = {
  render: () => <Controlled total={30} />,
};

export const ManyPages: Story = {
  render: () => <Controlled total={500} />,
};
