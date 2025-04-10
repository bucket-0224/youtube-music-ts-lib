import context from './context.js';
import { AlbumHeader, MusicBody, MusicItem } from './models.js';
import { parseAlbumHeader, parseMusicInAlbumItem } from './parsers.js';
import axios from 'axios';

/**
 * Parses the music items from the album response body.
 * @param body The response body containing the album data.
 * @returns An array of music items parsed from the album.
 */
export const parseAlbumBody = (body: any): MusicBody => {
    const { contents } =
        body.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0]
            .musicShelfRenderer ?? [];
    const songs: MusicItem[] = [];
    const { thumbnailUrl, artist, album } = parseAlbumHeader(
        body.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0]
    );
    contents.forEach((element: any) => {
        try {
            const song = parseMusicInAlbumItem(element);
            if (song) {
                song.album = album;
                if (song.artists?.length === 0) song.artists = [{ name: artist }];
                song.thumbnailUrl = thumbnailUrl;
                songs.push(song);
            }
        } catch (err) {
            console.error(err);
        }
    });
    return {
        albumThumbnail: thumbnailUrl,
        albumItems: songs,
    };
};

/**
 * Fetches and parses music items from an album by its ID.
 * @param albumId The ID of the album to fetch music items from.
 * @param scraperApiKey The Id of ScraperAPI site. you can access
 * @returns A promise resolving to an array of music items.
 * @comments
 * Previously, there was always a parameter to return videoId,
 * but repeated calls from the proxy after the patch no longer return videoId.
 * Therefore, you can either use redis to build a separate redis server for proxy calls or
 * build a proxy specialized server like the currently modified library to call videoId pinned to it.
 * The current library uses ScraperAPI. By default, it provides a free calling key with a limit of 1000 calls,
 * and when called, it will always call videoId normally.
 */
export async function listMusicFromAlbum(albumId: string, scraperApiKey: string): Promise<MusicBody> {
    try {
        const YOUTUBE_ENDPOINT =
            'https://music.youtube.com/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&alt=json'; // 실제 key 사용

        // ScraperAPI URL
        const SCRAPER_API_URL = `http://api.scraperapi.com?api_key=${scraperApiKey}&url=${encodeURIComponent(
            YOUTUBE_ENDPOINT
        )}`;

        const response = await axios.post(
            SCRAPER_API_URL,
            {
                ...context.body,
                browseId: albumId,
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

        return parseAlbumBody(response.data);
    } catch (e) {
        console.error(e);
        return {
            albumThumbnail: '',
            albumItems: [],
        };
    }
}
