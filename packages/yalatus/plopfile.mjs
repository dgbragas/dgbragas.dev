/** plopfile — scaffolds a Yalatus component folder from .plop/templates and registers it in the components barrel. */
export default function (plop) {
  plop.setHelper('kebab', text =>
    String(text)
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .toLowerCase()
  );

  plop.setGenerator('component', {
    description: 'Create a component with types, styles, tests, stories and docs',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase, e.g. IconButton):',
        validate: value => (/^[A-Z][A-Za-z0-9]+$/.test(value) ? true : 'Use PascalCase'),
      },
      {
        type: 'input',
        name: 'element',
        message: 'Root DOM element type (e.g. HTMLButtonElement):',
        default: 'HTMLDivElement',
      },
      {
        type: 'input',
        name: 'tag',
        message: 'Root JSX tag (e.g. button):',
        default: 'div',
      },
      {
        type: 'input',
        name: 'description',
        message: 'One sentence describing what it is for:',
      },
      {
        type: 'input',
        name: 'figma',
        message: 'Figma node URL (optional):',
        default: '',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.component.tsx',
        templateFile: '.plop/templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.types.ts',
        templateFile: '.plop/templates/types.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/{{name}}.styles.scss',
        templateFile: '.plop/templates/styles.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/index.ts',
        templateFile: '.plop/templates/index.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/__tests__/{{name}}.component.test.tsx',
        templateFile: '.plop/templates/test.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/docs/{{name}}.stories.tsx',
        templateFile: '.plop/templates/stories.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/docs/{{name}}.mdx',
        templateFile: '.plop/templates/mdx.hbs',
      },
      {
        type: 'modify',
        path: 'src/components/index.ts',
        transform: contents => {
          const lines = contents
            .split('\n')
            .filter(line => line.startsWith('export * from'))
            .concat(`export * from './{{name}}';`)
            .sort((a, b) => a.localeCompare(b));
          return [...new Set(lines)].join('\n') + '\n';
        },
      },
    ],
  });
}
