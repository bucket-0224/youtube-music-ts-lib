declare enum AccountType {
    REGULAR = "regular",
    VERIFIED_ARTIST = "BADGE_STYLE_TYPE_VERIFIED_ARTIST"
}
declare enum AlbumType {
    ep = "EP",
    album = "Album",
    single = "Single"
}
declare enum PageType {
    artist = "MUSIC_PAGE_TYPE_ARTIST",
    album = "MUSIC_PAGE_TYPE_ALBUM",
    playlist = "MUSIC_PAGE_TYPE_PLAYLIST"
}
interface AlbumHeader {
    title: string;
    subtitle: string;
    thumbnail: string;
}
interface MusicBody {
    albumThumbnail: string;
    albumItems: MusicItem[];
}
interface MusicItem {
    youtubeId?: string;
    title?: string;
    thumbnailUrl?: string;
    artists?: {
        name: string;
        id?: string;
    }[];
    album?: {
        name: string;
        id?: string;
    };
    isExplicit?: boolean;
    duration?: {
        label: string;
        totalSeconds: number;
    };
}
interface AlbumPreview {
    albumId?: string;
    title?: string;
    type?: AlbumType;
    thumbnailUrl?: string;
    artist?: string;
    artistId?: string;
    year?: string;
    isExplicit?: boolean;
}
interface ArtistPreview {
    name?: string;
    artistId?: string;
    thumbnailUrl?: string;
    subscribers?: string;
}
interface Artist {
    artistId?: string;
    name?: string;
    description?: string;
    thumbnails?: any[];
    songsPlaylistId?: string;
    songs?: MusicVideoPlayable[];
    albums?: AlbumPreview[];
    singles?: AlbumPreview[];
    suggestedArtists?: ArtistPreview[];
    subscribers?: string;
}
interface PlaylistPreview {
    playlistId?: string;
    title?: string;
    thumbnailUrl?: string;
    totalSongs?: number;
}
interface Playlist {
    id: string;
    title: string;
    type: string;
    year: string;
    thumbnailUrl: string;
    durationStr: string;
    tracks: PlaylistTrack[];
    author: {
        id?: string;
        name: string;
        thumbnailUrl?: string;
    };
}
interface PlaylistTrack {
    id: string;
    title: string;
    durationStr: string;
    thumbnailUrl?: string;
    artist?: ArtistPreview;
    album?: AlbumPreview;
}
interface MusicVideoPlayable {
    id?: string;
    title?: string;
    thumbnailUrl?: string;
    artist?: {
        name: string;
        id?: string;
    };
    album?: {
        name: string;
        id?: string;
    };
    type?: string;
    duration?: number;
}

/**
 * Searches for music based on a query.
 * @param query - The search query for finding music.
 * @returns A promise resolving to an array of MusicVideo objects.
 */
declare function searchForMusic(query: string): Promise<MusicItem[]>;

/**
 * Searches for artists based on a query.
 * @param query - The search query for finding artists.
 * @param options - Optional parameters for language and country.
 * @returns A promise resolving to an array of ArtistPreview objects.
 */
declare function searchForArtists(query: string, options?: {
    lang?: string;
    country?: string;
}): Promise<ArtistPreview[]>;

/**
 * Searches for albums based on a query.
 * @param query - The search query for albums.
 * @returns A promise resolving to an array of AlbumPreview objects.
 */
declare function searchForAlbums(query: string): Promise<AlbumPreview[]>;

/**
 * Searches for playlists based on a query.
 * @param query - The search query for finding playlists.
 * @param options - Optional parameters for the search.
 * @returns A promise resolving to an array of PlaylistPreview objects.
 */
declare function searchForPlaylists(query: string, options?: {
    onlyOfficialPlaylists?: boolean;
}): Promise<PlaylistPreview[]>;

/**
 * Fetches music suggestions based on a given ID.
 * @param musicId - The ID for which to fetch suggestions.
 * @returns A promise resolving to an array of MusicItem objects.
 */
declare function getMusicBasedSuggestions(musicId: string): Promise<MusicItem[]>;

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
declare function listMusicFromAlbum(albumId: string, scraperApiKey: string): Promise<MusicBody>;

/**
 * Fetches and parses music items from a playlist by its ID.
 * @param playlistId The ID of the playlist to fetch music items from.
 * @returns A promise resolving to an array of music items.
 */
declare function listMusicFromPlaylist(playlistId: string, scraperApiKey: string): Promise<MusicItem[]>;

/**
 * Fetches and parses artist data by artist ID.
 * @param artistId The ID of the artist to fetch.
 * @param options Optional settings for language and country preferences.
 * @returns A promise resolving to the parsed artist data.
 */
declare function getArtist(artistId: string, options?: {
    lang?: string;
    country?: string;
}): Promise<Artist>;

/**
 * Fetches and parses playlist data by playlist ID.
 * @param playlistId The ID of the playlist to fetch.
 * @param options Optional settings for language and country preferences.
 * @returns A promise resolving to the parsed playlist data or null if an error occurs.
 */
declare function getPlaylist(playlistId: string, options?: {
    lang: string;
    country: string;
}): Promise<Playlist | null>;

/**
 * Fetches and parses a playable item by its ID.
 * @param itemId The ID of the item to fetch.
 * @param options Optional settings for language and country preferences.
 * @returns A promise resolving to the playable item data.
 */
declare function getMusic(musicId: string, options?: {
    lang: string;
    country: string;
}): Promise<MusicVideoPlayable>;

/**
 * Fetches and parses a playable item by its ID.
 * @param options Optional settings for language and country preferences.
 * @returns A promise resolving to the playable item data.
 */
declare function getNewReleased(options?: {
    lang: string;
    country: string;
}): Promise<Playlist | null>;

export { AccountType, AlbumHeader, AlbumPreview, AlbumType, Artist, ArtistPreview, MusicBody, MusicItem, MusicVideoPlayable, PageType, Playlist, PlaylistPreview, PlaylistTrack, getArtist, getMusic, getMusicBasedSuggestions, getNewReleased, getPlaylist, listMusicFromAlbum, listMusicFromPlaylist, searchForAlbums, searchForArtists, searchForMusic, searchForPlaylists };
