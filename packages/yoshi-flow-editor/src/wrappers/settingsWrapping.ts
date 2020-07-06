import path from 'path';
import fs from 'fs-extra';
import { FlowEditorModel, ComponentModel } from '../model';
import { getDefaultTranslations, resolveBILoggerPath } from '../utils';
import settingsEntryTemplate from './templates/SettingsAppEntryContent';

const settingsWrapperPath =
  'yoshi-flow-editor-runtime/build/SettingsWrapper.js';
const baseUIPath =
  'yoshi-flow-editor-runtime/build/styles/wix-base-ui.global.scss';

const settingsWrapper = (
  generatedWidgetEntriesPath: string,
  model: FlowEditorModel,
) => {
  let ownerBiLoggerPath: string | null = null;

  if (model.biConfig?.owner) {
    ownerBiLoggerPath = resolveBILoggerPath(model.biConfig.owner, 'owner');
  }

  return model.components.reduce(
    (acc: Record<string, string>, component: ComponentModel) => {
      if (component.settingsFileName) {
        const generatedWidgetEntryPath = path.join(
          generatedWidgetEntriesPath,
          `${component.name}Settings.js`,
        );

        const generateSettingsEntryContent = settingsEntryTemplate({
          settingsWrapperPath,
          baseUIPath,
          biConfig: model.biConfig,
          appName: model.appName,
          projectName: model.projectName,
          ownerBiLoggerPath,
          experimentsConfig: model.experimentsConfig,
          translationsConfig: model.translationsConfig,
          defaultTranslations: getDefaultTranslations(model),
          sentry: model.sentry,
          componentFileName: component.settingsFileName,
        });

        fs.outputFileSync(
          generatedWidgetEntryPath,
          generateSettingsEntryContent,
        );

        acc[`${component.name}SettingsPanel`] = generatedWidgetEntryPath;
      }

      return acc;
    },
    {},
  );
};

export default settingsWrapper;
