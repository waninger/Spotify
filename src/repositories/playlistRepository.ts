import { PlaylistService } from "./interfaces";
import { playlist } from "../mock-data/mock-playlist";
import { Pool } from "pg";
import { Playlist } from "../types/playlist";

export const pool = new Pool({
  user: "spotify_admin",
  host: "localhost",
  database: "spotify",
  password: "password",
  port: 5432,
});

export const playlistRepository: PlaylistService = {
  async getList(id: string, email: string): Promise<Playlist | null> {
    {
      const res = await pool.query(
        `
        SELECT
        p.id,
        p.owner_id AS user,
        p.name,
        COALESCE(array_agg(s.id) FILTER (WHERE s.id IS NOT NULL), ARRAY[]::text[]) AS songs
        FROM playlists p
        LEFT JOIN playlist_songs ps ON ps.playlist_id = p.id
        LEFT JOIN songs s ON s.id = ps.song_id
        WHERE p.id = $1 AND p.owner_id = $2
        GROUP BY p.id, p.owner_id, p.name;
        `,
        [id, email],
      );
      console.log("Playlist:", res.rows);
      return res.rows[0] || null;
    }
  },
  async getAll(email: string): Promise<Playlist[] | null> {
    {
      const res = await pool.query(
        `
        SELECT
        p.id,
        p.owner_id AS user,
        p.name,
        COALESCE(array_agg(s.id) FILTER (WHERE s.id IS NOT NULL), ARRAY[]::text[]) AS songs
        FROM playlists p
        LEFT JOIN playlist_songs ps ON ps.playlist_id = p.id
        LEFT JOIN songs s ON s.id = ps.song_id
        WHERE p.owner_id = $1
        GROUP BY p.id, p.owner_id, p.name
        ORDER BY p.created_at;
        `,
        [email],
      );
      console.log("Playlists:", res.rows);
      return res.rows.length > 0 ? res.rows : null;
    }
  },
  async createPlaylist(userId: string, name: string): Promise<Playlist> {
    const res = await pool.query(
      `
        INSERT INTO playlists (owner_id, name)
        VALUES ($1, $2)
        RETURNING id, owner_id AS user, name;
      `,
      [userId, name],
    );
    if (res.rowCount === 0) {
      throw new Error(`Failed to create playlist for user ${userId}.`);
    }
    return res.rows[0];
  },
  async addSongToPlaylist(listId: string, songId: string): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insert song if it doesn't exist (using ON CONFLICT DO NOTHING)
      await client.query(
        `
        INSERT INTO songs (id)
        VALUES ($1)
        ON CONFLICT (id) DO NOTHING
        `,
        [songId]
      );

      // Add song to playlist
      const res = await client.query(
        `
        INSERT INTO playlist_songs (playlist_id, song_id)
        VALUES ($1, $2)
        `,
        [listId, songId]
      );

      if (res.rowCount === 0) {
        throw new Error(`Failed to add song ${songId} to playlist ${listId}.`);
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },
  async removeSongFromPlaylist(listId: string, songId: string): Promise<void> {
      const res = await pool.query(
        `
                DELETE FROM playlist_songs
                WHERE playlist_id = $1 AND song_id = $2
                `,
        [listId, songId]
      );
      if (res.rowCount === 0) {
        throw new Error(`Song ${songId} not found in playlist ${listId}.`);
      }
  },
  async removePlaylist(listId: string): Promise<void> {
      const res = await pool.query(
        `
                DELETE FROM playlists
                WHERE id = $1
                `,
        [listId]
      );
      if (res.rowCount === 0) {
        throw new Error(`Playlist with ID ${listId} not found.`);
      }
  },
};

export const playlistMockRepository: PlaylistService = {
  async getList(id: string): Promise<Playlist | null> {
    return playlist;
  },

  async getAll(userId) {
    return [playlist, playlist];
  },
  async addSongToPlaylist(listId: string, songId: string): Promise<void> {
    // Mock implementation, no actual database operation
    console.log(`Adding song ${songId} to playlist ${listId}`);
  },
  async removeSongFromPlaylist(listId: string, songId: string): Promise<void> {
    // Mock implementation, no actual database operation
    console.log(`Removing song ${songId} from playlist ${listId}`);
  },
  async removePlaylist(listId: string): Promise<void> {
    // Mock implementation, no actual database operation
    console.log(`Removing playlist ${listId}`);
  },
  createPlaylist: function (userId: string, name: string): Promise<Playlist> {
    throw new Error("Function not implemented.");
  }
};
