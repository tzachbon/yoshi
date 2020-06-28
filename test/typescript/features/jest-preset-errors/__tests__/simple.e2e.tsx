it('should pass', async () => {
  const waitForRequest = () =>
    new Promise((res, rej) => {
      const timeout = setTimeout(rej, 5000);

      page.on('requestfinished', (req) => {
        if (req.url().includes('fake-url')) {
          clearTimeout(timeout);
          rej(req.url());
        }
      });
    });

  await page.goto('http://localhost:3100');
  await waitForRequest();
});
