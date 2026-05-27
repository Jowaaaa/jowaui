import type { Meta, StoryObj } from "@storybook/react-vite";
import { MarkdownRenderer } from "../lib/components/markdownrenderer/markdownrenderer";

const SAMPLE_CONTENT = `# Markdown Renderer

A **zero-dependency** markdown renderer built with *pure React*.

## Features

- Headings (H1, H2, H3)
- **Bold** and *italic* text
- \`inline code\` snippets
- [Links](https://example.com) with XSS protection
- Ordered and unordered lists
- Blockquotes
- Fenced code blocks
- Horizontal rules

## Code Example

\`\`\`
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Blockquote

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci

---

### Ordered List

1. Install the package
2. Import the component
3. Pass your markdown string

That's it!
`;

const meta: Meta<typeof MarkdownRenderer> = {
  title: "Content/MarkdownRenderer",
  component: MarkdownRenderer,
  tags: ["autodocs"],
  argTypes: {
    content: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof MarkdownRenderer>;

export const Default: Story = {
  args: {
    content: SAMPLE_CONTENT,
  },
};

export const Minimal: Story = {
  args: {
    content: "Hello **world**! This is *markdown* with `inline code` and a [link](https://example.com).",
  },
};

export const CodeHeavy: Story = {
  args: {
    content: `## TypeScript Example

Here is a typed function:

\`\`\`
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
}
\`\`\`

Use \`fetchUser(1)\` to get the first user.
`,
  },
};
