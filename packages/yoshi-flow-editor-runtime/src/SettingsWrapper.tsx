import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import SentryGlobal from '@sentry/browser';
import { IWixStatic } from '@wix/native-components-infra/dist/src/types/wix-sdk';
import { PublicDataProvider } from './react/PublicData/PublicDataProvider';
import { ErrorBoundary } from './react/ErrorBoundary';
import { getEditorParams } from './utils';
import i18n, { getLanguageWithInstance } from './i18next';
import { SDKProvider } from './react/SDK/SDKProvider';
import { SDK } from './react/SDK/SDKRenderProp';
import { IWixSDKEditorEnvironmentContext } from './react/SDK/SDKContext';
import { SentryConfig, TranslationsConfig } from './constants';

interface SettingsWrapperProps {
  __publicData__: Record<string, any>;
}

declare global {
  interface Window {
    Sentry: typeof SentryGlobal;
  }
}

const WithTranslations: React.FC<{
  translationsConfig: TranslationsConfig | null;
  Wix: IWixStatic;
}> = ({ children, Wix, translationsConfig }) => {
  return translationsConfig ? (
    <I18nextProvider
      i18n={i18n({
        language: getLanguageWithInstance(Wix),
        waitForReact: true,
      })}
    >
      {children}
    </I18nextProvider>
  ) : (
    (children as React.ReactElement)
  );
};

const SettingsWrapper = (
  UserComponent: typeof React.Component,
  sentry: SentryConfig | null,
  translationsConfig: TranslationsConfig | null,
) => (props: SettingsWrapperProps) => {
  const { editorSDKSrc } = getEditorParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SDKProvider editorSDKSrc={editorSDKSrc}>
        <SDK editorSDKSrc={editorSDKSrc}>
          {(sdk) => {
            if (!sentry) {
              return (
                <ErrorBoundary handleException={(err) => console.log(err)}>
                  <WithTranslations
                    translationsConfig={translationsConfig}
                    Wix={(sdk as IWixSDKEditorEnvironmentContext).Wix}
                  >
                    <PublicDataProvider sdk={sdk} data={props.__publicData__}>
                      <UserComponent />
                    </PublicDataProvider>
                  </WithTranslations>
                </ErrorBoundary>
              );
            }
            return (
              <ErrorBoundary
                handleException={window.Sentry.captureException}
                configure={() => {
                  window.Sentry.init({ environment: 'Editor' });

                  const Wix = sdk
                    ? (sdk as IWixSDKEditorEnvironmentContext).Wix
                    : null;
                  if (Wix) {
                    window.Sentry.configureScope((scope) => {
                      scope.setTag(
                        'msid',
                        Wix.Utils.getInstanceValue('metaSiteId'),
                      );
                      scope.setUser({
                        id: Wix.Utils.getInstanceValue('uid'),
                      });
                    });
                  }
                }}
              >
                <WithTranslations
                  translationsConfig={translationsConfig}
                  Wix={(sdk as IWixSDKEditorEnvironmentContext).Wix}
                >
                  <PublicDataProvider sdk={sdk} data={props.__publicData__}>
                    <UserComponent />
                  </PublicDataProvider>
                </WithTranslations>
              </ErrorBoundary>
            );
          }}
        </SDK>
      </SDKProvider>
    </Suspense>
  );
};

export default SettingsWrapper;
