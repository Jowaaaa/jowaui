import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataGrid } from "../lib/components/datagrid/datagrid";
import type { DataGridColumn } from "../lib/components/datagrid/datagrid";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const ROWS: Product[] = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99, stock: 142, status: "In Stock" },
  { id: 2, name: "Mechanical Keyboard", category: "Electronics", price: 129.99, stock: 58, status: "In Stock" },
  { id: 3, name: "Standing Desk Mat",   category: "Office",      price: 39.99,  stock: 0,   status: "Out of Stock" },
  { id: 4, name: "USB-C Hub",           category: "Electronics", price: 49.99,  stock: 23,  status: "Low Stock" },
  { id: 5, name: "Ergonomic Chair",     category: "Office",      price: 399.99, stock: 7,   status: "Low Stock" },
  { id: 6, name: "Monitor Stand",       category: "Office",      price: 59.99,  stock: 91,  status: "In Stock" },
];

const COLUMNS: DataGridColumn<Product>[] = [
  { key: "name",     header: "Product",  sortable: true, width: 200 },
  { key: "category", header: "Category", sortable: true, width: 120 },
  {
    key: "price",
    header: "Price",
    sortable: true,
    width: 100,
    render: (value) => `$${(value as number).toFixed(2)}`,
  },
  { key: "stock", header: "Stock", sortable: true, width: 80 },
  {
    key: "status",
    header: "Status",
    sortable: true,
    width: 130,
    render: (value) => {
      const v = value as string;
      const color =
        v === "In Stock" ? "var(--jowa-color-success)" :
        v === "Low Stock" ? "var(--jowa-color-warning)" :
        "var(--jowa-color-danger)";
      return (
        <span style={{ color, fontWeight: 500, fontSize: "0.8rem" }}>{v}</span>
      );
    },
  },
];

const meta: Meta = {
  title: "Data/DataGrid",
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <DataGrid
      columns={COLUMNS}
      rows={ROWS}
      getRowId={(row) => row.id}
    />
  ),
};

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<Set<string | number>>(new Set([1, 3]));
    return (
      <div>
        <DataGrid
          columns={COLUMNS}
          rows={ROWS}
          getRowId={(row) => row.id}
          selectedRows={selected}
          onSelectedRowsChange={setSelected}
        />
        <p style={{ marginTop: 12, fontSize: "0.875rem", color: "var(--jowa-color-muted)" }}>
          Selected IDs: {[...selected].join(", ") || "none"}
        </p>
      </div>
    );
  },
};

export const Empty: Story = {
  render: () => (
    <DataGrid
      columns={COLUMNS}
      rows={[]}
      getRowId={(row) => row.id}
    />
  ),
};
