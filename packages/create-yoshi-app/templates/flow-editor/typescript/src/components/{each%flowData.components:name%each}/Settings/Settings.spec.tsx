import React from 'react';
import {
  render,
  screen,
  waitForElement,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {
  I18nextProvider,
  WixSDKProvider,
  IConfigureWixSDKTestkit,
} from 'yoshi-flow-editor-runtime/test';
import Settings from './Settings';

describe('Settings', () => {
  const configureWixStatic: IConfigureWixSDKTestkit = (wix) => {
    wix.with.styleParams({});
    wix.with.siteColors([
      { name: 'color_13', value: '#C7C7C7', reference: 'color-3' },
      { name: 'color_15', value: '#000000', reference: 'color-5' },
    ]);
    return wix;
  };

  it('should render tabs', async () => {
    render(
      <I18nextProvider>
        <WixSDKProvider configure={configureWixStatic}>
          <Settings />
        </WixSDKProvider>
      </I18nextProvider>,
    );

    await waitForElement(() => screen.getByTestId('settings-tabs'));

    expect(await screen.findByTestId('main-tab')).toBeInTheDocument();
  });

  it('should go to the design tab', async () => {
    render(
      <I18nextProvider>
        <WixSDKProvider configure={configureWixStatic}>
          <Settings />
        </WixSDKProvider>
      </I18nextProvider>,
    );

    await waitForElement(() => screen.getByTestId('settings-tabs'));

    fireEvent.click(await screen.findByTestId('design-tab-button'));

    expect(
      await screen.findByTestId('design-tab-color-picker'),
    ).toBeInTheDocument();
  });
});
