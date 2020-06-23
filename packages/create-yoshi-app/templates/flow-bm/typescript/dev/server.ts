import { environment } from './environment';

(async () => {
  const testkit = await environment();
  await testkit.start();

  process.on('SIGINT', () => testkit.stop());
  process.on('exit', () => testkit.stop());
})();
