import { afterEach, vi } from "vitest";

process.env.USE_SPOTIFY_MOCK_DATA = "true";
process.env.USE_PLAYLIST_MOCK_DATA = "false";

afterEach(() => {
  vi.restoreAllMocks();
});
