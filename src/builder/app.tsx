import React, { useEffect, useMemo, useRef, useState } from "react";
import { SandpackLayout, SandpackPreview, SandpackProvider, useSandpack } from "@codesandbox/sandpack-react";
import JSZip from "jszip";
import { BuilderLayout, BuilderNode, BuilderViewport, COMPONENT_REGISTRY, ComponentKey, cloneNode, createNode, findNode, insertAfter, insertNode, moveNode, nodeToModule, nodesToModule, removeNode, sourceToNode, sourceToNodes, updateNode } from "./registry";
import { commitHistory, createHistoryState, redoHistory, undoHistory } from "./history";
import { ProjectAsset, loadAssets, removeAsset, saveAsset } from "./assets";

const STORAGE_KEY = "jowaui-builder-project";
const FILES_STORAGE_KEY = "jowaui-builder-files";
const PAGES_STORAGE_KEY = "jowaui-builder-pages";
const PROJECT_NAME_STORAGE_KEY = "jowaui-builder-project-name";
const VERSION_HISTORY_STORAGE_KEY = "jowaui-builder-version-history";
const SANDBOX_DEPENDENCIES = { react: "18.3.1", "react-dom": "18.3.1", "@jowaaaa/jowaui": "0.2.2" };
const SANDBOX_TEMPLATE = "vite-react-ts" as const;
const STYLE_CONTROLS = [
  { key: "margin", label: "Margin" },
  { key: "padding", label: "Padding" },
  { key: "gap", label: "Gap" },
  { key: "fontSize", label: "Font size" },
  { key: "fontWeight", label: "Font weight" },
  { key: "lineHeight", label: "Line height" },
  { key: "textAlign", label: "Text align" },
  { key: "color", label: "Text color" },
  { key: "backgroundColor", label: "Background" },
  { key: "border", label: "Border" },
  { key: "borderRadius", label: "Radius" },
];

const DEFAULT_GRID_SPANS: Partial<Record<ComponentKey, number>> = {
  hero: 12,
  navbar: 12,
  banner: 12,
  divider: 12,
  columns: 12,
  card: 6,
  input: 4,
  textarea: 6,
  button: 3,
  checkbox: 4,
  switch: 4,
};

function defaultLayout(component: ComponentKey): BuilderLayout {
  return { columnStart: 1, columnSpan: DEFAULT_GRID_SPANS[component] ?? 4 };
}

function clampLayout(layout: BuilderLayout): BuilderLayout {
  const columnSpan = Math.max(1, Math.min(12, Math.round(layout.columnSpan)));
  const columnStart = Math.max(1, Math.min(13 - columnSpan, Math.round(layout.columnStart)));
  return { columnStart, columnSpan };
}

function SandpackErrorDetails({ onError, onValid }: { onError?: (message: string) => void; onValid?: () => void } = {}) {
  const { sandpack: { error, status } } = useSandpack();
  const message = typeof error === "object" && error !== null && "message" in error
    ? String(error.message)
    : error ? String(error) : "";
  useEffect(() => {
    if (message && onError) onError(message);
    if (!message && status === "done" && onValid) onValid();
  }, [message, onError, onValid, status]);
  if (!message || onError) return null;
  return <p className="code-error" role="alert">Preview error: {message}</p>;
}

type ProjectFiles = Record<string, string>;
type ProjectDependencies = Record<string, string>;
type BuilderPage = {
  id: string;
  name: string;
  path: string;
  nodes: BuilderNode[];
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  canvasPadding?: number;
};
type PageVersion = {
  id: string;
  pageId: string;
  pageName: string;
  label: string;
  createdAt: string;
  nodes: BuilderNode[];
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  canvasPadding?: number;
};

export type PublishedProject = {
  nodes: BuilderNode[];
  files: ProjectFiles;
  dependencies: ProjectDependencies;
  assets?: ProjectAsset[];
};

const starterNodes: BuilderNode[] = (() => {
  const hero = createNode("hero");
  const card = createNode("card");
  card.children = [createNode("button"), createNode("input")];
  hero.children = [card];
  return [hero];
})();

function readNodes(): BuilderNode[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as BuilderNode[];
  } catch {
    // Invalid local state falls back to the starter document.
  }
  return starterNodes;
}

function readProjectFiles(): { files: ProjectFiles; dependencies: ProjectDependencies } {
  try {
    const saved = localStorage.getItem(FILES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as { files?: ProjectFiles; dependencies?: ProjectDependencies };
       if (parsed.files && typeof parsed.files === "object") return { files: parsed.files, dependencies: parsed.dependencies ?? { "@jowaaaa/jowaui": "0.2.2" } };
    }
  } catch {
    // Invalid project files fall back to the generated visual page.
  }
  return { files: {}, dependencies: { "@jowaaaa/jowaui": "0.2.2" } };
}

function readPages(): BuilderPage[] {
  try {
    const saved = localStorage.getItem(PAGES_STORAGE_KEY);
    if (saved) {
      const pages = JSON.parse(saved) as BuilderPage[];
      if (Array.isArray(pages) && pages.length > 0) return pages;
    }
  } catch {
    // Invalid page state falls back to the migrated single page.
  }
  const projectFiles = readProjectFiles();
  return [{ id: "page-home", name: "Home", path: "/", nodes: readNodes(), files: projectFiles.files, dependencies: projectFiles.dependencies }];
}

function readProjectName(): string {
  try {
    return localStorage.getItem(PROJECT_NAME_STORAGE_KEY) || "jowaui project";
  } catch {
    return "jowaui project";
  }
}

function readVersionHistory(): PageVersion[] {
  try {
    const saved = localStorage.getItem(VERSION_HISTORY_STORAGE_KEY);
    if (saved) {
      const versions = JSON.parse(saved) as PageVersion[];
      if (Array.isArray(versions)) return versions;
    }
  } catch {
    // Invalid history falls back to an empty version list.
  }
  return [];
}

function normalizeProjectPath(value: string): string | null {
  const path = value.trim().replace(/\\/g, "/");
  if (!path || !path.startsWith("/") || path.includes("..") || path.endsWith("/")) return null;
  return path;
}

function starterFileContent(path: string): string {
  const extension = path.split(".").pop()?.toLowerCase();
  if (extension === "tsx" || extension === "jsx") {
    const componentName = path.split("/").pop()?.replace(/\.(tsx|jsx)$/, "").replace(/[^a-zA-Z0-9]/g, "") || "Section";
    const safeName = `${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}`;
    return `import React from "react";\n\nexport default function ${safeName}() {\n  return <div />;\n}\n`;
  }
  if (extension === "ts" || extension === "js") return "export {};\n";
  if (extension === "css") return "/* Add styles here */\n";
  if (extension === "json") return "{}\n";
  return "# Add content here\n";
}

