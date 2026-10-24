import type { Preview, Decorator } from '@storybook/react-vite';
import '../src/lib/styles/index.css';
import './preview.css';

const withSavedComponentTheme: Decorator = (Story) => {
  if (typeof window !== 'undefined') {
    try {
      const saved = JSON.parse(localStorage.getItem('jowa-theme-builder') ?? '{}') as Record<string, string>;
      for (const [name, value] of Object.entries(saved)) {
        if (name.startsWith('--jowa-editor-') && value) {
          document.documentElement.style.setProperty(name, value);
        }
      }
    } catch {
      // Ignore malformed local editor state and use the light defaults.
    }
  }
  return Story();
};

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction',
          'Docs',
          ['Install', 'Customize'],
          'Components',
          'Forms',
          'Navigation',
          'Overlay',
          'Feedback',
          'Data',
          'Theme',
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
        type: 'dynamic',
        excludeDecorators: true,
      },
    },
  },
  decorators: [withSavedComponentTheme],
};

export default preview;
