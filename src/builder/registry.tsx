import React from "react";
import { parse } from "@babel/parser";
import { Alert } from "../lib/components/alert/alert";
import { Avatar } from "../lib/components/avatar/avatar";
import { Badge } from "../lib/components/badge/badge";
import { Banner } from "../lib/components/banner/banner";
import { Breadcrumbs } from "../lib/components/breadcrumbs/breadcrumbs";
import { Button } from "../lib/components/button/button";
import { Card } from "../lib/components/card/card";
import { Column, Columns } from "../lib/components/columns/columns";
import { Checkbox } from "../lib/components/checkbox/checkbox";
import { Divider } from "../lib/components/divider/divider";
import { Hero } from "../lib/components/hero/hero";
import { Input } from "../lib/components/input/input";
import { Navbar } from "../lib/components/navbar/navbar";
import { Progress } from "../lib/components/progress/progress";
import { Skeleton } from "../lib/components/skeleton/skeleton";
import { Spinner } from "../lib/components/spinner/spinner";
import { StatCard } from "../lib/components/statcard/statcard";
import { Tag } from "../lib/components/tag/tag";
import { Textarea } from "../lib/components/textarea/textarea";
import { Switch } from "../lib/components/switch/switch";

export type ComponentKey = "hero" | "card" | "columns" | "column" | "button" | "badge" | "alert" | "input" | "avatar" | "divider" | "progress" | "spinner" | "statcard" | "tag" | "navbar" | "banner" | "breadcrumbs" | "checkbox" | "skeleton" | "switch" | "textarea" | "custom";
export type BuilderViewport = "desktop" | "tablet" | "mobile";
export type SourceRange = { start: number; end: number };

export type BuilderNode = {
  id: string;
  component: ComponentKey;
  props: Record<string, unknown>;
  children: BuilderNode[];
  styles?: Record<string, string>;
  responsiveStyles?: Partial<Record<BuilderViewport, Record<string, string>>>;
  source?: string;
  sourceVersion?: number;
  sourceRange?: SourceRange;
  sourceAttributes?: string[];
};

export type PropDefinition = {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "boolean" | "json" | "links";
  options?: string[];
};

export type ColorSlot = {
  key: string;
  label: string;
  defaultValue: string;
};

export type ComponentDefinition = {
  key: ComponentKey;
  label: string;
  category: string;
  description: string;
  acceptsChildren: boolean;
  palette?: boolean;
  props: PropDefinition[];
  colors: ColorSlot[];
  create: () => BuilderNode;
  render: React.ComponentType<Record<string, unknown>>;
};

let nextId = 1;

export function createNode(component: ComponentKey): BuilderNode {
  const definition = COMPONENT_REGISTRY[component];
  return { ...definition.create(), id: `${component}-${nextId++}` };
}

