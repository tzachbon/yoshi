it('simple test', async () => {
  await page.goto('http://localhost:3100');
  const result = await page.$eval('#e2e', (ele) => ele.textContent);

  expect(result).toMatch(`E2E tests are working! jest-yoshi-config`);
});
