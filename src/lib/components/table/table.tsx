import React, { useState, useMemo } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface TableColumn<T> {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T extends object> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string);
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  stickyHeader?: boolean;
  emptyMessage?: React.ReactNode;
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
