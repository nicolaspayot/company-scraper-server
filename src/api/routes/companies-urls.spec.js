jest.mock('../../services/company');

const Hapi = require('@hapi/hapi');
const companiesURLs = require('./companies-urls');

const requestWithPayload = payload => {
  return {
    method: 'POST',
    url: '/companies/urls',
    payload,
  };
};

describe('POST - /companies/urls', () => {
  let server;

  beforeEach(async () => {
    server = new Hapi.Server();
    await companiesURLs(server);
  });

  it('should return 400 error code if request has no payload', async () => {
    const request = requestWithPayload();
    const response = await server.inject(request);
    expect(response.statusCode).toBe(400);
  });

  it('should return 400 error code if request has empty payload', async () => {
    const request = requestWithPayload({});
    const response = await server.inject(request);
    expect(response.statusCode).toBe(400);
  });

  it('should return 400 error code if request has invalid payload', async () => {
    const request1 = requestWithPayload({ linkedin: '', societe: '' });
    const response1 = await server.inject(request1);
    expect(response1.statusCode).toBe(400);

    const request2 = requestWithPayload({ linkedin: 'NOT_A_URI', societe: 'NOT_A_URI' });
    const response2 = await server.inject(request2);
    expect(response2.statusCode).toBe(400);
  });

  it('should return 200 response code with company info from Linkedin with valid request', async () => {
    const request = requestWithPayload({ linkedin: 'https://www.linkedin.com/company/foo' });
    const response = await server.inject(request);
    expect(JSON.parse(response.payload)).toEqual({ publicName: 'foo' });
    expect(response.statusCode).toBe(200);
  });

  it('should return 200 response code with company info from societe.com with valid request', async () => {
    const request = requestWithPayload({ societe: 'https://www.societe.com/societe/foo' });
    const response = await server.inject(request);
    expect(JSON.parse(response.payload)).toEqual({ name: 'foo' });
    expect(response.statusCode).toBe(200);
  });
});
