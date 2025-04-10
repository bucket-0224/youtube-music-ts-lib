import axios from 'axios';
import context from './context.js';
import { ArtistPreview } from './models.js';
import { parseArtistSearchResult } from './parsers.js';

/**
 * Parses the body of the artist search response to extract a list of artist previews.
 * @param body - The response body from the API.
 * @returns An array of ArtistPreview objects.
 */
export const extractArtistsFromSearchResponse = (
  body: any
): ArtistPreview[] => {
  try {
    const { contents } =
      body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
        .musicShelfRenderer;
    const results: ArtistPreview[] = [];
    contents.forEach((content: any) => {
      try {
        const artist = parseArtistSearchResult(content);
        if (artist) {
          results.push(artist);
        }
      } catch (err) {
        console.error(err);
      }
    });
    return results;
  } catch (err) {
    console.log('Failed to searchArtists', err);
    return [];
  }
};

/**
 * Searches for artists based on a query.
 * @param query - The search query for finding artists.
 * @param options - Optional parameters for language and country.
 * @returns A promise resolving to an array of ArtistPreview objects.
 */
export async function searchForArtists(
  query: string,
  options?: {
    lang?: string;
    country?: string;
  }
): Promise<ArtistPreview[]> {
  try {
    const response = await axios.post(
      'https://music.youtube.com/youtubei/v1/search',
      {
        ...context.body,
        params: 'EgWKAQIgAWoKEAMQBBAJEAoQBQ%3D%3D',
        query,
      },
      {
        params: {
          alt: 'json',
          key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
        },
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept-Language': options?.lang ?? 'en',
          origin: 'https://music.youtube.com',
        },
      }
    );

    return extractArtistsFromSearchResponse(response.data);
  } catch (e) {
    console.error(e);
    return [];
  }
}
