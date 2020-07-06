import fs from 'fs-extra';
import { BIConfig } from 'yoshi-flow-editor-runtime/build/constants';

import importCwd from 'import-cwd';
import { resolveBILoggerPath } from '../utils';
import biLoggerTypesTemplate from './templates/BiLoggerTypes';

interface ConstantsConfig {
  biLoggerTypesFilename: string;
}

const replaceTypes = (constantsPathname: string, template: string) => {
  const resolvedDistConstants = importCwd.silent(
    constantsPathname,
  ) as ConstantsConfig;

  if (resolvedDistConstants) {
    if (fs.existsSync(resolvedDistConstants.biLoggerTypesFilename)) {
      fs.outputFileSync(resolvedDistConstants.biLoggerTypesFilename, template);
    }
  }
};

export const overrideBILoggerTypes = (biConfig: BIConfig) => {
  if (biConfig?.owner || biConfig?.visitor) {
    const template = biLoggerTypesTemplate({
      visitor: biConfig.owner
        ? resolveBILoggerPath(biConfig.owner, 'owner', true)
        : null,
      owner: biConfig.visitor
        ? resolveBILoggerPath(biConfig.visitor, 'visitor', true)
        : null,
    });

    replaceTypes('yoshi-flow-editor-runtime/build/constants', template);
  }
};
