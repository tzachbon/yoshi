import path from 'path';
import fs from 'fs-extra';
import { Entry } from 'webpack';
import { FlowBMModel } from './model';
import renderPage from './renderPage';
import renderExportedComponent from './renderExportedComponent';
import { EXPORTED_COMPONENTS_DIR, PAGES_DIR } from './constants';

const generateLegacyWrappersCode = ({
  exportedComponents,
  methods,
  pages,
  moduleInitPath,
  config: { moduleId, moduleConfigurationId, sentryDsn },
}: FlowBMModel) => `
import { createLegacyWrappers } from 'yoshi-flow-bm-runtime';

createLegacyWrappers({
  moduleId: '${moduleId}',
  pages: [
    ${pages.map(
      ({ componentId, componentName, relativePath }) => `
      {
        componentId: '${componentId}',
        componentName: '${componentName}',
        loadComponent: async () => (await import(/* webpackChunkName: "${componentName}" */'./${PAGES_DIR}/${relativePath}')).default,
      },
    `,
    )}
  ],
  exportedComponents: [
    ${exportedComponents.map(
      ({ componentId, relativePath }) => `
      {
        componentId: '${componentId}',
        loadComponent: async () => (await import(/* webpackChunkName: "${componentId}" */'./${EXPORTED_COMPONENTS_DIR}/${relativePath}')).default,
      },
    `,
    )}
  ],
  methods: [
    ${methods.map(
      ({ methodId, absolutePath }) => `
      {
        methodId: '${methodId}',
        loadMethod: () => require('${absolutePath}').default,
      }`,
    )}
  ], // ${JSON.stringify(methods)},
  ${
    moduleConfigurationId
      ? `moduleConfigurationId: '${moduleConfigurationId}'`
      : ''
  }
  ${moduleInitPath ? `moduleInit: require('${moduleInitPath}').default,` : ''}
  ${sentryDsn ? `sentryDsn: '${sentryDsn}',` : ''}
});`;

const LEGACY_WRAPPERS_PATH = 'dist/legacy/index.ts';

const renderLegacyWrappers = (model: FlowBMModel) => {
  model.pages.forEach((page) => renderPage(page, model));

  model.exportedComponents.forEach((component) =>
    renderExportedComponent(component, model),
  );

  fs.outputFileSync(LEGACY_WRAPPERS_PATH, generateLegacyWrappersCode(model));
};

export default renderLegacyWrappers;
