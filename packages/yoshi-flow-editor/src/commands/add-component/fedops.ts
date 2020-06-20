import path from 'path';
import fs from 'fs-extra';
import { TemplateModel, DevCenterTemplateModel } from 'create-yoshi-app';

type FedopsConfig = Array<FedopsConfigElement>;

interface FedopsConfigElement {
  app_name: string;
  app_id: string;
  widget_id: string;
  notifications: {
    slack_channels: Array<string>;
  };
}

const readFedopsConfig = async (configPath: string): Promise<FedopsConfig> => {
  return fs.readJSON(configPath);
};

const writeFedopsConfig = async (
  configPath: string,
  config: FedopsConfig,
): Promise<void> => {
  return fs.outputJSON(configPath, config, { spaces: 2 });
};

const updateFedopsConfig = async (
  templateModel: TemplateModel,
  flowData: DevCenterTemplateModel,
) => {
  const componentsToAdd = flowData.components.map(
    (component): FedopsConfigElement => {
      return {
        app_name: `${templateModel.projectName}-${component.name}`,
        app_id: flowData.appDefinitionId,
        widget_id: component.id,
        notifications: {
          slack_channels: [`${templateModel.projectName}-urgent`],
        },
      };
    },
  );
  const fedopsPathname = path.join(process.cwd(), 'fedops.json');
  const projectFedopsConfig = await readFedopsConfig(fedopsPathname);
  projectFedopsConfig.push(...componentsToAdd);
  return writeFedopsConfig(fedopsPathname, projectFedopsConfig);
};

export default updateFedopsConfig;
