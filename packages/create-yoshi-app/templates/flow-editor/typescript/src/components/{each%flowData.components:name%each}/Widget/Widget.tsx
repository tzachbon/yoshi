import React from 'react';
import {
  ExperimentsProvider,
  withExperiments,
  InjectedExperimentsProps,
} from '@wix/wix-experiments-react';
import { ExperimentsBag } from '@wix/wix-experiments';
import { TPAComponentsProvider } from 'wix-ui-tpa/TPAComponentsConfig';
import {
  BILoggerProvider,
  translate,
  InjectedTranslateProps,
} from 'yoshi-flow-editor-runtime';
import { Button } from 'wix-ui-tpa/Button';
import webBiLogger from '@wix/web-bi-logger';
import initSchemaLogger from '../../../config/bi';
import styles from './Widget.st.css';

const biLogger = initSchemaLogger(webBiLogger);

interface WidgetWrapperProps {
  appName: string;
  mobile: boolean;
  language: string;
  translations: Record<string, string>;
  experiments: ExperimentsBag;
}

type WidgetProps = InjectedExperimentsProps &
  InjectedTranslateProps &
  Pick<WidgetWrapperProps, 'appName'>;

export default class extends React.Component<WidgetWrapperProps> {
  render() {
    const { appName, experiments, mobile } = this.props;

    return (
      <BILoggerProvider logger={biLogger}>
        <ExperimentsProvider options={{ experiments }}>
          <TPAComponentsProvider value={{ mobile }}>
            <Widget appName={appName} />
          </TPAComponentsProvider>
        </ExperimentsProvider>
      </BILoggerProvider>
    );
  }
}

export const Widget = translate()(
  withExperiments<WidgetProps>(
    ({ appName, t, experiments, ...rest }: WidgetProps) => {
      return (
        <div {...styles('root', {}, rest)} data-hook="{%name%}-wrapper">
          <div className={styles.header}>
            <h2 data-hook="app-title">
              {t('app.widget.welcome')} {appName}!
            </h2>
          </div>
          {/* {This is a dummy experiment. To generate a new experiment,
            check this guide: https://github.com/wix-private/fed-handbook/blob/master/EXPERIMENTS.md#create-experiment} */}
          {experiments.enabled('specs.test.ShouldShowButton') ? (
            <Button className={styles.mainButton}>Click me</Button>
          ) : null}
        </div>
      );
    },
  ),
);
