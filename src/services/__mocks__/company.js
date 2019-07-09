module.exports = class CompanyService {
  constructor({ linkedin, societe }) {
    this.linkedinURL = linkedin;
    this.societeURL = societe;
  }

  async findByURLsAndCreate() {
    if (this.linkedinURL && !this.societeURL) {
      return { publicName: 'foo' };
    } else if (!this.linkedinURL && this.societeURL) {
      return { name: 'foo' };
    } else {
      return { publicName: 'foo', name: 'foo' };
    }
  }
};
