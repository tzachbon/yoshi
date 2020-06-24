import path from 'path';
import fs from 'fs-extra';
import { FlowEditorModel, ComponentModel } from '../model';
import { getDefaultTranslations } from '../utils';
import settingsEntryTemplate from './templates/SettingsAppEntryContent';

const settingsWrapperPath =
  'yoshi-flow-editor-runtime/build/SettingsWrapper.js';
const baseUIPath =
  'yoshi-flow-editor-runtime/build/styles/wix-base-ui.global.scss';

const settingsWrapper = (
  generatedWidgetEntriesPath: string,
  model: FlowEditorModel,
) => {
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
