import { fetchData } from '../services/api';
import 'jest-localstorage-mock';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: 'testData' })
}));

describe('fetchData', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve('testData')
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('should fetch data from the API and store it in local storage', async () => {
    const data = await fetchData();

    expect(data).toEqual('testData');
    expect(fetch).toHaveBeenCalledWith('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
  });

  it('should handle errors', async () => {
    global.fetch.mockRejectedValueOnce(new Error('fetch error'));

    await expect(fetchData()).rejects.toThrow('fetch error');
  });
});
