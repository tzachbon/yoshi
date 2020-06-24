const { Server } = require('yoshi-serverless');
const { FullHttpResponse } = require('@wix/serverless-api');

const accessControlHeaders = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Method': '*',
    'Access-Control-Allow-Headers':
      'origin, x-requested-with, content-type, accept, x-wix-scheduler-instance, authorization',
  },
};

const isDevelopment = process.env.NODE_ENV === 'development';

const addOptionsCors = (functionsBuilder) => {
  functionsBuilder.addWebFunction('OPTIONS', '*', async () => {
    return new FullHttpResponse({
      status: 204,
      body: {},
      ...(process.env.NODE_ENV === 'development' ? accessControlHeaders : {}),
    });
  });
};

module.exports = (functionsBuilder) => {
  if (isDevelopment) {
    addOptionsCors(functionsBuilder);
  }
  return functionsBuilder
    .addWebFunction('POST', '*', async (ctx, req) => {
      const server = await Server.create(ctx);
      const result = await server.handle(req);
      const webResponse = {
        body: result,
        status: 200,
        ...(isDevelopment ? accessControlHeaders : {}),
      };
      return new FullHttpResponse(webResponse);
    })
    .addWebFunction('GET', '*', async (ctx, req) => {
      const server = await Server.create(ctx);
      const result = await server.handle(req);

      const webResponse = {
        body: result,
        status: 200,
      };
      return new FullHttpResponse(webResponse);
    });
};
