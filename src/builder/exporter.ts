import { BuilderNode, nodesToModule } from "./registry";

export type ExportPage = {
  id: string;
  name: string;
  path: string;
  nodes: BuilderNode[];
  files: Record<string, string>;
};

function pageFilePath(path: string): string {
  if (path === "/App.tsx") return "App.tsx";
  if (path.startsWith("/src/")) return path.slice("/src/".length);
  return path.replace(/^\/+/, "");
}

function pageSource(page: ExportPage): string {
  const source = page.files["/App.tsx"] ?? nodesToModule(page.nodes, "../../lib");
  return source.replace(/(["'])\.\/lib(?=["'/])/g, "$1../../lib");
}

function slug(value: string, fallback: string): string {
  const result = value
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  return result || fallback;
}

function componentName(name: string, fallback: string): string {
  const result = name
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");
  return /^[a-zA-Z]/.test(result) ? result : fallback;
}

function moduleLocations(pages: ExportPage[]): Array<{ directory: string; filename: string }> {
  const usedDirectories = new Set<string>();
  return pages.map((page, index) => {
    const baseDirectory = slug(page.path, slug(page.name, `page-${index + 1}`));
    let directory = baseDirectory;
    let suffix = 2;
    while (usedDirectories.has(directory)) directory = `${baseDirectory}-${suffix++}`;
    usedDirectories.add(directory);
    return { directory, filename: `${componentName(page.name, `Page${index + 1}`)}.tsx` };
  });
}

function routeSource(pages: ExportPage[], activePageIndex: number, locations: Array<{ directory: string; filename: string }>): string {
  const imports = pages.map((page, index) => `import Page${index} from "./pages/${locations[index].directory}/${locations[index].filename}";`).join("\n");
  const routes = pages.map((page, index) => `  ${JSON.stringify(page.path)}: Page${index},`).join("\n");
  return `import React from "react";
${imports}

const routes: Record<string, React.ComponentType> = {
${routes}
};

const fallback = Page${activePageIndex};

export default function App() {
  const path = window.location.pathname.replace(/\\/+$/, "") || "/";
  const Page = routes[path] ?? fallback;
  return <Page />;
}
`;
}

export function createExportFiles(pages: ExportPage[], activePageId: string): Record<string, string> {
  const activePageIndex = Math.max(0, pages.findIndex((page) => page.id === activePageId));
  const locations = moduleLocations(pages);
  const files: Record<string, string> = {
    "src/App.tsx": routeSource(pages, activePageIndex, locations),
  };

  pages.forEach((page, index) => {
    const directory = `src/pages/${locations[index].directory}`;
    files[`${directory}/${locations[index].filename}`] = pageSource(page);
    Object.entries(page.files).forEach(([path, source]) => {
      if (path !== "/App.tsx") files[`${directory}/${pageFilePath(path)}`] = source;
    });
  });

  return files;
}
