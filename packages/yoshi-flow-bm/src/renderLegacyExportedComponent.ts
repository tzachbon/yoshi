import path from 'path';
import fs from 'fs-extra';
import { Entry } from 'webpack';
import { GENERATED_LEGACY_DIR, EXPORTED_COMPONENTS_DIR } from './constants';
import { FlowBMModel, ExportedComponentModel } from './model';
import { EXPORTED_COMPONENT_ENTRY } from './renderExportedComponent';

const generateExportedComponentLegacyCode = (
  exportedComponent: ExportedComponentModel,
) => {
  return `
import WrappedComponent from '${EXPORTED_COMPONENT_ENTRY(exportedComponent)}';
import { ModuleRegistry } from 'react-module-container';

ModuleRegistry.registerComponent('${
    exportedComponent.config.legacyBundle!.lazyComponentId
  }', () => WrappedComponent);
`;
};

const EXPORTED_COMPONENT_LEGACY_ENTRY = ({
  relativePath,
}: ExportedComponentModel) =>
  path.join(GENERATED_LEGACY_DIR, EXPORTED_COMPONENTS_DIR, relativePath);

const renderLegacyExportedComponent = (
  exportedComponent: ExportedComponentModel,
) => {
  const exportedComponentEntry = EXPORTED_COMPONENT_LEGACY_ENTRY(
    exportedComponent,
  );
  fs.outputFileSync(
    exportedComponentEntry,
    generateExportedComponentLegacyCode(exportedComponent),
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
      ] = EXPORTED_COMPONENT_LEGACY_ENTRY(exportedComponent);
      return entries;
    }, {});
};

export default renderLegacyExportedComponent;
