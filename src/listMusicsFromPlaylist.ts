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
        body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0];
    const { contents } = content.musicPlaylistShelfRenderer ?? content.musicCarouselShelfRenderer;
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
export async function listMusicFromPlaylist(playlistId: string, scraperApiKey: string): Promise<MusicItem[]> {
    let browseId;
    if (!playlistId.startsWith('VL')) {
        browseId = 'VL' + playlistId;
    }

    const YOUTUBE_ENDPOINT =
        'https://music.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&alt=json'; // 실제 key 사용

    // ScraperAPI URL
    const SCRAPER_API_URL = `http://api.scraperapi.com?api_key=${scraperApiKey}&url=${encodeURIComponent(
        YOUTUBE_ENDPOINT
    )}`;

    try {
        const response = await axios.post(
            SCRAPER_API_URL,
            {
                ...context.body,
                browseId,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'com.google.android.youtube/17.36.4 (Linux; U; Android 9)',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'X-Youtube-Client-Name': '21', // Android Music client
                    'X-Youtube-Client-Version': '5.36.50',
                },
            }
        );

        return parsePlaylistBody(response.data);
    } catch (error) {
        console.error(`Error in listMusicsFromPlaylist: ${error}`);
        return [];
    }
}