async function downloadProjectArchive(projectName: string, pages: BuilderPage[], activePageId: string, assets: ProjectAsset[]) {
  const zip = new JSZip();
  const toProjectPath = (path: string) => path === "/App.tsx" ? "src/App.tsx" : path.startsWith("/src/") ? path.slice(1) : `src${path}`;
  const activePage = pages.find((page) => page.id === activePageId) ?? pages[0];
  if (!activePage) return;
  const projectDependencies = Object.assign({}, ...pages.map((page) => page.dependencies));
  const packageName = projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "jowaui-project";
  const sourceFiles = (page: BuilderPage) => ({ "/App.tsx": nodesToModule(page.nodes), ...page.files });
  Object.entries(sourceFiles(activePage)).forEach(([path, content]) => zip.file(toProjectPath(path), content));
  pages.filter((page) => page.id !== activePage.id).forEach((page) => {
    Object.entries(sourceFiles(page)).forEach(([path, content]) => zip.file(`pages/${page.id}/${toProjectPath(path)}`, content));
  });
  zip.file("pages/index.json", JSON.stringify({ activePageId, pages: pages.map(({ id, name, path }) => ({ id, name, path })) }, null, 2));
  const assetManifest = assets.map((asset) => {
    const filename = `${asset.id}-${asset.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
    const path = `public/assets/${filename}`;
    const encoded = asset.dataUrl.split(",")[1];
    if (encoded) zip.file(path, encoded, { base64: true });
    return { ...asset, path };
  });
  zip.file("assets.json", JSON.stringify(assetManifest.map(({ dataUrl: _dataUrl, ...asset }) => asset), null, 2));
  zip.file("src/main.tsx", `import React from "react";\nimport { createRoot } from "react-dom/client";\nimport "@jowaaaa/jowaui/styles";\nimport App from "./App";\n\ncreateRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);\n`);
  zip.file("src/index.css", `html, body, #root { min-height: 100%; }\nbody { margin: 0; }\n`);
  zip.file("index.html", `<!doctype html>\n<html lang="en">\n  <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>jowaui project</title></head>\n  <body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body>\n</html>\n`);
  zip.file("builder-project.json", JSON.stringify({ version: 3, name: projectName, activePageId, pages, assets }, null, 2));
  zip.file("package.json", JSON.stringify({
    name: packageName,
    private: true,
    type: "module",
    scripts: { dev: "vite", build: "vite build", preview: "vite preview" },
    dependencies: { react: "^18.3.1", "react-dom": "^18.3.1", "@jowaaaa/jowaui": "0.2.2", ...projectDependencies },
    devDependencies: { "@vitejs/plugin-react": "^4.4.1", vite: "^6.3.5" },
  }, null, 2));
  zip.file("package-lock.json", JSON.stringify({
    name: packageName,
    version: "0.0.0",
    lockfileVersion: 3,
    requires: true,
    packages: {
      "": {
        name: packageName,
        version: "0.0.0",
        dependencies: { react: "^18.3.1", "react-dom": "^18.3.1", "@jowaaaa/jowaui": "0.2.2", ...projectDependencies },
        devDependencies: { "@vitejs/plugin-react": "^4.4.1", vite: "^6.3.5" },
      },
    },
  }, null, 2));
  zip.file("README.md", `# ${projectName}\n\nInstall dependencies with \`npm install\`, then run \`npm run dev\`.\n\nThe active page is exported at \`src/App.tsx\`. Additional pages and their source files are available under \`pages/\`.\n`);
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${packageName}.zip`;
  link.click();
  URL.revokeObjectURL(url);
}

function useDocumentHistory(initial: BuilderNode[]) {
  const [state, setState] = useState(() => createHistoryState(initial));
  const replace = (present: BuilderNode[]) => setState(createHistoryState(present));
  const commit = (nextOrUpdater: BuilderNode[] | ((current: BuilderNode[]) => BuilderNode[])) => {
    setState((current) => {
      const next = typeof nextOrUpdater === "function" ? nextOrUpdater(current.present) : nextOrUpdater;
      return commitHistory(current, next);
    });
  };
  const undo = () => setState((current) => {
    return undoHistory(current);
  });
  const redo = () => setState((current) => {
    return redoHistory(current);
  });
  return { nodes: state.present, commit, replace, undo, redo, canUndo: state.past.length > 0, canRedo: state.future.length > 0 };
}

function primaryEditableProp(node: BuilderNode): string | undefined {
  const definition = COMPONENT_REGISTRY[node.component];
  return ["children", "title", "header", "label", "value", "subtitle"].find((key) => definition.props.some((prop) => prop.key === key));
}

function InlineTextEditor({ value, onCommit, onCancel }: { value: string; onCommit: (value: string) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState(value);
  return <input className="builder-inline-editor" autoFocus value={draft} onChange={(event) => setDraft(event.target.value)} onBlur={() => onCommit(draft)} onKeyDown={(event) => { if (event.key === "Enter") onCommit(draft); if (event.key === "Escape") onCancel(); }} aria-label="Edit text" />;
}

function LinkListEditor({ value, onChange }: { value: unknown; onChange: (links: Array<{ label: string; href: string }>) => void }) {
  const links = Array.isArray(value) ? (value as Array<{ label?: string; href?: string }>).map((link) => ({ label: link.label ?? "", href: link.href ?? "" })) : [];
  return <div className="link-editor">
    {links.map((link, index) => <div className="link-editor__row" key={`${index}-${link.href ?? "link"}`}>
      <input aria-label={`Link ${index + 1} label`} value={link.label ?? ""} placeholder="Label" onChange={(event) => onChange(links.map((item, itemIndex) => itemIndex === index ? { label: event.target.value, href: item.href ?? "" } : { label: item.label ?? "", href: item.href ?? "" }))} />
      <input aria-label={`Link ${index + 1} URL`} value={link.href ?? ""} placeholder="/path" onChange={(event) => onChange(links.map((item, itemIndex) => itemIndex === index ? { label: item.label ?? "", href: event.target.value } : { label: item.label ?? "", href: item.href ?? "" }))} />
      <button type="button" className="icon-button link-editor__remove" onClick={() => onChange(links.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Remove link ${index + 1}`}>×</button>
    </div>)}
    <button type="button" className="button button--quiet link-editor__add" onClick={() => onChange([...links.map((link) => ({ label: link.label ?? "", href: link.href ?? "" })), { label: "New link", href: "/new" }])}>+ Add link</button>
  </div>;
}

function DropZone({ parentId, index, drop, empty = false }: { parentId: string | null; index: number; drop: (event: React.DragEvent, parentId: string | null, index: number) => void; empty?: boolean }) {
  return <div className={`builder-drop-zone${empty ? " builder-drop-zone--empty" : ""}`} onDragOver={(event) => { event.preventDefault(); event.dataTransfer.dropEffect = "move"; }} onDrop={(event) => { event.stopPropagation(); drop(event, parentId, index); }} aria-label="Drop component here">{empty && <span>Drop a component here</span>}</div>;
}

function GridResizeHandle({ side, onResize }: { side: "left" | "right"; onResize: (delta: number, side: "left" | "right") => void }) {
  const start = (event: React.PointerEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const grid = event.currentTarget.closest(".builder-grid") as HTMLElement | null;
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    const columns = 12;
    const gap = Number.parseFloat(getComputedStyle(grid).columnGap) || 0;
    const columnWidth = (rect.width - gap * (columns - 1)) / columns;
    const startX = event.clientX;
    const move = (moveEvent: PointerEvent) => onResize(Math.round((moveEvent.clientX - startX) / (columnWidth + gap)), side);
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop, { once: true });
  };

  return <span className={`builder-resize-handle builder-resize-handle--${side}`} onPointerDown={start} role="separator" aria-label={`Resize ${side}`} />;
}