const COMPONENT_REGISTRY: Record<ComponentKey, ComponentDefinition> = {
  hero: {
    key: "hero",
    label: "Hero",
    category: "Layout",
    description: "A landing-page introduction section.",
    acceptsChildren: true,
    props: [
      { key: "title", label: "Title", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "align", label: "Alignment", type: "select", options: ["center", "left"] },
    ],
    colors: [
      { key: "--jowa-hero-background", label: "Background", defaultValue: "#ffffff" },
      { key: "--jowa-hero-title-color", label: "Title", defaultValue: "#1f2937" },
      { key: "--jowa-hero-subtitle-color", label: "Subtitle", defaultValue: "#64748b" },
    ],
    create: () => ({ id: "", component: "hero", props: { title: "Build something clear", subtitle: "Compose a page from reusable jowaui components.", align: "center" }, children: [], styles: {} }),
    render: Hero as unknown as React.ComponentType<Record<string, unknown>>,
  },
  card: {
    key: "card",
    label: "Card",
    category: "Layout",
    description: "A surface that can contain nested components.",
    acceptsChildren: true,
    props: [{ key: "header", label: "Header", type: "text" }],
    colors: [
      { key: "--jowa-card-background", label: "Background", defaultValue: "#ffffff" },
      { key: "--jowa-card-border-color", label: "Border", defaultValue: "#e5e7eb" },
      { key: "--jowa-card-header-color", label: "Header text", defaultValue: "#1f2937" },
      { key: "--jowa-card-body-color", label: "Body text", defaultValue: "#1f2937" },
      { key: "--jowa-card-footer-background", label: "Footer background", defaultValue: "#f8fafc" },
    ],
    create: () => ({ id: "", component: "card", props: { header: "New section" }, children: [], styles: {} }),
    render: Card as unknown as React.ComponentType<Record<string, unknown>>,
  },
  columns: {
    key: "columns",
    label: "Columns",
    category: "Layout",
    description: "A responsive layout for arranging components side by side.",
    acceptsChildren: false,
    props: [
      { key: "count", label: "Column count", type: "number" },
      { key: "gap", label: "Column gap", type: "text" },
    ],
    colors: [],
    create: () => ({ id: "", component: "columns", props: { count: 3, gap: "24px" }, children: [createNode("column"), createNode("column"), createNode("column")], styles: {} }),
    render: Columns as unknown as React.ComponentType<Record<string, unknown>>,
  },
  column: {
    key: "column",
    label: "Column",
    category: "Layout",
    description: "A column inside a Columns layout.",
    acceptsChildren: true,
    palette: false,
    props: [],
    colors: [],
    create: () => ({ id: "", component: "column", props: {}, children: [], styles: {} }),
    render: Column as unknown as React.ComponentType<Record<string, unknown>>,
  },
  button: {
    key: "button",
    label: "Button",
    category: "Actions",
    description: "A clickable action control.",
    acceptsChildren: false,
    props: [
      { key: "children", label: "Label", type: "text" },
      { key: "variant", label: "Variant", type: "select", options: ["primary", "outline", "danger", "ghost", "navbar"] },
      { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] },
    ],
    colors: [
      { key: "--jowa-button-primary-background", label: "Primary background", defaultValue: "#2563eb" },
      { key: "--jowa-button-primary-foreground", label: "Primary foreground", defaultValue: "#ffffff" },
      { key: "--jowa-button-primary-hover", label: "Primary hover", defaultValue: "#1d4ed8" },
      { key: "--jowa-button-outline-foreground", label: "Outline foreground", defaultValue: "#1f2937" },
      { key: "--jowa-button-outline-border", label: "Outline border", defaultValue: "#e5e7eb" },
      { key: "--jowa-button-danger-background", label: "Danger background", defaultValue: "#dc2626" },
      { key: "--jowa-button-danger-foreground", label: "Danger foreground", defaultValue: "#ffffff" },
      { key: "--jowa-button-ghost-foreground", label: "Ghost foreground", defaultValue: "#1f2937" },
    ],
    create: () => ({ id: "", component: "button", props: { children: "Get started", variant: "primary", size: "md" }, children: [], styles: {} }),
    render: Button as unknown as React.ComponentType<Record<string, unknown>>,
  },
  badge: {
    key: "badge",
    label: "Badge",
    category: "Content",
    description: "A compact status label.",
    acceptsChildren: false,
    props: [
      { key: "children", label: "Label", type: "text" },
      { key: "variant", label: "Variant", type: "select", options: ["primary", "success", "warning", "danger", "neutral"] },
    ],
    colors: [
      { key: "--jowa-badge-primary-background", label: "Primary background", defaultValue: "#eff6ff" },
      { key: "--jowa-badge-primary-foreground", label: "Primary foreground", defaultValue: "#2563eb" },
      { key: "--jowa-badge-success-background", label: "Success background", defaultValue: "#f0fdf4" },
      { key: "--jowa-badge-success-foreground", label: "Success foreground", defaultValue: "#16a34a" },
      { key: "--jowa-badge-warning-background", label: "Warning background", defaultValue: "#fffbeb" },
      { key: "--jowa-badge-warning-foreground", label: "Warning foreground", defaultValue: "#ca8a04" },
      { key: "--jowa-badge-danger-background", label: "Danger background", defaultValue: "#fef2f2" },
      { key: "--jowa-badge-danger-foreground", label: "Danger foreground", defaultValue: "#dc2626" },
    ],
    create: () => ({ id: "", component: "badge", props: { children: "New", variant: "primary" }, children: [], styles: {} }),
    render: Badge as unknown as React.ComponentType<Record<string, unknown>>,
  },
  alert: {
    key: "alert",
    label: "Alert",
    category: "Feedback",
    description: "A contextual message.",
    acceptsChildren: false,
    props: [
      { key: "title", label: "Title", type: "text" },
      { key: "children", label: "Message", type: "text" },
      { key: "variant", label: "Variant", type: "select", options: ["info", "success", "warning", "danger"] },
    ],
    colors: [
      { key: "--jowa-alert-background", label: "Background", defaultValue: "#eff6ff" },
      { key: "--jowa-alert-foreground", label: "Foreground", defaultValue: "#2563eb" },
      { key: "--jowa-alert-border", label: "Border", defaultValue: "#bfdbfe" },
    ],
    create: () => ({ id: "", component: "alert", props: { title: "Heads up", children: "This is an editable message.", variant: "info" }, children: [], styles: {} }),
    render: Alert as unknown as React.ComponentType<Record<string, unknown>>,
  },
  input: {
    key: "input",
    label: "Input",
    category: "Forms",
    description: "A labeled form field.",
    acceptsChildren: false,
    props: [
      { key: "label", label: "Label", type: "text" },
      { key: "placeholder", label: "Placeholder", type: "text" },
    ],
    colors: [
      { key: "--jowa-input-label-color", label: "Label", defaultValue: "#1f2937" },
      { key: "--jowa-input-background", label: "Background", defaultValue: "#ffffff" },
      { key: "--jowa-input-foreground", label: "Text", defaultValue: "#1f2937" },
      { key: "--jowa-input-border-color", label: "Border", defaultValue: "#e5e7eb" },
      { key: "--jowa-input-placeholder-color", label: "Placeholder", defaultValue: "#64748b" },
      { key: "--jowa-input-focus-color", label: "Focus accent", defaultValue: "#2563eb" },
      { key: "--jowa-input-error-color", label: "Error", defaultValue: "#dc2626" },
    ],
    create: () => ({ id: "", component: "input", props: { label: "Email address", placeholder: "you@example.com" }, children: [], styles: {} }),
    render: Input as unknown as React.ComponentType<Record<string, unknown>>,
  },
  avatar: {
    key: "avatar",
    label: "Avatar",
    category: "Content",
    description: "An image or initials identity marker.",
    acceptsChildren: false,
    props: [
      { key: "src", label: "Image URL", type: "text" },
      { key: "alt", label: "Alt text", type: "text" },
      { key: "initials", label: "Initials", type: "text" },
      { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg", "xl"] },
    ],
    colors: [],
    create: () => ({ id: "", component: "avatar", props: { alt: "Jowaui", initials: "JW", size: "md" }, children: [], styles: {} }),
    render: Avatar as unknown as React.ComponentType<Record<string, unknown>>,
  },
  divider: {
    key: "divider",
    label: "Divider",
    category: "Layout",
    description: "A visual separator between sections.",
    acceptsChildren: false,
    props: [
      { key: "label", label: "Label", type: "text" },
      { key: "orientation", label: "Orientation", type: "select", options: ["horizontal", "vertical"] },
    ],
    colors: [],
    create: () => ({ id: "", component: "divider", props: { label: "", orientation: "horizontal" }, children: [], styles: {} }),
    render: Divider as unknown as React.ComponentType<Record<string, unknown>>,
  },
  progress: {
    key: "progress",
    label: "Progress",
    category: "Feedback",
    description: "A labeled progress indicator.",
    acceptsChildren: false,
    props: [
      { key: "value", label: "Value", type: "number" },
      { key: "max", label: "Maximum", type: "number" },
      { key: "label", label: "Label", type: "text" },
      { key: "showValue", label: "Show value", type: "boolean" },
      { key: "variant", label: "Variant", type: "select", options: ["primary", "success", "warning", "danger"] },
      { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] },
    ],
    colors: [],
    create: () => ({ id: "", component: "progress", props: { value: 64, max: 100, label: "Progress", showValue: true, variant: "primary", size: "md" }, children: [], styles: {} }),
    render: Progress as unknown as React.ComponentType<Record<string, unknown>>,
  },
  spinner: {
    key: "spinner",
    label: "Spinner",
    category: "Feedback",
    description: "A loading indicator.",
    acceptsChildren: false,
    props: [{ key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] }],
    colors: [],
    create: () => ({ id: "", component: "spinner", props: { size: "md" }, children: [], styles: {} }),
    render: Spinner as unknown as React.ComponentType<Record<string, unknown>>,
  },
  statcard: {
    key: "statcard",
    label: "Stat Card",
    category: "Data",
    description: "A compact metric and trend summary.",
    acceptsChildren: false,
    props: [
      { key: "label", label: "Label", type: "text" },
      { key: "value", label: "Value", type: "text" },
      { key: "unit", label: "Unit", type: "text" },
      { key: "change", label: "Change", type: "text" },
      { key: "trend", label: "Trend", type: "select", options: ["up", "down", "neutral"] },
    ],
    colors: [],
    create: () => ({ id: "", component: "statcard", props: { label: "Active users", value: "1,248", unit: "users", change: "+12%", trend: "up" }, children: [], styles: {} }),
    render: StatCard as unknown as React.ComponentType<Record<string, unknown>>,
  },
  tag: {
    key: "tag",
    label: "Tag",
    category: "Content",
    description: "A compact categorization label.",
    acceptsChildren: false,
    props: [
      { key: "children", label: "Label", type: "text" },
      { key: "variant", label: "Variant", type: "select", options: ["neutral", "primary", "success", "warning", "danger"] },
    ],
    colors: [],
    create: () => ({ id: "", component: "tag", props: { children: "Featured", variant: "primary" }, children: [], styles: {} }),
    render: Tag as unknown as React.ComponentType<Record<string, unknown>>,
  },
  navbar: {
    key: "navbar",
    label: "Navbar",
    category: "Navigation",
    description: "A branded navigation header.",
    acceptsChildren: false,
    props: [
      { key: "title", label: "Title", type: "text" },
      { key: "logoSrc", label: "Logo URL", type: "text" },
      { key: "logoAlt", label: "Logo alt text", type: "text" },
      { key: "links", label: "Navigation links", type: "links" },
    ],
    colors: [
      { key: "--jowa-navbar-bg", label: "Background", defaultValue: "#2563eb" },
      { key: "--jowa-navbar-text", label: "Text and links", defaultValue: "#ffffff" },
    ],
    create: () => ({ id: "", component: "navbar", props: { title: "jowaui", logoAlt: "jowaui logo", links: [{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }] }, children: [], styles: {} }),
    render: Navbar as unknown as React.ComponentType<Record<string, unknown>>,
  },
  banner: {
    key: "banner",
    label: "Banner",
    category: "Feedback",
    description: "A prominent status or announcement banner.",
    acceptsChildren: false,
    props: [
      { key: "children", label: "Message", type: "text" },
      { key: "variant", label: "Variant", type: "select", options: ["info", "success", "warning", "danger"] },
      { key: "dismissible", label: "Dismissible", type: "boolean" },
    ],
    colors: [],
    create: () => ({ id: "", component: "banner", props: { children: "This is an important announcement.", variant: "info", dismissible: false }, children: [], styles: {} }),
    render: Banner as unknown as React.ComponentType<Record<string, unknown>>,
  },
  breadcrumbs: {
    key: "breadcrumbs",
    label: "Breadcrumbs",
    category: "Navigation",
    description: "A path indicator for nested pages.",
    acceptsChildren: false,
    props: [{ key: "items", label: "Items JSON", type: "json" }, { key: "separator", label: "Separator", type: "text" }],
    colors: [],
    create: () => ({ id: "", component: "breadcrumbs", props: { items: [{ label: "Home", href: "/" }, { label: "Current" }], separator: "/" }, children: [], styles: {} }),
    render: Breadcrumbs as unknown as React.ComponentType<Record<string, unknown>>,
  },
  checkbox: {
    key: "checkbox",
    label: "Checkbox",
    category: "Forms",
    description: "A labeled checkbox control.",
    acceptsChildren: false,
    props: [{ key: "label", label: "Label", type: "text" }, { key: "hint", label: "Hint", type: "text" }, { key: "checked", label: "Checked", type: "boolean" }],
    colors: [],
    create: () => ({ id: "", component: "checkbox", props: { label: "Accept terms", hint: "Required to continue", checked: false }, children: [], styles: {} }),
    render: Checkbox as unknown as React.ComponentType<Record<string, unknown>>,
  },
  skeleton: {
    key: "skeleton",
    label: "Skeleton",
    category: "Feedback",
    description: "A loading placeholder for content.",
    acceptsChildren: false,
    props: [{ key: "variant", label: "Variant", type: "select", options: ["text", "rect", "circle"] }, { key: "width", label: "Width", type: "text" }, { key: "height", label: "Height", type: "text" }, { key: "lines", label: "Lines", type: "number" }],
    colors: [],
    create: () => ({ id: "", component: "skeleton", props: { variant: "rect", width: "240px", height: "80px", lines: 1 }, children: [], styles: {} }),
    render: Skeleton as unknown as React.ComponentType<Record<string, unknown>>,
  },
  switch: {
    key: "switch",
    label: "Switch",
    category: "Forms",
    description: "A labeled on/off toggle.",
    acceptsChildren: false,
    props: [{ key: "label", label: "Label", type: "text" }, { key: "hint", label: "Hint", type: "text" }, { key: "labelPosition", label: "Label position", type: "select", options: ["left", "right"] }, { key: "size", label: "Size", type: "select", options: ["sm", "md", "lg"] }, { key: "checked", label: "Checked", type: "boolean" }],
    colors: [],
    create: () => ({ id: "", component: "switch", props: { label: "Enable notifications", hint: "Receive product updates", labelPosition: "right", size: "md", checked: true }, children: [], styles: {} }),
    render: Switch as unknown as React.ComponentType<Record<string, unknown>>,
  },
  textarea: {
    key: "textarea",
    label: "Textarea",
    category: "Forms",
    description: "A multi-line text field.",
    acceptsChildren: false,
    props: [{ key: "label", label: "Label", type: "text" }, { key: "placeholder", label: "Placeholder", type: "text" }, { key: "hint", label: "Hint", type: "text" }, { key: "resize", label: "Resize", type: "select", options: ["none", "vertical", "horizontal", "both"] }],
    colors: [],
    create: () => ({ id: "", component: "textarea", props: { label: "Message", placeholder: "Write something...", hint: "Keep it concise", resize: "vertical" }, children: [], styles: {} }),
    render: Textarea as unknown as React.ComponentType<Record<string, unknown>>,
  },
  custom: {
    key: "custom",
    label: "Custom JSX",
    category: "Custom",
    description: "An element defined directly in project source.",
    acceptsChildren: true,
    props: [{ key: "label", label: "Label", type: "text" }],
    colors: [{ key: "--jowa-custom-foreground", label: "Foreground", defaultValue: "#1f2937" }],
    create: () => ({ id: "", component: "custom", props: { label: "Custom JSX" }, children: [], styles: {} }),
    render: (({ label }: { label?: string }) => <div className="builder-custom-node"><span>JSX</span>{label ?? "Custom JSX"}</div>) as React.ComponentType<Record<string, unknown>>,
  },
};

