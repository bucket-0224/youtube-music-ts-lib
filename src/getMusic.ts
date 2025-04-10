import context from './context.js';
import { MusicVideoPlayable } from './models.js';
import { parseVideoData } from './parsers.js';
import axios from 'axios';

/**
 * Fetches and parses a playable item by its ID.
 * @param itemId The ID of the item to fetch.
 * @param options Optional settings for language and country preferences.
 * @returns A promise resolving to the playable item data.
 */
export async function getMusic(
  musicId: string,
  options?: {
    lang: string;
    country: string;
  }
): Promise<MusicVideoPlayable> {
  const response = await axios.post(
    'https://music.youtube.com/youtubei/v1/player',
    {
      ...context.body,
      playbackContext: {
        contentPlaybackContext: {
          autoCaptionsDefaultOn: false,
          html5Preference: 'HTML5_PREF_WANTS',
          lactMilliseconds: '411',
          mdxContext: {},
          referer: 'https://music.youtube.com/',
          signatureTimestamp: 20024,
          vis: 10,
        },
      },
      videoId: musicId,
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
    const data = parseVideoData(response.data);
    return data;
  } catch (e) {
    console.error(e);
    return {};
  }
}
