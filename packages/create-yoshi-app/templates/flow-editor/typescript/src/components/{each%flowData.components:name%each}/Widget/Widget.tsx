import React from 'react';
import {
  withExperiments,
  translate,
  InjectedExperimentsProps,
  InjectedTranslateProps,
} from 'yoshi-flow-editor-runtime';
import { Button } from 'wix-ui-tpa/Button';
import styles from './Widget.st.css';

interface ControllerProps {
  greetingsText: string;
}

type WidgetProps = InjectedExperimentsProps &
  InjectedTranslateProps &
  ControllerProps;

export default translate()(
  withExperiments<WidgetProps>(({ t, experiments, greetingsText, ...rest }) => {
    return (
      <div {...styles('root', {}, rest)} data-hook="{%name%}-wrapper">
        <div className={styles.header}>
          <h2 data-hook="app-title">
            {t('app.widget.welcome')} {greetingsText}!
          </h2>
        </div>
        {/* {This is a dummy experiment. To generate a new experiment,
            check this guide: https://github.com/wix-private/fed-handbook/blob/master/EXPERIMENTS.md#create-experiment} */}
        {experiments.enabled('specs.test.ShouldHideButton') ? null : (
          <Button className={styles.mainButton}>Click me</Button>
        )}
      </div>
    );
  }),
);
