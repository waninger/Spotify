import { expect, test } from "vitest";
import { songProvider, albumProvider, artistProvider, musicSearchProvider } from "../repositories/repositoryIndex";
import { getSpotifyAccessToken } from "../repositories/accessToken";
import { SearchType } from "../repositories/interfaces";

const SONG_ID = "3n3Ppam7vgaVa1iaRUc9Lp";
const ARTIST_ID = "0C0XlULifJtAgn6ZNCW2eu"
const ALBUM_ID = "4BbsHmXEghoPPevQjPnHXx"
const SEARCH_TERM = "The Killers"
const SEARCH_TYPE = "track" as SearchType
const SEARCH_LIMIT = 1
const DEV_MODE = process.env.TEST_ENV === "dev";

test.skipIf(DEV_MODE)("Get spotify access token", async () => {
  const accessToken = await getSpotifyAccessToken();

  expect(accessToken).not.toBeNull();
});

test("Get a non null answer from songService", async () => {
  const song = await songProvider.getOne(SONG_ID);

  expect(song).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    duration_ms: expect.any(Number),
    type: "track",
  });
});

test("Get a non null answer from artistService", async () => {
  const artist = await artistProvider.getOne(ARTIST_ID);

  expect(artist).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    type: "artist",
  });
});

test("Get a non null answer from albumService", async () => {
  const album = await albumProvider.getOne(ALBUM_ID);

  expect(album).toMatchObject({
    id: expect.any(String),
    name: expect.any(String),
    total_tracks: expect.any(Number),
    type: "album",
  });
});

test("Get a non null answer from searchService", async () => {
  const searchResults = await musicSearchProvider.search(SEARCH_TERM, SEARCH_TYPE, SEARCH_LIMIT);

  expect(searchResults).not.toBeNull()
});



