import { ISettingsParam, ISettingsParams } from '@wix/tpa-settings';
import { appName } from '../../../.application.json';

export type IComponentSettings = ISettingsParams<{
  greetingsText: ISettingsParam<string>;
}>;

export const componentSettings: IComponentSettings = {
  greetingsText: {
    key: 'greetingsText',
    getDefaultValue: () => `to ${appName}`,
  },
};
