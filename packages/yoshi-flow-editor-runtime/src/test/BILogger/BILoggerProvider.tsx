import React from 'react';
import { BILoggerProvider as OriginalIBILoggerProvider } from '../../react/BILogger/BILoggerProvider';
import { VisitorLogger, OwnerLogger } from '../../generated/bi-logger-types';

interface IBILoggerProviderTestkitProps {
  logger: Record<string, any>;
  children: React.Component | React.ReactElement;
}

export const BILoggerProvider = (props: IBILoggerProviderTestkitProps) => {
  const { logger, ...userProps } = props;
  return (
    <OriginalIBILoggerProvider
      logger={logger as VisitorLogger | OwnerLogger}
      {...userProps}
    >
      {userProps.children}
    </OriginalIBILoggerProvider>
  );
};
