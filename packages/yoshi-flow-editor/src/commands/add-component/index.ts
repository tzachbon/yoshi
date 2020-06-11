import arg from 'arg';
import {
  addOOIComponentStep,
  ExtendedPropmtsAnswers,
  extendedPropmts,
  getAuthInstance,
  initAPIService,
} from 'create-yoshi-app';
import { cliCommand } from '../../cli';

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

  let answers: ExtendedPropmtsAnswers<string>;

  const instance = await getAuthInstance();
  if (instance) {
    initAPIService(instance);
  }

  try {
    const questions = [addOOIComponentStep()];
    answers = await extendedPropmts<{ apps?: any }>(
      questions,
      {},
      {
        appId: model.appDefId,
      },
    );
  } catch (e) {
    // We want to show unhandled errors
    if (e.message !== 'Aborted') {
      console.error(e);
    }
    console.log();
    console.log('Aborting ...');
    process.exit(0);
  }

  console.log(answers);
};

export default add;
