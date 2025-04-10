import { test, expect } from "vitest";
import { getArtist } from "../getArtist.js";
import { searchForArtists } from "../searchArtists.js";
import { searchForMusic } from "../searchMusics.js";

test("Search for Dua Lipa and get more data", async () => {
  const query = "arjan";

  const results = await searchForArtists(query);
  expect(results.length).toBeGreaterThanOrEqual(1);
  const firstResult = results[0];
  expect(firstResult).toBeDefined();
  const data = await getArtist(firstResult.artistId ?? "");
  expect(data).toBeDefined();
  expect(data.suggestedArtists?.length).toBeGreaterThanOrEqual(1);
  expect(data.albums?.length).toBeGreaterThanOrEqual(1);
  expect(data.singles?.length).toBeGreaterThanOrEqual(1);
});

test("Parse artist for songs whose artist does not have a navigationEndpoint", async () => {
  const query = "Running in the 90s";

  const results = await searchForMusic(query);
  expect(results.length).toBeGreaterThanOrEqual(1);
  const firstResult = results[0];
  expect(firstResult).toBeDefined();
  expect(firstResult.artists?.length).toBeGreaterThanOrEqual(1);
});

test("Test set artist by id", async () => {
  const artistId = "UCXFEPK5iEJ1MQQmjfleJxlA";

  const data = await getArtist(artistId);
  expect(data).toBeDefined();
  expect(data.artistId).toBe(artistId);
  expect(data.suggestedArtists?.length).toBeGreaterThanOrEqual(1);
  expect(data.songs?.length).toBeGreaterThanOrEqual(1);
  expect(data.albums?.length).toBeGreaterThanOrEqual(1);
  expect(data.singles?.length).toBeGreaterThanOrEqual(1);
});
