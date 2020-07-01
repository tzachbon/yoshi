import Scripts from '../../../scripts';

const scripts = Scripts.setupProjectFromTemplate({
  templateDir: __dirname,
  projectType: 'typescript',
});

jest.setTimeout(35000);

describe.each(['prod', 'dev'] as const)('e2e [%s]', (mode) => {
  it('run tests', async () => {
    await scripts[mode](async () => {
      try {
        await scripts.test(mode);
      } catch (error) {
        const errorMessage = error.message.split('\n').splice(3).join('\n');
        expect(errorMessage).toMatchSnapshot();
      }
      expect.assertions(1);
    });
  });
});
