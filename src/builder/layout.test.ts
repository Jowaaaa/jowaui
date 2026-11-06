import { describe, expect, it } from "vitest";
import { createNode } from "./registry";
import { clampLayout, findAvailablePlacement, layoutFromPointer } from "./layout";

describe("builder grid layout", () => {
  it("snaps a pointer to the center of a component span", () => {
    const layout = layoutFromPointer({ left: 100, top: 50, width: 1000 }, 600, 250, { columnStart: 1, columnSpan: 10, rowSpan: 2 }, 10);

    expect(layout).toMatchObject({ columnStart: 26, columnSpan: 10, rowStart: 21, rowSpan: 2 });
  });

  it("keeps a requested layout inside the grid", () => {
    expect(clampLayout({ columnStart: 49, columnSpan: 10, rowStart: 0, rowSpan: 0, gridVersion: 50 })).toMatchObject({ columnStart: 41, columnSpan: 10, rowStart: 1, rowSpan: 1 });
  });

  it("moves a placement below occupied grid items", () => {
    const card = createNode("card");
    card.layout = { desktop: { columnStart: 1, columnSpan: 25, rowStart: 1, rowSpan: 3, gridVersion: 50 } };
    const placement = findAvailablePlacement([card], { columnStart: 1, columnSpan: 25, rowStart: 1, rowSpan: 2, gridVersion: 50 });

    expect(placement.rowStart).toBe(4);
  });
});
