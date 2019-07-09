const config = require('../../config');
const Browser = require('../browser');

const loginUrl = 'https://www.linkedin.com/login';

module.exports = class LinkedinScraper extends Browser {
  constructor(url) {
    super(url);
  }

  async login(page) {
    await page.goto(loginUrl);
    await page.waitForSelector('#username', { timeout: 10000 });

    await page.$('#username').then($username => $username.type(config.linkedin.email));
    await page.$('#password').then($password => $password.type(config.linkedin.password));
    await page.$('.login__form_action_container button').then($button => $button.click());
    await page.waitForSelector('input[role=combobox]', { timeout: 10000 });
  }

  async extractCompanyInformation() {
    const { browser, page } = await super.launch();

    await this.login(page);

    await page.goto(this.url);
    await page.waitForSelector('.org-top-card-summary__title', { timeout: 10000 });

    const name = await page.$eval('.org-top-card-summary__title', $h1 => $h1.textContent.trim());
    const logo = await page.$eval('.org-top-card-primary-content__logo', $img => $img.src);
    const industry = await page.$eval('.org-top-card-summary__industry', $div => $div.textContent.trim());
    const employees = await page.$eval('a[data-control-name="topcard_see_all_employees"]', $a => $a.textContent.trim());
    const employeesCount = /(\d+)/.exec(employees)[1];

    await browser.close();

    return {
      name,
      logo,
      industry,
      employeesCount,
    };
  }
};
