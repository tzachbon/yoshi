import path from 'path';
import fs from 'fs-extra';
import { Entry } from 'webpack';
import { GENERATED_LEGACY_DIR, PAGES_DIR } from './constants';
import { FlowBMModel, PageModel } from './model';
import { getPageEntryPath } from './page';

const generatePageLegacyCode = (page: PageModel) => {
  return `
import WrappedComponent from '${getPageEntryPath(page)}';
import { ModuleRegistry } from 'react-module-container';

ModuleRegistry.registerComponent('${
    page.config.legacyBundle!.lazyComponentId
  }', () => WrappedComponent);
`;
};

const getPageLegacyEntryPath = ({ relativePath }: PageModel) =>
  path.join(GENERATED_LEGACY_DIR, PAGES_DIR, relativePath);

export const renderLegacyPage = (page: PageModel) => {
  const pageEntry = getPageLegacyEntryPath(page);
  fs.outputFileSync(pageEntry, generatePageLegacyCode(page));
};

export const getLegacyPageEntries = (model: FlowBMModel): Entry => {
  return model.pages
    .filter((page) => page.config.legacyBundle !== undefined)
    .reduce<Entry>((entries, page) => {
      entries[page.config.legacyBundle?.bundleName!] = getPageLegacyEntryPath(
        page,
      );
      return entries;
    }, {});
};
