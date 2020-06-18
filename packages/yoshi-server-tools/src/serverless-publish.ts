import path from 'path';
import simpleGit from 'simple-git';
import fs from 'fs-extra';
import { Config } from 'yoshi-config/build/config';
import { getServerlessScope } from 'yoshi-helpers/build/utils';

export default async function publishServerless(config: Config) {
  console.log('Publishing to Serverless');
  if (!config.yoshiServer || !process.env.EXPERIMENTAL_YOSHI_SERVERLESS) {
    return;
  }
  console.log('Deploy command:');
  console.log(`deploy #serverless ${getServerlessScope()}`);
  const git = simpleGit(__dirname);

  await git.clone(
    'git@github.com:wix-a/yoshi-serverless.git',
    path.resolve('temp'),
  );

  fs.copySync(path.resolve('serverless'), path.resolve('temp/serverless'));
  await git.cwd(path.resolve('temp'));
  await git.add('serverless/*');
  await git.commit(`deploy #serverless ${getServerlessScope()}`, '--no-verify');
  await git.push('origin', 'master');
  console.log('Publish to Serverless complete');
}
