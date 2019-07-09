module.exports = class SearchService {
  extractCompanyURLs() {
    const linkedin = [{ title: 'foo', link: 'linkedin.com/company/foo' }];
    const societe = [{ title: 'foo', link: 'societe.com/societe/foo' }];
    return { linkedin, societe };
  }
};
