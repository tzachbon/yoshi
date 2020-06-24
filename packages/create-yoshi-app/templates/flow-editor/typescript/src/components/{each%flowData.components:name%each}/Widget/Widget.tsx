import React from 'react';
import {
  BILoggerProvider,
  withExperiments,
  translate,
  InjectedExperimentsProps,
  InjectedTranslateProps,
} from 'yoshi-flow-editor-runtime';
import { Button } from 'wix-ui-tpa/Button';
import webBiLogger from '@wix/web-bi-logger';
import initSchemaLogger from '../../../config/bi';
import styles from './Widget.st.css';

const biLogger = initSchemaLogger(webBiLogger);

interface WidgetWrapperProps {
  appName: string;
  greetingsText: string;
}

type WidgetProps = InjectedExperimentsProps &
  InjectedTranslateProps &
  WidgetWrapperProps;

export default class extends React.Component<WidgetWrapperProps> {
  render() {
    const { appName, greetingsText } = this.props;

    return (
      <BILoggerProvider logger={biLogger}>
        <Widget appName={appName} greetingsText={greetingsText} />
      </BILoggerProvider>
    );
  }
}

export const Widget = translate()(
  withExperiments<WidgetProps>(
    ({ appName, t, experiments, greetingsText, ...rest }: WidgetProps) => {
      return (
        <div {...styles('root', {}, rest)} data-hook="widget0-wrapper">
          <div className={styles.header}>
            <h2 data-hook="app-title">
              {t('app.widget.welcome')} {greetingsText} {appName}!
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
