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
      { name: 'color_1', value: '#FFFFFF', reference: 'white/black' },
      { name: 'color_2', value: '#000000', reference: 'black/white' },
      { name: 'color_3', value: '#ED1C24', reference: 'primery-1' },
      { name: 'color_4', value: '#0088CB', reference: 'primery-2' },
      { name: 'color_5', value: '#FFCB05', reference: 'primery-3' },
      { name: 'color_11', value: '#FFFFFF', reference: 'color-1' },
      { name: 'color_12', value: '#E8E6E6', reference: 'color-2' },
      { name: 'color_13', value: '#C7C7C7', reference: 'color-3' },
      { name: 'color_14', value: '#999997', reference: 'color-4' },
      { name: 'color_15', value: '#000000', reference: 'color-5' },
      { name: 'color_16', value: '#B5BCF0', reference: 'color-6' },
      { name: 'color_17', value: '#8F98E2', reference: 'color-7' },
      { name: 'color_18', value: '#384AD3', reference: 'color-8' },
      { name: 'color_19', value: '#25318D', reference: 'color-9' },
      { name: 'color_20', value: '#131946', reference: 'color-10' },
      { name: 'color_21', value: '#F9C5B4', reference: 'color-11' },
      { name: 'color_22', value: '#F3A78F', reference: 'color-12' },
      { name: 'color_23', value: '#ED5829', reference: 'color-13' },
      { name: 'color_24', value: '#9E3B1B', reference: 'color-14' },
      { name: 'color_25', value: '#4F1D0E', reference: 'color-15' },
      { name: 'color_26', value: '#D2ACF7', reference: 'color-16' },
      { name: 'color_27', value: '#BA83F0', reference: 'color-17' },
      { name: 'color_28', value: '#8015E8', reference: 'color-18' },
      { name: 'color_29', value: '#550E9B', reference: 'color-19' },
      { name: 'color_30', value: '#2B074D', reference: 'color-20' },
      { name: 'color_31', value: '#B1D3BB', reference: 'color-21' },
      { name: 'color_32', value: '#7FA88B', reference: 'color-22' },
      { name: 'color_33', value: '#407C51', reference: 'color-23' },
      { name: 'color_34', value: '#2B5336', reference: 'color-24' },
      { name: 'color_35', value: '#15291B', reference: 'color-25' },
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
