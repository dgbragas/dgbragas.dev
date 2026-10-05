/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true,
    'selector-class-pattern': [
      '^(yl|site)-[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
      { message: 'Use BEM with the yl- or site- prefix (block__element--modifier)' },
    ],
    'scss/at-mixin-pattern': '^[a-z][a-z0-9-]*$',
    'scss/dollar-variable-pattern': '^[a-z][a-z0-9-]*$',
    'declaration-property-value-disallowed-list': {
      '/^(padding|margin|gap|font-size|color|background-color|border-color)/': [
        '/^#[0-9a-fA-F]{3,8}$/',
        '/^rgba?\\(/',
        '/^\\d+px$/',
      ],
    },
    'color-named': 'never',
  },
  ignoreFiles: ['**/node_modules/**', '**/dist/**', '**/storybook-static/**', '**/tokens.css'],
};
