const { app } = require('@wix/serverless-testkit');

const scope = 'kitchensink-0-0-0';

// start the server as an embedded app
module.exports.bootstrapServer = () => {
  return app(scope, { appPort: process.env.SERVERLESS_PORT });
};
