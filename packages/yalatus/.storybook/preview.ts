import type { Preview } from '@storybook/react-vite';

import '../src/styles/index.scss';

const preview: Preview = {
  parameters: {
    controls: { expanded: true, matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'error' },
    options: { storySort: { order: ['Foundations', 'Components'] } },
  },
  globalTypes: {
    theme: {
      description: 'Colour mode applied to the document root',
      toolbar: { title: 'Theme', icon: 'mirror', items: ['dark', 'light'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'dark' },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = String(context.globals.theme);
      return Story();
    },
  ],
};

export default preview;
