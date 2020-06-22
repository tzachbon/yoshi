import React from 'react';
import { IWixStatic } from '@wix/native-components-infra/dist/src/types/wix-sdk';
import { iframeAppBiLoggerFactory } from '@wix/iframe-app-bi-logger';
import { ExperimentsProvider } from '@wix/wix-experiments-react';
import { get } from 'lodash';
import {
  WixSDK,
  BILogger,
  BILoggerProvider,
  translate,
  InjectedTranslateProps,
} from 'yoshi-flow-editor-runtime';
import { ColorPickerColorSpace, TextLabel } from '@wix/wix-base-ui';
// Replace this line with real schema initializer
import initSchemaLogger, { IExampleBILogger } from '../../../config/bi';
import { experiments as experimentsConfig } from '../../../../.application.json';
import './Settings.global.scss';

const biLogger = initSchemaLogger(iframeAppBiLoggerFactory);

interface ISettingsProps {
  Wix: IWixStatic;
}

const defaultSettingsValues = {
  backgroundColor: '#ffffff',
  buttonBackgroundColor: '#ffffff',
  fontSize: 14,
};

const SettingsLabel = translate()(({ t }: InjectedTranslateProps) => (
  <TextLabel
    type="T02"
    value={t('app.settings.label')}
    shouldTranslate={false}
  />
));

export class Settings extends React.Component<ISettingsProps> {
  state = defaultSettingsValues;

  componentDidMount() {
    this.props.Wix.Styles.getStyleParams((styleParams: any) => {
      this.setState({
        backgroundColor: get(
          styleParams,
          'colors.backgroundColor.value',
          this.state.backgroundColor,
        ),
        buttonBackgroundColor: get(
          styleParams,
          'colors.buttonBackgroundColor.value',
          this.state.buttonBackgroundColor,
        ),
        fontSize: get(styleParams, 'fonts.fontSize.size', this.state.fontSize),
      });
    });
  }

  updateHeaderBackgroundColorWithBiLogger = (logger: IExampleBILogger) => (
    backgroundColor: string,
  ) => {
    logger.exampleBILog();
    this.props.Wix.Styles.setColorParam('backgroundColor', {
      value: { color: false, opacity: 1, rgba: backgroundColor },
    });
    this.setState({ backgroundColor });
  };
  render() {
    return (
      <div>
        <section>
          <SettingsLabel />
          <div>
            <BILogger>
              {(logger: IExampleBILogger) => (
                <ColorPickerColorSpace
                  onChange={this.updateHeaderBackgroundColorWithBiLogger(
                    logger,
                  )}
                  value={this.state.backgroundColor}
                />
              )}
            </BILogger>
          </div>
        </section>
      </div>
    );
  }
}

export default () => (
  <ExperimentsProvider options={{ scope: experimentsConfig.scope }}>
    <BILoggerProvider logger={biLogger}>
      <WixSDK isEditor>{({ Wix }) => <Settings Wix={Wix} />}</WixSDK>
    </BILoggerProvider>
  </ExperimentsProvider>
);
