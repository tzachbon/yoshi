import chalk from 'chalk';

export default function validateServerConfig(config: any) {
  if (config?.server?.command && !config.server.port) {
    console.error(
      chalk.red(
        `
        ${chalk.bold(
          `When using ${chalk.underline(
            'server.command',
          )} in jest config you must specify your port.`,
        )}

        ${chalk.underline('For example:')}

        module.exports = {
          server: {
            command: 'node dist/server.js',
            ${chalk.bold('port: 3100')},
          },
        }`,
      ),
    );
  }
}
