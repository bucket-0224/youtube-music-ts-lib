import { test, expect } from 'vitest';
import { listMusicFromAlbum } from '../listMusicsFromAlbum.js';
import { searchForAlbums } from '../searchAlbums.js';
import { getPlaylist } from '../getPlaylist.js';

test('Search for Heaven & Hell album, pick first and get song list', async () => {
  const query = 'Heaven & Hell';

  const results = await searchForAlbums(query);
  expect(results.length).toBeGreaterThan(1);
  const firstAlbum = results.shift();
  expect(firstAlbum).toBeDefined();
  const albumId = firstAlbum?.albumId;
  expect(albumId).toBeDefined();
  const songsResult = await listMusicFromAlbum(albumId ?? '');
  expect(songsResult.length).toBeGreaterThan(0);

  const albumDeet = await getPlaylist(albumId ?? '');
  expect(albumDeet).toBeDefined();
  expect(albumDeet?.title).toBeDefined();
  expect(albumDeet?.tracks.length).toBeGreaterThan(0);

  albumDeet?.tracks.forEach((track) => {
    expect(track.title).toBeDefined();
    expect(track.id).toBeDefined();
  });
});
