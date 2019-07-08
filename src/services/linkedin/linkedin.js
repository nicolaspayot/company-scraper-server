const LinkedinScraper = require('./linkedin-scraper');

module.exports = class Linkedin {
  constructor(url) {
    this.linkedinScraper = new LinkedinScraper(url);
  }

  async extractCompanyInformation() {
    return this.linkedinScraper.extractCompanyInformation();
  }
};