function renderNode(node: BuilderNode, viewport: BuilderViewport, selectedId: string | null, editingId: string | null, select: (id: string) => void, openCode: (id: string) => void, drop: (event: React.DragEvent, parentId: string | null, index: number) => void, edit: (id: string) => void, commitInline: (id: string, key: string, value: string) => void, cancelInline: () => void, startDrag: (id: string) => void, resize: (id: string, base: BuilderLayout, delta: number, side: "left" | "right") => void, isGridItem = true): React.ReactNode {
  const definition = COMPONENT_REGISTRY[node.component];
  const children = node.component === "columns"
    ? node.children.map((child) => <React.Fragment key={child.id}>{renderNode(child, viewport, selectedId, editingId, select, openCode, drop, edit, commitInline, cancelInline, startDrag, resize, false)}</React.Fragment>)
    : node.children.map((child, index) => <React.Fragment key={child.id}><DropZone parentId={node.id} index={index} drop={drop} />{renderNode(child, viewport, selectedId, editingId, select, openCode, drop, edit, commitInline, cancelInline, startDrag, resize)}</React.Fragment>);
  const props = { ...node.props } as Record<string, unknown>;
  const layout = clampLayout(node.layout?.[viewport] ?? node.layout?.desktop ?? defaultLayout(node.component));
  const style = Object.fromEntries(Object.entries({ ...node.styles, ...node.responsiveStyles?.[viewport], ...(isGridItem ? { gridColumn: `${layout.columnStart} / span ${layout.columnSpan}` } : {}) }).map(([key, value]) => [key, value])) as React.CSSProperties;
  const childContent = node.component === "columns" ? children : definition.acceptsChildren ? <div className="builder-grid builder-grid--nested">{children}</div> : children;
  if (node.component === "hero") props.actions = childContent;
  const editableProp = primaryEditableProp(node);

  return (
    <div
      key={node.id}
       className={`builder-node ${definition.acceptsChildren ? "builder-node--container" : ""} ${definition.acceptsChildren && node.children.length === 0 ? "builder-node--empty" : ""} ${selectedId === node.id ? "builder-node--selected" : ""}`}
      data-builder-id={node.id}
      style={style}
      onClick={(event) => { event.stopPropagation(); select(node.id); }}
      onDoubleClick={(event) => { event.stopPropagation(); editableProp ? edit(node.id) : openCode(node.id); }}
      draggable
      onDragStart={(event) => { event.stopPropagation(); event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("jowa-node", node.id); startDrag(node.id); }}
      onDragEnd={() => startDrag("")}
      onDragOver={definition.acceptsChildren ? (event) => event.preventDefault() : undefined}
      onDrop={definition.acceptsChildren ? (event) => { event.stopPropagation(); drop(event, node.id, node.children.length); } : undefined}
    >
      {node.component === "card" || node.component === "columns" || node.component === "column" ? React.createElement(definition.render, props, childContent) : React.createElement(definition.render, props)}
      {editingId === node.id && editableProp && <InlineTextEditor value={String(node.props[editableProp] ?? "")} onCommit={(value) => commitInline(node.id, editableProp, value)} onCancel={cancelInline} />}
      {definition.acceptsChildren && <DropZone parentId={node.id} index={node.children.length} drop={drop} empty={node.children.length === 0} />}
      {selectedId === node.id && <span className="builder-node__label">{definition.label} · {layout.columnSpan}/12</span>}
      {selectedId === node.id && isGridItem && <><GridResizeHandle side="left" onResize={(delta, side) => resize(node.id, layout, delta, side)} /><GridResizeHandle side="right" onResize={(delta, side) => resize(node.id, layout, delta, side)} /></>}
    </div>
  );
}

function CodeModal({ node, onClose, onSave }: { node: BuilderNode; onClose: () => void; onSave: (source: string) => string | undefined }) {
  const generated = nodeToModule(node);
  const [source, setSource] = useState(node.sourceVersion === 1 ? node.source ?? generated : generated);
  const [previewCode, setPreviewCode] = useState(source);
  const [lastValidCode, setLastValidCode] = useState(source);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const save = () => {
    const saveError = onSave(source);
    if (saveError) setError(saveError);
    else onClose();
  };

  return (
    <div className="builder-modal__backdrop" onMouseDown={onClose}>
      <section className="builder-modal" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="code-title">
        <header className="builder-modal__header">
          <div>
            <p className="eyebrow">Source editor</p>
            <h2 id="code-title">{COMPONENT_REGISTRY[node.component].label} JSX</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close code editor">×</button>
        </header>
        <div className="builder-modal__body">
          <div className="code-pane">
            <label htmlFor="node-code">Edit the complete module, including imports</label>
            <textarea id="node-code" spellCheck={false} value={source} onChange={(event) => setSource(event.target.value)} />
            {error && <p className="code-error" role="alert">{error}</p>}
            <p className="hint">Arbitrary JSX is previewed in an isolated Sandpack runtime. Changes are saved to this node’s source override.</p>
          </div>
          <div className="code-preview">
            <div className="preview-label">Isolated preview</div>
             <div className="preview-validator" aria-hidden="true"><SandpackProvider template={SANDBOX_TEMPLATE} files={{ "/App.tsx": source }} customSetup={{ entry: "/App.tsx", dependencies: SANDBOX_DEPENDENCIES }}>
              <SandpackLayout><SandpackPreview showSandpackErrorOverlay={false} /><SandpackErrorDetails onError={(message) => { setPreviewError(message); setPreviewCode(lastValidCode); }} onValid={() => { setLastValidCode(source); setPreviewCode(source); setPreviewError(null); }} /></SandpackLayout>
            </SandpackProvider></div>
            <SandpackProvider template={SANDBOX_TEMPLATE} files={{ "/App.tsx": previewCode }} customSetup={{ entry: "/App.tsx", dependencies: SANDBOX_DEPENDENCIES }}><SandpackLayout><SandpackPreview showSandpackErrorOverlay={false} /></SandpackLayout></SandpackProvider>
            {previewError && <p className="code-error" role="alert">Preview error: {previewError}</p>}
          </div>
        </div>
        <footer className="builder-modal__footer">
          <button className="button button--quiet" onClick={onClose}>Cancel</button>
          <button className="button button--primary" onClick={save}>Save source</button>
        </footer>
      </section>
    </div>
  );
}

