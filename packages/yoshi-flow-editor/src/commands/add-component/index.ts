import path from 'path';
import chalk from 'chalk';
import arg from 'arg';
import { generateProject, setupAutoRelease } from 'create-yoshi-app';
import { cliCommand } from '../../cli';
import runPrompt from './runPrompt';
import updateFedopsConfig from './fedops';

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
  const projectComponentsDir = path.join(process.cwd(), 'src', 'components');
  generateProject(templateModel, projectComponentsDir);
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
      `${projectComponentsDir}/${component.name}`,
    );
    console.log(
      `👶 The new component was added to Dev Center and bootstrapped under ${componentLocation}`,
    );
  });
  process.exit();
};

export default add;
