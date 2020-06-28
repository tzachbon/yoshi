import Scripts from '../../../scripts';

const scripts = Scripts.setupProjectFromTemplate({
  templateDir: __dirname,
  projectType: 'typescript',
});

jest.setTimeout(40000);

describe.each(['dev'] as const)('e2e [%s]', (mode) => {
  it('run tests', async () => {
    await scripts[mode](async () => {
      const warnMessage =
        'Request failed or not found. url: http://localhost:3100/fake-url, status code: 404, method: GET';

      try {
        await scripts.test(mode);
      } catch (e) {
        expect(e.message.includes(warnMessage)).toBe(true);
      }
    });
  });
});
