import path from 'path';
import chalk from 'chalk';
import { isInsideGitRepo } from './utils';

export default function verifyServerlessParentDir(workingDir: string) {
  const hasServerlessAsParentDir =
    path.resolve(workingDir, '..') === 'serverless';

  if (!hasServerlessAsParentDir && isInsideGitRepo(workingDir)) {
    console.error(
      chalk.red(`
    Invalid file structure.
    Serverless parent directory name must be ${chalk.bold('serverless')}

    Example:
    ${chalk.underline.bold('{GitHub Repo}')} / ${chalk.bold(
        'serverless ',
      )}/ {your-scope} / serverless.js
    ${chalk.underline.bold('{GitHub Repo}')} / ${chalk.bold(
        'serverless ',
      )}/ {your-scope} / {any folder} / *.* (can be deep tree)
    ${chalk.underline.bold('{GitHub Repo}')} / ${chalk.bold(
        'serverless ',
      )}/ {your-scope} /  *.*

    // tests to run
    ${chalk.underline.bold('{GitHub Repo}')} / ${chalk.bold(
        'serverless ',
      )}/ {your-scope} / *.spec.*

    Read more:
    https://github.com/wix-platform/wix-serverless#project-structure
    `),
    );

    process.exit(1);
  }
}
