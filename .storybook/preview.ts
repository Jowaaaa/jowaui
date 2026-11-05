import type { Preview } from "@storybook/react-vite";
import "../src/lib/styles/index.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          "Introduction",
          "Example",
          "Docs",
          ["Install", "Customize"],
          "Components",
          "Forms",
          "Navigation",
          "Overlay",
          "Feedback",
          "Data",
          "Theme",
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disabled: true },
    docs: {
      source: {
        type: "dynamic",
        excludeDecorators: true,
      },
    },
  },
};

export default preview;
