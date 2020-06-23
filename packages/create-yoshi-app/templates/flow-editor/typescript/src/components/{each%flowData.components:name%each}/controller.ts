import {
  CreateControllerFn,
  ControllerParams,
} from 'yoshi-flow-editor-runtime';
import { appName } from '../../../.application.json';

const createController: CreateControllerFn = async ({
  flowAPI,
}: ControllerParams) => {
  const { setProps } = flowAPI.controllerConfig;

  return {
    async pageReady() {
      setProps({
        appName,
      });
    },
  };
};

export default createController;
