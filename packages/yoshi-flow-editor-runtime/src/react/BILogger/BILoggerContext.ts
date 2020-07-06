import { createContext } from 'react';
import { OwnerLogger, VisitorLogger } from '../../generated/bi-logger-types';

export type IBILoggerContext = OwnerLogger | VisitorLogger;

export type IOwnerBILoggerContext = OwnerLogger;

export type IVisitorBILoggerContext = VisitorLogger;

export const BILoggerContext: React.Context<IBILoggerContext> = createContext<
  IBILoggerContext
>({} as any);