export { COMPONENT_REGISTRY };

export function findNode(nodes: BuilderNode[], id: string): BuilderNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    const match = findNode(node.children, id);
    if (match) return match;
  }
  return undefined;
}

export function updateNode(nodes: BuilderNode[], id: string, update: (node: BuilderNode) => BuilderNode): BuilderNode[] {
  return nodes.map((node) => node.id === id
    ? update(node)
    : { ...node, children: updateNode(node.children, id, update) });
}

export function removeNode(nodes: BuilderNode[], id: string): BuilderNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => ({ ...node, children: removeNode(node.children, id) }));
}

export function insertNode(nodes: BuilderNode[], parentId: string | null, child: BuilderNode): BuilderNode[] {
  if (!parentId) return [...nodes, child];
  return nodes.map((node) => node.id === parentId
    ? { ...node, children: [...node.children, child] }
    : { ...node, children: insertNode(node.children, parentId, child) });
}

function extractNode(nodes: BuilderNode[], id: string): { nodes: BuilderNode[]; extracted?: BuilderNode } {
  let extracted: BuilderNode | undefined;
  const remaining = nodes
    .filter((node) => {
      if (node.id === id) {
        extracted = node;
        return false;
      }
      return true;
    })
    .map((node) => {
      if (extracted) return node;
      const result = extractNode(node.children, id);
      if (result.extracted) extracted = result.extracted;
      return result.extracted ? { ...node, children: result.nodes } : node;
    });
  return { nodes: remaining, extracted };
}

