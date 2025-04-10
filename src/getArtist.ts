import context from './context.js';
import { Artist } from './models.js';
import { parseArtistData } from './parsers.js';
import axios from 'axios';

/**
 * Fetches and parses artist data by artist ID.
 * @param artistId The ID of the artist to fetch.
 * @param options Optional settings for language and country preferences.
 * @returns A promise resolving to the parsed artist data.
 */
export async function getArtist(
  artistId: string,
  options?: {
    lang?: string;
    country?: string;
  }
): Promise<Artist> {
  const response = await axios.post(
    'https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      ...context.body,
      browseId: artistId,
    },
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept-Language': options?.lang ?? 'en',
        origin: 'https://music.youtube.com',
      },
    }
  );

  try {
    return parseArtistData(response.data, artistId);
  } catch (e) {
    console.error(e);
    return {};
  }
}
