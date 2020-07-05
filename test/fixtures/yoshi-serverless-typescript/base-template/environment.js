const { app } = require('@wix/serverless-testkit');
const { getServerlessScope } = require('yoshi-helpers/build/utils');

const scope = getServerlessScope();

// start the server as an embedded app
module.exports.bootstrapServer = () => {
  return app(scope, { appPort: process.env.SERVERLESS_PORT });
};
