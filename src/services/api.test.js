import { fetchData } from './api';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: 'testData' })
}));

describe('fetchData', () => {
  it('should fetch data from the API and store it in local storage', async () => {
    const data = await fetchData();

    expect(data).toEqual('testData');
    expect(axios.get).toHaveBeenCalledWith('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates');
  });

});
