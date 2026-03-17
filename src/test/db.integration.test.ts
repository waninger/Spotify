import { afterAll, expect, test } from "vitest";
import { playlistRepository, pool } from "@/repositories/playlistRepository";

const RUN_DB_INTEGRATION = process.env.RUN_DB_INTEGRATION === "true";
const TEST_EMAIL = `integration-${Date.now()}@example.com`;
const TEST_SONG_ID = "3n3Ppam7vgaVa1iaRUc9Lp";

const createdPlaylistIds: string[] = [];

test.skipIf(!RUN_DB_INTEGRATION)("DB connection smoke test", async () => {
  const result = await pool.query("SELECT 1 as ok");
  expect(result.rows[0]?.ok).toBe(1);
});

test.skipIf(!RUN_DB_INTEGRATION)("playlistRepository write path with cleanup", async () => {
  const playlistName = `integration-${Date.now()}`;

  const created = await playlistRepository.createPlaylist(TEST_EMAIL, playlistName);
  expect(created).toMatchObject({
    id: expect.any(String),
    user: TEST_EMAIL,
    name: playlistName,
  });
  createdPlaylistIds.push(created.id);

  await playlistRepository.addSongToPlaylist(created.id, TEST_SONG_ID);

  const updated = await playlistRepository.getList(created.id, TEST_EMAIL);
  expect(updated).toBeTruthy();
  expect(updated?.songs).toContain(TEST_SONG_ID);
});

afterAll(async () => {
  if (!RUN_DB_INTEGRATION) return;

  for (const playlistId of createdPlaylistIds) {
    try {
      await playlistRepository.removeSongFromPlaylist(playlistId, TEST_SONG_ID);
    } catch {
      // Cleanup is best-effort: song may already be absent.
    }

    try {
      await playlistRepository.removePlaylist(playlistId);
    } catch {
      // Cleanup is best-effort: playlist may already be removed.
    }
  }

  await pool.end();
});
