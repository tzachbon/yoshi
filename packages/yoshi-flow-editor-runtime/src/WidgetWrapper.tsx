import React from 'react';
import {
  withStyles,
  withSentryErrorBoundary,
} from '@wix/native-components-infra';
import {
  ISantaProps,
  IHostProps,
} from '@wix/native-components-infra/dist/src/types/types';
import { IWixStatic } from '@wix/native-components-infra/dist/es/src/types/wix-sdk';
import { PublicDataProvider } from './react/PublicData/PublicDataProvider';
import { createInstances } from './createInstances';
import { ControllerProvider } from './react/Controller/ControllerProvider';
import { IControllerContext } from './react/Controller/ControllerContext';
import { SentryConfig } from './constants';
import { buildSentryOptions, getArtifact } from './utils';

declare global {
  interface Window {
    __STATICS_BASE_URL__: string;
  }
}
// TODO - improve this type or bring from controller wrapper
interface IFlowProps {
  __publicData__: Record<string, any>;
  experiments: any;
  onAppLoaded?: () => void;
  cssBaseUrl?: string;
}

interface IAppLoadedHandlerProps {
  onAppLoaded?: () => void;
  host: IHostProps;
}

class AppLoadedHandler extends React.Component<IAppLoadedHandlerProps> {
  componentDidMount() {
    if (this.props.onAppLoaded) {
      this.props.host.registerToComponentDidLayout(this.props.onAppLoaded);
    }
  }
  render() {
    return this.props.children;
  }
}

// This widget is going to be called inside entry-point wrappers
// Each widget should contain component to wrap name, so here we return a getter instead of component.
const getWidgetWrapper = (
  UserComponent: typeof React.Component,
  {
    name,
    sentry,
    Wix,
    isEditor,
  }: {
    name: string;
    sentry: SentryConfig | null;
    Wix: IWixStatic | null;
    isEditor?: boolean;
  },
) => {
  const Widget = (props: ISantaProps & IFlowProps & IControllerContext) => {
    const { __publicData__, onAppLoaded, ...widgetProps } = props;
    return (
      <AppLoadedHandler onAppLoaded={onAppLoaded} host={props.host}>
        <PublicDataProvider data={__publicData__} sdk={{ Wix }}>
          <ControllerProvider data={props}>
            <UserComponent
              {...createInstances({ experiments: props.experiments })}
              {...widgetProps}
            />
          </ControllerProvider>
        </PublicDataProvider>
      </AppLoadedHandler>
    );
  };
  const cssPath = isEditor
    ? `${name}EditorMode.css`
    : `${name}ViewerWidget.css`;

  const stylablePath = isEditor
    ? `${name}EditorMode.stylable.bundle.css`
    : `${name}ViewerWidget.stylable.bundle.css`;

  if (!sentry) {
    return withStyles(Widget, {
      cssPath: [cssPath, stylablePath],
    });
  }

  return withSentryErrorBoundary(
    withStyles(Widget, {
      cssPath: [cssPath, stylablePath],
    }),
    buildSentryOptions(sentry.DSN, 'Viewer', getArtifact()),
  );
};

export default getWidgetWrapper;
