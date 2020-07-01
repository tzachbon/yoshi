import { FunctionsBuilder } from '@wix/serverless-api';

export const serverlessEntry = (functionsBuilder: FunctionsBuilder) => {
  return functionsBuilder.addWebFunction(
    'GET',
    '/say-hi',
    async () => `{%projectName%}`,
  );
};
