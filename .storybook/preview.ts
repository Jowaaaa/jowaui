import type { Preview } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/lib/styles/tokens.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true }, // we handle background via theme tokens
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        Light: "light",
        Dark:  "dark",
      },
      defaultTheme: "Light",
      attributeName: "data-theme",
    }),
  ],
};

export default preview;
