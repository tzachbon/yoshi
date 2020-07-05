import { Entry } from 'webpack';
import { FlowBMModel } from './model';
import { getModuleEntry } from './module';
import { getLegacyPageEntries } from './legacyPage';
import { getLegacyExportedComponentEntries } from './legacyExportedComponent';

const getEntries = (model: FlowBMModel): Entry => ({
  ...getModuleEntry(model),
  ...getLegacyPageEntries(model),
  ...getLegacyExportedComponentEntries(model),
});

export default getEntries;
