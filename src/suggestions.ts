import { MusicItem } from './models.js';
import { parseSuggestionItem } from './parsers.js';
import context from './context.js';
import axios from 'axios';

/**
 * Parses the response body to extract a list of music items.
 * @param body - The response body from the API.
 * @returns An array of MusicItem objects.
 */
export const parseGetSuggestionsBody = (body: {
  contents: {
    singleColumnMusicWatchNextResultsRenderer: {
      tabbedRenderer: {
        watchNextTabbedResultsRenderer: {
          tabs: {
            tabRenderer: {
              content: {
                musicQueueRenderer: {
                  content: { playlistPanelRenderer: { contents: [] } };
                };
              };
            };
          }[];
        };
      };
    };
  };
}): MusicItem[] => {
  const { contents } =
    body.contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
      .watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content
      .musicQueueRenderer.content.playlistPanelRenderer;

  const results: MusicItem[] = [];

  contents.forEach((content: any) => {
    try {
      const video = parseSuggestionItem(content);
      if (video) {
        results.push(video);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

/**
 * Fetches music suggestions based on a given ID.
 * @param musicId - The ID for which to fetch suggestions.
 * @returns A promise resolving to an array of MusicItem objects.
 */
export async function getMusicBasedSuggestions(
  musicId: string
): Promise<MusicItem[]> {
  const response = await axios.post(
    'https://music.youtube.com/youtubei/v1/next',
    {
      ...context.body,
      enablePersistentPlaylistPanel: true,
      isAudioOnly: true,
      params: 'mgMDCNgE',
      playerParams: 'igMDCNgE',
      tunerSettingValue: 'AUTOMIX_SETTING_NORMAL',
      playlistId: `RDAMVM${musicId}`,
      musicId,
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
  try {
    return parseGetSuggestionsBody(response.data);
  } catch {
    return [];
  }
}
