import path from 'path';
import arg from 'arg';
import {
  addOOIComponentStep,
  generateProject,
  ExtendedPropmtsAnswers,
  extendedPropmts,
  getAuthInstance,
  initAPIService,
  TemplateModel,
  DevCenterTemplateModel,
  isOutOfIframe,
  templates,
} from 'create-yoshi-app';
import { cliCommand } from '../../cli';
import updateFedopsConfig from './fedops';

const onCancel = (reason: string) => {
  console.error(`❌ ${reason}...`);
  process.exit(0);
};

class AddComponentTemplateModel extends TemplateModel {
  getPath() {
    return path.join(
      this.templateDefinition.path,
      this.language,
      'src',
      'components',
    );
  }
}

const add: cliCommand = async function (argv, config, model) {
  const args = arg(
    {
      // Types
      '--help': Boolean,

      // Aliases
      '-h': '--help',
    },
    { argv },
  );

  const { '--help': help } = args;

  if (help) {
    console.log(
      `
      Description
        Adds a component to current project, integrates it with Dev Center, Fedops and sled configuration.

      Usage
        $ yoshi-flow-editor add

      Options
        --help, -h      Displays this message
    `,
    );

    process.exit(0);
  }

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
    const questions = [addOOIComponentStep({ multiple: false })];
    answers = await extendedPropmts<{
      isViewerScriptRegistered: boolean;
      projectName: string;
    }>(questions, options, answers);
  } catch (e) {
    // We want to show unhandled errors
    if (e.message !== 'Aborted') {
      console.error(e);
    }
    onCancel('Aborted');
  }
  if (!answers.components.length) {
    onCancel('Canceled');
  }

  const ooiTemplate = templates.find((tempalte) =>
    isOutOfIframe(tempalte.name),
  )!;

  const templateModel = new AddComponentTemplateModel({
    projectName: model.projectName,
    authorName: 'editor flow',
    authorEmail: 'editor@flow',
    language: 'typescript',
    templateDefinition: {
      ...ooiTemplate,
      name: 'editor-flow-component',
    },
  });
  const flowData = new DevCenterTemplateModel(answers as any);
  templateModel.setFlowData<DevCenterTemplateModel>(flowData);
  const projectComponentsDir = path.join(process.cwd(), 'src', 'components');
  generateProject(templateModel, projectComponentsDir);
  updateFedopsConfig(templateModel, flowData);

  console.log(
    `👶 The new component was added to Dev Center and bootstrapped under ${projectComponentsDir}/${answers.componentName}`,
  );
  process.exit();
};

export default add;
