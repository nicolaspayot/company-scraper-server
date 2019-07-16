jest.mock('./linkedin-scraper');
jest.mock('./societe-scraper');

const Company = require('../models/company');
const CompanyService = require('./company');

describe('CompanyService', () => {
  const LINKEDIN_URL = 'https://www.linkedin.com/company/foo';
  const SOCIETE_URL = 'https://www.societe.com/societe/foo';

  let companyService;

  it('should extract company information from Linkedin', async () => {
    companyService = new CompanyService({ linkedin: LINKEDIN_URL });
    const info = await companyService.extractCompanyInformation();
    expect(info).toEqual({ publicName: 'foo' });
  });

  it('should extract company information from societe.com', async () => {
    companyService = new CompanyService({ societe: SOCIETE_URL });
    const info = await companyService.extractCompanyInformation();
    expect(info).toEqual({ name: 'foo' });
  });

  it('should extract company information from Linkedin and societe.com', async () => {
    companyService = new CompanyService({ linkedin: LINKEDIN_URL, societe: SOCIETE_URL });
    const info = await companyService.extractCompanyInformation();
    expect(info).toEqual({ name: 'foo', publicName: 'foo' });
  });

  it('should look for company in DB and return it if it exists', async () => {
    Company.findOne = jest.fn(() => Promise.resolve({ _id: 1 }));
    companyService = new CompanyService({ linkedin: LINKEDIN_URL });
    const company = await companyService.findByURLsAndCreate();
    expect(company).toEqual({ _id: 1 });
  });

  it('should look for company in DB, scrap it from Linkedin and save it', async () => {
    Company.findOne = jest.fn(() => Promise.resolve(null));
    Company.create = jest.fn(() => Promise.resolve({ _id: 1 }));
    companyService = new CompanyService({ linkedin: LINKEDIN_URL });
    companyService.extractCompanyInformation = jest.fn(() => Promise.resolve({ publicName: 'foo' }));
    const company = await companyService.findByURLsAndCreate();
    expect(company).toEqual({ _id: 1 });
  });

  it('should look for company in DB, scrap it from Linkedin and throw 404 Not Found error', async () => {
    Company.findOne = jest.fn(() => Promise.resolve(null));
    companyService = new CompanyService({ linkedin: LINKEDIN_URL });
    companyService.extractCompanyInformation = jest.fn(() => Promise.resolve({}));
    await expect(companyService.findByURLsAndCreate()).rejects.toThrow('Company not found');
  });
});
