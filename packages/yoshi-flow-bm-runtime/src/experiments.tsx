import React, { FC } from 'react';
import { ExperimentsProvider } from '@wix/wix-experiments-react';

export { useExperiments } from '@wix/wix-experiments-react';

export function createExperimentsProvider(experimentsScopes: Array<string>) {
  const Provider: FC = ({ children }) => (
    <ExperimentsProvider scope={experimentsScopes}>
      {children}
    </ExperimentsProvider>
  );

  return Provider;
}
