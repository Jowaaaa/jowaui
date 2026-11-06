import { BuilderLayout, BuilderNode, ComponentKey } from "./registry";

export const GRID_UNITS = 50;
export const LEGACY_GRID_UNITS = 12;

const DEFAULT_GRID_SPANS: Partial<Record<ComponentKey, number>> = {
  hero: 50,
  navbar: 50,
  banner: 50,
  divider: 50,
  columns: 50,
  card: 25,
  input: 17,
  textarea: 25,
  button: 13,
  checkbox: 17,
  switch: 17,
};

const DEFAULT_GRID_ROW_SPANS: Partial<Record<ComponentKey, number>> = {
  hero: 6,
  card: 3,
  columns: 4,
  banner: 2,
  alert: 2,
  textarea: 2,
  statcard: 3,
};

export function defaultLayout(component: ComponentKey): BuilderLayout {
  return { columnStart: 1, columnSpan: DEFAULT_GRID_SPANS[component] ?? 17, rowSpan: DEFAULT_GRID_ROW_SPANS[component] ?? 1, gridVersion: GRID_UNITS };
}

export function clampLayout(layout: BuilderLayout): BuilderLayout {
  const scale = (value: number) => Math.max(1, Math.round(value * GRID_UNITS / LEGACY_GRID_UNITS));
  const migrated = layout.gridVersion === GRID_UNITS ? layout : {
    ...layout,
    columnStart: Math.round((layout.columnStart - 1) * GRID_UNITS / LEGACY_GRID_UNITS) + 1,
    columnSpan: scale(layout.columnSpan),
    rowStart: layout.rowStart === undefined ? undefined : Math.round((layout.rowStart - 1) * GRID_UNITS / LEGACY_GRID_UNITS) + 1,
    rowSpan: layout.rowSpan === undefined ? undefined : scale(layout.rowSpan),
  };
  const columnSpan = Math.max(1, Math.min(GRID_UNITS, Math.round(migrated.columnSpan)));
  const columnStart = Math.max(1, Math.min(GRID_UNITS + 1 - columnSpan, Math.round(migrated.columnStart)));
  const rowSpan = migrated.rowSpan === undefined ? undefined : Math.max(1, Math.round(migrated.rowSpan));
  const rowStart = migrated.rowStart === undefined ? undefined : Math.max(1, Math.round(migrated.rowStart));
  return { columnStart, columnSpan, rowStart, rowSpan, gridVersion: GRID_UNITS };
}

export function layoutFromPointer(rect: Pick<DOMRect, "left" | "top" | "width">, clientX: number, clientY: number, size: BuilderLayout, rowHeight = rect.width / GRID_UNITS): BuilderLayout {
  const cellWidth = rect.width / GRID_UNITS;
  const column = Math.floor((clientX - rect.left) / cellWidth) + 1;
  const row = Math.floor((clientY - rect.top) / rowHeight) + 1;
  return clampLayout({
    ...size,
    columnStart: column,
    rowStart: row,
    gridVersion: GRID_UNITS,
  });
}

function overlaps(a: BuilderLayout, b: BuilderLayout): boolean {
  const aRowStart = a.rowStart ?? 1;
  const bRowStart = b.rowStart ?? 1;
  return a.columnStart < b.columnStart + b.columnSpan
    && a.columnStart + a.columnSpan > b.columnStart
    && aRowStart < bRowStart + (b.rowSpan ?? 1)
    && aRowStart + (a.rowSpan ?? 1) > bRowStart;
}

export function findAvailablePlacement(nodes: BuilderNode[], requested: BuilderLayout, ignoredId?: string, viewport: "desktop" | "tablet" | "mobile" = "desktop"): BuilderLayout {
  let placement = clampLayout({ ...requested, rowStart: requested.rowStart ?? 1 });
  const occupied = nodes
    .filter((node) => node.id !== ignoredId)
    .map((node) => node.layout?.[viewport] ?? node.layout?.desktop)
    .filter((layout): layout is BuilderLayout => Boolean(layout?.rowStart));

  while (occupied.some((layout) => overlaps(placement, clampLayout(layout)))) {
    const conflictingRows = occupied
      .filter((layout) => overlaps(placement, clampLayout(layout)))
      .map((layout) => (layout.rowStart ?? 1) + (layout.rowSpan ?? 1));
    placement = clampLayout({ ...placement, rowStart: Math.max(...conflictingRows) });
  }
  return placement;
}
