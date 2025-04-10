import axios from 'axios';
import context from './context.js';
import { MusicItem } from './models.js';
import { parseMusicInPlaylistItem } from './parsers.js';

/**
 * Parses the music items from the playlist response body.
 * @param body The response body containing the playlist data.
 * @returns An array of parsed music items.
 */
export const parsePlaylistBody = (body: {
  contents: {
    singleColumnBrowseResultsRenderer: {
      tabs: {
        tabRenderer: {
          content: {
            sectionListRenderer: {
              contents: {
                musicPlaylistShelfRenderer?: { contents: any[] };
                musicCarouselShelfRenderer: { contents: any[] };
              }[];
            };
          };
        };
      }[];
    };
  };
}): MusicItem[] => {
  const content =
    body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
      .sectionListRenderer.contents[0];
  const { contents } =
    content.musicPlaylistShelfRenderer ?? content.musicCarouselShelfRenderer;
  const results: MusicItem[] = [];
  contents.forEach((content: any) => {
    try {
      const song = parseMusicInPlaylistItem(content);
      if (song) {
        results.push(song);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

/**
 * Fetches and parses music items from a playlist by its ID.
 * @param playlistId The ID of the playlist to fetch music items from.
 * @returns A promise resolving to an array of music items.
 */
export async function listMusicFromPlaylist(
  playlistId: string
): Promise<MusicItem[]> {
  let browseId;
  if (!playlistId.startsWith('VL')) {
    browseId = 'VL' + playlistId;
  }

  try {
    const response = await axios.post(
      'https://music.youtube.com/youtubei/v1/browse',
      {
        ...context.body,
        browseId,
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

    return parsePlaylistBody(response.data);
  } catch (error) {
    console.error(`Error in listMusicsFromPlaylist: ${error}`);
    return [];
  }
}
