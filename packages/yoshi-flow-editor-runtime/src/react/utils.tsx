import React from 'react';

export type ProvidersList = Array<
  (children: React.ReactElement) => React.ReactElement
>;

export const WithProviders: React.FC<{
  providers: ProvidersList;
  children: React.ReactElement;
}> = ({ providers, children }) => {
  return providers.reduce((child, getProvider) => {
    return getProvider(child);
  }, children);
};
