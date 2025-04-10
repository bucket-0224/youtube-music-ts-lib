# youtube-music-ts-lib

- This YOUTUBE API is designed for YouTube Music (distinct from YouTube's music videos), providing proper type definitions for seamless integration into your development tools.

## Features Overview

This API provides a variety of functions to explore and interact with YouTube Music content.

### Core Capabilities:

- **Search for Music**: Find tracks by name or artist.
- **Search for Playlists**: Discover playlists related to your interests.
- **Search for Albums**: Look for albums by their title or artist.
- **Search for Artists**: Locate artists and their music.

### Additional Functions:

- **Retrieve Music from Playlists**: Get a list of tracks from a specific playlist.
- **Retrieve Music from Albums**: Extract songs from a particular album.
- **Retrieve Albums by Artist**: View the albums released by a specific artist.
- **Explore Music by Artist**: Discover music associated with a particular artist.
- **Get Music Recommendations**: Receive suggestions based on a specific track.

# Usage Instructions

## Get Trending Songs

Use the `getNewReleased` function to get Trending Songs

### Example:

```js
import { getNewReleased } from "youtube-music-apis";
const { getNewReleased } = require("youtube-music-apis");

const main = async () => await getNewReleased();

main().then((results) => console.log(results));
```

## Searching for Albums

Use the `searchForAlbums` function to search for albums by their YouTube Music ID.

### Example:

```js
import { searchForAlbums } from "youtube-music-apis";
const { searchForAlbums } = require("youtube-music-apis");

const main = async () => await searchForAlbums("Patandar");

main().then((results) => console.log(results));
```

## Searching for Playlists

Use the `searchForPlaylists` function to search for playlists by their YouTube Music ID.

### Example:

```js
import { searchForPlaylists } from "youtube-music-apis";
const { searchForPlaylists } = require("youtube-music-apis");

const main = async () => await searchForPlaylists("shubh");

main().then((results) => console.log(results));
```

## Getting Music-Based Suggestions

The `getMusicBasedSuggestions` function provides music recommendations based on a specific music item.

### Example:

```js
import { getMusicBasedSuggestions, searchForMusic } from "youtube-music-apis";
const {
  getMusicBasedSuggestions,
  searchForMusic,
} = require("youtube-music-apis");

const main = async () => {
  const music = (await searchForMusic("Liem if only")).shift();
  if (!music) {
    throw Error();
  }
  if (!music.youtubeId) return {};
  return getMusicBasedSuggestions(music.youtubeId);
};

main().then((results) => console.log(results));
```

## Searching for Music

Use the `searchForMusic` function to search for a specific music track.

### Example:

```js
import { searchForMusic } from "youtube-music-apis";
const { searchForMusic } = require("youtube-music-apis");

const main = async () => await searchForMusic("Arjan");

main().then((results) => console.log(results));
```

## Searching for an Artist and Their Playlists

You can search for an artist, retrieve their details, and also get their official playlists if available.

### Example:

```js
import { getArtist, searchForArtists, searchForPlaylists } from 'youtube-music-apis';
const { getArtist, searchForArtists, searchForPlaylists } = require('youtube-music-apis');

// Search for artist
searchForArtists('Selena Gomez').then((r) => {
  console.log('Search results', r);
  const id = r[0].artistId;
  // Get more data about the artist
  getArtist(id!).then((data) => {
    console.log('More Data', data);
    // You can also get the playlist with all songs if the artist has more than 5 songs
    // songsPlaylistId is undefined when the artist has exactly 5 or fewer songs
    if (data.songsPlaylistId) {
      searchForPlaylists(data.songsPlaylistId).then((list) => {
        console.log('Playlist', list);
      });
    }
  });
});

```
