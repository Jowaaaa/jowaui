import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    '../src/app/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/experimental-addon-test"
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  staticDirs: [{from: './assets', to: '/assets/'}]
};
export default config;