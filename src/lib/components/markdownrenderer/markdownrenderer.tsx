import React, { useMemo } from "react";

export interface MarkdownRendererProps {
  /** Markdown string to parse and render */
  content: string;
  /** Additional CSS class applied to the wrapper div */
  className?: string;
}

// ── Sanitize href to prevent XSS ──────────────────────────────────────────
function sanitizeHref(href: string): string {
  const trimmed: string = href.trim().toLowerCase();
  if (
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("vbscript:") ||
    trimmed.startsWith("data:")
  ) {
    return "#";
  }
  return href;
}

// ── Inline parser: bold, italic, code, links ──────────────────────────────
function parseInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Pattern order matters: code > bold > italic > link
  const pattern: RegExp =
    /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*]+\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex: number = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    // Push plain text before match
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // `code`
      const code: string = match[1].slice(1, -1);
      nodes.push(
        <code key={match.index} className="jowa-markdown__code">
          {code}
        </code>
      );
    } else if (match[2]) {
      // **bold**
      const bold: string = match[2].slice(2, -2);
      nodes.push(
        <strong key={match.index} className="jowa-markdown__strong">
          {bold}
        </strong>
      );
    } else if (match[3]) {
      // *italic*
      const italic: string = match[3].slice(1, -1);
      nodes.push(
        <em key={match.index} className="jowa-markdown__em">
          {italic}
        </em>
      );
    } else if (match[4]) {
      // [text](url)
      const linkText: string = match[5];
      const href: string = sanitizeHref(match[6]);
      nodes.push(
        <a
          key={match.index}
          href={href}
          className="jowa-markdown__a"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkText}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  // Remaining plain text
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

// ── Block parser ──────────────────────────────────────────────────────────
function parseBlocks(content: string): React.ReactNode[] {
  const lines: string[] = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i: number = 0;
  let key: number = 0;

  while (i < lines.length) {
    const line: string = lines[i];

    // Fenced code block ```
    if (line.trimStart().startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={key++} className="jowa-markdown__pre">
          <code className="jowa-markdown__code jowa-markdown__code--block">
            {codeLines.join("\n")}
          </code>
        </pre>
      );
      i++; // skip closing ```
      continue;
    }

    // Headings
    const h3Match: RegExpMatchArray | null = line.match(/^### (.+)/);
    if (h3Match) {
      elements.push(
        <h3 key={key++} className="jowa-markdown__h3">
          {parseInline(h3Match[1])}
        </h3>
      );
      i++;
      continue;
    }

    const h2Match: RegExpMatchArray | null = line.match(/^## (.+)/);
    if (h2Match) {
      elements.push(
        <h2 key={key++} className="jowa-markdown__h2">
          {parseInline(h2Match[1])}
        </h2>
      );
      i++;
      continue;
    }

    const h1Match: RegExpMatchArray | null = line.match(/^# (.+)/);
    if (h1Match) {
      elements.push(
        <h1 key={key++} className="jowa-markdown__h1">
          {parseInline(h1Match[1])}
        </h1>
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={key++} className="jowa-markdown__hr" />);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="jowa-markdown__blockquote">
          {parseInline(quoteLines.join(" "))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (/^[-*+] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+] /.test(lines[i])) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="jowa-markdown__ul">
          {items.map((item, idx) => (
            <li key={idx} className="jowa-markdown__li">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="jowa-markdown__ol">
          {items.map((item, idx) => (
            <li key={idx} className="jowa-markdown__li">
              {parseInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Blank line — paragraph separator
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^#{1,3} /.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim()) &&
      !lines[i].startsWith("> ") &&
      !/^[-*+] /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i]) &&
      !lines[i].trimStart().startsWith("```")
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      elements.push(
        <p key={key++} className="jowa-markdown__p">
          {parseInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return elements;
}

export const MarkdownRenderer = React.forwardRef<HTMLDivElement, MarkdownRendererProps>(
  ({ content, className }, ref) => {
    const rendered: React.ReactNode[] = useMemo(
      () => parseBlocks(content),
      [content]
    );

    return (
      <div
        ref={ref}
        className={["jowa-markdown", className].filter(Boolean).join(" ")}
      >
        {rendered}
      </div>
    );
  }
);

MarkdownRenderer.displayName = "MarkdownRenderer";
