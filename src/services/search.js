const GoogleScraper = require('./google-scraper');

module.exports = class SearchService {
  constructor({ query }) {
    this.query = query;

    const linkedinQuery = `site:linkedin.com/company ${this.query}`;
    this.linkedinURL = `https://www.google.com/search?q=${linkedinQuery}&oq=${linkedinQuery}`;

    const societeQuery = `site:societe.com/societe ${this.query}`;
    this.societeURL = `https://www.google.com/search?q=${societeQuery}&oq=${societeQuery}`;

    this.googleScraper = new GoogleScraper();
  }

  async extractCompanyURLs() {
    const [linkedinURLs, societeURLs] = await Promise.all([
      this.googleScraper.extractCompanyURLs(encodeURI(this.linkedinURL)),
      this.googleScraper.extractCompanyURLs(encodeURI(this.societeURL)),
    ]);
    return {
      linkedinURLs,
      societeURLs,
    };
  }
};
