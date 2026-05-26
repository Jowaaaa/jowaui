import React, { useState, useRef, useCallback } from "react";

export interface DataGridColumn<T> {
  key: keyof T;
  header: string;
  width?: number;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataGridProps<T extends object> {
  columns: DataGridColumn<T>[];
  rows: T[];
  selectedRows?: Set<string | number>;
  onSelectedRowsChange?: (selected: Set<string | number>) => void;
  getRowId?: (row: T) => string | number;
  onSort?: (key: keyof T, direction: "asc" | "desc") => void;
  className?: string;
}

type SortState<T> = { key: keyof T; direction: "asc" | "desc" } | null;

export function DataGrid<T extends object>({
  columns,
  rows,
  selectedRows,
  onSelectedRowsChange,
  getRowId,
  onSort,
  className,
}: DataGridProps<T>): React.ReactElement {
  const defaultGetRowId = useCallback(
    (row: T): string | number => {
      const r = row as Record<string, unknown>;
      return String(r["id"] ?? r["key"] ?? JSON.stringify(row));
    },
    []
  );
  const resolveId = getRowId ?? defaultGetRowId;

  // Controlled/uncontrolled selection
  const isControlled: boolean = selectedRows !== undefined;
  const [internalSelected, setInternalSelected] = useState<Set<string | number>>(new Set());
  const activeSelected: Set<string | number> = isControlled ? selectedRows! : internalSelected;

  const setSelected = useCallback(
    (next: Set<string | number>): void => {
      if (!isControlled) setInternalSelected(next);
      onSelectedRowsChange?.(next);
    },
    [isControlled, onSelectedRowsChange]
  );

  // Sort state (internal — consumer can override via onSort)
  const [sortState, setSortState] = useState<SortState<T>>(null);

  const handleSort = useCallback(
    (key: keyof T): void => {
      setSortState((prev) => {
        if (prev?.key !== key) {
          const next: SortState<T> = { key, direction: "asc" };
          onSort?.(key, "asc");
          return next;
        }
        if (prev.direction === "asc") {
          onSort?.(key, "desc");
          return { key, direction: "desc" };
        }
        // cycle back to none
        return null;
      });
    },
    [onSort]
  );

  // Column widths (for resize)
  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    columns.forEach((c) => {
      if (c.width) init[String(c.key)] = c.width;
    });
    return init;
  });

  const resizingRef = useRef<{ key: string; startX: number; startWidth: number } | null>(null);

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent, key: string): void => {
      e.preventDefault();
      const currentWidth: number = colWidths[key] ?? 150;
      resizingRef.current = { key, startX: e.clientX, startWidth: currentWidth };

      const onMouseMove = (ev: MouseEvent): void => {
        if (!resizingRef.current) return;
        const delta: number = ev.clientX - resizingRef.current.startX;
        const newWidth: number = Math.max(60, resizingRef.current.startWidth + delta);
        setColWidths((prev) => ({ ...prev, [resizingRef.current!.key]: newWidth }));
      };

      const onMouseUp = (): void => {
        resizingRef.current = null;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [colWidths]
  );

  // Selection helpers
  const allIds: (string | number)[] = rows.map(resolveId);
  const allSelected: boolean = allIds.length > 0 && allIds.every((id) => activeSelected.has(id));
  const someSelected: boolean = !allSelected && allIds.some((id) => activeSelected.has(id));

  const toggleAll = (): void => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(allIds));
    }
  };

  const toggleRow = (id: string | number): void => {
    const next = new Set(activeSelected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelected(next);
  };

  // Sort rows internally if no external onSort
  const displayRows: T[] = React.useMemo((): T[] => {
    if (!sortState || onSort) return rows;
    return [...rows].sort((a, b) => {
      const av = a[sortState.key];
      const bv = b[sortState.key];
      const cmp = String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
      return sortState.direction === "asc" ? cmp : -cmp;
    });
  }, [rows, sortState, onSort]);

  return (
    <div
      className={["jowa-datagrid", className].filter(Boolean).join(" ")}
      role="region"
      aria-label="Data grid"
    >
      <table className="jowa-datagrid__table">
        <thead className="jowa-datagrid__thead">
          <tr>
            <th className="jowa-datagrid__th jowa-datagrid__checkbox-cell" aria-label="Select all rows">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={toggleAll}
                aria-label="Select all rows"
              />
            </th>
            {columns.map((col) => {
              const key: string = String(col.key);
              const isSorted: boolean = sortState?.key === col.key;
              const thClasses: string = [
                "jowa-datagrid__th",
                col.sortable ? "jowa-datagrid__th--sortable" : "",
                isSorted && sortState?.direction === "asc" ? "jowa-datagrid__th--asc" : "",
                isSorted && sortState?.direction === "desc" ? "jowa-datagrid__th--desc" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <th
                  key={key}
                  className={thClasses}
                  style={colWidths[key] ? { width: colWidths[key] } : undefined}
                  aria-sort={
                    isSorted
                      ? sortState?.direction === "asc"
                        ? "ascending"
                        : "descending"
                      : col.sortable
                      ? "none"
                      : undefined
                  }
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="jowa-datagrid__th-inner">
                    {col.header}
                    {col.sortable && (
                      <span className="jowa-datagrid__sort-icon" aria-hidden="true">
                        {!isSorted ? "⇅" : sortState?.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </span>
                  <span
                    className="jowa-datagrid__resize-handle"
                    aria-hidden="true"
                    onMouseDown={(e) => handleResizeMouseDown(e, key)}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="jowa-datagrid__tbody">
          {displayRows.length === 0 ? (
            <tr className="jowa-datagrid__tr">
              <td
                className="jowa-datagrid__td jowa-datagrid__empty"
                colSpan={columns.length + 1}
              >
                No data to display
              </td>
            </tr>
          ) : (
            displayRows.map((row, rowIndex) => {
              const id: string | number = resolveId(row);
              const isSelected: boolean = activeSelected.has(id);
              const trClasses: string = [
                "jowa-datagrid__tr",
                isSelected ? "jowa-datagrid__tr--selected" : "",
                rowIndex % 2 === 1 ? "jowa-datagrid__tr--striped" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <tr key={String(id)} className={trClasses} aria-selected={isSelected}>
                  <td className="jowa-datagrid__td jowa-datagrid__checkbox-cell">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(id)}
                      aria-label={`Select row ${String(id)}`}
                    />
                  </td>
                  {columns.map((col) => {
                    const value: T[keyof T] = row[col.key];
                    return (
                      <td key={String(col.key)} className="jowa-datagrid__td">
                        {col.render ? col.render(value, row) : String(value ?? "")}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

DataGrid.displayName = "DataGrid";
