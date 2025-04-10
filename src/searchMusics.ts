import { MusicItem } from './models.js';
import { parseMusicItem } from './parsers.js';
import context from './context.js';
import axios from 'axios';

/**
 * Parses the body of the search response to extract a list of music items.
 * @param body - The response body from the API.
 * @returns An array of MusicVideo objects.
 */
export const extractMusicsFromSearchResponse = (body: {
  contents: any;
}): MusicItem[] => {
  try {
    const { contents } =
      body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
        .musicShelfRenderer;
    const results: MusicItem[] = [];
    contents.forEach((content: any) => {
      try {
        const song = parseMusicItem(content);
        if (song) {
          results.push(song);
        }
      } catch (e) {
        console.error(e);
      }
    });
    return results;
  } catch (err) {
    console.log('Failed to searchMusics', err);
    return [];
  }
};

/**
 * Searches for music based on a query.
 * @param query - The search query for finding music.
 * @returns A promise resolving to an array of MusicVideo objects.
 */
export async function searchForMusic(query: string): Promise<MusicItem[]> {
  const url = 'https://music.youtube.com/youtubei/v1/search?alt=json';
  const body = {
    ...context.body,
    params: 'EgWKAQIIAWoKEAoQCRADEAQQBQ%3D%3D',
    query,
    originalQuery: query,
    searchMethod: 'ENTER_KEY',
    validationStatus: 'VALID',
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        Origin: 'https://music.youtube.com',
      },
    });
    return extractMusicsFromSearchResponse(response.data as any);
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
