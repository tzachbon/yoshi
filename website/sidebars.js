module.exports = {
  docs: [
    'welcome',
    'create-yoshi-app',
    'templates',
    'testing',
    'yoshi-config',
    'node-api',
    {
      'Styles and Assets': [
        'styles-and-assets/assets',
        'styles-and-assets/disable-css-modules',
        'styles-and-assets/stylelint-setup',
        'styles-and-assets/svg',
      ],
    },
    {
      Development: [
        'development/bundle-analyze',
        'development/environment-variables',
        'development/debugging',
        'development/hmr',
        'development/momentjs-optimization',
        'development/split-chunks',
      ],
    },
    'migration-guide',
  ],
  'editor-flow': [
    'editor-flow/overview',
    'editor-flow/getting-started',
    'editor-flow/cli-API',
    {
      'Structure API': [
        'editor-flow/structure-api/overview',
        'editor-flow/structure-api/application',
        'editor-flow/structure-api/component',
      ],
    },
    'editor-flow/runtime-API',
    'editor-flow/local-development',
    'editor-flow/testing',
    'editor-flow/platform-apps-support',
  ],
  'library-flow': [
    'library-flow/overview',
    'library-flow/configuration',
    'library-flow/migration-guide',
  ],
  'yoshi-server': [
    'yoshi-server/getting-started',
    'yoshi-server/consuming-data-from-the-server',
    'yoshi-server/exposing-route',
    'yoshi-server/react-binding',
    'yoshi-server/initializing-server-data',
    'yoshi-server/middlewares',
    'yoshi-server/custom-server',
    'yoshi-server/testing',
  ],
};
