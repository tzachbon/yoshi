import {
  WidgetType,
  ExperimentsConfig,
  SentryConfig,
  DefaultTranslations,
  TranslationsConfig,
  BiConfig,
} from 'yoshi-flow-editor-runtime/build/constants';
import t from './template';

export type TemplateControllerConfig = {
  id: string | null;
  controllerFileName: string;
  widgetType: WidgetType;
  componentName: string;
  controllerId?: string;
};

type Opts = {
  viewerScriptWrapperPath: string;
  viewerEntryFileName: string | null;
  sentryConfig: SentryConfig | null;
  translationsConfig: TranslationsConfig | null;
  defaultTranslations: DefaultTranslations | null;
  experimentsConfig: ExperimentsConfig | null;
  biConfig: BiConfig | null;
  appName: string | null;
  controllersMeta: Array<TemplateControllerConfig>;
};

type ViewerScriptOpts = {
  viewerEntryFileName: string | null;
};

const getControllerVariableName = (index: number) => `controller${index}`;

export const viewerScriptOptionalImport = t<ViewerScriptOpts>`
  ${({ viewerEntryFileName }) =>
    viewerEntryFileName
      ? `import * as viewerApp from '${viewerEntryFileName}';
    var importedApp = viewerApp;`
      : `var importedApp = {};`}
`;

const importsForControllers = t<{
  controllersMeta: Array<TemplateControllerConfig>;
}>`
  ${({ controllersMeta }) => {
    return controllersMeta
      .map((controller, i) => {
        return `import ${getControllerVariableName(i)} from '${
          controller.controllerFileName
        }';`;
      })
      .join('\n');
  }}
`;

const getControllerScriptId = (controller: TemplateControllerConfig) => {
  const controllerScriptId = controller.controllerId || controller.id;

  return controllerScriptId ? `"${controllerScriptId}"` : controllerScriptId;
};

const controllerConfigs = t<{
  controllersMeta: Array<TemplateControllerConfig>;
  translationsConfig: TranslationsConfig | null;
  defaultTranslations: DefaultTranslations | null;
  experimentsConfig: ExperimentsConfig | null;
  biConfig: BiConfig | null;
  biLogger: any;
  appName: string | null;
}>`${({
  controllersMeta,
  translationsConfig,
  experimentsConfig,
  biConfig,
  defaultTranslations,
  appName,
}) =>
  controllersMeta
    .map(
      (controller, i) =>
        `{ method: ${getControllerVariableName(i)},
          widgetType: "${controller.widgetType}",
          translationsConfig: ${
            translationsConfig ? JSON.stringify(translationsConfig) : 'null'
          },
          experimentsConfig: ${
            experimentsConfig ? JSON.stringify(experimentsConfig) : 'null'
          },
          defaultTranslations: ${
            defaultTranslations ? JSON.stringify(defaultTranslations) : 'null'
          },
          biLogger: biLogger,
          biConfig: ${biConfig ? JSON.stringify(biConfig) : 'null'},
          controllerFileName: "${controller.controllerFileName}",
          appName: ${appName ? `"${appName}"` : 'null'},
          componentName: "${controller.componentName}",
          id: ${getControllerScriptId(controller)} }`,
    )
    .join(', ')}`;

export default t<Opts>`
  import {createControllersWithDescriptors, initAppForPageWrapper} from '${({
    viewerScriptWrapperPath,
  }) => viewerScriptWrapperPath}';
  ${({ controllersMeta }) => importsForControllers({ controllersMeta })}
  ${({ viewerEntryFileName }) =>
    viewerScriptOptionalImport({ viewerEntryFileName })}

  var sentryConfig = ${({ sentryConfig }) =>
    sentryConfig
      ? `{
      DSN: '${sentryConfig.DSN}',
      id: '${sentryConfig.id}',
      projectName: '${sentryConfig.projectName}',
      teamName: '${sentryConfig.teamName}',
    }`
      : 'null'};

  var experimentsConfig = ${({ experimentsConfig }) =>
    experimentsConfig ? JSON.stringify(experimentsConfig) : 'null'};

  var translationsConfig = ${({ translationsConfig }) =>
    translationsConfig ? JSON.stringify(translationsConfig) : 'null'};

  export const initAppForPage = initAppForPageWrapper(importedApp.initAppForPage, sentryConfig, experimentsConfig, false, ${({
    appName,
  }) => (appName ? `"${appName}"` : 'null')}, translationsConfig);
  export const createControllers = createControllersWithDescriptors([${({
    controllersMeta,
    appName,
    translationsConfig,
    defaultTranslations,
    biConfig,
    experimentsConfig,
  }) =>
    controllerConfigs({
      controllersMeta,
      appName,
      biConfig,
      biLogger:
        biConfig && biConfig.visitor ? `require(${biConfig.visitor})` : 'null',
      translationsConfig,
      defaultTranslations,
      experimentsConfig,
    })}]);
`;
