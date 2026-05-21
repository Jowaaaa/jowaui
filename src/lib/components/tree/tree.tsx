import React, { useCallback, useState } from "react";
import "./tree.css";

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps {
  nodes: TreeNode[];
  selected?: string;
  onSelect?: (id: string) => void;
  defaultExpanded?: string[];
  className?: string;
}

interface TreeNodeItemProps {
  node: TreeNode;
  depth: number;
  selected: string | undefined;
  expanded: Set<string>;
  onSelect: ((id: string) => void) | undefined;
  onToggle: (id: string) => void;
}

const TreeNodeItem: React.FC<TreeNodeItemProps> = ({
  node,
  depth,
  selected,
  expanded,
  onSelect,
  onToggle,
}) => {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isExpanded = expanded.has(node.id);
  const isSelected = selected === node.id;

  const rowClasses = [
    "jowa-tree-row",
    isSelected ? "jowa-tree-node--selected" : "",
    node.disabled ? "jowa-tree-node--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent): void => {
      if (node.disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (hasChildren) onToggle(node.id);
        else onSelect?.(node.id);
      } else if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
        e.preventDefault();
        onToggle(node.id);
      } else if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
        e.preventDefault();
        onToggle(node.id);
      }
    },
    [node, hasChildren, isExpanded, onToggle, onSelect]
  );

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-disabled={node.disabled}
      className="jowa-tree-node"
    >
      <div
        className={rowClasses}
        style={{ paddingLeft: `calc(${depth} * var(--jowa-spacing-lg) + var(--jowa-spacing-sm))` }}
        tabIndex={node.disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onClick={(): void => {
          if (node.disabled) return;
          if (hasChildren) onToggle(node.id);
          else onSelect?.(node.id);
        }}
      >
        <span
          className={[
            "jowa-tree-chevron",
            isExpanded ? "jowa-tree-chevron--expanded" : "",
            !hasChildren ? "jowa-tree-chevron--hidden" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
          onClick={(e): void => {
            if (!hasChildren || node.disabled) return;
            e.stopPropagation();
            onToggle(node.id);
          }}
        >
          ▶
        </span>
        {node.icon && (
          <span className="jowa-tree-icon" aria-hidden="true">
            {node.icon}
          </span>
        )}
        <span
          className="jowa-tree-label"
          onClick={(e): void => {
            if (node.disabled) return;
            e.stopPropagation();
            onSelect?.(node.id);
          }}
        >
          {node.label}
        </span>
      </div>

      {hasChildren && (
        <ul
          role="group"
          className={[
            "jowa-tree-children",
            isExpanded ? "jowa-tree-children--expanded" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {node.children!.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              depth={depth + 1}
              selected={selected}
              expanded={expanded}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const Tree: React.FC<TreeProps> = ({
  nodes,
  selected,
  onSelect,
  defaultExpanded = [],
  className = "",
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(defaultExpanded)
  );

  const handleToggle = useCallback((id: string): void => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const classes = ["jowa-tree", className].filter(Boolean).join(" ");

  return (
    <ul role="tree" className={classes}>
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          depth={0}
          selected={selected}
          expanded={expanded}
          onSelect={onSelect}
          onToggle={handleToggle}
        />
      ))}
    </ul>
  );
};

Tree.displayName = "Tree";
