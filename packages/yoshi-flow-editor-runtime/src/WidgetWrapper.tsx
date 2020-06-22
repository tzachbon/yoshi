import React from 'react';
import {
  withStyles,
  withSentryErrorBoundary,
} from '@wix/native-components-infra';
import {
  ISantaProps,
  IHostProps,
} from '@wix/native-components-infra/dist/src/types/types';
import { I18nextProvider } from 'react-i18next';
import { IWixStatic } from '@wix/native-components-infra/dist/es/src/types/wix-sdk';
import i18n from './i18next';
import { PublicDataProvider } from './react/PublicData/PublicDataProvider';
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
  _language: any;
  _translations: any;
  _enabledHOCs: {
    translations: boolean;
  };
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
    const {
      __publicData__,
      _language,
      _translations,
      _enabledHOCs,
      onAppLoaded,
      ...widgetProps
    } = props;

    // TODO: Make a better approach for enabled hocs to not copy children for each variation
    return (
      <AppLoadedHandler onAppLoaded={onAppLoaded} host={props.host}>
        <PublicDataProvider data={__publicData__} sdk={{ Wix }}>
          <ControllerProvider data={props}>
            {_enabledHOCs.translations ? (
              <I18nextProvider
                i18n={i18n({
                  language: _language,
                  translations: _translations,
                })}
              >
                <UserComponent {...widgetProps} />
              </I18nextProvider>
            ) : (
              <UserComponent {...widgetProps} />
            )}
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
