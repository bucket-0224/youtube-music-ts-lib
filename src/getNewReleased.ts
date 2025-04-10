import context from "./context.js";
import { Playlist } from "./models.js";
import { parseSuggestions } from "./parsers.js";
import axios from "axios";

/**
 * Fetches and parses a playable item by its ID.
 * @param options Optional settings for language and country preferences.
 * @returns A promise resolving to the playable item data.
 */

export async function getNewReleased(options?: {
  lang: string;
  country: string;
}): Promise<Playlist | null> {
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
      browseId: "FEmusic_new_releases",
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
    let data =
      response.data.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[1].musicCarouselShelfRenderer.contents.map(
        (n: any) => {
          return parseSuggestions(n);
        }
      );

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}
