import {
  SentryConfig,
  TranslationsConfig,
  DefaultTranslations,
  BiConfig,
} from 'yoshi-flow-editor-runtime/build/constants';
import t from './template';

type Opts = Record<
  'settingsWrapperPath' | 'componentFileName' | 'baseUIPath',
  string
> & {
  translationsConfig: TranslationsConfig | null;
  defaultTranslations: DefaultTranslations | null;
  sentry: SentryConfig | null;
  biConfig: BiConfig;
};

export default t<Opts>`
  import React from 'react';
  import ReactDOM from 'react-dom';
  import SettingsWrapper from '${({ settingsWrapperPath }) =>
    settingsWrapperPath}';
  import Settings from '${({ componentFileName }) => componentFileName}';
  import '${({ baseUIPath }) => baseUIPath}';

  var translationsConfig = ${({ translationsConfig }) =>
    translationsConfig ? JSON.stringify(translationsConfig) : 'null'};

  var defaultTranslations = ${({ defaultTranslations }) =>
    defaultTranslations ? JSON.stringify(defaultTranslations) : 'null'};

  var biConfig = ${({ biConfig }) =>
    biConfig ? JSON.stringify(biConfig) : '{}'};

  var sentry = ${({ sentry }) =>
    sentry
      ? `{
      DSN: '${sentry.DSN}',
      id: '${sentry.id}',
      projectName: '${sentry.projectName}',
      teamName: '${sentry.teamName}',
    }`
      : 'null'};

  ReactDOM.render(React.createElement(SettingsWrapper(Settings, sentry, translationsConfig), null), document.getElementById('root'));
`;
