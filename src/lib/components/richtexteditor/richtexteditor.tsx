import React, { useRef, useState, useEffect, useCallback } from "react";

export interface RichTextEditorProps {
  /** Controlled HTML string value */
  value?: string;
  /** Initial HTML content for uncontrolled usage (default: "") */
  defaultValue?: string;
  /** Callback fired with the editor's innerHTML on every change */
  onChange?: (html: string) => void;
  /** Placeholder text shown when the editor is empty (default: "Start typing…") */
  placeholder?: string;
  /** Disables editing and toolbar buttons when true (default: false) */
  disabled?: boolean;
  /** Additional CSS class applied to the editor wrapper */
  className?: string;
}

interface ToolbarButton {
  command: string;
  label: string;
  icon: React.ReactNode;
  arg?: string;
}

// ── SVG Icons ─────────────────────────────────────────────────────────────
const IconBold = (): React.ReactElement => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 2h5a3 3 0 0 1 0 6H3V2zm0 6h5.5a3 3 0 0 1 0 6H3V8z" fill="currentColor" />
  </svg>
);

const IconItalic = (): React.ReactElement => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M5 2h6M3 12h6M8 2L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconUnderline = (): React.ReactElement => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 2v5a4 4 0 0 0 8 0V2M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconStrikethrough = (): React.ReactElement => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 7h10M5 4c0-1.1.9-2 2-2h1a2 2 0 0 1 0 4H6a2 2 0 0 0 0 4h2a2 2 0 0 0 2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconH1 = (): React.ReactElement => (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
    <path d="M2 2v10M2 7h6M8 2v10M12 5l2-2v9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconH2 = (): React.ReactElement => (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
    <path d="M2 2v10M2 7h6M8 2v10M11 6a2 2 0 0 1 4 0c0 1-1 2-2 3l-2 3h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconUL = (): React.ReactElement => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="2" cy="4" r="1" fill="currentColor" />
    <circle cx="2" cy="7" r="1" fill="currentColor" />
    <circle cx="2" cy="10" r="1" fill="currentColor" />
    <path d="M5 4h7M5 7h7M5 10h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconOL = (): React.ReactElement => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 2h2v4M1 6h2M5 4h7M5 8h7M5 12h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M1 9c0-1 2-1 2-2s-2 0-2 1M1 13h2l-2-2h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLink = (): React.ReactElement => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M5.5 8.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8.5 5.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconUndo = (): React.ReactElement => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 5h6a4 4 0 0 1 0 8H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 5l3-3M2 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconRedo = (): React.ReactElement => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M12 5H6a4 4 0 0 0 0 8h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5l-3-3M12 5l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TOOLBAR_GROUPS: (ToolbarButton | "divider")[][] = [
  [
    { command: "bold", label: "Bold", icon: <IconBold /> },
    { command: "italic", label: "Italic", icon: <IconItalic /> },
    { command: "underline", label: "Underline", icon: <IconUnderline /> },
    { command: "strikeThrough", label: "Strikethrough", icon: <IconStrikethrough /> },
  ],
  [
    { command: "formatBlock", label: "Heading 1", icon: <IconH1 />, arg: "H1" },
    { command: "formatBlock", label: "Heading 2", icon: <IconH2 />, arg: "H2" },
  ],
  [
    { command: "insertUnorderedList", label: "Bullet list", icon: <IconUL /> },
    { command: "insertOrderedList", label: "Numbered list", icon: <IconOL /> },
  ],
  [
    { command: "createLink", label: "Insert link", icon: <IconLink /> },
  ],
  [
    { command: "undo", label: "Undo", icon: <IconUndo /> },
    { command: "redo", label: "Redo", icon: <IconRedo /> },
  ],
];

// Flatten with dividers between groups
const TOOLBAR_ITEMS: (ToolbarButton | "divider")[] = TOOLBAR_GROUPS.reduce(
  (acc: (ToolbarButton | "divider")[], group, idx) => {
    if (idx > 0) acc.push("divider");
    return acc.concat(group);
  },
  []
);

