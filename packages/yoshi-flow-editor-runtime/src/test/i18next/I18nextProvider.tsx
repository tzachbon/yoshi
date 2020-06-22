import React from 'react';
import { I18nextProvider as OriginalI18nextProvider } from 'react-i18next';
import { i18n } from './i18n.mock';

export const I18nextProvider = (props: any) => {
  return (
    <OriginalI18nextProvider i18n={i18n} {...props}>
      {props.children}
    </OriginalI18nextProvider>
  );
};
