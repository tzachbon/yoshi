import React from 'react';

export type ProvidersList<P = Record<string, any>> = Array<
  (children: React.ReactElement, additionalProps: P) => React.ReactElement
>;

export const WithProviders: React.FC<{
  // TODO: Move to Class to use provider arg according to the additionalProps value.
  providers: ProvidersList<any>;
  children: React.ReactElement;
  additionalProps?: Record<string, any>;
}> = ({ providers, children, additionalProps }) => {
  return providers.reduce((child, getProvider) => {
    return getProvider(child, additionalProps || {});
  }, children);
};
