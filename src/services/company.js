const LinkedinScraper = require('./linkedin-scraper');
const SocieteScraper = require('./societe-scraper');

module.exports = class CompanyService {
  constructor(payload) {
    this.linkedinURL = payload.linkedin;
    this.societeURL = payload.societe;

    if (this.linkedinURL) {
      this.linkedinScraper = new LinkedinScraper(this.linkedinURL);
    }
    if (this.societeURL) {
      this.societeScraper = new SocieteScraper(this.societeURL);
    }
  }

  async extractCompanyInformation() {
    if (this.linkedinURL && !this.societeURL) {
      return this.linkedinScraper.extractCompanyInformation();
    }
    if (!this.linkedinURL && this.societeURL) {
      return this.societeScraper.extractCompanyInformation();
    }
    return Promise.all([
      this.linkedinScraper.extractCompanyInformation(),
      this.societeScraper.extractCompanyInformation(),
    ]);
  }
};
