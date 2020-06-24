import React from 'react';
import { Composites, RichText } from '@wix/wix-base-ui';

export const MainTab: React.FC = () => {
  return (
    <div data-hook="main-tab">
      <Composites.RichText>
        <RichText>
          This is the example of Settings Panel for the simple Weather Widget.
          Feel free to clean up sources and develop your own. More details
          documentation about how to work with the Settings Panel at{' '}
          <a href="https://github.com/wix-private/tpa-settings">
            tpa-settings docs
          </a>
          .<br />
          Example app:
          <a href="https://artemb18.wixsite.com/tpa-settings-app">
            Weather App
          </a>
        </RichText>
      </Composites.RichText>
    </div>
  );
};
