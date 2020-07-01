import chalk from 'chalk';
import {
  clearConsole,
  gitInit,
  isInsideGitRepo,
  lintFix,
  npmInstall,
  gitCommit,
} from './utils';
import generateProject from './generateProject';
import TemplateModel from './TemplateModel';
import SentryTemplateModel from './sentry-registration/TemplateModel';
import DevCenterTemplateModel from './dev-center-registration/TemplateModel';
import verifyServerlessParentDir from './verifyServerlessParentDir';

export interface CreateAppOptions {
  workingDir: string;
  templateModel?: TemplateModel;
  install?: boolean;
  lint?: boolean;
  commit?: boolean;
}

export default async ({
  workingDir,
  templateModel,
  install = true,
  lint = true,
  commit = true,
}: CreateAppOptions) => {
  clearConsole();

  if (!templateModel) {
    // Use ' ' due to a technical problem in hyper when you don't see the first char after clearing the console
    console.log(
      ' ' + chalk.underline('Please answer the following questions:\n'),
    );

    // If we don't have template model injected, ask the user
    // to answer the questions and generate one for us
    const runPrompt = require('./runPrompt').default;
    templateModel = (await runPrompt(workingDir)) as TemplateModel<
      DevCenterTemplateModel
    >;
  }

  if (templateModel.templateDefinition.name.includes('flow-editor')) {
    const runDevCenterRegistrationPrompt = require('./dev-center-registration/runPrompt')
      .default;
    const runSentryRegistrationPrompt = require('./sentry-registration/runPrompt')
      .default;

    const setupAutoRelease = require('./auto-release/setupAutoRelease').default;

    const devCenterModel = (await runDevCenterRegistrationPrompt(
      templateModel,
    )) as DevCenterTemplateModel;
    templateModel.setFlowData(devCenterModel);

    const sentryModel = (await runSentryRegistrationPrompt(
      templateModel,
    )) as SentryTemplateModel;

    templateModel.setSentryData(sentryModel);
    await setupAutoRelease(templateModel);
  }

  if (
    templateModel.templateDefinition.name.includes('platformize-serverless')
  ) {
    verifyServerlessParentDir(workingDir);
    templateModel.setRepositoryName(workingDir);
  }

  console.log(
    `\nCreating a ${chalk.cyan(
      templateModel.getTitle(),
    )} project in:\n\n${chalk.green(workingDir)}\n`,
  );

  generateProject(templateModel, workingDir, templateModel.getPath());

  if (!isInsideGitRepo(workingDir)) {
    gitInit(workingDir);
  }

  if (install) {
    npmInstall(workingDir);
  }

  if (lint) {
    lintFix(workingDir);
  }

  if (commit) {
    gitCommit(workingDir);
  }

  return templateModel;
};
