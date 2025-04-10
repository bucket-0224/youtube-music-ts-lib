export enum AccountType {
    REGULAR = 'regular',
    VERIFIED_ARTIST = 'BADGE_STYLE_TYPE_VERIFIED_ARTIST',
}

export enum AlbumType {
    ep = 'EP',
    album = 'Album',
    single = 'Single',
}

export enum PageType {
    artist = 'MUSIC_PAGE_TYPE_ARTIST',
    album = 'MUSIC_PAGE_TYPE_ALBUM',
    playlist = 'MUSIC_PAGE_TYPE_PLAYLIST',
}

export interface AlbumHeader {
    title: string;
    subtitle: string;
    thumbnail: string;
}

export interface MusicBody {
    albumThumbnail: string;
    albumItems: MusicItem[];
}

export interface MusicItem {
    youtubeId?: string;
    title?: string;
    thumbnailUrl?: string;
    artists?: { name: string; id?: string }[];
    album?: { name: string; id?: string };
    isExplicit?: boolean;
    duration?: {
        label: string;
        totalSeconds: number;
    };
}

export interface AlbumPreview {
    albumId?: string;
    title?: string;
    type?: AlbumType;
    thumbnailUrl?: string;
    artist?: string;
    artistId?: string;
    year?: string;
    isExplicit?: boolean;
}

export interface ArtistPreview {
    name?: string;
    artistId?: string;
    thumbnailUrl?: string;
    subscribers?: string;
}

export interface Artist {
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

export interface PlaylistPreview {
    playlistId?: string;
    title?: string;
    thumbnailUrl?: string;
    totalSongs?: number;
}

export interface Playlist {
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

export interface PlaylistTrack {
    id: string;
    title: string;
    durationStr: string;
    thumbnailUrl?: string;
    artist?: ArtistPreview;
    album?: AlbumPreview;
}

export interface MusicVideoPlayable {
    id?: string;
    title?: string;
    thumbnailUrl?: string;
    artist?: { name: string; id?: string };
    album?: { name: string; id?: string };
    type?: string;
    duration?: number;
}
