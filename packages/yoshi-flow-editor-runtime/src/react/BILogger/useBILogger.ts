import { useContext } from 'react';
import { BILoggerContext, IBILoggerContext } from './BILoggerContext';

export const useBi: () => IBILoggerContext = () => {
  return useContext(BILoggerContext);
};
