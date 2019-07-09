const Browser = require('./browser');

module.exports = class SocieteScraper extends Browser {
  constructor(url) {
    super(url);
  }

  async extractCompanyInformation() {
    const { browser, page } = await super.launch();

    await page.goto(this.url);

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
    const employees = getValue("Tranche d'effectif");
    const shareCapital = getValue('Capital social');

    await browser.close();

    return {
      name,
      address,
      siren,
      siret,
      employees,
      shareCapital,
    };
  }
};
