export type HistoryState<T> = {
  past: T[];
  present: T;
  future: T[];
};

export function createHistoryState<T>(present: T): HistoryState<T> {
  return { past: [], present, future: [] };
}

export function commitHistory<T>(state: HistoryState<T>, present: T): HistoryState<T> {
  return { past: [...state.past, state.present], present, future: [] };
}

export function undoHistory<T>(state: HistoryState<T>): HistoryState<T> {
  const present = state.past[state.past.length - 1];
  return present === undefined
    ? state
    : { past: state.past.slice(0, -1), present, future: [state.present, ...state.future] };
}

export function redoHistory<T>(state: HistoryState<T>): HistoryState<T> {
  const present = state.future[0];
  return present === undefined
    ? state
    : { past: [...state.past, state.present], present, future: state.future.slice(1) };
}
