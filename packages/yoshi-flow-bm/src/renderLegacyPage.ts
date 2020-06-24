import path from 'path';
import fs from 'fs-extra';
import { Entry } from 'webpack';
import { GENERATED_LEGACY_DIR, PAGES_DIR } from './constants';
import { FlowBMModel, PageModel } from './model';
import { PAGE_ENTRY } from './renderPage';

const generatePageLegacyCode = (page: PageModel) => {
  return `
import WrappedComponent from '${PAGE_ENTRY(page)}';
import { ModuleRegistry } from 'react-module-container';

ModuleRegistry.registerComponent('${
    page.config.legacyBundle!.lazyComponentId
  }', () => WrappedComponent);
`;
};

const PAGE_LEGACY_ENTRY = ({ relativePath }: PageModel) =>
  path.join(GENERATED_LEGACY_DIR, PAGES_DIR, relativePath);

const renderLegacyPage = (page: PageModel) => {
  const pageEntry = PAGE_LEGACY_ENTRY(page);
  fs.outputFileSync(pageEntry, generatePageLegacyCode(page));
};

export const getLegacyPageEntries = (model: FlowBMModel): Entry => {
  return model.pages
    .filter((page) => page.config.legacyBundle !== undefined)
    .reduce<Entry>((entries, page) => {
      entries[page.config.legacyBundle?.bundleName!] = PAGE_LEGACY_ENTRY(page);
      return entries;
    }, {});
};

export default renderLegacyPage;
