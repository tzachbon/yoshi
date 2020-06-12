import chalk from 'chalk';
import TemplateModel from '../TemplateModel';
import { generateAppModel, updateAppModel } from './autoReleaseService';

export default async (templateModel: TemplateModel) => {
  try {
    const config = await generateAppModel(
      templateModel.projectName,
      templateModel.flowData!.appDefinitionId,
    );

    await updateAppModel(templateModel.projectName, config);
    console.log(
      chalk.cyan(
        `\nAuto-release for ${chalk.underline(
          templateModel.projectName,
        )} was configured ✅`,
      ),
    );
  } catch (e) {
    console.error(e);
    console.error(
      `Can't set up an auto release for current project.
Please check the docs to configure it manually:
https://github.com/wix-private/devcenter/tree/master/serverless/app-service-autorelease#auto-release-for-wix-tpa`,
    );
    return null;
  }
};
