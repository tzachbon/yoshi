import {
  ViewerScriptFlowAPI,
  ControllerFlowAPI,
} from 'yoshi-flow-editor-runtime/build/FlowAPI';
import { IWidgetControllerConfig } from '@wix/native-components-infra/dist/src/types/types';
import { aDefaultPlatformServices } from '@wix/native-components-infra/dist/test/builders/platformServices.builder';
import { ExperimentsConfig } from 'yoshi-flow-editor-runtime/build/constants';

export default ({
  experimentsConfig,
  controllerConfig,
  appDefinitionId,
  widgetId,
}: {
  experimentsConfig: ExperimentsConfig;
  controllerConfig: IWidgetControllerConfig;
  appDefinitionId: string;
  widgetId: string;
}) =>
  new ControllerFlowAPI({
    viewerScriptFlowAPI: new ViewerScriptFlowAPI({
      experimentsConfig,
      sentry: null,
      inEditor: false,
      platformServices: aDefaultPlatformServices(),
    }),
    controllerConfig,
    appDefinitionId,
    widgetId,
  });
