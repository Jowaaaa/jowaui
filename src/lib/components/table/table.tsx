import React, { useState, useMemo } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T> {
  /** Row property key or arbitrary string used to identify the column */
  key: keyof T | string;
  /** Column header content */
  header: React.ReactNode;
  /** Custom cell renderer; receives the row and its index */
  render?: (row: T, index: number) => React.ReactNode;
  /** Enables click-to-sort on this column when true */
  sortable?: boolean;
  /** CSS width applied to the column (e.g. "120px" or "20%") */
  width?: string;
}

export interface TableProps<T extends object> {
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Row data array */
  data: T[];
  /** Key used to derive a stable React key for each row */
  rowKey: keyof T | ((row: T) => string);
  /** Apply alternating row background colors (default: false) */
  striped?: boolean;
  /** Apply hover highlight to rows (default: true) */
  hoverable?: boolean;
  /** Render borders around cells (default: false) */
  bordered?: boolean;
  /** Make the table header stick to the top on scroll (default: false) */
  stickyHeader?: boolean;
  /** Content shown when data is empty (default: "No data") */
  emptyMessage?: React.ReactNode;
  /** Additional CSS class applied to the table wrapper */
  className?: string;
}

export function Table<T extends object>({
  columns, data, rowKey, striped = false, hoverable = true,
  bordered = false, stickyHeader = false, emptyMessage = "No data", className,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const handleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir("asc"); return; }
    if (sortDir === "asc")  { setSortDir("desc"); return; }
    setSortKey(null); setSortDir(null);
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      const cmp = String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const getKey = (row: T) =>
    typeof rowKey === "function" ? rowKey(row) : String(row[rowKey as keyof T]);

  const sortIcon = (key: string) => {
    if (sortKey !== key) return <span className="jowa-table__sort-icon">⇅</span>;
    return <span className="jowa-table__sort-icon jowa-table__sort-icon--active">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className={`jowa-table-wrapper${className ? ` ${className}` : ""}`}>
      <table
        className={[
          "jowa-table",
          striped    ? "jowa-table--striped"  : "",
          hoverable  ? "jowa-table--hoverable" : "",
          bordered   ? "jowa-table--bordered"  : "",
          stickyHeader ? "jowa-table--sticky" : "",
        ].filter(Boolean).join(" ")}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                style={col.width ? { width: col.width } : undefined}
                className={col.sortable ? "jowa-table__th--sortable" : ""}
                aria-sort={sortKey === col.key ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
              >
                <span className="jowa-table__th-inner">
                  {col.header}
                  {col.sortable && sortIcon(String(col.key))}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="jowa-table__empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, i) => (
              <tr key={getKey(row)}>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render
                      ? col.render(row, i)
                      : String((row as Record<string, unknown>)[String(col.key)] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.displayName = "Table";
