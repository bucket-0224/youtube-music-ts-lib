import context from "./context.js";
import { Playlist } from "./models.js";
import { parsePlaylist } from "./parsers.js";
import axios from "axios";

/**
 * Fetches and parses playlist data by playlist ID.
 * @param playlistId The ID of the playlist to fetch.
 * @param options Optional settings for language and country preferences.
 * @returns A promise resolving to the parsed playlist data or null if an error occurs.
 */
export async function getPlaylist(
  playlistId: string,
  options?: {
    lang: string;
    country: string;
  }
): Promise<Playlist | null> {
  const response = await axios.post(
    "https://music.youtube.com/youtubei/v1/browse",
    {
      ...context.body,
      playbackContext: {
        contentPlaybackContext: {
          autoCaptionsDefaultOn: false,
          html5Preference: "HTML5_PREF_WANTS",
          lactMilliseconds: "411",
          mdxContext: {},
          referer: "https://music.youtube.com/",
          signatureTimestamp: 20024,
          vis: 10,
        },
      },
      browseId: playlistId,
    },
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Accept-Language": options?.lang ?? "en",
        origin: "https://music.youtube.com",
        referer: "https://music.youtube.com/new_releases",
      },
    }
  );

  try {
    const data = parsePlaylist(response.data.contents);
    if (data) data.id = playlistId;
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