const FORMAT_COMMANDS: string[] = ["bold", "italic", "underline", "strikeThrough"];

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  (
    {
      value,
      defaultValue = "",
      onChange,
      placeholder = "Start typing…",
      disabled = false,
      className,
    },
    ref
  ) => {
    const isControlled: boolean = value !== undefined;
    const editorRef = useRef<HTMLDivElement>(null);
    const [focused, setFocused] = useState<boolean>(false);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
    const isInitialized = useRef<boolean>(false);

    // Initialize content
    useEffect(() => {
      if (!editorRef.current || isInitialized.current) return;
      isInitialized.current = true;
      const initial: string = isControlled ? value! : defaultValue;
      if (initial) editorRef.current.innerHTML = initial;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Sync controlled value (only when changed externally)
    useEffect(() => {
      if (!isControlled || !editorRef.current) return;
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value!;
      }
    }, [value, isControlled]);

    const updateActiveFormats = useCallback((): void => {
      const active = new Set<string>();
      FORMAT_COMMANDS.forEach((cmd) => {
        try {
          if (document.queryCommandState(cmd)) active.add(cmd);
        } catch {
          // ignore
        }
      });
      setActiveFormats(active);
    }, []);

    const handleInput = useCallback((): void => {
      if (!editorRef.current) return;
      onChange?.(editorRef.current.innerHTML);
      updateActiveFormats();
    }, [onChange, updateActiveFormats]);

    const handleKeyUp = useCallback((): void => {
      updateActiveFormats();
    }, [updateActiveFormats]);

    const handleMouseUp = useCallback((): void => {
      updateActiveFormats();
    }, [updateActiveFormats]);

    const execCommand = useCallback(
      (command: string, arg?: string): void => {
        if (disabled || !editorRef.current) return;
        editorRef.current.focus();

        if (command === "createLink") {
          const url: string | null = window.prompt("Enter URL:", "https://");
          if (!url) return;
          document.execCommand("createLink", false, url);
        } else if (arg) {
          document.execCommand(command, false, arg);
        } else {
          document.execCommand(command, false);
        }

        onChange?.(editorRef.current.innerHTML);
        updateActiveFormats();
      },
      [disabled, onChange, updateActiveFormats]
    );

    const wrapperClasses: string = [
      "jowa-rte",
      disabled ? "jowa-rte--disabled" : "",
      focused ? "jowa-rte--focused" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperClasses}>
        {/* Toolbar */}
        <div className="jowa-rte__toolbar" role="toolbar" aria-label="Text formatting">
          {TOOLBAR_ITEMS.map((item, idx) => {
            if (item === "divider") {
              return (
                <span
                  key={`divider-${idx}`}
                  className="jowa-rte__toolbar-divider"
                  aria-hidden="true"
                />
              );
            }
            const isActive: boolean =
              FORMAT_COMMANDS.includes(item.command) && activeFormats.has(item.command);
            return (
              <button
                key={`${item.command}-${idx}`}
                type="button"
                className={[
                  "jowa-rte__toolbar-btn",
                  isActive ? "jowa-rte__toolbar-btn--active" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                title={item.label}
                aria-label={item.label}
                aria-pressed={FORMAT_COMMANDS.includes(item.command) ? isActive : undefined}
                disabled={disabled}
                onMouseDown={(e: React.MouseEvent): void => {
                  // Prevent editor blur before execCommand
                  e.preventDefault();
                  execCommand(item.command, item.arg);
                }}
              >
                {item.icon}
              </button>
            );
          })}
        </div>

        {/* Editable area */}
        <div
          ref={editorRef}
          className="jowa-rte__editor"
          contentEditable={!disabled}
          suppressContentEditableWarning
          data-placeholder={placeholder}
          role="textbox"
          aria-multiline="true"
          aria-label="Rich text editor"
          aria-disabled={disabled}
          onInput={handleInput}
          onKeyUp={handleKeyUp}
          onMouseUp={handleMouseUp}
          onFocus={(): void => setFocused(true)}
          onBlur={(): void => setFocused(false)}
        />
      </div>
    );
  }
);

RichTextEditor.displayName = "RichTextEditor";
