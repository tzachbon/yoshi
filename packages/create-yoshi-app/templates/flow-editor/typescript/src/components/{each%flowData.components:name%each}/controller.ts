import {
  CreateControllerFn,
  ControllerParams,
} from 'yoshi-flow-editor-runtime';
import { appName } from '../../../.application.json';

const createController: CreateControllerFn = async ({
  controllerConfig,
  flowAPI,
}: ControllerParams) => {
  const { setProps } = controllerConfig;
  const { getExperiments, isMobile } = flowAPI;

  const experiments = await getExperiments();

  return {
    async pageReady() {
      setProps({
        appName,
        mobile: isMobile(),
        experiments: experiments.all(),
      });
    },
  };
};

export default createController;
