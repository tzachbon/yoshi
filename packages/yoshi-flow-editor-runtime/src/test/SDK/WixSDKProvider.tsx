import React from 'react';
import { WixSdkTestKit } from '@wix/native-components-infra/dist/test/mocks/wix-sdk.testkit';
import { IWixStatic } from '@wix/native-components-infra/dist/src/types/wix-sdk';
import { WixSDKProvider as OriginalWixSDKProvider } from '../../react/SDK/WixSDKProvider';

export interface WixSDKProviderTeskitProps {
  configure?: IConfigureWixSDKTestkit;
  Wix?: IWixStatic;
}

export type IConfigureWixSDKTestkit = (testkit: WixSdkTestKit) => WixSdkTestKit;

interface WixSDKProviderState {
  testKit: WixSdkTestKit;
}

export class WixSDKProvider extends React.Component<
  WixSDKProviderTeskitProps,
  WixSDKProviderState
> {
  constructor(props: WixSDKProviderTeskitProps) {
    super(props);

    let testKit = new WixSdkTestKit();

    if (props.configure) {
      testKit = props.configure(testKit);
    }

    this.state = {
      testKit,
    };
  }
  render() {
    return (
      <OriginalWixSDKProvider Wix={this.state.testKit.Wix}>
        {this.props.children}
      </OriginalWixSDKProvider>
    );
  }
}
