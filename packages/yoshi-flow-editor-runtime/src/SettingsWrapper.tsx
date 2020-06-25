import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ExperimentsProvider } from '@wix/wix-experiments-react';
import SentryGlobal from '@sentry/browser';
import { PublicDataProvider } from './react/PublicData/PublicDataProvider';
import { ErrorBoundary } from './react/ErrorBoundary';
import { getEditorParams } from './utils';
import i18n, { getLanguageWithInstance } from './i18next';
import { SDKProvider } from './react/SDK/SDKProvider';
import { SDK } from './react/SDK/SDKRenderProp';
import { WithProviders, ProvidersList } from './react/utils';
import { IEditorSDKContext, IWixSDKContext } from './react/SDK/SDKContext';
import {
  SentryConfig,
  TranslationsConfig,
  ExperimentsConfig,
  DefaultTranslations,
} from './constants';

interface SettingsWrapperProps {
  __publicData__: Record<string, any>;
}

declare global {
  interface Window {
    Sentry: typeof SentryGlobal;
  }
}

const SettingsWrapper = (
  UserComponent: typeof React.Component,
  {
    sentry,
    translationsConfig,
    defaultTranslations,
    experimentsConfig,
  }: {
    sentry: SentryConfig | null;
    translationsConfig: TranslationsConfig | null;
    defaultTranslations: DefaultTranslations | null;
    experimentsConfig: ExperimentsConfig | null;
  },
) => (props: SettingsWrapperProps) => {
  const { editorSDKSrc } = getEditorParams();

  const availableProviders: ProvidersList<{
    sdk: IEditorSDKContext | IWixSDKContext;
  }> = [
    (children, additionalProps) => (
      <PublicDataProvider sdk={additionalProps.sdk} data={props.__publicData__}>
        {children}
      </PublicDataProvider>
    ),
  ];

  if (translationsConfig) {
    availableProviders.push((children, additionalProps) => {
      const { Wix } = additionalProps.sdk as IWixSDKContext;
      return Wix ? (
        <I18nextProvider
          i18n={i18n({
            language: getLanguageWithInstance(Wix),
            defaultLanguage: translationsConfig.default,
            defaultTranslations,
            prefix: translationsConfig.prefix,
            waitForReact: true,
          })}
        >
          {children}
        </I18nextProvider>
      ) : (
        // TODO: Handle translations provider for app builder components
        children
      );
    });
  }

  if (experimentsConfig) {
    availableProviders.push((children, additionalProps) => {
      const { Wix } = additionalProps.sdk as IWixSDKContext;
      return Wix ? (
        <ExperimentsProvider options={{ scope: experimentsConfig.scope }}>
          {children}
        </ExperimentsProvider>
      ) : (
        // TODO: Handle translations provider for app builder components
        children
      );
    });
  }

  if (sentry) {
    availableProviders.push((children, additionalProps) => {
      const { Wix } = additionalProps.sdk as IWixSDKContext;

      return (
        <ErrorBoundary
          handleException={window.Sentry.captureException}
          configure={() => {
            window.Sentry.init({ environment: 'Editor' });
            if (Wix) {
              window.Sentry.configureScope((scope) => {
                scope.setTag('msid', Wix.Utils.getInstanceValue('metaSiteId'));
                scope.setUser({
                  id: Wix.Utils.getInstanceValue('uid'),
                });
              });
            }
          }}
        >
          {children}
        </ErrorBoundary>
      );
    });
  } else {
    availableProviders.push((childen) => (
      <ErrorBoundary handleException={(err) => console.log(err)}>
        {childen}
      </ErrorBoundary>
    ));
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SDKProvider editorSDKSrc={editorSDKSrc}>
        <SDK editorSDKSrc={editorSDKSrc}>
          {(sdk) => {
            return (
              <WithProviders
                providers={availableProviders}
                additionalProps={{ sdk }}
              >
                <UserComponent />
              </WithProviders>
            );
          }}
        </SDK>
      </SDKProvider>
    </Suspense>
  );
};

export default SettingsWrapper;
