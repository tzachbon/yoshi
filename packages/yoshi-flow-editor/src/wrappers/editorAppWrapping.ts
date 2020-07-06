import path from 'path';
import fs from 'fs-extra';
import { FlowEditorModel, ComponentModel } from '../model';
import { getDefaultTranslations, resolveBILoggerPath } from '../utils';
import editorEntryTemplate from './templates/EditorAppEntryContent';

const editorAppWrapperPath =
  'yoshi-flow-editor-runtime/build/EditorAppWrapper.js';

const componentWrapper = (
  generatedWidgetEntriesPath: string,
  model: FlowEditorModel,
) => {
  return model.components.reduce(
    (acc: Record<string, string>, component: ComponentModel) => {
      if (!component.widgetFileName) {
        return acc;
      }

      const generatedWidgetEntryPath = path.join(
        generatedWidgetEntriesPath,
        `${component.name}EditorApp.js`,
      );

      let visitorBiLoggerPath: string | null = null;

      if (model.biConfig?.visitor) {
        visitorBiLoggerPath = resolveBILoggerPath(
          model.biConfig.visitor,
          'visitor',
        );
      }

      const generateWidgetEntryContent = editorEntryTemplate({
        editorAppWrapperPath,
        projectName: model.projectName,
        componentName: component.name,
        defaultTranslations: getDefaultTranslations(model),
        biConfig: model.biConfig,
        visitorBiLoggerPath,
        translationsConfig: model.translationsConfig,
        componentFileName: component.widgetFileName,
        controllerFileName: component.viewerControllerFileName,
        viewerEntryFileName: model.viewerEntryFileName,
        sentryConfig: model.sentry,
        experimentsConfig: model.experimentsConfig,
      });

      fs.outputFileSync(generatedWidgetEntryPath, generateWidgetEntryContent);

      acc[`${component.name}EditorMode`] = generatedWidgetEntryPath;

      return acc;
    },
    {},
  );
};

export default componentWrapper;
