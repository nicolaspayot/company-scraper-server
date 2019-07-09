const { isEmpty } = require('../utils');
const LinkedinScraper = require('./linkedin-scraper');
const SocieteScraper = require('./societe-scraper');
const Company = require('../models/company');

module.exports = class CompanyService {
  constructor(payload) {
    this.linkedinURL = payload.linkedin;
    this.societeURL = payload.societe;
  }

  async findByURLsAndCreate() {
    let company = await Company.findOne({ linkedinURL: this.linkedinURL, societeURL: this.societeURL });
    if (!company) {
      const info = await this.extractCompanyInformation();
      if (isEmpty(info)) {
        throw new Error('Company not found');
      }
      company = await this.createInDB(info);
    }
    return company;
  }

  async extractCompanyInformation() {
    this.loadScrapers();

    if (this.linkedinURL && !this.societeURL) {
      return this.linkedinScraper.extractCompanyInformation();
    }
    if (!this.linkedinURL && this.societeURL) {
      return this.societeScraper.extractCompanyInformation();
    }
    const [linkedinInfo, societeInfo] = await Promise.all([
      this.linkedinScraper.extractCompanyInformation(),
      this.societeScraper.extractCompanyInformation(),
    ]);
    return { ...linkedinInfo, ...societeInfo };
  }

  loadScrapers() {
    if (this.linkedinURL) {
      this.linkedinScraper = new LinkedinScraper(this.linkedinURL);
    }
    if (this.societeURL) {
      this.societeScraper = new SocieteScraper(this.societeURL);
    }
  }

  createInDB(info) {
    return Company.create({ ...info, linkedinURL: this.linkedinURL, societeURL: this.societeURL });
  }
};
