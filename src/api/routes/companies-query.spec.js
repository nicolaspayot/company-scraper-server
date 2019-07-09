jest.mock('../../services/search');

const Hapi = require('@hapi/hapi');
const companiesQuery = require('./companies-query');

const requestWithPayload = payload => {
  return {
    method: 'POST',
    url: '/companies/query',
    payload,
  };
};

describe('POST - /companies/query', () => {
  let server;

  beforeEach(async () => {
    server = new Hapi.Server();
    await companiesQuery(server);
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

  it('should return 200 response code with company URLs', async () => {
    const request = requestWithPayload({ query: 'foo' });
    const response = await server.inject(request);
    const linkedin = [{ title: 'foo', link: 'linkedin.com/company/foo' }];
    const societe = [{ title: 'foo', link: 'societe.com/societe/foo' }];
    expect(JSON.parse(response.payload)).toEqual({ linkedin, societe });
    expect(response.statusCode).toBe(200);
  });
});
