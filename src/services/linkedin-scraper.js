const config = require('../config');
const Browser = require('./browser');

const loginUrl = 'https://www.linkedin.com/login';

module.exports = class LinkedinScraper extends Browser {
  async login(page) {
    await page.goto(loginUrl);
    await page.waitForSelector('#username', { timeout: 10000 });

    await page.$('#username').then($username => $username.type(config.linkedin.email));
    await page.$('#password').then($password => $password.type(config.linkedin.password));
    await page.$('.login__form_action_container button').then($button => $button.click());
    await page.waitForSelector('input[role=combobox]', { timeout: 10000 });
  }

  async extractCompanyInformation(url) {
    const { browser, page } = await super.launch();

    await this.login(page);

    await page.goto(url);
    await page.waitForSelector('.org-top-card-summary__title', { timeout: 10000 });

    const publicName = await page.$eval('.org-top-card-summary__title', $h1 => $h1.textContent.trim());
    const logoURL = await page.$eval('.org-top-card-primary-content__logo', $img => $img.src);
    const industry = await page.$eval('.org-top-card-summary__industry', $div => $div.textContent.trim());
    const employeesLink = await page.$eval('a[data-control-name="topcard_see_all_employees"]', $a =>
      $a.textContent.trim(),
    );
    const employeesOnLinkedin = /(\d+)/.exec(employeesLink)[1];

    await browser.close();

    return {
      publicName,
      logoURL,
      industry,
      employeesOnLinkedin,
    };
  }
};
