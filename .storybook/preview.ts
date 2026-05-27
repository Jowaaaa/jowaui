import type { Preview, Decorator } from '@storybook/react-vite';
import '../src/lib/styles/index.css';
import './preview.css';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals?.theme ?? 'light';
  document.documentElement.setAttribute('data-theme', theme);
  return Story();
};

const preview: Preview = {
  globals: {
    theme: 'light',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
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
  decorators: [withTheme],
};

export default preview;
