import {
  StyleParamType,
  IStyleParams,
  IStyleParam,
  wixColorParam,
  wixFontParam,
} from '@wix/tpa-settings';

export type IComponentStyles = IStyleParams<{
  backgroundColor: IStyleParam<StyleParamType.Color>;
  textFont: IStyleParam<StyleParamType.Font>;
  textColor: IStyleParam<StyleParamType.Color>;
}>;

export const componentStyles: IComponentStyles = {
  backgroundColor: {
    type: StyleParamType.Color,
    name: 'backgroundColor',
    getDefaultValue: wixColorParam('color-3'),
  },
  textFont: {
    type: StyleParamType.Font,
    name: 'textFont',
    getDefaultValue: wixFontParam('Body-M', {
      size: 20,
    }),
  },
  textColor: {
    type: StyleParamType.Color,
    name: 'textColor',
    getDefaultValue: wixColorParam('color-5'),
  },
};