function ProjectCodeModal({ files, dependencies, fallbackSource, onClose, onSave }: { files: ProjectFiles; dependencies: ProjectDependencies; fallbackSource: string; onClose: () => void; onSave: (files: ProjectFiles, dependencies: ProjectDependencies) => string | undefined }) {
  const [draftFiles, setDraftFiles] = useState<ProjectFiles>(() => ({ "/App.tsx": fallbackSource, ...files }));
  const [activeFile, setActiveFile] = useState("/App.tsx");
  const [dependencyText, setDependencyText] = useState(JSON.stringify(dependencies, null, 2));
  const [error, setError] = useState<string | null>(null);
  const previewFiles = Object.fromEntries(Object.entries(draftFiles).map(([path, code]) => [path, code.trim() ? code : starterFileContent(path)]));
  const save = () => {
    let parsedDependencies: ProjectDependencies;
    try {
      parsedDependencies = JSON.parse(dependencyText) as ProjectDependencies;
    } catch {
      setError("Dependencies must be valid JSON.");
      return;
    }
    const safeFiles = Object.fromEntries(Object.entries(draftFiles).map(([path, code]) => [path, code.trim() ? code : starterFileContent(path)]));
    const saveError = onSave(safeFiles, parsedDependencies);
    if (saveError) setError(saveError);
    else onClose();
  };
  return (
    <div className="builder-modal__backdrop" onMouseDown={onClose}>
      <section className="builder-modal builder-modal--project" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="project-code-title">
        <header className="builder-modal__header">
          <div><p className="eyebrow">Project source</p><h2 id="project-code-title">App.tsx</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close project editor">×</button>
        </header>
        <div className="builder-modal__body builder-modal__body--files">
          <div className="project-files"><div className="preview-label">Files</div>{Object.keys(draftFiles).map((file) => <button key={file} className={activeFile === file ? "project-file project-file--active" : "project-file"} onClick={() => setActiveFile(file)}>{file}</button>)}<button className="project-file project-file--add" onClick={() => { const requested = window.prompt("File path", "/components/Section.tsx"); const name = requested ? normalizeProjectPath(requested) : null; if (!name) { setError("Use an absolute project path such as /components/Section.tsx."); return; } if (draftFiles[name] !== undefined) { setError("A file with that path already exists."); setActiveFile(name); return; } setDraftFiles((current) => ({ ...current, [name]: starterFileContent(name) })); setActiveFile(name); setError(null); }}>+ Add file</button></div>
            <div className="code-pane"><label htmlFor="project-code">Edit {activeFile}</label><textarea id="project-code" spellCheck={false} value={draftFiles[activeFile] ?? ""} onChange={(event) => setDraftFiles((current) => ({ ...current, [activeFile]: event.target.value }))} />{error && <p className="code-error" role="alert">{error}</p>}<label htmlFor="project-dependencies">Dependencies (JSON)</label><textarea className="dependency-editor" id="project-dependencies" spellCheck={false} value={dependencyText} onChange={(event) => setDependencyText(event.target.value)} /><p className="hint">App.tsx is synchronized into the visual layer tree when the project source is saved. Other files remain source-owned and can be imported by the app.</p></div>
            <div className="code-preview"><div className="preview-label">Project preview</div><SandpackProvider template={SANDBOX_TEMPLATE} files={previewFiles} customSetup={{ entry: "/App.tsx", dependencies: { ...dependencies, ...SANDBOX_DEPENDENCIES } }}><SandpackLayout><SandpackPreview showSandpackErrorOverlay={false} /><SandpackErrorDetails /></SandpackLayout></SandpackProvider></div>
        </div>
        <footer className="builder-modal__footer"><button className="button button--quiet" onClick={onClose}>Cancel</button><button className="button button--primary" onClick={save}>Save project source</button></footer>
      </section>
    </div>
  );
}

function AssetLibrary({ assets, onSelect, onDelete, onClose }: { assets: ProjectAsset[]; onSelect: (asset: ProjectAsset) => void; onDelete: (asset: ProjectAsset) => void; onClose: () => void }) {
  return <div className="builder-modal__backdrop" onMouseDown={onClose}>
    <section className="builder-modal asset-library" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="asset-library-title">
      <header className="builder-modal__header"><div><p className="eyebrow">Project assets</p><h2 id="asset-library-title">Asset library</h2></div><button className="icon-button" onClick={onClose} aria-label="Close asset library">×</button></header>
      <div className="asset-grid">
        {assets.length === 0 && <p className="inspector-empty">Upload an image, SVG, font, or other project asset to get started.</p>}
        {assets.map((asset) => <article className="asset-card" key={asset.id}>
          {asset.mime.startsWith("image/") ? <img src={asset.dataUrl} alt="" /> : <span className="asset-card__type">{asset.mime.split("/").pop()?.toUpperCase() ?? "FILE"}</span>}
          <strong title={asset.name}>{asset.name}</strong>
          <div><button className="button button--primary" onClick={() => onSelect(asset)}>Use</button><button className="button button--quiet" onClick={() => onDelete(asset)}>Delete</button></div>
        </article>)}
      </div>
    </section>
  </div>;
}