function containsNode(node: BuilderNode, id: string): boolean {
  return node.id === id || node.children.some((child) => containsNode(child, id));
}

function findNodeLocation(nodes: BuilderNode[], id: string, parentId: string | null = null): { parentId: string | null; index: number } | undefined {
  for (const [index, node] of nodes.entries()) {
    if (node.id === id) return { parentId, index };
    const location = findNodeLocation(node.children, id, node.id);
    if (location) return location;
  }
  return undefined;
}

export function moveNode(nodes: BuilderNode[], nodeId: string, parentId: string | null, index: number): BuilderNode[] {
  const moving = findNode(nodes, nodeId);
  if (!moving || parentId === nodeId || (parentId && containsNode(moving, parentId))) return nodes;
  const location = findNodeLocation(nodes, nodeId);
  const extracted = extractNode(nodes, nodeId);
  if (!extracted.extracted) return nodes;
  const adjustedIndex = location?.parentId === parentId && location.index < index ? index - 1 : index;
  const insert = (items: BuilderNode[]): BuilderNode[] => {
    const safeIndex = Math.max(0, Math.min(adjustedIndex, items.length));
    return [...items.slice(0, safeIndex), extracted.extracted!, ...items.slice(safeIndex)];
  };
  if (!parentId) return insert(extracted.nodes);
  let inserted = false;
  const withChild = extracted.nodes.map((node) => {
    if (node.id === parentId) {
      inserted = true;
      return { ...node, children: insert(node.children) };
    }
    const children = withChildNode(node.children);
    return children === node.children ? node : { ...node, children };
  });
  function withChildNode(items: BuilderNode[]): BuilderNode[] {
    return items.map((node) => {
      if (node.id === parentId) {
        inserted = true;
        return { ...node, children: insert(node.children) };
      }
      const children = withChildNode(node.children);
      return children === node.children ? node : { ...node, children };
    });
  }
  return inserted ? withChild : nodes;
}

