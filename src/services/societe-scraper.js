const logger = require('../loaders/logger');
const Browser = require('./browser');

const employeesRegExp = /([0-9]+) à ([0-9]+) salariés/;

const extractEmployees = rawEmployees => {
  const match = employeesRegExp.exec(rawEmployees);
  if (!match) {
    return '';
  }
  return `${match[1]} to ${match[2]}`;
};

module.exports = class SocieteScraper extends Browser {
  async extractCompanyInformation(url) {
    try {
      const { browser, page } = await super.launch();

      await page.goto(url);
      await page.waitForSelector('.CompanyIdentity__content', { timeout: 10000 });

      const info = await page.$$eval('#rensjur tbody tr', $trs =>
        $trs.map(tr => {
          return {
            name: tr.children[0].textContent.trim(),
            value: tr.children[1].textContent.trim(),
          };
        }),
      );

      const getValue = name => (info.find(item => item.name === name) || {}).value;

      const name = getValue('Dénomination');
      const address = getValue('Adresse');
      const siren = getValue('SIREN');
      const siret = getValue('SIRET (siege)');
      const employees = extractEmployees(getValue("Tranche d'effectif"));
      const shareCapital = getValue('Capital social');

      await browser.close();

      return {
        societeURL: url,
        name,
        address,
        siren,
        siret,
        employees,
        shareCapital,
      };
    } catch (err) {
      logger.error('[societe-scraper] %s', err.message);
      return {};
    }
  }
};
