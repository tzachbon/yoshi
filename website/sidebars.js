module.exports = {
  docs: [
    'welcome',
    'create-yoshi-app',
    'templates',
    'app-flow',
    'library-flow',
    'editor-flow/overview',
    'business-manager-flow',
    // 'monorepo-flow'
    'legacy-flow',
    'yoshi-server/getting-started',
    'babel-preset-yoshi',
    'jest-yoshi-preset',
    'node-api',
    'migration-guide',
    {
      'Legacy-Guides': [
        'legacy-guides/ab-translate',
        'legacy-guides/assets',
        'legacy-guides/bundle-analyze',
        'legacy-guides/debugging',
        'legacy-guides/disable-css-modules',
        'legacy-guides/enzyme-support',
        'legacy-guides/stylelint-setup',
        'legacy-guides/export-es-modules',
        'legacy-guides/hmr',
        'legacy-guides/momentjs-optimization',
        'legacy-guides/split-chunks',
        'legacy-guides/svg',
        'legacy-guides/managing-dependencies',
      ],
    },
  ],
  'editor-flow': [
    'editor-flow/overview',
    'editor-flow/dev-center-registration',
    'editor-flow/migration-guide',
    'editor-flow/editor-and-settings-apps',
    'editor-flow/platform-apps-support',
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