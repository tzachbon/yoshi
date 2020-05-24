const { bootstrapServer } = require('yoshi-server');
const { environment } = require('./environment');

// The purpose of this file is to start your server and possibly additional servers
// like RPC/Petri servers.
//
// Because tests are running in parallel, it should start a different server on a different port
// for every test file (E2E and server tests).
//
// By attaching the server object (testkit result) on `globalObject` it will be available to every
// test file globally by that name.
module.exports = {
  bootstrap: {
    setup: async ({ globalObject }) => {
      const { bmApp } = await environment({ withRandomPorts: true });
      const app = bootstrapServer();
      await app.start();
      await bmApp.start();
      globalObject.testKitBMApp = bmApp;
      globalObject.testKitApp = app;
      // in tests we can just await testKitBMApp.getUrl();
    },
    teardown: async ({ globalObject }) => {
      // take the env we created at setup() and stop it
      if (globalObject.testKitBMApp) {
        await globalObject.testKitBMApp.stop();
        await globalObject.testKitApp.stop();
      }
    },
  },
  puppeteer: {
    // launch options: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
    // debugging tips: https://github.com/GoogleChrome/puppeteer#debugging-tips
    devtools: false,
  },
};
