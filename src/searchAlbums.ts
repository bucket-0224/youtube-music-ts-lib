import axios from 'axios';
import context from './context.js';
import { AlbumPreview } from './models.js';
import { parseAlbumItem } from './parsers.js';

/**
 * Parses the album search results from the API response.
 * @param body - The response body containing album search results.
 * @returns An array of AlbumPreview objects.
 */
export const extractAlbumsFromSearchResponse = (body: any): AlbumPreview[] => {
  try {
    const { contents } =
      body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
        .musicShelfRenderer;
    const results: AlbumPreview[] = [];
    contents.forEach((content: any) => {
      try {
        const album = parseAlbumItem(content);
        if (album) {
          results.push(album);
        }
      } catch (err) {
        console.error(err);
      }
    });
    return results;
  } catch (err) {
    console.log('Failed to searchAlbums', err);
    return [];
  }
};

/**
 * Searches for albums based on a query.
 * @param query - The search query for albums.
 * @returns A promise resolving to an array of AlbumPreview objects.
 */
export async function searchForAlbums(query: string): Promise<AlbumPreview[]> {
  try {
    const response = await axios.post(
      'https://music.youtube.com/youtubei/v1/search',
      {
        ...context.body,
        params: 'EgWKAQIYAWoKEAkQAxAEEAUQCg%3D%3D',
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
          origin: 'https://music.youtube.com',
        },
      }
    );

    return extractAlbumsFromSearchResponse(response.data);
  } catch (e) {
    console.error(e);
    return [];
  }
}
