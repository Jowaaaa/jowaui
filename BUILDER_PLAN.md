# jowaui Builder Plan

## Product direction

The builder is the primary application and consumes the jowaui component library. Storybook remains a separate documentation and component-testing environment.

## Architecture

- A standalone React/Vite application lives beside `src/lib`.
- The page is represented by a serializable nested node tree.
- A component registry defines palette entries, default props, editable props, and child support.
- The visual canvas renders registered components and provides selection/drop boundaries.
- Project state is persisted locally and can be exported as JSON, JSX, or a complete React ZIP archive.
- Arbitrary JSX and imports run in an isolated preview runtime, not in the builder document.
- Recognized nodes carry stable builder IDs; unknown custom JSX remains source-owned and is not destructively rewritten.
- Publishing is intentionally browser-local for now; public deployment is out of scope for this phase.

## Milestones

1. Standalone builder shell with palette, canvas, inspector, and layers.
2. Nested drag/drop, reordering, duplication, deletion, and undo/redo.
3. Component prop/style controls backed by jowaui CSS variables.
4. Isolated JSX/TSX project preview with arbitrary imports.
5. Double-click source editor with parse/runtime error handling.
6. JSON project import/export and JSX project export.
7. Responsive previews, accessibility, and production polish.

## First vertical slice

- Registered components: `Hero`, `Card`, `Button`, `Badge`, `Alert`, and `Input`.
- Nested children can be added to `Card` and `Hero`.
- Components can be dragged from the palette into the canvas or selected layer.
- Double-clicking a node opens generated JSX and an isolated preview surface.
- Builder state persists in `localStorage`.

## Status

The standalone shell, initial component registry, nested canvas, palette drag/drop, inspector, per-node color controls, layer tree, local persistence, undo/redo, duplicate/delete actions, full JSON project import/export, JSX export, responsive viewport switching, isolated code-preview modal, AST-backed source synchronization, project-level `App.tsx` editing, selectable custom JSX placeholders, multi-file editing, dependency metadata, complete React project ZIP export, and local published preview snapshots are implemented. Generated multi-root JSX is fragment-wrapped, Hero children round-trip through its `actions` prop, and published previews use the same verified Sandpack configuration as editor previews. The next work is richer AST transforms, source-preserving visual edits, and builder reliability/accessibility polish. Public deployment is intentionally deferred.
