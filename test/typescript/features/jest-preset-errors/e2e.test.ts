import Scripts from '../../../scripts';

const scripts = Scripts.setupProjectFromTemplate({
  templateDir: __dirname,
  projectType: 'typescript',
});

jest.setTimeout(40000);

describe.each(['dev'] as const)('show browser errors in terminal', (mode) => {
  it('run tests', async () => {
    await scripts[mode](async () => {
      const warnMessage =
        'Request failed or not found. url: http://localhost:3100/fake-url, status code: 404, method: GET';

      try {
        await scripts.test(mode);
      } catch (e) {
        expect(e.message).toMatch(warnMessage);
      }
    });
  });
});
