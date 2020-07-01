const { bootstrapServer } = require('./environment');

(async () => {
  const app = bootstrapServer();
  await app.start();
})();
