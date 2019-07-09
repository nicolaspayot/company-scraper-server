module.exports = class CompanyService {
  constructor(payload) {
    this.linkedinURL = payload.linkedin;
    this.societeURL = payload.societe;
  }

  async extractCompanyInformation() {
    if (this.linkedinURL && !this.societeURL) {
      return { publicName: 'foo' };
    } else if (!this.linkedinURL && this.societeURL) {
      return { name: 'foo' };
    } else {
      return { publicName: 'foo', name: 'foo' };
    }
  }
};
