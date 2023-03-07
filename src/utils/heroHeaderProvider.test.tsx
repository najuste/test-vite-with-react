import {test, expect, vi} from 'vitest';
import getImage, { getSearchQuery, SEARCH_API } from './heroHeaderProvider';
import { fetchMock } from '../test/globalMocks';

test('getSearchQuery takes in user input and provides a full searchQuery', async ()=> {
    const userInput = 'moon landing';
    const expectedSearchQuery = SEARCH_API+'moon%20landing';
    const searchQuery = getSearchQuery(userInput);
    expect(searchQuery).toEqual(expectedSearchQuery);
})

test('getImage throws an error, does not return anything if no data is available', async ()=> {
    vi.stubGlobal('global.fetch', fetchMock)
    try {
        await getImage('');
      } catch (e) {
        expect(e).toEqual(expect.any(Error));
      }
})

test('getImage throws an error, does not return anything if no data is available', async ()=> {
  vi.stubGlobal('global.fetch', fetchMock);
  const errorMessage = 'No results';
  vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error(errorMessage))
  await expect(getImage('asdf1234-')).rejects.toThrow(errorMessage);
})