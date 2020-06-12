import path from 'path';
import chalk from 'chalk';
import arg from 'arg';
import {
  setupAutoRelease,
  generateProject,
  TemplateModel,
} from 'create-yoshi-app';
import { cliCommand } from '../../cli';
import runPrompt from './runPrompt';
import updateFedopsConfig from './fedops';

const generateTemplate = (templateModel: TemplateModel, dir: string) => {
  const projectComponentsDir = path.join(process.cwd(), dir);
  const templateComponentDir = path.join(
    templateModel.templateDefinition.path,
    templateModel.language,
    dir,
  );
  return generateProject(
    templateModel,
    projectComponentsDir,
    templateComponentDir,
  );
};

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

  const templateModel = await runPrompt(model);
  generateTemplate(templateModel, 'src/components');
  generateTemplate(templateModel, 'sled/ssr');
  const flowData = templateModel.getFlowData();
  if (!flowData) {
    throw new Error("Can't initalize the flow data for a new component");
  }

  await Promise.all([
    updateFedopsConfig(templateModel, flowData),
    setupAutoRelease(templateModel),
  ]);

  flowData.components.map((component) => {
    const componentLocation = chalk.cyan.underline(
      `./src/components/${component.name}`,
    );
    console.log(
      `👶 The new component was generated under ${componentLocation}`,
    );
  });
  process.exit();
};

export default add;
