import {
  CreateControllerFn,
  ControllerParams,
} from 'yoshi-flow-editor-runtime';
import { I$W } from '@wix/native-components-infra/dist/src/types/types';
import { getSettingsValues } from '@wix/tpa-settings';

import { appName } from '../../../.application.json';
import { componentSettings } from './componentSettings';

const createController: CreateControllerFn = async ({
  flowAPI,
}: ControllerParams) => {
  const { setProps } = flowAPI.controllerConfig;

  // NOTE: encapsulate somehow
  const publicData = flowAPI.controllerConfig.config.publicData.COMPONENT || {};
  const settings = getSettingsValues(publicData, componentSettings);

  return {
    async pageReady() {
      setProps({
        appName,
        // settings from tpa-settings
        greetingsText: settings.greetingsText,
      });
    },
    updateConfig($w: I$W, config) {
      const updatedPublicData = config.publicData.COMPONENT || {};
      const updatedSettings = getSettingsValues(
        updatedPublicData,
        componentSettings,
      );

      setProps({
        greetingsText: updatedSettings.greetingsText,
      });
    },
  };
};

export default createController;
