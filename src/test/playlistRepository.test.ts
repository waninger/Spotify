import { expect, test } from "vitest";
import { playlistProvider } from "@/repositories/repositoryIndex";

const PLAYLIST_ID = "1";
const EMAIL = "test@example.com";

test("Get a non-null playlist from repository", async () => {
    const playlist = await playlistProvider.getList(PLAYLIST_ID, EMAIL);

    expect(playlist).toMatchObject({
        id: expect.any(String),
        user: expect.any(String),
        name: expect.any(String),
        songs: expect.any(Array),
    });
});

test("Get all playlists for a user", async () => {
    const playlists = await playlistProvider.getAll(EMAIL);

    expect(playlists).toBeTruthy();
    expect(playlists?.length).toBeGreaterThan(0);
    expect(playlists?.[0]).toMatchObject({
        id: expect.any(String),
        user: expect.any(String),
        name: expect.any(String),
        songs: expect.any(Array),
    });
});