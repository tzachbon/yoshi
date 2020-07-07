const { bootstrap } = require('yoshi-serverless-testing');

(async () => {
  const app = bootstrap();
  await app.start();
})();
