import path from 'path';
import fs from 'fs-extra';
import { Entry } from 'webpack';
import { GENERATED_LEGACY_DIR, EXPORTED_COMPONENTS_DIR } from './constants';
import { FlowBMModel, ExportedComponentModel } from './model';
import { getExportedComponentEntryPath } from './exportedComponent';

const generateLegacyExportedComponentCode = (
  exportedComponent: ExportedComponentModel,
) => {
  return `
import WrappedComponent from '${getExportedComponentEntryPath(
    exportedComponent,
  )}';
import { ModuleRegistry } from 'react-module-container';

ModuleRegistry.registerComponent('${
    exportedComponent.config.legacyBundle!.lazyComponentId
  }', () => WrappedComponent);
`;
};

const getLegacyExportedComponentEntryPath = ({
  relativePath,
}: ExportedComponentModel) =>
  path.join(GENERATED_LEGACY_DIR, EXPORTED_COMPONENTS_DIR, relativePath);

export const renderLegacyExportedComponent = (
  exportedComponent: ExportedComponentModel,
) => {
  const exportedComponentEntry = getLegacyExportedComponentEntryPath(
    exportedComponent,
  );
  fs.outputFileSync(
    exportedComponentEntry,
    generateLegacyExportedComponentCode(exportedComponent),
  );
};

export const getLegacyExportedComponentEntries = (
  model: FlowBMModel,
): Entry => {
  return model.exportedComponents
    .filter(
      (exportedComponent) =>
        exportedComponent.config.legacyBundle !== undefined,
    )
    .reduce<Entry>((entries, exportedComponent) => {
      entries[
        exportedComponent.config.legacyBundle?.bundleName!
      ] = getLegacyExportedComponentEntryPath(exportedComponent);
      return entries;
    }, {});
};
