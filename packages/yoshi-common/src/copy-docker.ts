import path from 'path';
import fs from 'fs-extra';
import {
  DOCKER_FILE,
  DOCKER_IGNORE,
  TEMPLATES,
} from 'yoshi-config/build/paths';
import { Config } from 'yoshi-config/build/config';
import { replaceTemplates } from './utils/template-utils';

export default async function (config: Config, cwd = process.cwd()) {
  if (!config.yoshiServer) {
    return;
  }

  const dockerDestinationPath = path.resolve(cwd, DOCKER_FILE);
  const projectDockerExists = fs.existsSync(dockerDestinationPath);
  if (!projectDockerExists) {
    const dockerFilePath = path.resolve(
      __dirname,
      `./templates/${DOCKER_FILE}`,
    );

    fs.copyFileSync(dockerFilePath, dockerDestinationPath);
    const dockerFileContent = fs.readFileSync(dockerDestinationPath, 'utf-8');
    const author = config.pkgJson.author;
    let name: string;
    let email: string;
    if (typeof author === 'object') {
      name = author.name;
      email = author.email || '';
    } else {
      name = author || '';
      email = author || '';
    }
    const transformedContent = replaceTemplates(
      dockerFileContent,
      {
        authorEmail: email,
        authorName: name,
      },
      { graceful: false },
    );
    fs.outputFileSync(dockerDestinationPath, transformedContent);
  }

  const dockerignoreDestinationPath = path.resolve(cwd, DOCKER_IGNORE);
  const projectDockerignoreExists = fs.existsSync(dockerignoreDestinationPath);
  if (!projectDockerignoreExists) {
    const dockerIgnore = ['node_modules', 'target'];
    fs.writeFileSync(dockerignoreDestinationPath, dockerIgnore.join('\n'));
  }
  // a templates folder is mandatory in case of a Docker
  // (docker task will fail in case there's no such folder)
  const templatesFolderPath = path.resolve(cwd, TEMPLATES);
  fs.ensureDirSync(templatesFolderPath);
}
