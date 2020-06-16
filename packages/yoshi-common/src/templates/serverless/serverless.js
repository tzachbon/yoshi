const { Server } = require('yoshi-serverless');
const { FullHttpResponse } = require('@wix/serverless-api');

module.exports = functionsBuilder => {
  return functionsBuilder
    .addWebFunction('OPTIONS', '*', async (ctx, req) => {
      return new FullHttpResponse({
        status: 204,
        body: {},
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Method': '*',
          'Access-Control-Allow-Headers':
            'origin, x-requested-with, content-type, accept, x-wix-scheduler-instance, authorization',
        },
    })
    .addWebFunction('POST', '*', async (ctx, req) => {
      const server = await Server.create(ctx);
      const result = await server.handle(req);

      return result;
    })
    .addWebFunction('GET', '*', async (ctx, req) => {
      const server = await Server.create(ctx);
      const result = await server.handle(req);

      return result;
    });
};
