const SocieteScraper = require('./societe-scraper');

module.exports = class Societe {
  constructor(url) {
    this.societeScraper = new SocieteScraper(url);
  }

  async extractCompanyInformation() {
    return this.societeScraper.extractCompanyInformation();
  }
};
