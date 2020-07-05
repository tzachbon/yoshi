import { multipleValidOptions } from 'jest-validate';
import {
  InitialExportedComponentConfig,
  InitialMethodConfig,
  InitialModuleConfig,
  InitialPageConfig,
} from './types';

export const validModuleConfig: InitialModuleConfig = {
  moduleId: 'module-id',
  moduleConfigurationId: 'parent-module-id',
  appDefId: '00000000-0000-0000-0000-000000000000',
  routeNamespace: 'some-route',
  sentryDsn: '1337',
  experimentsScopes: ['yoshi', 'wos'],
  moduleBundleName: 'some-module',
  topology: multipleValidOptions(
    {
      fooUrl: { artifactId: 'foo' },
    },
    { barUrl: { artifactId: 'bar' } },
  ),
};

const validLegacyBundleConfig = {
  bundleName: 'some-legacy-bundle-name',
  lazyComponentId: 'some-legacy-page-component-id',
};

export const validPageConfig: InitialPageConfig = {
  componentId: 'component-id',
  componentName: 'component-name',
  legacyBundle: validLegacyBundleConfig,
};

export const validExportedComponentConfig: InitialExportedComponentConfig = {
  componentId: 'component-id',
  legacyBundle: validLegacyBundleConfig,
};

export const validMethodConfig: InitialMethodConfig = {
  methodId: 'method-id',
};
