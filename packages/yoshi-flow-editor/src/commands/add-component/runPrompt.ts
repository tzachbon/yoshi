import path from 'path';
import {
  ExtendedPropmtsAnswers,
  extendedPropmts,
  getAuthInstance,
  initAPIService,
  TemplateModel,
  DevCenterTemplateModel,
  isOutOfIframe,
  templates,
  addOOIComponentStep,
  PAGE_OUT_OF_IFRAME,
} from 'create-yoshi-app';
import chalk from 'chalk';
import { FlowEditorModel } from '../../model';

class AddComponentTemplateModel<
  F extends DevCenterTemplateModel
> extends TemplateModel<F> {
  getPath() {
    return path.join(
      this.templateDefinition.path,
      this.language,
      'src',
      'components',
    );
  }
}

const getOOITemplate = () => {
  return templates.find((tempalte) => isOutOfIframe(tempalte.name))!;
};

const getTemplateDefaultOptions = () => {
  return {
    authorName: '',
    authorEmail: '',
    templateDefinition: {
      ...getOOITemplate(),
      name: 'editor-flow-component',
    },
  };
};

const onCancel = () => {
  console.error(`${chalk.hex('D86079')('✖')} Canceled...`);
  process.exit(0);
};

const isDisabled = (value: string) => {
  return value === PAGE_OUT_OF_IFRAME;
};

export default async (model: FlowEditorModel) => {
  const instance = await getAuthInstance();
  if (instance) {
    initAPIService(instance);
  }

  let answers: ExtendedPropmtsAnswers<string> = {
    appId: model.appDefId,
    components: [],
  };

  const options = {
    isViewerScriptRegistered: true,
    projectName: model.projectName,
  };

  try {
    const questions = [
      addOOIComponentStep({
        multiple: false,
        isDisabled,
        warn:
          'Adding a Page directly to Dev Center could break your production app. We are working on this issue and will enable this option ASAP 🙏.',
      }),
    ];
    answers = await extendedPropmts<{
      isViewerScriptRegistered: boolean;
      projectName: string;
    }>(questions, options, answers);
  } catch (e) {
    // We want to show unhandled errors
    if (e.message !== 'Aborted') {
      console.error(e);
    }
    onCancel();
  }
  if (!answers.components.length) {
    onCancel();
  }

  const templateModel = new AddComponentTemplateModel<DevCenterTemplateModel>({
    projectName: model.projectName,
    language: 'typescript',
    ...getTemplateDefaultOptions(),
  });
  const flowData = new DevCenterTemplateModel(answers as any);
  templateModel.setFlowData(flowData);

  return templateModel;
};