export function insertAfter(nodes: BuilderNode[], targetId: string, sibling: BuilderNode): BuilderNode[] {
  const result: BuilderNode[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.id === targetId) result.push(sibling);
    else if (node.children.length) result[result.length - 1] = { ...node, children: insertAfter(node.children, targetId, sibling) };
  }
  return result;
}

export function cloneNode(node: BuilderNode): BuilderNode {
  return {
    ...node,
    id: `${node.component}-${nextId++}`,
    children: node.children.map(cloneNode),
  };
}

export function nodeToJsx(node: BuilderNode, depth = 0): string {
  const indent = "  ".repeat(depth);
  if (node.component === "custom" && node.source) return `${indent}${node.source.trim()}`;
  const props = [...Object.entries(node.props)
    .filter(([key]) => key !== "children" && key !== "header")
    .map(([key, value]) => typeof value === "string" ? `${key}={${JSON.stringify(value)}}` : `${key}={${JSON.stringify(value)}}`)
    , ...(node.sourceAttributes ?? [])].join(" ");
  const definition = COMPONENT_REGISTRY[node.component];
  const tag = definition.label;
  const styleEntries = Object.entries(node.styles ?? {}).filter(([, value]) => value);
  const style = styleEntries.length
    ? ` style={{ ${styleEntries.map(([key, value]) => `"${key.startsWith("--") ? key : `--jowa-color-${key === "background" ? "neutral-bg" : key === "foreground" ? "neutral-text" : "primary"}`}": ${JSON.stringify(value)}`).join(", ")} }}`
    : "";
  const normalizedStyle = styleEntries.length ? ` style={${JSON.stringify(Object.fromEntries(styleEntries))}}` : "";
  const content = node.props.children ?? node.props.header;
  if (node.component === "hero" && node.children.length) {
    const actions = ["<>", ...node.children.map((child) => nodeToJsx(child, depth + 2)), `${indent}</>`].join("\n");
    return `${indent}<${tag} data-builder-id="${node.id}"${props ? ` ${props}` : ""}${normalizedStyle} actions={${actions}} />`;
  }
  if (!node.children.length && content) return `${indent}<${tag} data-builder-id="${node.id}"${props ? ` ${props}` : ""}${normalizedStyle}>${escapeJsxText(String(content))}</${tag}>`;
  if (!node.children.length) return `${indent}<${tag} data-builder-id="${node.id}"${props ? ` ${props}` : ""}${normalizedStyle} />`;
  return [
    `${indent}<${tag} data-builder-id="${node.id}"${props ? ` ${props}` : ""}${normalizedStyle}>`,
    ...node.children.map((child) => nodeToJsx(child, depth + 1)),
    `${indent}</${tag}>`,
  ].join("\n");
}

