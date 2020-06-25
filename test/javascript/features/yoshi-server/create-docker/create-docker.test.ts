import path from 'path';
import fs from 'fs-extra';
import Scripts from '../../../../scripts';
import {
  DOCKER_FILE,
  DOCKER_IGNORE,
  TEMPLATES,
} from '../../../../../packages/yoshi-config/build/paths';

const scripts = Scripts.setupProjectFromTemplate({
  templateDir: __dirname,
  projectType: 'yoshi-server-javascript',
});

describe.each(['prod'] as const)('docker [%s]', (mode) => {
  it('should create a docker file', async () => {
    await scripts[mode](async () => {
      const dockerContent = fs.readFileSync(
        path.join(scripts.testDirectory, DOCKER_FILE),
        'utf-8',
      );
      expect(dockerContent).toMatchSnapshot();
    });
  });
});

describe.each(['prod'] as const)('.dockerignore [%s]', (mode) => {
  it('should create a .dockerignore file', async () => {
    await scripts[mode](async () => {
      const dockerignoreContent = fs.readFileSync(
        path.join(scripts.testDirectory, DOCKER_IGNORE),
        'utf-8',
      );
      expect(dockerignoreContent).toMatchSnapshot();
    });
  });
});

describe.each(['prod'] as const)('templates folder [%s]', (mode) => {
  it('should create a templates folder', async () => {
    await scripts[mode](async () => {
      const templateDir = fs.readdirSync(
        path.join(scripts.testDirectory, TEMPLATES),
        'utf-8',
      );
      expect(templateDir).toMatchSnapshot();
    });
  });
});
