const path = require('path');
const execa = require('execa');
const chalk = require('chalk');
const prompts = require('prompts');
const pkg = require('../package.json');

const lernaPath = path.resolve(__dirname, '../node_modules/.bin/lerna');

// resets the console
process.stdout.write('\x1Bc');

console.log(chalk.underline(`starting the release process for ${pkg.name}`));
console.log();

Promise.resolve()
  // Ask to create changelog
  .then(() =>
    prompts({
      type: 'confirm',
      name: 'value',
      initial: true,
      message: 'Did you remember to update changelog with the new version?',
    }),
  )
  .then(({ value }) => {
    if (!value) {
      console.log();
      console.log(chalk.cyan('So do it now 👇'));
      console.log();
      console.log(path.resolve(__dirname, '../CHANGELOG.md'));
      console.log();
      console.log(chalk.red('Release aborted'));

      process.exit(1);
    }
  })
  // Create new tag/bump versions in `package.json` files
  .then(() => {
    execa.sync(`${lernaPath} version --exact --no-push`, {
      stdio: 'inherit',
      shell: true,
    });
  })
  .then(() => {
    console.log();
    console.log(chalk.green('Release was created locally'));
    console.log();
    console.log('Please push your changes to origin');
    console.log();
    console.log(chalk.cyan('git push --follow-tags'));
    console.log();
    console.log('Head over to the CI and wait for yoshi build to pass 👇');
    console.log();
    console.log(
      chalk.cyan(
        'http://ci.dev.wix/viewType.html?buildTypeId=Wix_Angular_WixHaste_HastePresetYoshi',
      ),
    );
  })
  .catch((error) => {
    console.log(chalk.red('Version release failed.'));
    console.log(chalk.red(error.stack));
    console.log();

    process.exit(1);
  });
