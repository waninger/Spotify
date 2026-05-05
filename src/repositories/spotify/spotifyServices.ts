import { song } from "@/mock-data/mock-song";
import { Song } from "@/types/song";
import { album } from "@/mock-data/mock-album";
import { Album } from "@/types/album";
import { artist } from "@/mock-data/mock-artist";
import { Artist, ArtistAlbums } from "@/types/artist";
import { mockSearchResult } from "@/mock-data/mock-search-result";
import {
  SongService,
  AlbumService,
  ArtistService,
  SearchService,
  SearchResult,
  SearchType,
} from "@/repositories/interfaces";
import { getSpotifyAccessToken, invalidateSpotifyTokenCache } from "@/repositories/accessToken";
import {
  normalizeAlbum,
  normalizeArtist,
  normalizeSong,
  normalizeArtistAlbums,
} from "../../utils/normalizeSpotify";
import type {
  RawSpotifyAlbum,
  RawSpotifyArtist,
  RawSpotifySong,
  RawSpotifyArtistAlbums
} from "../../utils/normalizeSpotify";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";
const SEARCH_REVALIDATE_SECONDS = 5 * 60;
const ENTITY_REVALIDATE_SECONDS = 15 * 60;
const ARTIST_ALBUMS_MAX_LIMIT = 10; // Spotify API max limit for artist albums

function dedupeIds(ids: string[]): string[] {
  return [...new Set(ids.filter(Boolean))];
}

async function fetchSpotifyJson<T>(
  path: string,
  revalidateSeconds: number,
  retry = true,
): Promise<T | null> {
  let accessToken: string;

  try {
    accessToken = await getSpotifyAccessToken();
  } catch (error) {
    console.error("Error fetching Spotify access token:", error);
    return null;
  }

  const response = await fetch(`${SPOTIFY_API_BASE_URL}${path}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: revalidateSeconds },
  });

  if (response.status === 401 && retry) {
    invalidateSpotifyTokenCache();
    return fetchSpotifyJson<T>(path, revalidateSeconds, false);
  }

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(
      `Spotify API error: ${response.status} ${response.statusText} - ${errorBody} | path: ${path}`,
    );
    return null;
  }

  return (await response.json()) as T;
}

export const spotifySearchService: SearchService = {
  async search(
    query: string,
    type: SearchType,
    limit?: number,
  ): Promise<SearchResult | null> {
    const normalizedQuery = query.trim();
    const normalizedLimit = limit || 20;

    return fetchSpotifyJson<SearchResult>(
      `/search?q=${encodeURIComponent(normalizedQuery)}&type=${type}&limit=${normalizedLimit}`,
      SEARCH_REVALIDATE_SECONDS,
    );
  },
};

export const spotifySongService: SongService = {
  async getOne(id: string): Promise<Song | null> {
    const response = await fetchSpotifyJson<RawSpotifySong>(
      `/tracks/${id}`,
      ENTITY_REVALIDATE_SECONDS,
    );
    console.log("Fetched song data:", response);
    return response ? normalizeSong(response) : null;
  },
  async getMany(ids: string[]): Promise<Song[]> {
    const uniqueIds = dedupeIds(ids);
    if (uniqueIds.length === 0) return [];

    const songs = await Promise.all(
      uniqueIds.map((id) =>
        fetchSpotifyJson<RawSpotifySong>(
          `/tracks/${id}`,
          ENTITY_REVALIDATE_SECONDS,
        ),
      ),
    );

    return songs
      .filter(
        (song: RawSpotifySong | null): song is RawSpotifySong => song !== null,
      )
      .map(normalizeSong);
  },
};

export const spotifyAlbumService: AlbumService = {
  async getOne(id: string): Promise<Album | null> {
    const response = await fetchSpotifyJson<RawSpotifyAlbum>(
      `/albums/${id}`,
      ENTITY_REVALIDATE_SECONDS,
    );
    return response ? normalizeAlbum(response) : null;
  },
  async getMany(ids: string[]): Promise<Album[] | null> {
    const uniqueIds = dedupeIds(ids);
    if (uniqueIds.length === 0) return [];

    const albums = await Promise.all(
      uniqueIds.map((id) =>
        fetchSpotifyJson<RawSpotifyAlbum>(
          `/albums/${id}`,
          ENTITY_REVALIDATE_SECONDS,
        ),
      ),
    );

    return albums
      .filter(
        (album: RawSpotifyAlbum | null): album is RawSpotifyAlbum =>
          album !== null,
      )
      .map(normalizeAlbum);
  },
};

export const spotifyArtistService: ArtistService = {
  async getOne(id: string): Promise<Artist | null> {
    const response = await fetchSpotifyJson<RawSpotifyArtist>(
      `/artists/${id}`,
      ENTITY_REVALIDATE_SECONDS,
    );
    return response ? normalizeArtist(response) : null;
  },
  async getMany(ids: string[]): Promise<Artist[] | null> {
    const uniqueIds = dedupeIds(ids);
    if (uniqueIds.length === 0) return [];

    const artists = await Promise.all(
      uniqueIds.map((id) =>
        fetchSpotifyJson<RawSpotifyArtist>(
          `/artists/${id}`,
          ENTITY_REVALIDATE_SECONDS,
        ),
      ),
    );

    return artists
      .filter(
        (artist: RawSpotifyArtist | null): artist is RawSpotifyArtist =>
          artist !== null,
      )
      .map(normalizeArtist);
  },
  getAlbums: async (artistId: string): Promise<ArtistAlbums | null> => {
    const response = await fetchSpotifyJson<RawSpotifyArtistAlbums>(
      `/artists/${artistId}/albums?include_groups=album&limit=${ARTIST_ALBUMS_MAX_LIMIT}`,
      ENTITY_REVALIDATE_SECONDS,
    );

    return response ? normalizeArtistAlbums(response) : null;
  },
};

export const spotifyMockSongService: SongService = {
  async getOne(id: string): Promise<Song | null> {
    console.log(id);
    return song;
  },
  async getMany(ids: string[]): Promise<Song[] | null> {
    console.log(ids);
    const songs: Song[] = ids.map((id) => ({ ...song, id }));
    return songs;
  },
};

export const spotifyMockArtistService: ArtistService = {
  async getOne(id: string): Promise<Artist | null> {
    console.log(id);
    return artist;
    throw new Error("Function not implemented.");
  },
  async getMany(ids: string[]): Promise<Artist[] | null> {
    console.log(ids);
    throw new Error("Function not implemented.");
  },
  async getAlbums(): Promise<ArtistAlbums | null> {
    return null;
  },
};

export const spotifyMockAlbumService: AlbumService = {
  async getOne(id: string): Promise<Album | null> {
    console.log(id);
    return album;
    throw new Error("Function not implemented.");
  },
  async getMany(ids: string[]): Promise<Album[] | null> {
    console.log(ids);
    return [album, album, album];
  },
};

export const spotifyMockSearchService: SearchService = {
  async search(
    query: string,
    type: SearchType,
    limit?: number,
  ): Promise<SearchResult | null> {
    return mockSearchResult;
    console.log(query, type, limit);
    throw new Error("Function not implemented.");
  },
};