function VersionHistoryModal({ versions, onRestore, onDelete, onClose }: { versions: PageVersion[]; onRestore: (version: PageVersion) => void; onDelete: (version: PageVersion) => void; onClose: () => void }) {
  return <div className="builder-modal__backdrop" onMouseDown={onClose}>
    <section className="builder-modal version-history" onMouseDown={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="version-history-title">
      <header className="builder-modal__header"><div><p className="eyebrow">Local history</p><h2 id="version-history-title">Page versions</h2></div><button className="icon-button" onClick={onClose} aria-label="Close version history">×</button></header>
      <div className="version-list">
        {versions.length === 0 && <p className="inspector-empty">No saved versions yet.</p>}
        {versions.map((version) => <article className="version-row" key={version.id}><div><strong>{version.label}</strong><small>{version.pageName} · {new Date(version.createdAt).toLocaleString()}</small></div><div><button className="button button--primary" onClick={() => onRestore(version)}>Restore</button><button className="button button--quiet" onClick={() => onDelete(version)}>Delete</button></div></article>)}
      </div>
    </section>
  </div>;
}

function BuilderToolbar({ projectName, pages, activePageId, projectSource, assets, canUndo, canRedo, importRef, assetImportRef, onRenameProject, onSwitchPage, onCreatePage, onRenamePage, onDeletePage, onSaveVersion, onOpenVersions, onUndo, onRedo, onReset, onExportJson, onExportJsx, onImport, onUploadAsset, onOpenAssets, onOpenCode, onUseVisualTree, onDownload, onPublish }: {
  projectName: string;
  pages: BuilderPage[];
  activePageId: string;
  projectSource: string | null;
  assets: ProjectAsset[];
  canUndo: boolean;
  canRedo: boolean;
  importRef: React.RefObject<HTMLInputElement>;
  assetImportRef: React.RefObject<HTMLInputElement>;
  onRenameProject: () => void;
  onSwitchPage: (id: string) => void;
  onCreatePage: () => void;
  onRenamePage: () => void;
  onDeletePage: () => void;
  onSaveVersion: () => void;
  onOpenVersions: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onExportJson: () => void;
  onExportJsx: () => void;
  onImport: () => void;
  onUploadAsset: () => void;
  onOpenAssets: () => void;
  onOpenCode: () => void;
  onUseVisualTree: () => void;
  onDownload: () => void;
  onPublish: () => void;
}) {
  return <div className="builder-toolbar">
    <div className="toolbar-context"><button className="button button--quiet toolbar-project" onClick={onRenameProject}>{projectName}</button><select className="page-selector" aria-label="Active page" value={activePageId} onChange={(event) => onSwitchPage(event.target.value)}>{pages.map((page) => <option key={page.id} value={page.id}>{page.name} ({page.path})</option>)}</select><button className="button button--quiet" onClick={onCreatePage}>+ Page</button></div>
    <div className="toolbar-group"><button className="button button--quiet" disabled={!canUndo} onClick={onUndo} aria-label="Undo">Undo</button><button className="button button--quiet" disabled={!canRedo} onClick={onRedo} aria-label="Redo">Redo</button><button className="button button--quiet" onClick={onSaveVersion}>Save version</button><button className="button button--primary" onClick={onOpenCode}>Code</button></div>
    <details className="toolbar-menu"><summary className="button button--quiet">More</summary><div className="toolbar-menu__panel"><button onClick={onRenamePage}>Rename page</button><button onClick={onDeletePage}>Delete page</button><button onClick={onOpenVersions}>Version history</button><button onClick={onOpenAssets}>Assets ({assets.length})</button><button onClick={onUploadAsset}>Upload asset</button><button onClick={onReset}>Reset canvas</button><button onClick={onExportJson}>Export JSON</button><button onClick={onExportJsx}>Export JSX</button><button onClick={onImport}>Import JSON</button>{projectSource && <button onClick={onUseVisualTree}>Use visual tree</button>}<button onClick={onDownload}>Download ZIP</button><button className="toolbar-menu__publish" onClick={onPublish}>Publish local preview</button></div></details>
  </div>;
}

export function BuilderApp() {
  const [pages, setPages] = useState<BuilderPage[]>(() => readPages());
  const [activePageId, setActivePageId] = useState(() => readPages()[0]?.id ?? "page-home");
  const activePage = pages.find((page) => page.id === activePageId) ?? pages[0];
  const { nodes, commit, replace, undo, redo, canUndo, canRedo } = useDocumentHistory(activePage?.nodes ?? starterNodes);
  const [selectedId, setSelectedId] = useState<string | null>(nodes[0]?.id ?? null);
  const [codeNodeId, setCodeNodeId] = useState<string | null>(null);
  const [projectCodeOpen, setProjectCodeOpen] = useState(false);
  const [projectName, setProjectName] = useState(() => readProjectName());
  const [assets, setAssets] = useState<ProjectAsset[]>([]);
  const [assetLibraryOpen, setAssetLibraryOpen] = useState(false);
  const [assetTargetProp, setAssetTargetProp] = useState<string | null>(null);
  const [versions, setVersions] = useState<PageVersion[]>(() => readVersionHistory());
  const [versionHistoryOpen, setVersionHistoryOpen] = useState(false);
  const [projectFiles, setProjectFiles] = useState<ProjectFiles>(() => activePage?.files ?? {});
  const [projectDependencies, setProjectDependencies] = useState<ProjectDependencies>(() => activePage?.dependencies ?? { "@jowaaaa/jowaui": "0.2.2" });
  const [canvasPadding, setCanvasPadding] = useState(() => activePage?.canvasPadding ?? 30);
  const projectSource = projectFiles["/App.tsx"] ?? null;
  const [draggedComponent, setDraggedComponent] = useState<ComponentKey | null>(null);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const importRef = useRef<HTMLInputElement>(null);
  const assetImportRef = useRef<HTMLInputElement>(null);
  const selectedNode = selectedId ? findNode(nodes, selectedId) : undefined;
  const codeNode = codeNodeId ? findNode(nodes, codeNodeId) : undefined;

  useEffect(() => {
    loadAssets().then(setAssets).catch(() => setAssets([]));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem(FILES_STORAGE_KEY, JSON.stringify({ files: projectFiles, dependencies: projectDependencies }));
  }, [projectFiles, projectDependencies]);

  useEffect(() => {
    setPages((current) => current.map((page) => page.id === activePageId
      ? { ...page, nodes, files: projectFiles, dependencies: projectDependencies, canvasPadding }
      : page));
  }, [activePageId, nodes, projectFiles, projectDependencies, canvasPadding]);

  useEffect(() => {
    localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    localStorage.setItem(PROJECT_NAME_STORAGE_KEY, projectName);
  }, [projectName]);

  useEffect(() => {
    localStorage.setItem(VERSION_HISTORY_STORAGE_KEY, JSON.stringify(versions));
  }, [versions]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.matches("input, textarea, select")) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z") {
        event.preventDefault();
        event.shiftKey ? redo() : undo();
      } else if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "y") {
        event.preventDefault();
        redo();
      } else if (event.key === "Delete" && selectedId) {
        event.preventDefault();
        commitVisual((current) => removeNode(current, selectedId));
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commit, redo, selectedId, undo]);

  const definitions = useMemo(() => Object.values(COMPONENT_REGISTRY).filter((definition) => definition.key !== "custom" && definition.palette !== false), []);

  const commitVisual = (next: BuilderNode[] | ((current: BuilderNode[]) => BuilderNode[])) => {
    setProjectFiles({});
    commit(next);
  };

  const switchPage = (pageId: string) => {
    const page = pages.find((item) => item.id === pageId);
    if (!page || page.id === activePageId) return;
    setActivePageId(page.id);
    replace(page.nodes);
    setProjectFiles(page.files);
    setProjectDependencies(page.dependencies);
    setCanvasPadding(page.canvasPadding ?? 30);
    setSelectedId(page.nodes[0]?.id ?? null);
    setCodeNodeId(null);
    setProjectCodeOpen(false);
  };

  const createPage = () => {
    const name = window.prompt("Page name", "New page")?.trim();
    if (!name) return;
    const requestedPath = window.prompt("Page path", `/${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)?.trim();
    if (!requestedPath) return;
    const path = requestedPath.startsWith("/") ? requestedPath : `/${requestedPath}`;
    if (pages.some((page) => page.path === path)) {
      window.alert("A page with that path already exists.");
      return;
    }
  const page: BuilderPage = { id: `page-${Date.now()}`, name, path, nodes: starterNodes.map(cloneNode), files: {}, dependencies: { "@jowaaaa/jowaui": "0.2.2" }, canvasPadding: 30 };
    setPages((current) => [...current, page]);
    setActivePageId(page.id);
    replace(page.nodes);
    setProjectFiles(page.files);
    setProjectDependencies(page.dependencies);
    setCanvasPadding(page.canvasPadding ?? 30);
    setSelectedId(page.nodes[0]?.id ?? null);
  };

  const renameProject = () => {
    const name = window.prompt("Project name", projectName)?.trim();
    if (name) setProjectName(name);
  };

  const renamePage = () => {
    if (!activePage) return;
    const name = window.prompt("Page name", activePage.name)?.trim();
    const pathInput = window.prompt("Page path", activePage.path)?.trim();
    if (!name || !pathInput) return;
    const path = pathInput.startsWith("/") ? pathInput : `/${pathInput}`;
    if (pages.some((page) => page.id !== activePage.id && page.path === path)) {
      window.alert("A page with that path already exists.");
      return;
    }
    setPages((current) => current.map((page) => page.id === activePage.id ? { ...page, name, path } : page));
  };

  const deletePage = () => {
    if (!activePage || pages.length === 1) {
      window.alert("A project must keep at least one page.");
      return;
    }
    if (!window.confirm(`Delete ${activePage.name}?`)) return;
    const remaining = pages.filter((page) => page.id !== activePage.id);
    setPages(remaining);
    switchPage(remaining[0].id);
  };

  const importAssets = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const asset: ProjectAsset = { id: `asset-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, name: file.name, mime: file.type || "application/octet-stream", size: file.size, dataUrl: String(reader.result) };
        void saveAsset(asset).then(() => setAssets((current) => [...current, asset]));
      };
      reader.readAsDataURL(file);
    });
    event.target.value = "";
  };

  const deleteAsset = (asset: ProjectAsset) => {
    void removeAsset(asset.id).then(() => setAssets((current) => current.filter((item) => item.id !== asset.id)));
  };

  const selectAsset = (asset: ProjectAsset) => {
    const targetProp = assetTargetProp ?? (selectedNode?.props.logoSrc !== undefined ? "logoSrc" : "src");
    if (!selectedId || !selectedNode || !COMPONENT_REGISTRY[selectedNode.component].props.some((prop) => prop.key === targetProp)) {
      window.alert("Select a component with an image URL field first.");
      return;
    }
    updateSelectedProp(targetProp, asset.dataUrl);
    setAssetTargetProp(null);
    setAssetLibraryOpen(false);
  };

  const saveVersion = () => {
    if (!activePage) return;
    const label = window.prompt("Version name", `${activePage.name} snapshot`)?.trim();
    if (!label) return;
    const version: PageVersion = { id: `version-${Date.now()}`, pageId: activePage.id, pageName: activePage.name, label, createdAt: new Date().toISOString(), nodes, files: projectFiles, dependencies: projectDependencies, canvasPadding };
    setVersions((current) => [version, ...current].slice(0, 100));
  };

  const restoreVersion = (version: PageVersion) => {
    const page = pages.find((item) => item.id === version.pageId);
    if (!page) {
      window.alert("The page for this version no longer exists.");
      return;
    }
    setActivePageId(page.id);
    replace(version.nodes);
    setProjectFiles(version.files);
    setProjectDependencies(version.dependencies);
    setCanvasPadding(version.canvasPadding ?? 30);
    setSelectedId(version.nodes[0]?.id ?? null);
    setVersionHistoryOpen(false);
  };

  const deleteVersion = (version: PageVersion) => {
    setVersions((current) => current.filter((item) => item.id !== version.id));
  };

  const addComponent = (component: ComponentKey, parentId: string | null = null) => {
    const newNode = createNode(component);
    commitVisual((current) => insertNode(current, parentId, newNode));
    setSelectedId(newNode.id);
  };

  const handleDrop = (event: React.DragEvent, parentId: string | null, index = Number.MAX_SAFE_INTEGER) => {
    event.preventDefault();
    const nodeId = event.dataTransfer.getData("jowa-node");
    if (nodeId) {
      commitVisual((current) => moveNode(current, nodeId, parentId, index));
      setSelectedId(nodeId);
      setDraggedNodeId(null);
      return;
    }
    const component = event.dataTransfer.getData("jowa-component") as ComponentKey;
    if (component && COMPONENT_REGISTRY[component]) {
      const newNode = createNode(component);
      commitVisual((current) => parentId ? insertNode(current, parentId, newNode) : [...current.slice(0, Math.min(index, current.length)), newNode, ...current.slice(Math.min(index, current.length))]);
      setSelectedId(newNode.id);
    }
    setDraggedComponent(null);
    setDraggedNodeId(null);
  };

  const updateSelectedProp = (key: string, value: unknown) => {
    if (!selectedId) return;
    commitVisual((current) => updateNode(current, selectedId, (node) => {
      if (node.component !== "columns" || key !== "count") return { ...node, props: { ...node.props, [key]: value } };
      const count = Math.max(1, Math.min(6, Number(value) || 1));
      const columns = node.children.filter((child) => child.component === "column");
      const nextColumns = columns.length < count
        ? [...columns, ...Array.from({ length: count - columns.length }, () => createNode("column"))]
        : columns.slice(0, count);
      return { ...node, props: { ...node.props, count }, children: nextColumns };
    }));
  };

  const updateSelectedStyle = (key: string, value: string) => {
    if (!selectedId) return;
    commitVisual((current) => updateNode(current, selectedId, (node) => ({ ...node, styles: { ...node.styles, [key]: value } })));
  };

  const updateSelectedResponsiveStyle = (key: string, value: string) => {
    if (!selectedId) return;
    commitVisual((current) => updateNode(current, selectedId, (node) => ({ ...node, responsiveStyles: { ...node.responsiveStyles, [viewport]: { ...node.responsiveStyles?.[viewport], [key]: value } } })));
  };

  const updateSelectedLayout = (key: "columnStart" | "columnSpan", value: number) => {
    if (!selectedId || !selectedNode) return;
    const current = clampLayout(selectedNode.layout?.[viewport] ?? selectedNode.layout?.desktop ?? defaultLayout(selectedNode.component));
    const next = clampLayout({ ...current, [key]: value });
    commitVisual((currentNodes) => updateNode(currentNodes, selectedId, (node) => ({ ...node, layout: { ...node.layout, [viewport]: next } })));
  };

  const resizeNode = (id: string, base: BuilderLayout, delta: number, side: "left" | "right") => {
    const next = side === "left"
      ? clampLayout({ columnStart: base.columnStart + delta, columnSpan: base.columnSpan - delta })
      : clampLayout({ columnStart: base.columnStart, columnSpan: base.columnSpan + delta });
    commitVisual((current) => updateNode(current, id, (node) => ({ ...node, layout: { ...node.layout, [viewport]: next } })));
  };

  const updateCanvasPadding = (value: number) => setCanvasPadding(Math.max(0, Math.min(120, Number.isFinite(value) ? value : 0)));

  const editInline = (id: string) => setEditingNodeId(id);
  const commitInline = (id: string, key: string, value: string) => {
    commitVisual((current) => updateNode(current, id, (node) => ({ ...node, props: { ...node.props, [key]: value } })));
    setEditingNodeId(null);
  };

  const exportJsx = () => {
    const blob = new Blob([nodesToModule(nodes)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jowaui-page.tsx";
    link.click();
    URL.revokeObjectURL(url);
  };

  const duplicateSelected = () => {
    if (!selectedNode) return;
    const duplicate = cloneNode(selectedNode);
    commitVisual((current) => insertAfter(current, selectedNode.id, duplicate));
    setSelectedId(duplicate.id);
  };

  const exportProject = () => {
    const currentPages = pages.map((page) => page.id === activePageId ? { ...page, nodes, files: projectFiles, dependencies: projectDependencies } : page);
    const blob = new Blob([JSON.stringify({ version: 3, name: projectName, activePageId, pages: currentPages, assets }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jowaui-project.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadProject = () => {
    const currentPages = pages.map((page) => page.id === activePageId ? { ...page, nodes, files: projectFiles, dependencies: projectDependencies } : page);
    void downloadProjectArchive(projectName, currentPages, activePageId, assets);
  };

  const publishProject = () => {
    const id = `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const snapshot: PublishedProject = { nodes, files: projectFiles, dependencies: projectDependencies, assets };
    localStorage.setItem(`jowaui-published-${id}`, JSON.stringify(snapshot));
    const url = new URL(window.location.href);
    url.search = `?preview=${encodeURIComponent(id)}`;
    url.hash = "";
    navigator.clipboard?.writeText(url.toString()).catch(() => undefined);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const importProject = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const project = JSON.parse(String(reader.result)) as { version?: number; name?: string; activePageId?: string; pages?: BuilderPage[]; assets?: ProjectAsset[]; nodes?: BuilderNode[]; files?: ProjectFiles; dependencies?: ProjectDependencies };
        if (Array.isArray(project.pages) && project.pages.length > 0) {
          const importedPages = project.pages.filter((page) => page && typeof page.id === "string" && typeof page.name === "string" && typeof page.path === "string" && Array.isArray(page.nodes));
          if (importedPages.length === 0) throw new Error("Invalid pages");
          const importedActiveId = importedPages.some((page) => page.id === project.activePageId) ? project.activePageId! : importedPages[0].id;
          const importedActive = importedPages.find((page) => page.id === importedActiveId) ?? importedPages[0];
          setProjectName(project.name || "jowaui project");
          setPages(importedPages);
          setActivePageId(importedActive.id);
          replace(importedActive.nodes);
          setProjectFiles(importedActive.files ?? {});
          setProjectDependencies(importedActive.dependencies ?? { "@jowaaaa/jowaui": "0.2.2" });
          if (Array.isArray(project.assets)) {
            void Promise.all(project.assets.map(saveAsset)).then(() => setAssets(project.assets ?? []));
          }
          setSelectedId(importedActive.nodes[0]?.id ?? null);
        } else if (Array.isArray(project.nodes)) {
          commit(project.nodes);
          setProjectFiles(project.files && typeof project.files === "object" ? project.files : {});
          setProjectDependencies(project.dependencies && typeof project.dependencies === "object" ? project.dependencies : { "@jowaaaa/jowaui": "0.2.2" });
          if (Array.isArray(project.assets)) {
            void Promise.all(project.assets.map(saveAsset)).then(() => setAssets(project.assets ?? []));
          }
          setSelectedId(project.nodes[0]?.id ?? null);
        } else {
          throw new Error("Invalid project");
        }
      } catch {
        window.alert("That file is not a valid jowaui project.");
      }
      event.target.value = "";
    };
    reader.readAsText(file);
  };

  const renderInspectorProp = (definition: (typeof COMPONENT_REGISTRY[ComponentKey])["props"][number], value: unknown) => {
    const control = definition.type === "select"
      ? <select value={String(value)} onChange={(event) => updateSelectedProp(definition.key, event.target.value)}>{definition.options?.map((option) => <option key={option}>{option}</option>)}</select>
      : definition.type === "boolean"
        ? <input type="checkbox" checked={Boolean(value)} onChange={(event) => updateSelectedProp(definition.key, event.target.checked)} />
        : definition.type === "json"
          ? <textarea value={JSON.stringify(value, null, 2)} onChange={(event) => { try { updateSelectedProp(definition.key, JSON.parse(event.target.value)); } catch { /* Keep the last valid JSON value while editing. */ } }} />
          : definition.type === "links"
            ? <LinkListEditor value={value} onChange={(links) => updateSelectedProp(definition.key, links)} />
            : <input type={definition.type === "number" ? "number" : "text"} value={String(value)} onChange={(event) => updateSelectedProp(definition.key, definition.type === "number" ? Number(event.target.value) : event.target.value)} />;
    const assetField = definition.key === "src" || definition.key === "logoSrc";
    return <div className={assetField ? "inspector-control inspector-control--asset" : "inspector-control"}>{control}{assetField && <button type="button" className="button button--quiet" onClick={() => { setAssetTargetProp(definition.key); setAssetLibraryOpen(true); }}>Choose asset</button>}</div>;
  };

  return (
    <div className="builder-app">
      <header className="builder-topbar">
        <div className="brand-lockup"><span className="brand-mark">j</span><span>jowaui builder</span></div><BuilderToolbar projectName={projectName} pages={pages} activePageId={activePageId} projectSource={projectSource} assets={assets} canUndo={canUndo} canRedo={canRedo} importRef={importRef} assetImportRef={assetImportRef} onRenameProject={renameProject} onSwitchPage={switchPage} onCreatePage={createPage} onRenamePage={renamePage} onDeletePage={deletePage} onSaveVersion={saveVersion} onOpenVersions={() => setVersionHistoryOpen(true)} onUndo={undo} onRedo={redo} onReset={() => commitVisual(starterNodes)} onExportJson={exportProject} onExportJsx={exportJsx} onImport={() => importRef.current?.click()} onUploadAsset={() => assetImportRef.current?.click()} onOpenAssets={() => setAssetLibraryOpen(true)} onOpenCode={() => setProjectCodeOpen(true)} onUseVisualTree={() => setProjectFiles({})} onDownload={downloadProject} onPublish={publishProject} />
        <div className="topbar-actions"><button className="button button--quiet" onClick={renameProject}>{projectName}</button><select className="page-selector" aria-label="Active page" value={activePage?.id} onChange={(event) => switchPage(event.target.value)}>{pages.map((page) => <option key={page.id} value={page.id}>{page.name} ({page.path})</option>)}</select><button className="button button--quiet" onClick={createPage}>New page</button><button className="button button--quiet" onClick={renamePage}>Rename page</button><button className="button button--quiet" onClick={deletePage}>Delete page</button><button className="button button--quiet" onClick={saveVersion}>Save version</button><button className="button button--quiet" onClick={() => setVersionHistoryOpen(true)}>Versions ({versions.filter((version) => version.pageId === activePageId).length})</button><button className="button button--quiet" disabled={!canUndo} onClick={undo} aria-label="Undo">Undo</button><button className="button button--quiet" disabled={!canRedo} onClick={redo} aria-label="Redo">Redo</button><button className="button button--quiet" onClick={() => commitVisual(starterNodes)}>Reset</button><button className="button button--quiet" onClick={exportProject}>JSON</button><button className="button button--quiet" onClick={exportJsx}>JSX</button><button className="button button--quiet" onClick={() => importRef.current?.click()}>Import</button><button className="button button--quiet" onClick={() => assetImportRef.current?.click()}>Upload asset</button><button className="button button--quiet" onClick={() => setAssetLibraryOpen(true)}>Assets ({assets.length})</button><button className="button button--quiet" onClick={() => setProjectCodeOpen(true)}>Code</button>{projectSource && <button className="button button--quiet" onClick={() => setProjectFiles({})}>Use visual tree</button>}<input ref={importRef} hidden type="file" accept="application/json" onChange={importProject} /><input ref={assetImportRef} hidden type="file" multiple accept="image/*,.svg,.woff,.woff2,.ttf,.otf" onChange={importAssets} /><button className="button button--quiet" onClick={downloadProject}>Download</button><button className="button button--primary" onClick={publishProject}>Publish</button></div>
      </header>
      <div className="builder-workspace">
        <aside className="builder-panel builder-palette">
          <div className="panel-heading"><p className="eyebrow">Library</p><h1>Components</h1><p>Drag an element onto the canvas or a container.</p></div>
          <div className="palette-list">
            {definitions.map((definition) => (
              <button
                key={definition.key}
                className="palette-item"
                draggable
                onDragStart={(event) => { event.dataTransfer.setData("jowa-component", definition.key); setDraggedComponent(definition.key); }}
                onDragEnd={() => setDraggedComponent(null)}
                onClick={() => addComponent(definition.key)}
              >
                <span className="palette-icon">{definition.label.slice(0, 1)}</span>
                <span><strong>{definition.label}</strong><small>{definition.description}</small></span>
              </button>
            ))}
          </div>
        </aside>

        <main className="builder-main">
           <div className="canvas-toolbar"><span>{activePage?.name ?? "Page"}</span><span className="canvas-status">{draggedComponent ? `Drop ${COMPONENT_REGISTRY[draggedComponent].label}` : "Double-click an element to edit JSX"}</span><label className="canvas-setting">Page padding <input aria-label="Page padding" type="number" min="0" max="120" value={canvasPadding} onChange={(event) => updateCanvasPadding(Number(event.target.value))} /> px</label><span className="viewport-switcher">{(["desktop", "tablet", "mobile"] as const).map((size) => <button key={size} className={viewport === size ? "viewport-switcher__active" : ""} onClick={() => setViewport(size)}>{size}</button>)}</span></div>
          <div className="builder-canvas-wrap" onDragOver={(event) => event.preventDefault()} onDrop={(event) => handleDrop(event, null)}>
              <div className={`builder-canvas builder-canvas--${viewport}${draggedNodeId || draggedComponent ? " builder-canvas--dragging" : ""}`} style={{ padding: `${canvasPadding}px`, "--builder-node-margin": canvasPadding === 0 ? "0px" : "7px" } as React.CSSProperties} onClick={() => { setSelectedId(null); setEditingNodeId(null); }}>
                <div className="builder-grid">
                  {nodes.length === 0 && <div className="canvas-empty">Drag a component here to start building.</div>}
                  <DropZone parentId={null} index={0} drop={handleDrop} />
                  {nodes.map((node, index) => <React.Fragment key={node.id}>{index > 0 && <DropZone parentId={null} index={index} drop={handleDrop} />}{renderNode(node, viewport, selectedId, editingNodeId, setSelectedId, setCodeNodeId, handleDrop, editInline, commitInline, () => setEditingNodeId(null), (id) => setDraggedNodeId(id || null), resizeNode)}</React.Fragment>)}
                  {nodes.length > 0 && <DropZone parentId={null} index={nodes.length} drop={handleDrop} />}
                </div>
              </div>
          </div>
        </main>

        <aside className="builder-panel builder-inspector">
          <div className="panel-heading"><p className="eyebrow">Inspector</p><h1>{selectedNode ? COMPONENT_REGISTRY[selectedNode.component].label : "Page"}</h1><p>{selectedNode ? "Edit this element’s content and behavior." : "Select an element on the canvas."}</p></div>
          {selectedNode ? (
            <>
              <div className="inspector-fields">
                 {COMPONENT_REGISTRY[selectedNode.component].props.map((definition) => <label key={definition.key}>{definition.label}{renderInspectorProp(definition, selectedNode.props[definition.key] ?? (definition.type === "links" ? [] : ""))}</label>)}
                <div className="inspector-divider"><p className="eyebrow">Colors</p></div>
                 {COMPONENT_REGISTRY[selectedNode.component].colors.map((color) => <label key={color.key}>{color.label}<input type="color" value={selectedNode.styles?.[color.key] ?? color.defaultValue} onChange={(event) => updateSelectedStyle(color.key, event.target.value)} /></label>)}
                 {selectedNode.component !== "column" && <><div className="inspector-divider"><p className="eyebrow">Grid layout · {viewport}</p></div><label>Column start<input type="number" min="1" max="12" value={clampLayout(selectedNode.layout?.[viewport] ?? selectedNode.layout?.desktop ?? defaultLayout(selectedNode.component)).columnStart} onChange={(event) => updateSelectedLayout("columnStart", Number(event.target.value))} /></label><label>Column width<input type="number" min="1" max="12" value={clampLayout(selectedNode.layout?.[viewport] ?? selectedNode.layout?.desktop ?? defaultLayout(selectedNode.component)).columnSpan} onChange={(event) => updateSelectedLayout("columnSpan", Number(event.target.value))} /></label></>}
                 <div className="inspector-divider"><p className="eyebrow">Layout & style</p></div>
                {STYLE_CONTROLS.map((control) => <label key={control.key}>{control.label}<input type="text" placeholder="Default" value={selectedNode.responsiveStyles?.[viewport]?.[control.key] ?? selectedNode.styles?.[control.key] ?? ""} onChange={(event) => updateSelectedResponsiveStyle(control.key, event.target.value)} /></label>)}
              </div>
              <div className="inspector-actions"><button className="button button--primary" onClick={() => setCodeNodeId(selectedNode.id)}>Edit JSX</button><button className="button button--quiet" onClick={duplicateSelected}>Duplicate</button><button className="button button--quiet" onClick={() => { commitVisual((current) => removeNode(current, selectedNode.id)); setSelectedId(null); }}>Delete</button></div>
            </>
          ) : <div className="inspector-empty">Choose a component to see its editable properties.</div>}
          <div className="layers"><div className="layers-heading"><p className="eyebrow">Layers</p><span>{nodes.length}</span></div>{nodes.map((node) => <LayerNode key={node.id} node={node} selectedId={selectedId} onSelect={setSelectedId} />)}</div>
        </aside>
      </div>
      {codeNode && <CodeModal node={codeNode} onClose={() => setCodeNodeId(null)} onSave={(source) => {
        try {
          if (codeNode.sourceVersion === 1 && codeNode.source === source) return undefined;
          const parsed = sourceToNode(source, codeNode);
           commitVisual((current) => updateNode(current, codeNode.id, () => parsed));
          return undefined;
        } catch (error) {
          return error instanceof Error ? error.message : "Unable to parse this module.";
        }
      }} />}
      {projectCodeOpen && <ProjectCodeModal files={projectFiles} dependencies={projectDependencies} fallbackSource={nodesToModule(nodes)} onClose={() => setProjectCodeOpen(false)} onSave={(files, dependencies) => {
        try {
          const appSource = files["/App.tsx"] ?? "";
          const parsed = sourceToNodes(appSource);
          commit(parsed);
          setProjectFiles(files);
          setProjectDependencies(dependencies);
          setSelectedId(parsed[0]?.id ?? null);
          return undefined;
        } catch (error) {
          return error instanceof Error ? error.message : "Unable to parse this project.";
         }
       }} />}
      {assetLibraryOpen && <AssetLibrary assets={assets} onSelect={selectAsset} onDelete={deleteAsset} onClose={() => setAssetLibraryOpen(false)} />}
      {versionHistoryOpen && <VersionHistoryModal versions={versions.filter((version) => version.pageId === activePageId)} onRestore={restoreVersion} onDelete={deleteVersion} onClose={() => setVersionHistoryOpen(false)} />}
    </div>
  );
}

function LayerNode({ node, selectedId, onSelect }: { node: BuilderNode; selectedId: string | null; onSelect: (id: string) => void }) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;
  return <div><div className="layer-row"><button className={`layer-item ${selectedId === node.id ? "layer-item--selected" : ""}`} onClick={() => onSelect(node.id)}><span className="layer-item__icon">{COMPONENT_REGISTRY[node.component].label.slice(0, 1)}</span><span className="layer-item__name">{COMPONENT_REGISTRY[node.component].label}</span>{hasChildren && <span className="layer-item__count">{node.children.length}</span>}</button>{hasChildren && <button className="layer-toggle" onClick={() => setExpanded((value) => !value)} aria-label={`${expanded ? "Collapse" : "Expand"} ${COMPONENT_REGISTRY[node.component].label}`} aria-expanded={expanded}>{expanded ? "−" : "+"}</button>}</div>{hasChildren && expanded && <div className="layer-children">{node.children.map((child) => <LayerNode key={child.id} node={child} selectedId={selectedId} onSelect={onSelect} />)}</div>}</div>;
}

export function PublishedPreview({ id }: { id: string }) {
  const [snapshot] = useState<PublishedProject | null>(() => {
    try {
      const raw = localStorage.getItem(`jowaui-published-${id}`);
      return raw ? JSON.parse(raw) as PublishedProject : null;
    } catch {
      return null;
    }
  });

  if (!snapshot) return <main className="published-error"><h1>Preview not found</h1><p>This published snapshot is unavailable in this browser.</p></main>;
  const files = { "/App.tsx": nodesToModule(snapshot.nodes), ...snapshot.files };
  return <div className="published-preview"><SandpackProvider template={SANDBOX_TEMPLATE} files={files} customSetup={{ entry: "/App.tsx", dependencies: { ...snapshot.dependencies, ...SANDBOX_DEPENDENCIES } }}><SandpackLayout><SandpackPreview showSandpackErrorOverlay={false} /><SandpackErrorDetails /></SandpackLayout></SandpackProvider></div>;
}
