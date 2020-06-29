describe('Puppeteer errors and logs: ', async () => {
  let originalConsole: Console;
  beforeEach(() => {
    originalConsole = global.console;
  });

  afterEach(() => {
    global.console = originalConsole;
  });

  const waitForFakeUrl = () =>
    new Promise((res, rej) => {
      const timeout = setTimeout(rej, 5000);

      page.on('requestfinished', (req) => {
        if (req.url().includes('fake-url')) {
          clearTimeout(timeout);
          res(req.url());
        }
      });
    });

  it('should warn user when request gets 404 or 503', async () => {
    const warnMessage =
      'Request failed or not found. url: http://localhost:3100/fake-url, status code: 404, method: GET';

    // @ts-ignore
    global.console = { warn: jest.fn() };

    await page.goto('http://localhost:3100');

    await waitForFakeUrl();

    expect(global.console.warn).toBeCalledWith(warnMessage);
  });
});
