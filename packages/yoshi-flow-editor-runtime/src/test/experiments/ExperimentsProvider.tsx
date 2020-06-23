import React from 'react';
import { ExperimentsProvider as OriginalExperimentsProvider } from '@wix/wix-experiments-react';
import { ExperimentsBag, ExperimentsProps } from '@wix/wix-experiments';

export interface ExperimentsTestkitProviderProps {
  experiments: ExperimentsBag;
  options?: ExperimentsProps;
}

export const ExperimentsProvider: React.FC<ExperimentsTestkitProviderProps> = (
  props,
) => {
  const { experiments, ...otherProps } = props;
  return (
    <OriginalExperimentsProvider {...otherProps} options={{ experiments }}>
      {props.children}
    </OriginalExperimentsProvider>
  );
};
