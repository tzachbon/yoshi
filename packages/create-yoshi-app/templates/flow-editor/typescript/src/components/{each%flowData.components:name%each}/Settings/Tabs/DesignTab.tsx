import React from 'react';
import {
  SectionHeader,
  OpacityColorPicker,
  FontAndColorPicker,
} from '@wix/tpa-settings/dist/src/components';

import { Divider, Composites, TextLabel, TextInput } from '@wix/wix-base-ui';

import {
  StylesConsumer,
  SettingsConsumer,
} from '@wix/tpa-settings/dist/src/contexts';

import { componentStyles } from '../../componentStyles';
import { componentSettings } from '../../componentSettings';

export const DesignTab: React.FC = () => {
  return (
    <>
      <StylesConsumer>
        {(styles) => (
          <>
            <SectionHeader text="Styles preferences" />
            <OpacityColorPicker
              title="Background Color"
              dataHook="design-tab-color-picker"
              value={styles.get(componentStyles.backgroundColor)}
              onChange={(value) => {
                styles.set(componentStyles.backgroundColor, value);
              }}
            />

            <Divider />

            <FontAndColorPicker
              title="Font settings"
              panelTitle="Choose your font"
              value={{
                color: styles.get(componentStyles.textColor),
                font: styles.get(componentStyles.textFont),
              }}
              onColorChange={(value) =>
                styles.set(componentStyles.textColor, value)
              }
              onFontChange={(value) =>
                styles.set(componentStyles.textFont, value)
              }
              fontPickerOptions={{
                fontMinSize: 12,
                fontMaxSize: 60,
              }}
            />
          </>
        )}
      </StylesConsumer>
      <SettingsConsumer>
        {(settings) => (
          <>
            <SectionHeader text="Settings preferences" />
            <Composites.TextInputLabeled>
              <TextLabel value="Greetings Text" />
              <TextInput
                value={settings.get(componentSettings.greetingsText)}
                placeholder="Enter loading text"
                onChange={(value: string) => {
                  settings.set(componentSettings.greetingsText, value);
                }}
              />
            </Composites.TextInputLabeled>
          </>
        )}
      </SettingsConsumer>
    </>
  );
};
