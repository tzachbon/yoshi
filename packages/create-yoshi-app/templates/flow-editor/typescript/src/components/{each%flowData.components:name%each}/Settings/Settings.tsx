import React from 'react';
import { IWixStatic } from '@wix/native-components-infra/dist/src/types/wix-sdk';
import { ExperimentsProvider } from '@wix/wix-experiments-react';
import { WixSDK } from 'yoshi-flow-editor-runtime';

import {
  TpaSettingsProvider,
  SettingsContext,
} from '@wix/tpa-settings/dist/src/contexts';
import { SettingsTabLayout } from '@wix/tpa-settings/dist/src/components';

// Replace this line with real schema initializer
import { experiments as experimentsConfig } from '../../../../.application.json';

import './Settings.global.scss';

import { MainTab } from './Tabs/MainTab';
import { DesignTab } from './Tabs/DesignTab';

interface ISettingsProps {
  Wix: IWixStatic;
}

export const Settings: React.FC<ISettingsProps> = (props) => {
  return (
    <SettingsContext.Consumer>
      {(settings) => (
        <SettingsTabLayout dataHook="settings-tabs" Wix={props.Wix}>
          <SettingsTabLayout.Tab
            title="Main"
            dataHook="main-tab-button"
            articleId="xxx-xxx-xxx-xxx"
            Component={() => <MainTab />}
          />
          <SettingsTabLayout.Tab
            title="Design"
            dataHook="design-tab-button"
            articleId="xxx-xxx-xxx-xxx"
            Component={() => <DesignTab />}
          />
        </SettingsTabLayout>
      )}
    </SettingsContext.Consumer>
  );
};

export default () => (
  <ExperimentsProvider options={{ scope: experimentsConfig.scope }}>
    <WixSDK isEditor>
      {({ Wix }) => (
        <TpaSettingsProvider Wix={Wix}>
          <Settings Wix={Wix} />
        </TpaSettingsProvider>
      )}
    </WixSDK>
  </ExperimentsProvider>
);
