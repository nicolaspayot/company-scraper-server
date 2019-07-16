const Boom = require('@hapi/boom');
const { isEmpty } = require('../utils');
const LinkedinScraper = require('./linkedin-scraper');
const SocieteScraper = require('./societe-scraper');
const Company = require('../models/company');

module.exports = class CompanyService {
  constructor({ linkedin, societe }) {
    this.linkedinURL = linkedin;
    this.societeURL = societe;
  }

  async findByURLsAndCreate() {
    let company = await Company.findOne({ linkedinURL: this.linkedinURL, societeURL: this.societeURL });
    if (!company) {
      const info = await this.extractCompanyInformation();
      if (isEmpty(info)) {
        throw Boom.notFound('Company not found');
      }
      company = await Company.create(info);
    }
    return company;
  }

  async extractCompanyInformation() {
    this.loadScrapers();

    if (this.linkedinURL && !this.societeURL) {
      return this.linkedinScraper.extractCompanyInformation(this.linkedinURL);
    }
    if (!this.linkedinURL && this.societeURL) {
      return this.societeScraper.extractCompanyInformation(this.societeURL);
    }
    const [linkedinInfo, societeInfo] = await Promise.all([
      this.linkedinScraper.extractCompanyInformation(this.linkedinURL),
      this.societeScraper.extractCompanyInformation(this.societeURL),
    ]);
    return { ...linkedinInfo, ...societeInfo };
  }

  loadScrapers() {
    if (this.linkedinURL) {
      this.linkedinScraper = new LinkedinScraper();
    }
    if (this.societeURL) {
      this.societeScraper = new SocieteScraper();
    }
  }
};
