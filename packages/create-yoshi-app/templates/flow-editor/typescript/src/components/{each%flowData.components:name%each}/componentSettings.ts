import { ISettingsParam, ISettingsParams } from '@wix/tpa-settings';

export type IComponentSettings = ISettingsParams<{
  greetingsText: ISettingsParam<string>;
}>;

export const componentSettings: IComponentSettings = {
  greetingsText: {
    key: 'greetingsText',
    getDefaultValue: () => 'Developer',
  },
};
