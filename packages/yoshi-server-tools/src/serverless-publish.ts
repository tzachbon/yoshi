import path from 'path';
import simpleGit from 'simple-git';
import fs from 'fs-extra';
import { Config } from 'yoshi-config/build/config';
import { getServerlessScope } from 'yoshi-helpers/build/utils';

export default async function publishServerless(config: Config) {
  if (!config.yoshiServer || !process.env.EXPERIMENTAL_YOSHI_SERVERLESS) {
    return;
  }
  console.log('Publishing to Serverless');
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve('package.json'), 'utf-8'),
  );

  const ambassadorRegex = /@wix\/ambassador-.+/;
  const dependencies = Object.keys(packageJson.dependencies).reduce(
    (acc, key) => {
      if (ambassadorRegex.test(key)) {
        return { ...acc, [key]: packageJson.dependencies[key] };
      }
      return acc;
    },
    {},
  );

  console.log('Deploy command:');
  console.log(`deploy #serverless ${getServerlessScope()}`);
  const git = simpleGit(__dirname);

  await git.clone(
    'git@github.com:wix-a/yoshi-serverless.git',
    path.resolve('temp'),
  );

  fs.copySync(path.resolve('serverless'), path.resolve('temp/serverless'));
  if (Object.keys(dependencies).length) {
    fs.writeFileSync(
      path.resolve(`temp/serverless/${getServerlessScope()}/package.json`),
      JSON.stringify({ dependencies }, null, 2),
    );
  }
  await git.cwd(path.resolve('temp'));
  await git.add('serverless/*');
  await git.commit(`deploy #serverless ${getServerlessScope()}`, '--no-verify');
  await git.push('origin', 'master');
  console.log('Publish to Serverless complete');
}