function escapeJsxText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\{/g, "&#123;")
    .replace(/\}/g, "&#125;");
}

export function nodesToModule(nodes: BuilderNode[]): string {
  const imports = componentImports(nodes);
  const body = nodes.length === 1
    ? nodeToJsx(nodes[0], 2)
    : nodes.length > 1
      ? ["    <>", ...nodes.map((node) => nodeToJsx(node, 3)), "    </>"].join("\n")
      : "    <main />";
  const importLine = imports ? `import { ${imports} } from "@jowaaaa/jowaui";\n` : "";
  return `import React from "react";\n${importLine}\nexport default function App() {\n  return (\n${body}\n  );\n}\n`;
}

export function nodeToModule(node: BuilderNode): string {
  const imports = componentImports([node]);
  const importLine = imports ? `import { ${imports} } from "@jowaaaa/jowaui";\n` : "";
  return `import React from "react";\n${importLine}\nexport default function Component() {\n  return (\n${nodeToJsx(node, 2)}\n  );\n}\n`;
}

function componentImports(nodes: BuilderNode[]): string {
  const used = new Set<ComponentKey>();
  const collect = (items: BuilderNode[]) => items.forEach((item) => {
    used.add(item.component);
    collect(item.children);
  });
  collect(nodes);
  return [...used]
    .filter((key) => key !== "custom")
    .map((key) => COMPONENT_REGISTRY[key].label)
    .sort()
    .join(", ");
}

