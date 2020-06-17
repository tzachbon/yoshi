import Scripts from '../../../../scripts';

const scripts = Scripts.setupProjectFromTemplate({
  templateDir: __dirname,
  projectType: 'typescript',
});

describe.each(['prod', 'dev'] as const)(
  'web-worker split chunks [%s]',
  (mode) => {
    it('integration', async () => {
      await scripts[mode](async () => {
        await page.goto(scripts.serverUrl);
        await page.waitForFunction(
          `document.querySelector('h1').innerText === '[{"a":5},{"a":7}]'`,
        );
      });
    });
  },
);
