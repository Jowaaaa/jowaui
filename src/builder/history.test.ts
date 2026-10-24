import { describe, expect, it } from "vitest";
import { commitHistory, createHistoryState, redoHistory, undoHistory } from "./history";

describe("builder history", () => {
  it("undoes and redoes committed states in order", () => {
    const initial = createHistoryState("first");
    const second = commitHistory(initial, "second");
    const third = commitHistory(second, "third");

    expect(undoHistory(third)).toEqual({ past: ["first"], present: "second", future: ["third"] });
    expect(redoHistory(undoHistory(third))).toEqual(third);
  });

  it("clears redo states after a new commit", () => {
    const state = commitHistory(undoHistory(commitHistory(createHistoryState("first"), "second")), "replacement");

    expect(state.present).toBe("replacement");
    expect(state.future).toEqual([]);
  });

  it("keeps boundary states unchanged", () => {
    const state = createHistoryState("only");

    expect(undoHistory(state)).toBe(state);
    expect(redoHistory(state)).toBe(state);
  });
});