type AstNode = { type: string; [key: string]: any };

function findFirstJsx(node: AstNode | AstNode[] | null | undefined): AstNode | undefined {
  if (!node) return undefined;
  if (Array.isArray(node)) {
    for (const item of node) {
      const found = findFirstJsx(item);
      if (found) return found;
    }
    return undefined;
  }
  if (typeof node !== "object") return undefined;
  if (node.type === "JSXElement" || node.type === "JSXFragment") return node;
  for (const [key, value] of Object.entries(node)) {
    if (key === "loc" || key === "tokens" || key === "comments") continue;
    if (value && typeof value === "object") {
      const found = findFirstJsx(value as AstNode | AstNode[]);
      if (found) return found;
    }
  }
  return undefined;
}

function jsxValue(attribute: AstNode): unknown {
  if (!attribute.value) return true;
  if (attribute.value.type === "StringLiteral") return attribute.value.value;
  if (attribute.value.type === "JSXExpressionContainer") {
    const expression = attribute.value.expression;
    if (expression?.type === "StringLiteral" || expression?.type === "NumericLiteral" || expression?.type === "BooleanLiteral") return expression.value;
  }
  return undefined;
}

function sourceOwnedNode(source: string | undefined, start = 0, end = 0, label = "Dynamic JSX"): BuilderNode {
  const custom = createNode("custom");
  return { ...custom, props: { label }, source: source?.slice(start, end) ?? "", sourceVersion: 1, sourceRange: { start, end } };
}

function componentForTag(tag: string): ComponentKey | undefined {
  return (Object.keys(COMPONENT_REGISTRY) as ComponentKey[]).find((key) => COMPONENT_REGISTRY[key].label === tag);
}

