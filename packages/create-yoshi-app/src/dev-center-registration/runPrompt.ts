import LocalAppTemplateModel from '../TemplateModel';
import extendedPropmts, { Answers } from '../extended-prompts';
import { initAPIService } from '../api';
import TemplateModel from './TemplateModel';
import getQuestions from './getQuestions';
import { getAuthInstance } from './auth';
import getDefaultAnswers from './getDefaultAnswers';

const getFallback = (localAppModel: LocalAppTemplateModel) => () => {
  console.log(
    "⚠ Can't register/migrate Dev Center project. The default project will be created instead.",
    '\n',
  );

  return new TemplateModel(
    getDefaultAnswers(localAppModel.templateDefinition.name),
  );
};

export default async (
  localAppModel: LocalAppTemplateModel,
  questions = getQuestions(),
  fallback = getFallback(localAppModel),
): Promise<TemplateModel> => {
  const instance = await getAuthInstance();
  if (instance) {
    initAPIService(instance);
  } else {
    // We should handle default template if auth flow was failed
    return fallback();
  }

  let answers: Answers<string>;

  try {
    answers = await extendedPropmts<{ apps?: any } & LocalAppTemplateModel>(
      questions,
      localAppModel,
    );
    if (!answers.appRegistrationState) {
      return fallback();
    }
  } catch (e) {
    // We want to show unhandled errors
    if (e.message !== 'Aborted') {
      console.error(e);
      return fallback();
    }
    console.log();
    console.log('Aborting ...');
    process.exit(0);
  }

  return new TemplateModel(answers as any);
};
