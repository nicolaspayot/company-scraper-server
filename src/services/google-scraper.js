const Browser = require('./browser');

module.exports = class GoogleScraper extends Browser {
  constructor() {
    super();
  }

  async extractCompanyURLs(url) {
    const { browser, page } = await super.launch();

    await page.goto(url);

    const companyURLs = await page.$$eval('.r', $rows =>
      $rows.map(row => {
        return {
          title: row.querySelector('a h3').textContent.trim(),
          link: row.querySelector('a').href,
        };
      }),
    );

    await browser.close();

    return companyURLs;
  }
};