function jsxElementToNode(element: AstNode, fallback?: BuilderNode, source?: string): BuilderNode | undefined {
  const tag = element.openingElement?.name?.name;
  if (!tag) return undefined;
  const builderId = (element.openingElement.attributes ?? []).find((attribute: AstNode) => attribute.name?.name === "data-builder-id")?.value?.value;
  const component = componentForTag(tag);
  if (!component) {
    const custom = sourceOwnedNode(source, element.start ?? 0, element.end ?? 0, tag);
    return { ...custom, id: typeof builderId === "string" ? builderId : custom.id };
  }
  const generated = createNode(component);
  const node = fallback ?? { ...generated, id: typeof builderId === "string" ? builderId : generated.id };
  const props = { ...node.props };
  const sourceAttributes: string[] = [];
  for (const attribute of element.openingElement.attributes ?? []) {
    const key = attribute.name?.name;
    if (!key || key === "data-builder-id") continue;
    const value = jsxValue(attribute);
    if (value !== undefined) props[key] = value;
    else if (key === "actions" && attribute.value?.expression?.type === "JSXFragment") continue;
    else if (source) sourceAttributes.push(source.slice(attribute.start ?? 0, attribute.end ?? 0));
  }
  const recognizedChildren: BuilderNode[] = [];
  let textContent = "";
  const children = [...(element.children ?? [])];
  const actions = (element.openingElement.attributes ?? []).find((attribute: AstNode) => attribute.name?.name === "actions");
  const actionExpression = actions?.value?.type === "JSXExpressionContainer" ? actions.value.expression : undefined;
  if (actionExpression?.type === "JSXFragment") children.push(...actionExpression.children);
  for (const child of children) {
    if (child.type === "JSXElement") {
      const childNode = jsxElementToNode(child, undefined, source);
      if (childNode) recognizedChildren.push(childNode);
    } else if (child.type === "JSXExpressionContainer" || child.type === "JSXFragment") {
      recognizedChildren.push(sourceOwnedNode(source, child.start ?? 0, child.end ?? 0));
    } else if (child.type === "JSXText") {
      textContent += child.value.replace(/\s+/g, " ").trim();
    }
  }
  if (textContent && (Object.prototype.hasOwnProperty.call(props, "children") || !recognizedChildren.length)) props.children = textContent;
  return { ...node, props, children: recognizedChildren, sourceAttributes, sourceRange: { start: element.start ?? 0, end: element.end ?? 0 } };
}

export function sourceMap(nodes: BuilderNode[]): Record<string, SourceRange> {
  const result: Record<string, SourceRange> = {};
  const visit = (items: BuilderNode[]) => items.forEach((node) => {
    if (node.sourceRange) result[node.id] = node.sourceRange;
    visit(node.children);
  });
  visit(nodes);
  return result;
}

export function sourceToNode(source: string, fallback: BuilderNode): BuilderNode {
  const ast = parse(source, { sourceType: "module", plugins: ["jsx", "typescript"] });
  const element = findFirstJsx(ast.program as unknown as AstNode);
  if (!element) throw new Error("No JSX element was found in this module.");
  const parsed = jsxElementToNode(element, fallback, source);
  if (!parsed) throw new Error(`The root element must be a registered jowaui component (${COMPONENT_REGISTRY[fallback.component].label}).`);
  if (parsed.component !== fallback.component) throw new Error(`The root element must remain ${COMPONENT_REGISTRY[fallback.component].label}.`);
  return { ...parsed, id: fallback.id, source, sourceVersion: 1 };
}

export function sourceToNodes(source: string): BuilderNode[] {
  const ast = parse(source, { sourceType: "module", plugins: ["jsx", "typescript"] });
  const root = findFirstJsx(ast.program as unknown as AstNode);
  if (!root) throw new Error("No JSX was found in this module.");
  const elements = root.type === "JSXFragment" ? root.children.filter((child: AstNode) => child.type !== "JSXText") : [root];
  return elements.map((element: AstNode) => {
    const node = element.type === "JSXElement"
      ? jsxElementToNode(element, undefined, source)
      : sourceOwnedNode(source, element.start ?? 0, element.end ?? 0);
    if (!node) throw new Error("Unable to create a visual node from JSX.");
    return { ...node, source: source.slice(element.start, element.end) };
  });
}
