import { expect } from 'chai';
import axios from 'axios';
import { app } from '@wix/serverless-testkit';

describe('{%projectName%}', () => {
  const scope = '{%projectName%}';
  const testkit = app(scope);

  testkit.beforeAndAfter(10000);

  it('should say hello', async () => {
    const result = await axios.get(testkit.getUrl('/say-hi'));
    expect(result.data).to.deep.equal(`{%projectName%}`);
  });
});
