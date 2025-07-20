const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 56 + i);
const urls = seeds.map(seed => `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (const url of urls) {
    await page.goto(url);
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Sum for ${url}: ${pageSum}`);
    totalSum += pageSum;
  }

  console.log(`✅ TOTAL SUM: ${totalSum}`);
  await browser.close();
})();
