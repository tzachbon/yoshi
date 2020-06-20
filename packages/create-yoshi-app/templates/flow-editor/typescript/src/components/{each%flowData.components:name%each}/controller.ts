import {
  CreateControllerFn,
  ControllerParams,
} from 'yoshi-flow-editor-runtime';
import { appName } from '../../../.application.json';
import { getSiteTranslations } from '../../config/i18n';

const createController: CreateControllerFn = async ({
  controllerConfig,
  flowAPI,
}: ControllerParams) => {
  const { setProps } = controllerConfig;
  const { getExperiments, getSiteLanguage, isMobile } = flowAPI;

  const language = getSiteLanguage();
  const [experiments, translations] = await Promise.all([
    getExperiments(),
    getSiteTranslations(language),
  ]);

  return {
    async pageReady() {
      setProps({
        appName,
        language,
        mobile: isMobile(),
        experiments: experiments.all(),
        translations,
      });
    },
  };
};

export default createController;
